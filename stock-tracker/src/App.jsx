import { useState } from 'react';
import Header from './components/Header';
import StockSearch from './components/StockSearch';
import StockDisplay from './components/StockDisplay';
import HistoryTable from './components/HistoryTable';
import { checkRateLimit, fetchStockPrice } from './api';

export default function App() {
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(''); // Track the current user
  
  const handleGetPrice = async (userId, symbol) => {
    setCurrentUser(userId); // update current user
    if (!userId.trim() || !symbol.trim()) {
      setError('Please enter both User ID and Stock Symbol');
      return;
    }

    setLoading(true);
    setError(null);
    setStockData(null);

    try {
      // Check rate limit via Spring Boot
      const rateLimitRes = await checkRateLimit(userId);
      if (rateLimitRes.status === 429) {
        setError('Rate limit exceeded. Please try again later.');
        addToHistory(symbol, userId, 'Rate Limited', null);
        setLoading(false);
        return;
      }
      if (!rateLimitRes.ok) throw new Error('Backend error');

      // Fetch stock price from Finnhub
      const stockRes = await fetchStockPrice(symbol);
      if (stockRes && stockRes.price != null) {
        setStockData(stockRes);
        addToHistory(symbol, userId, 'Success', stockRes.price);
      } else {
        setError('Invalid stock symbol or API error');
        addToHistory(symbol, userId, 'Not Found', null);
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
      addToHistory(symbol, userId, 'Error', null);
    } finally {
      setLoading(false);
    }
  };

  const addToHistory = (symbol, userId, status, price) => {
    const newEntry = {
      id: Date.now(),
      symbol: symbol.toUpperCase(),
      userId,
      status,
      price,
      timestamp: new Date().toLocaleTimeString(),
    };
    setHistory(prev => [newEntry, ...prev.slice(0, 9)]);
  };

  // Filter history to show only current user's requests
  const filteredHistory = history.filter(entry => entry.userId === currentUser);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <Header />
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <StockSearch onGetPrice={handleGetPrice} loading={loading} />
        </div>
        <div className="lg:col-span-2">
          <StockDisplay stockData={stockData} error={error} loading={loading} />
        </div>
      </div>
      <HistoryTable history={filteredHistory} />
    </div>
  );
}
