// import React, { useState, useEffect } from 'react';
// import { Activity, Users, Settings, BarChart3, RefreshCw, Zap, Clock, TrendingUp, AlertCircle } from 'lucide-react';
// import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const RateLimiterDashboard = () => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [users, setUsers] = useState([
//     { id: 'john', requests: 45, limit: 100, lastRequest: '2s ago', status: 'active' },
//     { id: 'jane', requests: 89, limit: 100, lastRequest: '5s ago', status: 'active' },
//     { id: 'bob', requests: 100, limit: 100, lastRequest: '1s ago', status: 'limited' },
//     { id: 'alice', requests: 23, limit: 100, lastRequest: '10s ago', status: 'active' }
//   ]);
  
//   const [realtimeLogs, setRealtimeLogs] = useState([
//     { time: '14:23:45', userId: 'john', endpoint: '/test', status: 'success', ip: '192.168.1.1' },
//     { time: '14:23:44', userId: 'jane', endpoint: '/test', status: 'success', ip: '192.168.1.2' },
//     { time: '14:23:43', userId: 'bob', endpoint: '/test', status: 'blocked', ip: '192.168.1.3' },
//     { time: '14:23:42', userId: 'alice', endpoint: '/test', status: 'success', ip: '192.168.1.4' }
//   ]);

//   const [chartData, setChartData] = useState([
//     { time: '14:20', requests: 45, blocked: 5 },
//     { time: '14:21', requests: 52, blocked: 8 },
//     { time: '14:22', requests: 48, blocked: 3 },
//     { time: '14:23', requests: 67, blocked: 12 },
//     { time: '14:24', requests: 55, blocked: 7 }
//   ]);

//   const [policies, setPolicies] = useState([
//     { id: 1, name: 'Default Rate Limit', value: 100, window: '1 minute', enabled: true },
//     { id: 2, name: 'Premium Users', value: 500, window: '1 minute', enabled: true },
//     { id: 3, name: 'Anonymous Users', value: 20, window: '1 minute', enabled: true }
//   ]);

