import { ArrowUpRight, ArrowDownRight, CheckCircle, XCircle } from 'lucide-react';

export default function StockDisplay({ stockData, error, loading }) {
  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return (
    <div className="bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-6">
      <XCircle className="w-6 h-6 text-red-400" /> {error}
    </div>
  );
  if (!stockData) return <p className="text-gray-400">Enter a stock symbol to get started</p>;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 rounded-2xl p-8 shadow-2xl">
        <div className="flex justify-between mb-4">
          <h3 className="text-6xl font-bold text-white">${stockData.price.toFixed(2)}</h3>
          <div className={`inline-flex items-center px-4 py-2 rounded-xl font-semibold ${stockData.change >= 0 ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
            {stockData.change >= 0 ? <ArrowUpRight className="w-5 h-5 mr-1" /> : <ArrowDownRight className="w-5 h-5 mr-1" />}
            {stockData.changePercent}
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-2xl font-bold text-white mr-2">{stockData.symbol}</span>
          <CheckCircle className="w-5 h-5 text-green-300" />
        </div>
      </div>
    </div>
  );
}