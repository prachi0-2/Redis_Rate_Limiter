const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;

export async function checkRateLimit(userId) {
  try {
    const response = await fetch(`http://localhost:8080/test?userId=${userId}`);
    const retryAfter = response.headers.get('Retry-After');
    return { status: response.status, ok: response.ok, retryAfter };
  } catch (err) {
    console.error('Error checking rate limit:', err);
    throw err;
  }
}

export async function fetchStockPrice(symbol) {
  try {
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Finnhub API error');

    const data = await response.json();
    if (!data || !data.c) return null;

    return {
      symbol,
      price: data.c,
      high: data.h,
      low: data.l,
      open: data.o,
      previousClose: data.pc,
      change: (data.c - data.pc).toFixed(2),
      changePercent: (((data.c - data.pc) / data.pc) * 100).toFixed(2),
      volume: data.v || 0,
    };
  } catch (err) {
    console.error('Error fetching stock price:', err);
    throw err;
  }
}
