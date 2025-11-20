import { Clock, CheckCircle, XCircle } from 'lucide-react';

export default function HistoryTable({ history }) {
  if (!history.length) return null;

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/20 mt-6">
      <div className="flex items-center mb-6">
        <Clock className="w-6 h-6 text-white mr-2" />
        <h2 className="text-xl font-bold text-white">Request History</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400">Time</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400">Symbol</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400">User ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400">Status</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {history.map((entry) => (
              <tr key={entry.id} className="hover:bg-white/5">
                <td className="px-4 py-4 text-sm text-gray-300">{entry.timestamp}</td>
                <td className="px-4 py-4 text-sm font-bold text-white">{entry.symbol}</td>
                <td className="px-4 py-4 text-sm text-gray-400">{entry.userId}</td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-lg ${entry.status === 'Success' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : entry.status === 'Rate Limited' ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'}`}>
                    {entry.status === 'Success' && <CheckCircle className="w-3 h-3 mr-1" />}
                    {entry.status === 'Rate Limited' && <XCircle className="w-3 h-3 mr-1" />}
                    {entry.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-right font-bold text-white">
                  {entry.price ? `$${entry.price.toFixed(2)}` : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}