//   const [stats, setStats] = useState({
//     totalRequests: 1247,
//     blockedRequests: 89,
//     activeUsers: 42,
//     avgResponseTime: 23
//   });

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setUsers(prev => prev.map(user => {
//         if (Math.random() > 0.7) {
//           const newRequests = Math.min(user.requests + Math.floor(Math.random() * 3), user.limit);
//           return {
//             ...user,
//             requests: newRequests,
//             status: newRequests >= user.limit ? 'limited' : 'active',
//             lastRequest: 'just now'
//           };
//         }
//         return user;
//       }));

//       const randomUser = ['john', 'jane', 'bob', 'alice'][Math.floor(Math.random() * 4)];
//       const newLog = {
//         time: new Date().toLocaleTimeString(),
//         userId: randomUser,
//         endpoint: '/test',
//         status: Math.random() > 0.2 ? 'success' : 'blocked',
//         ip: `192.168.1.${Math.floor(Math.random() * 255)}`
//       };
//       setRealtimeLogs(prev => [newLog, ...prev].slice(0, 10));

//       setStats(prev => ({
//         totalRequests: prev.totalRequests + Math.floor(Math.random() * 5),
//         blockedRequests: prev.blockedRequests + (Math.random() > 0.8 ? 1 : 0),
//         activeUsers: prev.activeUsers + Math.floor(Math.random() * 3) - 1,
//         avgResponseTime: 20 + Math.floor(Math.random() * 10)
//       }));
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   const handleResetUser = (userId) => {
//     setUsers(prev => prev.map(user => 
//       user.id === userId ? { ...user, requests: 0, status: 'active' } : user
//     ));
//   };

//   const handleUpdateLimit = (userId, newLimit) => {
//     setUsers(prev => prev.map(user => 
//       user.id === userId ? { ...user, limit: parseInt(newLimit) } : user
//     ));
//   };

//   const handleTogglePolicy = (policyId) => {
//     setPolicies(prev => prev.map(policy =>
//       policy.id === policyId ? { ...policy, enabled: !policy.enabled } : policy
//     ));
//   };

//   return (
//     <div className="w-full min-h-screen" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}>
//       <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">
//         <div className="mb-6">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//             <div>
//               <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Rate Limiter Dashboard</h1>
//               <p className="text-sm" style={{ color: '#94a3b8' }}>Real-time monitoring and management</p>
//             </div>
//             <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
//               <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'rgb(74, 222, 128)' }}></div>
//               <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'rgb(134, 239, 172)' }}>Live</span>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
//             <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
//               <div className="flex items-start justify-between mb-3">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2 mb-1">
//                     <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#94a3b8' }}>Total Requests</span>
//                     <TrendingUp className="w-3.5 h-3.5" style={{ color: 'rgb(74, 222, 128)' }} />
//                   </div>
//                   <p className="text-2xl font-bold text-white">{stats.totalRequests.toLocaleString()}</p>
//                 </div>
//               </div>
//               <p className="text-xs font-medium" style={{ color: 'rgb(74, 222, 128)' }}>↑ 12% from last hour</p>
//             </div>

//             <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
//               <div className="flex items-start justify-between mb-3">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2 mb-1">
//                     <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#94a3b8' }}>Blocked Requests</span>
//                     <AlertCircle className="w-3.5 h-3.5" style={{ color: 'rgb(248, 113, 113)' }} />
//                   </div>
//                   <p className="text-2xl font-bold text-white">{stats.blockedRequests}</p>
//                 </div>
//               </div>
//               <p className="text-xs font-medium" style={{ color: 'rgb(248, 113, 113)' }}>{((stats.blockedRequests / stats.totalRequests) * 100).toFixed(1)}% block rate</p>
//             </div>

//             <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
//               <div className="flex items-start justify-between mb-3">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2 mb-1">
//                     <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#94a3b8' }}>Active Users</span>
//                     <Users className="w-3.5 h-3.5" style={{ color: 'rgb(96, 165, 250)' }} />
//                   </div>
//                   <p className="text-2xl font-bold text-white">{stats.activeUsers}</p>
//                 </div>
//               </div>
//               <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>Currently online</p>
//             </div>

//             <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
//               <div className="flex items-start justify-between mb-3">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2 mb-1">
//                     <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#94a3b8' }}>Avg Response Time</span>
//                     <Clock className="w-3.5 h-3.5" style={{ color: 'rgb(250, 204, 21)' }} />
//                   </div>
//                   <p className="text-2xl font-bold text-white">{stats.avgResponseTime}ms</p>
//                 </div>
//               </div>
//               <p className="text-xs font-medium" style={{ color: 'rgb(74, 222, 128)' }}>↓ 5ms improvement</p>
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-2 p-1.5 rounded-xl" style={{ backgroundColor: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
//             {[
//               { id: 'overview', label: 'Overview', icon: BarChart3 },
//               { id: 'users', label: 'Users', icon: Users },
//               { id: 'logs', label: 'Live Logs', icon: Activity },
//               { id: 'policies', label: 'Policies', icon: Settings }
//             ].map(tab => {
//               const Icon = tab.icon;
//               const isActive = activeTab === tab.id;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className="flex-1 min-w-max flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg transition-all text-sm font-semibold"
//                   style={{
//                     backgroundColor: isActive ? 'rgb(59, 130, 246)' : 'transparent',
//                     color: isActive ? 'white' : '#94a3b8',
//                     cursor: 'pointer',
//                     border: 'none'
//                   }}
//                 >
//                   <Icon className="w-4 h-4" />
//                   <span>{tab.label}</span>
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         <div>
//           {activeTab === 'overview' && (
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div className="rounded-xl p-5" style={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
//                 <h3 className="text-lg font-bold text-white mb-4">Request Timeline</h3>
//                 <ResponsiveContainer width="100%" height={280}>
//                   <LineChart data={chartData}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
//                     <XAxis dataKey="time" stroke="#94a3b8" style={{ fontSize: '12px' }} />
//                     <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
//                     <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '8px', fontSize: '12px' }} />
//                     <Legend wrapperStyle={{ fontSize: '12px' }} />
//                     <Line type="monotone" dataKey="requests" stroke="#3b82f6" strokeWidth={2} name="Requests" />
//                     <Line type="monotone" dataKey="blocked" stroke="#ef4444" strokeWidth={2} name="Blocked" />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>

//               <div className="rounded-xl p-5" style={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
//                 <h3 className="text-lg font-bold text-white mb-4">User Activity</h3>
//                 <ResponsiveContainer width="100%" height={280}>
//                   <BarChart data={users}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
//                     <XAxis dataKey="id" stroke="#94a3b8" style={{ fontSize: '12px' }} />
//                     <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
//                     <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '8px', fontSize: '12px' }} />
//                     <Bar dataKey="requests" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Requests" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           )}

//           {activeTab === 'users' && (
//             <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
//               <div className="p-4 sm:p-6" style={{ borderBottom: '1px solid rgba(148, 163, 184, 0.2)' }}>
//                 <h3 className="text-xl font-bold text-white">User Management</h3>
//                 <p className="text-sm mt-1" style={{ color: '#cbd5e1' }}>Monitor and control per-user rate limits</p>
//               </div>
              
//               <div className="hidden lg:block overflow-x-auto">
//                 <table className="w-full" style={{ minWidth: '800px' }}>
//                   <thead style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)' }}>
//                     <tr>
//                       <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap" style={{ color: '#cbd5e1' }}>User ID</th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap" style={{ color: '#cbd5e1' }}>Requests</th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap" style={{ color: '#cbd5e1' }}>Limit</th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap" style={{ color: '#cbd5e1' }}>Last Request</th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap" style={{ color: '#cbd5e1' }}>Status</th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap" style={{ color: '#cbd5e1' }}>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {users.map((user, idx) => (
//                       <tr key={user.id} style={{ borderBottom: idx < users.length - 1 ? '1px solid rgba(148, 163, 184, 0.2)' : 'none' }}>
//                         <td className="px-4 py-3">
//                           <span className="text-white font-medium">{user.id}</span>
//                         </td>
//                         <td className="px-4 py-3">
//                           <div className="flex items-center gap-2">
//                             <span className="text-white font-medium">{user.requests}</span>
//                             <div className="w-20 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(148, 163, 184, 0.2)' }}>
//                               <div 
//                                 className="h-full transition-all"
//                                 style={{ 
//                                   width: `${(user.requests / user.limit) * 100}%`,
//                                   backgroundColor: user.requests >= user.limit ? 'rgb(239, 68, 68)' : 'rgb(34, 197, 94)'
//                                 }}
//                               />
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-4 py-3">
//                           <input
//                             type="number"
//                             value={user.limit}
//                             onChange={(e) => handleUpdateLimit(user.id, e.target.value)}
//                             className="w-16 px-2 py-1 rounded text-white text-sm"
//                             style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(148, 163, 184, 0.3)' }}
//                           />
//                         </td>
//                         <td className="px-4 py-3 text-sm" style={{ color: '#cbd5e1' }}>{user.lastRequest}</td>
//                         <td className="px-4 py-3">
//                           <span 
//                             className="px-3 py-1 rounded-full text-xs font-medium inline-block"
//                             style={{
//                               backgroundColor: user.status === 'active' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
//                               color: user.status === 'active' ? 'rgb(134, 239, 172)' : 'rgb(252, 165, 165)'
//                             }}
//                           >
//                             {user.status}
//                           </span>
//                         </td>
//                         <td className="px-4 py-3">
//                           <button
//                             onClick={() => handleResetUser(user.id)}
//                             className="flex items-center gap-1 px-3 py-1 rounded text-sm text-white transition-all whitespace-nowrap"
//                             style={{ backgroundColor: 'rgb(59, 130, 246)', border: 'none', cursor: 'pointer' }}
//                           >
//                             <RefreshCw className="w-3 h-3" />
//                             Reset
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               <div className="lg:hidden p-4 space-y-4">
//                 {users.map((user) => (
//                   <div 
//                     key={user.id} 
//                     className="p-4 rounded-lg"
//                     style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(148, 163, 184, 0.2)' }}
//                   >
//                     <div className="flex items-center justify-between mb-3">
//                       <span className="text-white font-bold text-lg">{user.id}</span>
//                       <span 
//                         className="px-3 py-1 rounded-full text-xs font-medium"
//                         style={{
//                           backgroundColor: user.status === 'active' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
//                           color: user.status === 'active' ? 'rgb(134, 239, 172)' : 'rgb(252, 165, 165)'
//                         }}
//                       >
//                         {user.status}
//                       </span>
//                     </div>
                    
//                     <div className="space-y-3">
//                       <div>
//                         <span className="text-xs" style={{ color: '#cbd5e1' }}>Requests</span>
//                         <div className="flex items-center gap-2 mt-1">
//                           <span className="text-white font-medium">{user.requests} / {user.limit}</span>
//                           <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(148, 163, 184, 0.2)' }}>
//                             <div 
//                               className="h-full transition-all"
//                               style={{ 
//                                 width: `${(user.requests / user.limit) * 100}%`,
//                                 backgroundColor: user.requests >= user.limit ? 'rgb(239, 68, 68)' : 'rgb(34, 197, 94)'
//                               }}
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-2 gap-3">
//                         <div>
//                           <span className="text-xs block mb-1" style={{ color: '#cbd5e1' }}>Limit</span>
//                           <input
//                             type="number"
//                             value={user.limit}
//                             onChange={(e) => handleUpdateLimit(user.id, e.target.value)}
//                             className="w-full px-3 py-2 rounded text-white text-sm"
//                             style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(148, 163, 184, 0.3)' }}
//                           />
//                         </div>
//                         <div>
//                           <span className="text-xs block mb-1" style={{ color: '#cbd5e1' }}>Last Request</span>
//                           <span className="text-white text-sm block py-2">{user.lastRequest}</span>
//                         </div>
//                       </div>

//                       <button
//                         onClick={() => handleResetUser(user.id)}
//                         className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded text-sm text-white transition-all"
//                         style={{ backgroundColor: 'rgb(59, 130, 246)', border: 'none', cursor: 'pointer' }}
//                       >
//                         <RefreshCw className="w-4 h-4" />
//                         Reset Quota
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {activeTab === 'logs' && (
//             <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
//               <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ borderBottom: '1px solid rgba(148, 163, 184, 0.2)' }}>
//                 <div>
//                   <h3 className="text-xl font-bold text-white">Live Request Logs</h3>
//                   <p className="text-sm mt-1" style={{ color: '#cbd5e1' }}>Real-time API request monitoring</p>
//                 </div>
//                 <div className="flex items-center gap-2 px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)' }}>
//                   <Zap className="w-4 h-4" style={{ color: 'rgb(134, 239, 172)' }} />
//                   <span className="text-sm font-medium" style={{ color: 'rgb(134, 239, 172)' }}>Live Stream</span>
//                 </div>
//               </div>
//               <div className="p-4 sm:p-6 space-y-3 max-h-96 overflow-y-auto">
//                 {realtimeLogs.map((log, idx) => (
//                   <div 
//                     key={idx} 
//                     className="flex flex-wrap items-center gap-3 sm:gap-4 p-4 rounded-lg transition-all"
//                     style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(148, 163, 184, 0.2)' }}
//                   >
//                     <span className="text-sm font-mono" style={{ color: '#cbd5e1', minWidth: '80px' }}>{log.time}</span>
//                     <span className="text-white font-medium">{log.userId}</span>
//                     <span className="text-sm" style={{ color: '#cbd5e1' }}>{log.endpoint}</span>
//                     <span className="text-sm" style={{ color: '#cbd5e1' }}>{log.ip}</span>
//                     <span 
//                       className="ml-auto px-3 py-1 rounded-full text-xs font-medium"
//                       style={{
//                         backgroundColor: log.status === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
//                         color: log.status === 'success' ? 'rgb(134, 239, 172)' : 'rgb(252, 165, 165)'
//                       }}
//                     >
//                       {log.status}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {activeTab === 'policies' && (
//             <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
//               <div className="p-4 sm:p-6" style={{ borderBottom: '1px solid rgba(148, 163, 184, 0.2)' }}>
//                 <h3 className="text-xl font-bold text-white">Rate Limit Policies</h3>
//                 <p className="text-sm mt-1" style={{ color: '#cbd5e1' }}>Configure rate limiting rules</p>
//               </div>
//               <div className="p-4 sm:p-6 space-y-4">
//                 {policies.map(policy => (
//                   <div key={policy.id} className="p-6 rounded-xl transition-all" style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
//                     <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
//                       <div>
//                         <h4 className="text-lg font-bold text-white">{policy.name}</h4>
//                         <p className="text-sm mt-1" style={{ color: '#cbd5e1' }}>
//                           {policy.value} requests per {policy.window}
//                         </p>
//                       </div>
//                       <button
//                         onClick={() => handleTogglePolicy(policy.id)}
//                         className="px-4 py-2 rounded-lg font-medium transition-all"
//                         style={{
//                           backgroundColor: policy.enabled ? 'rgb(34, 197, 94)' : 'rgba(148, 163, 184, 0.2)',
//                           color: policy.enabled ? 'white' : '#cbd5e1',
//                           border: 'none',
//                           cursor: 'pointer'
//                         }}
//                       >
//                         {policy.enabled ? 'Enabled' : 'Disabled'}
//                       </button>
//                     </div>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div>
//                         <label className="text-sm mb-2 block" style={{ color: '#cbd5e1' }}>Request Limit</label>
//                         <input
//                           type="number"
//                           value={policy.value}
//                           className="w-full px-4 py-2 rounded-lg text-white"
//                           style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(148, 163, 184, 0.3)' }}
//                           onChange={(e) => {
//                             setPolicies(prev => prev.map(p =>
//                               p.id === policy.id ? { ...p, value: parseInt(e.target.value) } : p
//                             ));
//                           }}
//                         />
//                       </div>
//                       <div>
//                         <label className="text-sm mb-2 block" style={{ color: '#cbd5e1' }}>Time Window</label>
//                         <select
//                           value={policy.window}
//                           className="w-full px-4 py-2 rounded-lg text-white"
//                           style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(148, 163, 184, 0.3)' }}
//                           onChange={(e) => {
//                             setPolicies(prev => prev.map(p =>
//                               p.id === policy.id ? { ...p, window: e.target.value } : p
//                             ));
//                           }}
//                         >
//                           <option value="1 minute">1 minute</option>
//                           <option value="5 minutes">5 minutes</option>
//                           <option value="1 hour">1 hour</option>
//                           <option value="1 day">1 day</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RateLimiterDashboard;

// import React, { useState, useEffect } from 'react';
// import { Activity, Users, Settings, BarChart3, RefreshCw, Zap, Clock, TrendingUp, AlertCircle } from 'lucide-react';
// import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

// const RateLimiterDashboard = () => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [users, setUsers] = useState([]);
//   const [realtimeLogs, setRealtimeLogs] = useState([]);
//   const [policies, setPolicies] = useState([]);
//   const [stats, setStats] = useState({
//     totalRequests: 0,
//     blockedRequests: 0,
//     activeUsers: 0,
//     avgResponseTime: 0
//   });
//   const [chartData, setChartData] = useState([]);

//   // Fetch all data on component mount and set up polling
//   useEffect(() => {
//     fetchAllData();
    
//     // Poll every 3 seconds for real-time updates
//     const interval = setInterval(() => {
//       fetchAllData();
//     }, 3000);
    
//     return () => clearInterval(interval);
//   }, []);

//   // Fetch all data from backend
//   const fetchAllData = async () => {
//     await Promise.all([
//       fetchUsers(),
//       fetchLogs(),
//       fetchStats(),
//       fetchPolicies()
//     ]);
//   };

//   const fetchUsers = async () => {
//     try {
//       const res = await fetch(`${API_BASE}/admin/users`);
//       if (!res.ok) throw new Error('Failed to fetch users');
//       const data = await res.json();
      
//       // Transform backend data to match dashboard format
//       const transformedUsers = data.map(user => ({
//         id: user.userId,
//         requests: user.requests || 0,
//         limit: user.limit || 100,
//         lastRequest: user.resetInSec ? `${user.resetInSec}s ago` : 'N/A',
//         status: (user.remaining || 0) > 0 ? 'active' : 'limited'
//       }));
      
//       setUsers(transformedUsers);
//     } catch (err) {
//       console.error("Error fetching users:", err);
//     }
//   };

//   const fetchLogs = async () => {
//     try {
//       const res = await fetch(`${API_BASE}/admin/logs`);
//       if (!res.ok) throw new Error('Failed to fetch logs');
//       const data = await res.json();
      
//       // Transform backend logs
//       const transformedLogs = data.slice(0, 10).map(log => ({
//         time: log.timestamp || new Date().toLocaleTimeString(),
//         userId: log.userId,
//         endpoint: log.endpoint || '/test',
//         status: log.status === 200 ? 'success' : 'blocked',
//         ip: log.ip || 'N/A'
//       }));
      
//       setRealtimeLogs(transformedLogs);
//     } catch (err) {
//       console.error("Error fetching logs:", err);
//     }
//   };

//   const fetchStats = async () => {
//     try {
//       const res = await fetch(`${API_BASE}/admin/stats`);
//       if (!res.ok) throw new Error('Failed to fetch stats');
//       const data = await res.json();
      
//       setStats({
//         totalRequests: data.totalRequests || 0,
//         blockedRequests: data.blockedRequests || 0,
//         activeUsers: data.totalUsers || 0,
//         avgResponseTime: data.avgResponseTime || 0
//       });

//       // Update chart data for visualization
//       updateChartData(data);
//     } catch (err) {
//       console.error("Error fetching stats:", err);
//     }
//   };

//   const fetchPolicies = async () => {
//     try {
//       const res = await fetch(`${API_BASE}/admin/policies`);
//       if (!res.ok) throw new Error('Failed to fetch policies');
//       const data = await res.json();
      
//       const transformedPolicies = data.map((policy, idx) => ({
//         id: idx + 1,
//         name: policy.userId || `Policy ${idx + 1}`,
//         value: policy.limit || 100,
//         window: policy.window || '1 minute',
//         enabled: policy.enabled !== false
//       }));
      
//       setPolicies(transformedPolicies);
//     } catch (err) {
//       console.error("Error fetching policies:", err);
//     }
//   };

//   const updateChartData = (data) => {
//     const now = new Date();
//     const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
//     setChartData(prev => {
//       const newData = [...prev, {
//         time: timeStr,
//         requests: data.totalRequests || 0,
//         blocked: data.blockedRequests || 0
//       }];
      
//       // Keep only last 10 data points
//       return newData.slice(-10);
//     });
//   };

//   const handleResetUser = async (userId) => {
//     try {
//       const res = await fetch(`${API_BASE}/admin/users/${userId}/reset`, {
//         method: 'POST'
//       });
      
//       if (res.ok) {
//         alert('User quota reset successfully!');
//         fetchUsers();
//       } else {
//         alert('Failed to reset user quota');
//       }
//     } catch (err) {
//       console.error("Error resetting user:", err);
//       alert('Error resetting user quota');
//     }
//   };

//   const handleUpdateLimit = async (userId, newLimit) => {
//     try {
//       const res = await fetch(`${API_BASE}/admin/users/${userId}/limit`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ limit: parseInt(newLimit) })
//       });
      
//       if (res.ok) {
//         console.log('Limit updated successfully');
//         fetchUsers();
//       } else {
//         console.error('Failed to update limit');
//       }
//     } catch (err) {
//       console.error("Error updating limit:", err);
//     }
//   };

//   const handleTogglePolicy = async (policyId) => {
//     const policy = policies.find(p => p.id === policyId);
//     if (!policy) return;
    
//     try {
//       const res = await fetch(`${API_BASE}/admin/policies/${policy.name}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ...policy, enabled: !policy.enabled })
//       });
      
//       if (res.ok) {
//         setPolicies(prev => prev.map(p =>
//           p.id === policyId ? { ...p, enabled: !p.enabled } : p
//         ));
//       }
//     } catch (err) {
//       console.error("Error toggling policy:", err);
//     }
//   };

//   const handleUpdatePolicy = async (policyId, field, value) => {
//     const policy = policies.find(p => p.id === policyId);
//     if (!policy) return;
    
//     const updatedPolicy = { ...policy, [field]: value };
    
//     try {
//       const res = await fetch(`${API_BASE}/admin/policies/${policy.name}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updatedPolicy)
//       });
      
//       if (res.ok) {
//         setPolicies(prev => prev.map(p =>
//           p.id === policyId ? updatedPolicy : p
//         ));
//       }
//     } catch (err) {
//       console.error("Error updating policy:", err);
//     }
//   };

//   return (
//     <div className="w-full min-h-screen" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}>
//       <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">
//         <div className="mb-6">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
//             <div>
//               <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Rate Limiter Dashboard</h1>
//               <p className="text-sm" style={{ color: '#94a3b8' }}>Real-time monitoring and management</p>
//             </div>
//             <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
//               <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'rgb(74, 222, 128)' }}></div>
//               <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'rgb(134, 239, 172)' }}>Live</span>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
//             <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
//               <div className="flex items-start justify-between mb-3">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2 mb-1">
//                     <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#94a3b8' }}>Total Requests</span>
//                     <TrendingUp className="w-3.5 h-3.5" style={{ color: 'rgb(74, 222, 128)' }} />
//                   </div>
//                   <p className="text-2xl font-bold text-white">{stats.totalRequests.toLocaleString()}</p>
//                 </div>
//               </div>
//               <p className="text-xs font-medium" style={{ color: 'rgb(74, 222, 128)' }}>Real-time data</p>
//             </div>

//             <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
//               <div className="flex items-start justify-between mb-3">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2 mb-1">
//                     <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#94a3b8' }}>Blocked Requests</span>
//                     <AlertCircle className="w-3.5 h-3.5" style={{ color: 'rgb(248, 113, 113)' }} />
//                   </div>
//                   <p className="text-2xl font-bold text-white">{stats.blockedRequests}</p>
//                 </div>
//               </div>
//               <p className="text-xs font-medium" style={{ color: 'rgb(248, 113, 113)' }}>
//                 {stats.totalRequests > 0 ? ((stats.blockedRequests / stats.totalRequests) * 100).toFixed(1) : 0}% block rate
//               </p>
//             </div>

//             <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
//               <div className="flex items-start justify-between mb-3">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2 mb-1">
//                     <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#94a3b8' }}>Active Users</span>
//                     <Users className="w-3.5 h-3.5" style={{ color: 'rgb(96, 165, 250)' }} />
//                   </div>
//                   <p className="text-2xl font-bold text-white">{stats.activeUsers}</p>
//                 </div>
//               </div>
//               <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>Currently online</p>
//             </div>

//             <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
//               <div className="flex items-start justify-between mb-3">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2 mb-1">
//                     <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#94a3b8' }}>Avg Response Time</span>
//                     <Clock className="w-3.5 h-3.5" style={{ color: 'rgb(250, 204, 21)' }} />
//                   </div>
//                   <p className="text-2xl font-bold text-white">{stats.avgResponseTime}ms</p>
//                 </div>
//               </div>
//               <p className="text-xs font-medium" style={{ color: 'rgb(74, 222, 128)' }}>Performance</p>
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-2 p-1.5 rounded-xl" style={{ backgroundColor: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
//             {[
//               { id: 'overview', label: 'Overview', icon: BarChart3 },
//               { id: 'users', label: 'Users', icon: Users },
//               { id: 'logs', label: 'Live Logs', icon: Activity },
//               { id: 'policies', label: 'Policies', icon: Settings }
//             ].map(tab => {
//               const Icon = tab.icon;
//               const isActive = activeTab === tab.id;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className="flex-1 min-w-max flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg transition-all text-sm font-semibold"
//                   style={{
//                     backgroundColor: isActive ? 'rgb(59, 130, 246)' : 'transparent',
//                     color: isActive ? 'white' : '#94a3b8',
//                     cursor: 'pointer',
//                     border: 'none'
//                   }}
//                 >
//                   <Icon className="w-4 h-4" />
//                   <span>{tab.label}</span>
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         <div>
//           {activeTab === 'overview' && (
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div className="rounded-xl p-5" style={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
//                 <h3 className="text-lg font-bold text-white mb-4">Request Timeline</h3>
//                 {chartData.length > 0 ? (
//                   <ResponsiveContainer width="100%" height={280}>
//                     <LineChart data={chartData}>
//                       <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
//                       <XAxis dataKey="time" stroke="#94a3b8" style={{ fontSize: '12px' }} />
//                       <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
//                       <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '8px', fontSize: '12px' }} />
//                       <Legend wrapperStyle={{ fontSize: '12px' }} />
//                       <Line type="monotone" dataKey="requests" stroke="#3b82f6" strokeWidth={2} name="Requests" />
//                       <Line type="monotone" dataKey="blocked" stroke="#ef4444" strokeWidth={2} name="Blocked" />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 ) : (
//                   <div className="h-64 flex items-center justify-center text-gray-400">
//                     Loading chart data...
//                   </div>
//                 )}
//               </div>

//               <div className="rounded-xl p-5" style={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
//                 <h3 className="text-lg font-bold text-white mb-4">User Activity</h3>
//                 {users.length > 0 ? (
//                   <ResponsiveContainer width="100%" height={280}>
//                     <BarChart data={users}>
//                       <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
//                       <XAxis dataKey="id" stroke="#94a3b8" style={{ fontSize: '12px' }} />
//                       <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
//                       <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '8px', fontSize: '12px' }} />
//                       <Bar dataKey="requests" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Requests" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 ) : (
//                   <div className="h-64 flex items-center justify-center text-gray-400">
//                     No user data available
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {activeTab === 'users' && (
//             <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
//               <div className="p-4 sm:p-6" style={{ borderBottom: '1px solid rgba(148, 163, 184, 0.2)' }}>
//                 <h3 className="text-xl font-bold text-white">User Management</h3>
//                 <p className="text-sm mt-1" style={{ color: '#cbd5e1' }}>Monitor and control per-user rate limits</p>
//               </div>
              
//               <div className="hidden lg:block overflow-x-auto">
//                 <table className="w-full" style={{ minWidth: '800px' }}>
//                   <thead style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)' }}>
//                     <tr>
//                       <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap" style={{ color: '#cbd5e1' }}>User ID</th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap" style={{ color: '#cbd5e1' }}>Requests</th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap" style={{ color: '#cbd5e1' }}>Limit</th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap" style={{ color: '#cbd5e1' }}>Last Request</th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap" style={{ color: '#cbd5e1' }}>Status</th>
//                       <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap" style={{ color: '#cbd5e1' }}>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {users.length > 0 ? users.map((user, idx) => (
//                       <tr key={user.id} style={{ borderBottom: idx < users.length - 1 ? '1px solid rgba(148, 163, 184, 0.2)' : 'none' }}>
//                         <td className="px-4 py-3">
//                           <span className="text-white font-medium">{user.id}</span>
//                         </td>
//                         <td className="px-4 py-3">
//                           <div className="flex items-center gap-2">
//                             <span className="text-white font-medium">{user.requests}</span>
//                             <div className="w-20 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(148, 163, 184, 0.2)' }}>
//                               <div 
//                                 className="h-full transition-all"
//                                 style={{ 
//                                   width: `${(user.requests / user.limit) * 100}%`,
//                                   backgroundColor: user.requests >= user.limit ? 'rgb(239, 68, 68)' : 'rgb(34, 197, 94)'
//                                 }}
//                               />
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-4 py-3">
//                           <input
//                             type="number"
//                             value={user.limit}
//                             onChange={(e) => handleUpdateLimit(user.id, e.target.value)}
//                             className="w-16 px-2 py-1 rounded text-white text-sm"
//                             style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(148, 163, 184, 0.3)' }}
//                           />
//                         </td>
//                         <td className="px-4 py-3 text-sm" style={{ color: '#cbd5e1' }}>{user.lastRequest}</td>
//                         <td className="px-4 py-3">
//                           <span 
//                             className="px-3 py-1 rounded-full text-xs font-medium inline-block"
//                             style={{
//                               backgroundColor: user.status === 'active' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
//                               color: user.status === 'active' ? 'rgb(134, 239, 172)' : 'rgb(252, 165, 165)'
//                             }}
//                           >
//                             {user.status}
//                           </span>
//                         </td>
//                         <td className="px-4 py-3">
//                           <button
//                             onClick={() => handleResetUser(user.id)}
//                             className="flex items-center gap-1 px-3 py-1 rounded text-sm text-white transition-all whitespace-nowrap"
//                             style={{ backgroundColor: 'rgb(59, 130, 246)', border: 'none', cursor: 'pointer' }}
//                           >
//                             <RefreshCw className="w-3 h-3" />
//                             Reset
//                           </button>
//                         </td>
//                       </tr>
//                     )) : (
//                       <tr>
//                         <td colSpan="6" className="px-4 py-8 text-center text-gray-400">
//                           No users found. Make some API requests to see data.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>

//               <div className="lg:hidden p-4 space-y-4">
//                 {users.length > 0 ? users.map((user) => (
//                   <div 
//                     key={user.id} 
//                     className="p-4 rounded-lg"
//                     style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(148, 163, 184, 0.2)' }}
//                   >
//                     <div className="flex items-center justify-between mb-3">
//                       <span className="text-white font-bold text-lg">{user.id}</span>
//                       <span 
//                         className="px-3 py-1 rounded-full text-xs font-medium"
//                         style={{
//                           backgroundColor: user.status === 'active' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
//                           color: user.status === 'active' ? 'rgb(134, 239, 172)' : 'rgb(252, 165, 165)'
//                         }}
//                       >
//                         {user.status}
//                       </span>
//                     </div>
                    
//                     <div className="space-y-3">
//                       <div>
//                         <span className="text-xs" style={{ color: '#cbd5e1' }}>Requests</span>
//                         <div className="flex items-center gap-2 mt-1">
//                           <span className="text-white font-medium">{user.requests} / {user.limit}</span>
//                           <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(148, 163, 184, 0.2)' }}>
//                             <div 
//                               className="h-full transition-all"
//                               style={{ 
//                                 width: `${(user.requests / user.limit) * 100}%`,
//                                 backgroundColor: user.requests >= user.limit ? 'rgb(239, 68, 68)' : 'rgb(34, 197, 94)'
//                               }}
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-2 gap-3">
//                         <div>
//                           <span className="text-xs block mb-1" style={{ color: '#cbd5e1' }}>Limit</span>
//                           <input
//                             type="number"
//                             value={user.limit}
//                             onChange={(e) => handleUpdateLimit(user.id, e.target.value)}
//                             className="w-full px-3 py-2 rounded text-white text-sm"
//                             style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(148, 163, 184, 0.3)' }}
//                           />
//                         </div>
//                         <div>
//                           <span className="text-xs block mb-1" style={{ color: '#cbd5e1' }}>Last Request</span>
//                           <span className="text-white text-sm block py-2">{user.lastRequest}</span>
//                         </div>
//                       </div>

//                       <button
//                         onClick={() => handleResetUser(user.id)}
//                         className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded text-sm text-white transition-all"
//                         style={{ backgroundColor: 'rgb(59, 130, 246)', border: 'none', cursor: 'pointer' }}
//                       >
//                         <RefreshCw className="w-4 h-4" />
//                         Reset Quota
//                       </button>
//                     </div>
//                   </div>
//                 )) : (
//                   <div className="text-center py-8 text-gray-400">
//                     No users found
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {activeTab === 'logs' && (
//             <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
//               <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ borderBottom: '1px solid rgba(148, 163, 184, 0.2)' }}>
//                 <div>
//                   <h3 className="text-xl font-bold text-white">Live Request Logs</h3>
//                   <p className="text-sm mt-1" style={{ color: '#cbd5e1' }}>Real-time API request monitoring</p>
//                 </div>
//                 <div className="flex items-center gap-2 px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)' }}>
//                   <Zap className="w-4 h-4" style={{ color: 'rgb(134, 239, 172)' }} />
//                   <span className="text-sm font-medium" style={{ color: 'rgb(134, 239, 172)' }}>Live Stream</span>
//                 </div>
//               </div>
//               <div className="p-4 sm:p-6 space-y-3 max-h-96 overflow-y-auto">
//                 {realtimeLogs.length > 0 ? realtimeLogs.map((log, idx) => (
//                   <div 
//                     key={idx} 
//                     className="flex flex-wrap items-center gap-3 sm:gap-4 p-4 rounded-lg transition-all"
//                     style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(148, 163, 184, 0.2)' }}
//                   >
//                     <span className="text-sm font-mono" style={{ color: '#cbd5e1', minWidth: '80px' }}>{log.time}</span>
//                     <span className="text-white font-medium">{log.userId}</span>
//                     <span className="text-sm" style={{ color: '#cbd5e1' }}>{log.endpoint}</span>
//                     <span className="text-sm" style={{ color: '#cbd5e1' }}>{log.ip}</span>
//                     <span 
//                       className="ml-auto px-3 py-1 rounded-full text-xs font-medium"
//                       style={{
//                         backgroundColor: log.status === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
//                         color: log.status === 'success' ? 'rgb(134, 239, 172)' : 'rgb(252, 165, 165)'
//                       }}
//                     >
//                       {log.status}
//                     </span>
//                   </div>
//                 )) : (
//                   <div className="text-center py-8 text-gray-400">
//                     No logs available. Make some API requests to see logs.
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {activeTab === 'policies' && (
//             <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
//               <div className="p-4 sm:p-6" style={{ borderBottom: '1px solid rgba(148, 163, 184, 0.2)' }}>
//                 <h3 className="text-xl font-bold text-white">Rate Limit Policies</h3>
//                 <p className="text-sm mt-1" style={{ color: '#cbd5e1' }}>Configure rate limiting rules</p>
//               </div>
//               <div className="p-4 sm:p-6 space-y-4">
//                 {policies.length > 0 ? policies.map(policy => (
//                   <div key={policy.id} className="p-6 rounded-xl transition-all" style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
//                     <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
//                       <div>
//                         <h4 className="text-lg font-bold text-white">{policy.name}</h4>
//                         <p className="text-sm mt-1" style={{ color: '#cbd5e1' }}>
//                           {policy.value} requests per {policy.window}
//                         </p>
//                       </div>
//                       <button
//                         onClick={() => handleTogglePolicy(policy.id)}
//                         className="px-4 py-2 rounded-lg font-medium transition-all"
//                         style={{
//                           backgroundColor: policy.enabled ? 'rgb(34, 197, 94)' : 'rgba(148, 163, 184, 0.2)',
//                           color: policy.enabled ? 'white' : '#cbd5e1',
//                           border: 'none',
//                           cursor: 'pointer'
//                         }}
//                       >
//                         {policy.enabled ? 'Enabled' : 'Disabled'}
//                       </button>
//                     </div>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <div>
//                         <label className="text-sm mb-2 block" style={{ color: '#cbd5e1' }}>Request Limit</label>
//                         <input
//                           type="number"
//                           value={policy.value}
//                           className="w-full px-4 py-2 rounded-lg text-white"
//                           style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(148, 163, 184, 0.3)' }}
//                           onChange={(e) => handleUpdatePolicy(policy.id, 'value', parseInt(e.target.value))}
//                         />
//                       </div>
//                       <div>
//                         <label className="text-sm mb-2 block" style={{ color: '#cbd5e1' }}>Time Window</label>
//                         <select
//                           value={policy.window}
//                           className="w-full px-4 py-2 rounded-lg text-white"
//                           style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(148, 163, 184, 0.3)' }}
//                           onChange={(e) => handleUpdatePolicy(policy.id, 'window', e.target.value)}
//                         >
//                           <option value="1 minute">1 minute</option>
//                           <option value="5 minutes">5 minutes</option>
//                           <option value="1 hour">1 hour</option>
//                           <option value="1 day">1 day</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                 )) : (
//                   <div className="text-center py-8 text-gray-400">
//                     No policies configured
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RateLimiterDashboard;



import React, { useState, useEffect } from 'react';
import { Activity, Users, Settings, BarChart3, RefreshCw, Zap, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const API_BASE = "http://localhost:8080";

const RateLimiterDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [realtimeLogs, setRealtimeLogs] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [stats, setStats] = useState({
    totalRequests: 0,
    blockedRequests: 0,
    activeUsers: 0,
    avgResponseTime: 0
  });
  const [chartData, setChartData] = useState([]);

  // Fetch all data on component mount and set up polling
  useEffect(() => {
    fetchAllData();
    
    // Poll every 3 seconds for real-time updates
    const interval = setInterval(() => {
      fetchAllData();
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Fetch all data from backend
  const fetchAllData = async () => {
    await Promise.all([
      fetchUsers(),
      fetchLogs(),
      fetchStats(),
      fetchPolicies()
    ]);
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/users`);
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      
      // Transform backend data to match dashboard format
      const transformedUsers = data.map(user => ({
        id: user.userId,
        requests: user.requests || 0,
        limit: user.limit || 10,
        lastRequest: user.lastRequest || 'N/A',
        status: user.status || 'active',
        blocked: user.blocked || 0,
        resetInSec: user.resetInSec || 60
      }));
      
      setUsers(transformedUsers);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/logs`);
      if (!res.ok) throw new Error('Failed to fetch logs');
      const data = await res.json();
      
      // Transform backend logs
      const transformedLogs = data.slice(0, 10).map(log => ({
        time: log.timestamp ? new Date(log.timestamp).toLocaleTimeString() : new Date().toLocaleTimeString(),
        userId: log.userId,
        endpoint: log.endpoint || '/test',
        status: log.status === 200 ? 'success' : 'blocked',
        ip: log.ip || 'N/A'
      }));
      
      setRealtimeLogs(transformedLogs);
    } catch (err) {
      console.error("Error fetching logs:", err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/stats`);
      if (!res.ok) throw new Error('Failed to fetch stats');
      const data = await res.json();
      
      setStats({
        totalRequests: data.totalRequests || 0,
        blockedRequests: data.blockedRequests || 0,
        activeUsers: data.totalUsers || 0,
        avgResponseTime: data.avgResponseTime || 23
      });

      // Update chart data for visualization
      updateChartData(data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const fetchPolicies = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/policies`);
      if (!res.ok) throw new Error('Failed to fetch policies');
      const data = await res.json();
      
      const transformedPolicies = data.map((policy, idx) => ({
        id: idx + 1,
        name: policy.userId,
        value: policy.limit,
        window: '1 minute',
        enabled: true
      }));
      
      setPolicies(transformedPolicies);
    } catch (err) {
      console.error("Error fetching policies:", err);
    }
  };

  const updateChartData = (data) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    setChartData(prev => {
      const newData = [...prev, {
        time: timeStr,
        requests: data.totalRequests || 0,
        blocked: data.blockedRequests || 0
      }];
      
      // Keep only last 10 data points
      return newData.slice(-10);
    });
  };

  const handleResetUser = async (userId) => {
    try {
      const res = await fetch(`${API_BASE}/admin/users/${userId}/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (res.ok) {
        const message = await res.text();
        alert(message);
        fetchUsers();
        fetchStats();
      } else {
        const errorText = await res.text();
        alert(`Failed to reset: ${errorText}`);
      }
    } catch (err) {
      console.error("Error resetting user:", err);
      alert('Error: Make sure backend is running at ' + API_BASE);
    }
  };

  const handleUpdateLimit = async (userId, newLimit) => {
    const limit = parseInt(newLimit);
    if (isNaN(limit) || limit < 1) {
      alert('Please enter a valid limit (minimum 1)');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/admin/policies/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userId, limit: limit })
      });
      
      if (res.ok) {
        console.log(`Limit updated for ${userId}: ${limit}`);
        fetchUsers();
        fetchPolicies();
      } else {
        const errorText = await res.text();
        console.error('Failed to update limit:', errorText);
      }
    } catch (err) {
      console.error("Error updating limit:", err);
    }
  };

  const handleTogglePolicy = async (policyId) => {
    const policy = policies.find(p => p.id === policyId);
    if (!policy) return;
    
    // For now, just toggle in frontend since backend doesn't have enabled field
    setPolicies(prev => prev.map(p =>
      p.id === policyId ? { ...p, enabled: !p.enabled } : p
    ));
  };

  const handleUpdatePolicy = async (policyId, field, value) => {
    const policy = policies.find(p => p.id === policyId);
    if (!policy) return;
    
    if (field === 'value') {
      // Update limit via PUT /admin/policies/{userId}
      try {
        const res = await fetch(`${API_BASE}/admin/policies/${policy.name}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: policy.name, limit: parseInt(value) })
        });
        
        if (res.ok) {
          setPolicies(prev => prev.map(p =>
            p.id === policyId ? { ...p, value: parseInt(value) } : p
          ));
          fetchUsers();
        }
      } catch (err) {
        console.error("Error updating policy:", err);
      }
    } else {
      // Just update locally for window changes
      setPolicies(prev => prev.map(p =>
        p.id === policyId ? { ...p, [field]: value } : p
      ));
    }
  };

  return (
    <div className="w-full min-h-screen" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}>
      <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Rate Limiter Dashboard</h1>
              <p className="text-sm" style={{ color: '#94a3b8' }}>Real-time monitoring and management</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'rgb(74, 222, 128)' }}></div>
              <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'rgb(134, 239, 172)' }}>Live</span>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#94a3b8' }}>Total Requests</span>
                    <TrendingUp className="w-3.5 h-3.5" style={{ color: 'rgb(74, 222, 128)' }} />
                  </div>
                  <p className="text-2xl font-bold text-white">{stats.totalRequests.toLocaleString()}</p>
                </div>
              </div>
              <p className="text-xs font-medium" style={{ color: 'rgb(74, 222, 128)' }}>Real-time data</p>
            </div>

            <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#94a3b8' }}>Blocked Requests</span>
                    <AlertCircle className="w-3.5 h-3.5" style={{ color: 'rgb(248, 113, 113)' }} />
                  </div>
                  <p className="text-2xl font-bold text-white">{stats.blockedRequests}</p>
                </div>
              </div>
              <p className="text-xs font-medium" style={{ color: 'rgb(248, 113, 113)' }}>
                {stats.totalRequests > 0 ? ((stats.blockedRequests / stats.totalRequests) * 100).toFixed(1) : 0}% block rate
              </p>
            </div>

            <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#94a3b8' }}>Active Users</span>
                    <Users className="w-3.5 h-3.5" style={{ color: 'rgb(96, 165, 250)' }} />
                  </div>
                  <p className="text-2xl font-bold text-white">{stats.activeUsers}</p>
                </div>
              </div>
              <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>Currently online</p>
            </div>

            <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#94a3b8' }}>Avg Response Time</span>
                    <Clock className="w-3.5 h-3.5" style={{ color: 'rgb(250, 204, 21)' }} />
                  </div>
                  <p className="text-2xl font-bold text-white">{stats.avgResponseTime}ms</p>
                </div>
              </div>
              <p className="text-xs font-medium" style={{ color: 'rgb(74, 222, 128)' }}>Performance</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 p-1.5 rounded-xl" style={{ backgroundColor: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'logs', label: 'Live Logs', icon: Activity },
              { id: 'policies', label: 'Policies', icon: Settings }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex-1 min-w-max flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg transition-all text-sm font-semibold"
                  style={{
                    backgroundColor: isActive ? 'rgb(59, 130, 246)' : 'transparent',
                    color: isActive ? 'white' : '#94a3b8',
                    cursor: 'pointer',
                    border: 'none'
                  }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-xl p-5" style={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
                <h3 className="text-lg font-bold text-white mb-4">Request Timeline</h3>
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                      <XAxis dataKey="time" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '8px', fontSize: '12px' }} />
                      <Legend wrapperStyle={{ fontSize: '12px' }} />
                      <Line type="monotone" dataKey="requests" stroke="#3b82f6" strokeWidth={2} name="Requests" />
                      <Line type="monotone" dataKey="blocked" stroke="#ef4444" strokeWidth={2} name="Blocked" />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    Loading chart data...
                  </div>
                )}
              </div>

              <div className="rounded-xl p-5" style={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
                <h3 className="text-lg font-bold text-white mb-4">User Activity</h3>
                {users.length > 0 ? (
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={users}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                      <XAxis dataKey="id" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '8px', fontSize: '12px' }} />
                      <Bar dataKey="requests" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Requests" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    No user data available
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
              <div className="p-4 sm:p-6" style={{ borderBottom: '1px solid rgba(148, 163, 184, 0.2)' }}>
                <h3 className="text-xl font-bold text-white">User Management</h3>
                <p className="text-sm mt-1" style={{ color: '#cbd5e1' }}>Monitor and control per-user rate limits</p>
              </div>
              
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full" style={{ minWidth: '800px' }}>
                  <thead style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)' }}>
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap" style={{ color: '#cbd5e1' }}>User ID</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap" style={{ color: '#cbd5e1' }}>Requests</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap" style={{ color: '#cbd5e1' }}>Limit</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap" style={{ color: '#cbd5e1' }}>Last Request</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap" style={{ color: '#cbd5e1' }}>Status</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap" style={{ color: '#cbd5e1' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? users.map((user, idx) => (
                      <tr key={user.id} style={{ borderBottom: idx < users.length - 1 ? '1px solid rgba(148, 163, 184, 0.2)' : 'none' }}>
                        <td className="px-4 py-3">
                          <span className="text-white font-medium">{user.id}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{user.requests}</span>
                            <div className="w-20 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(148, 163, 184, 0.2)' }}>
                              <div 
                                className="h-full transition-all"
                                style={{ 
                                  width: `${(user.requests / user.limit) * 100}%`,
                                  backgroundColor: user.requests >= user.limit ? 'rgb(239, 68, 68)' : 'rgb(34, 197, 94)'
                                }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            value={user.limit}
                            onChange={(e) => handleUpdateLimit(user.id, e.target.value)}
                            className="w-16 px-2 py-1 rounded text-white text-sm"
                            style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(148, 163, 184, 0.3)' }}
                          />
                        </td>
                        <td className="px-4 py-3 text-sm" style={{ color: '#cbd5e1' }}>{user.lastRequest}</td>
                        <td className="px-4 py-3">
                          <span 
                            className="px-3 py-1 rounded-full text-xs font-medium inline-block"
                            style={{
                              backgroundColor: user.status === 'active' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                              color: user.status === 'active' ? 'rgb(134, 239, 172)' : 'rgb(252, 165, 165)'
                            }}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleResetUser(user.id)}
                            className="flex items-center gap-1 px-3 py-1 rounded text-sm text-white transition-all whitespace-nowrap"
                            style={{ backgroundColor: 'rgb(59, 130, 246)', border: 'none', cursor: 'pointer' }}
                          >
                            <RefreshCw className="w-3 h-3" />
                            Reset
                          </button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="6" className="px-4 py-8 text-center text-gray-400">
                          No users found. Make some API requests to see data.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="lg:hidden p-4 space-y-4">
                {users.length > 0 ? users.map((user) => (
                  <div 
                    key={user.id} 
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(148, 163, 184, 0.2)' }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white font-bold text-lg">{user.id}</span>
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: user.status === 'active' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                          color: user.status === 'active' ? 'rgb(134, 239, 172)' : 'rgb(252, 165, 165)'
                        }}
                      >
                        {user.status}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs" style={{ color: '#cbd5e1' }}>Requests</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-white font-medium">{user.requests} / {user.limit}</span>
                          <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(148, 163, 184, 0.2)' }}>
                            <div 
                              className="h-full transition-all"
                              style={{ 
                                width: `${(user.requests / user.limit) * 100}%`,
                                backgroundColor: user.requests >= user.limit ? 'rgb(239, 68, 68)' : 'rgb(34, 197, 94)'
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <span className="text-xs block mb-1" style={{ color: '#cbd5e1' }}>Limit</span>
                          <input
                            type="number"
                            value={user.limit}
                            onChange={(e) => handleUpdateLimit(user.id, e.target.value)}
                            className="w-full px-3 py-2 rounded text-white text-sm"
                            style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(148, 163, 184, 0.3)' }}
                          />
                        </div>
                        <div>
                          <span className="text-xs block mb-1" style={{ color: '#cbd5e1' }}>Last Request</span>
                          <span className="text-white text-sm block py-2">{user.lastRequest}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleResetUser(user.id)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded text-sm text-white transition-all"
                        style={{ backgroundColor: 'rgb(59, 130, 246)', border: 'none', cursor: 'pointer' }}
                      >
                        <RefreshCw className="w-4 h-4" />
                        Reset Quota
                      </button>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8 text-gray-400">
                    No users found
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
              <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ borderBottom: '1px solid rgba(148, 163, 184, 0.2)' }}>
                <div>
                  <h3 className="text-xl font-bold text-white">Live Request Logs</h3>
                  <p className="text-sm mt-1" style={{ color: '#cbd5e1' }}>Real-time API request monitoring</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)' }}>
                  <Zap className="w-4 h-4" style={{ color: 'rgb(134, 239, 172)' }} />
                  <span className="text-sm font-medium" style={{ color: 'rgb(134, 239, 172)' }}>Live Stream</span>
                </div>
              </div>
              <div className="p-4 sm:p-6 space-y-3 max-h-96 overflow-y-auto">
                {realtimeLogs.length > 0 ? realtimeLogs.map((log, idx) => (
                  <div 
                    key={idx} 
                    className="flex flex-wrap items-center gap-3 sm:gap-4 p-4 rounded-lg transition-all"
                    style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(148, 163, 184, 0.2)' }}
                  >
                    <span className="text-sm font-mono" style={{ color: '#cbd5e1', minWidth: '80px' }}>{log.time}</span>
                    <span className="text-white font-medium">{log.userId}</span>
                    <span className="text-sm" style={{ color: '#cbd5e1' }}>{log.endpoint}</span>
                    <span className="text-sm" style={{ color: '#cbd5e1' }}>{log.ip}</span>
                    <span 
                      className="ml-auto px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: log.status === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                        color: log.status === 'success' ? 'rgb(134, 239, 172)' : 'rgb(252, 165, 165)'
                      }}
                    >
                      {log.status}
                    </span>
                  </div>
                )) : (
                  <div className="text-center py-8 text-gray-400">
                    No logs available. Make some API requests to see logs.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'policies' && (
            <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
              <div className="p-4 sm:p-6" style={{ borderBottom: '1px solid rgba(148, 163, 184, 0.2)' }}>
                <h3 className="text-xl font-bold text-white">Rate Limit Policies</h3>
                <p className="text-sm mt-1" style={{ color: '#cbd5e1' }}>Configure rate limiting rules</p>
              </div>
              <div className="p-4 sm:p-6 space-y-4">
                {policies.length > 0 ? policies.map(policy => (
                  <div key={policy.id} className="p-6 rounded-xl transition-all" style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-white">{policy.name}</h4>
                        <p className="text-sm mt-1" style={{ color: '#cbd5e1' }}>
                          {policy.value} requests per {policy.window}
                        </p>
                      </div>
                      <button
                        onClick={() => handleTogglePolicy(policy.id)}
                        className="px-4 py-2 rounded-lg font-medium transition-all"
                        style={{
                          backgroundColor: policy.enabled ? 'rgb(34, 197, 94)' : 'rgba(148, 163, 184, 0.2)',
                          color: policy.enabled ? 'white' : '#cbd5e1',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        {policy.enabled ? 'Enabled' : 'Disabled'}
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm mb-2 block" style={{ color: '#cbd5e1' }}>Request Limit</label>
                        <input
                          type="number"
                          value={policy.value}
                          className="w-full px-4 py-2 rounded-lg text-white"
                          style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(148, 163, 184, 0.3)' }}
                          onChange={(e) => handleUpdatePolicy(policy.id, 'value', parseInt(e.target.value))}
                        />
                      </div>
                      <div>
                        <label className="text-sm mb-2 block" style={{ color: '#cbd5e1' }}>Time Window</label>
                        <select
                          value={policy.window}
                          className="w-full px-4 py-2 rounded-lg text-white"
                          style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(148, 163, 184, 0.3)' }}
                          onChange={(e) => handleUpdatePolicy(policy.id, 'window', e.target.value)}
                        >
                          <option value="1 minute">1 minute</option>
                          <option value="5 minutes">5 minutes</option>
                          <option value="1 hour">1 hour</option>
                          <option value="1 day">1 day</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8 text-gray-400">
                    No policies configured
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RateLimiterDashboard;