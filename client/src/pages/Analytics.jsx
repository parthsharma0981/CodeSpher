import React from 'react';
import { motion } from 'framer-motion';
import { Download, TrendingUp, CheckCircle, Users, Briefcase } from 'lucide-react';

const Analytics = () => {
 return (
 <div className="p-6 md:p-8 max-w-7xl mx-auto text-black dark:text-white">
 {/* Header */}
 <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
 <div>
 <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-neutral-500">
 Analytics Overview
 </h1>
 <p className="text-gray-400 mt-1">Track your team's performance and productivity</p>
 </div>
 <div className="flex items-center space-x-3">
 <select className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-4 py-2 text-sm text-black dark:text-white focus:outline-none focus:border-indigo-500 appearance-none">
 <option>This Week</option>
 <option>This Month</option>
 <option>This Quarter</option>
 </select>
 <button className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 border border-neutral-200 dark:border-neutral-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors backdrop-blur-md">
 <Download size={16} />
 <span>Export</span>
 </button>
 </div>
 </div>

 {/* Stats Row */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
 {[
 { label: 'Tasks Completed', value: '148', trend: '+12%', icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
 { label: 'Productivity Score', value: '87%', trend: '+5%', icon: TrendingUp, color: 'text-neutral-600 dark:text-neutral-400', bg: 'bg-indigo-400/10' },
 { label: 'Team Members', value: '24', trend: '+3', icon: Users, color: 'text-neutral-500', bg: 'bg-cyan-400/10' },
 { label: 'Active Projects', value: '8', trend: '-1', icon: Briefcase, color: 'text-rose-400', bg: 'bg-rose-400/10' },
 ].map((stat, i) => {
 const Icon = stat.icon;
 const isPositive = stat.trend.startsWith('+');
 return (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: i * 0.1 }}
 key={i}
 className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors"
 >
 <div className="flex justify-between items-start mb-4">
 <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
 <Icon size={24} />
 </div>
 <span className={`text-sm font-medium px-2 py-1 rounded-full ${isPositive ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400' : 'bg-rose-500/20 text-rose-400'}`}>
 {stat.trend}
 </span>
 </div>
 <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
 <p className="text-sm text-gray-400 font-medium">{stat.label}</p>
 </motion.div>
 );
 })}
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
 {/* Chart 1: Tasks Over Time (CSS only) */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.4 }}
 className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 "
 >
 <h3 className="text-lg font-bold mb-6">Tasks Completed</h3>
 <div className="h-64 flex items-end justify-between gap-2">
 {[40, 65, 45, 80, 55, 90, 75].map((height, i) => (
 <div key={i} className="w-full flex flex-col items-center group">
 <div className="w-full relative h-48 bg-white/5 rounded-t-md overflow-hidden flex items-end">
 <motion.div
 initial={{ height: 0 }}
 animate={{ height: `${height}%` }}
 transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
 className="w-full bg-gradient-to-t from-indigo-600 to-neutral-500 rounded-t-md group-hover:opacity-80 transition-opacity relative"
 >
 <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">{height}</span>
 </motion.div>
 </div>
 <span className="text-xs text-gray-400 mt-3 font-medium">
 {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
 </span>
 </div>
 ))}
 </div>
 </motion.div>

 {/* Chart 2: Project Progress */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.5 }}
 className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 "
 >
 <h3 className="text-lg font-bold mb-6">Project Progress</h3>
 <div className="space-y-6">
 {[
 { name: 'Website Redesign', progress: 85, color: 'from-emerald-500 to-teal-400' },
 { name: 'Mobile App API', progress: 60, color: 'from-black to-purple-500' },
 { name: 'Marketing Campaign', progress: 35, color: 'from-rose-500 to-orange-400' },
 ].map((project, i) => (
 <div key={i}>
 <div className="flex justify-between mb-2">
 <span className="font-medium">{project.name}</span>
 <span className="text-gray-400 text-sm">{project.progress}%</span>
 </div>
 <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
 <motion.div
 initial={{ width: 0 }}
 animate={{ width: `${project.progress}%` }}
 transition={{ duration: 1, delay: 0.6 + (i * 0.2) }}
 className={`h-full bg-gradient-to-r ${project.color}`}
 />
 </div>
 </div>
 ))}
 </div>
 </motion.div>
 </div>

 {/* Leaderboard */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.6 }}
 className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden "
 >
 <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
 <h3 className="text-lg font-bold">Team Leaderboard</h3>
 </div>
 <div className="overflow-x-auto">
 <table className="w-full">
 <thead className="bg-white/[0.02] text-xs uppercase text-gray-400 font-medium">
 <tr>
 <th className="px-6 py-4 text-left">Rank</th>
 <th className="px-6 py-4 text-left">Member</th>
 <th className="px-6 py-4 text-center">Tasks</th>
 <th className="px-6 py-4 text-center">Score</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-white/5">
 {[
 { name: 'Alex Developer', avatar: 'https://i.pravatar.cc/150?u=1', tasks: 45, score: 98 },
 { name: 'Sarah Drasner', avatar: 'https://i.pravatar.cc/150?u=2', tasks: 42, score: 95 },
 { name: 'Evan You', avatar: 'https://i.pravatar.cc/150?u=3', tasks: 38, score: 91 },
 ].map((member, i) => (
 <tr key={i} className="hover:bg-white/[0.02] transition-colors">
 <td className="px-6 py-4 whitespace-nowrap">
 <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${i === 0 ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400' : i === 1 ? 'bg-gray-400/20 text-gray-300' : 'bg-amber-700/20 text-amber-600'}`}>
 #{i + 1}
 </span>
 </td>
 <td className="px-6 py-4 whitespace-nowrap">
 <div className="flex items-center space-x-3">
 <img src={member.avatar} alt="" className="w-10 h-10 rounded-full" />
 <span className="font-medium">{member.name}</span>
 </div>
 </td>
 <td className="px-6 py-4 whitespace-nowrap text-center font-medium">{member.tasks}</td>
 <td className="px-6 py-4 whitespace-nowrap text-center text-neutral-600 dark:text-neutral-400 font-bold">{member.score}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </motion.div>
 </div>
 );
};

export default Analytics;
