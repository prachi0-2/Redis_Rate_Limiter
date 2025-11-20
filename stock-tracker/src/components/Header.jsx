import { Activity, Shield } from 'lucide-react';

export default function Header() {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center justify-center mb-6 bg-gradient-to-r from-purple-500 to-blue-500 p-1 rounded-2xl">
        <div className="bg-slate-900 px-6 py-3 rounded-xl flex items-center">
          <Activity className="w-8 h-8 text-purple-400 mr-3 animate-pulse" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Stock Price Tracker
          </h1>
        </div>
      </div>
      <p className="text-gray-300 text-lg">Real-time market data with intelligent rate limiting</p>
      <div className="flex items-center justify-center mt-4 gap-2">
        <Shield className="w-4 h-4 text-green-400" />
        <span className="text-sm text-green-400 font-medium">Protected by Spring Boot Rate Limiter</span>
      </div>
    </div>
  );
}