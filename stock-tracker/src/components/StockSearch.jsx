import { useState } from 'react';
import { User, DollarSign } from 'lucide-react';

export default function StockSearch({ onGetPrice, loading }) {
  const [userId, setUserId] = useState('');
  const [symbol, setSymbol] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') onGetPrice(userId, symbol);
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/20">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center">
            <User className="w-4 h-4 mr-2 text-purple-400" /> User ID
          </label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter your user ID"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center">
            <DollarSign className="w-4 h-4 mr-2 text-blue-400" /> Stock Symbol
          </label>
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            onKeyPress={handleKeyPress}
            placeholder="e.g., AAPL, TSLA, GOOGL"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 uppercase"
          />
        </div>
        <button
          onClick={() => onGetPrice(userId, symbol)}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-xl font-semibold hover:scale-105 disabled:opacity-50"
        >
          {loading ? 'Fetching...' : 'Get Stock Price'}
        </button>
      </div>
    </div>
  );
}