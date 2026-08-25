import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardCheck, CheckCircle, MessageCircle, Clock, UserPlus, UserCheck, Trash2, Check } from 'lucide-react';

const INITIAL_NOTIFICATIONS = [
  { id: 1, type: 'task_assigned', title: 'Task Assigned', description: 'You have been assigned to "Fix navigation bug"', time: '2 mins ago', read: false, icon: ClipboardCheck, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { id: 2, type: 'comment', title: 'New Comment', description: 'Sarah commented on your PR #142', time: '1 hour ago', read: false, icon: MessageCircle, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { id: 3, type: 'deadline', title: 'Approaching Deadline', description: 'Project "Alpha" is due in 2 days', time: '3 hours ago', read: true, icon: Clock, color: 'text-rose-400', bg: 'bg-rose-400/10' },
  { id: 4, type: 'task_completed', title: 'Task Completed', description: 'Evan completed "Design System Setup"', time: 'Yesterday', read: true, icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  { id: 5, type: 'member_joined', title: 'New Team Member', description: 'Alex joined your workspace "Frontend Devs"', time: 'Yesterday', read: true, icon: UserPlus, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
  { id: 6, type: 'invite_accepted', title: 'Invite Accepted', description: 'Dan accepted your invitation to join CodeSphere', time: 'Oct 12', read: true, icon: UserCheck, color: 'text-amber-400', bg: 'bg-amber-400/10' },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState('all');

  const handleMarkAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleDismiss = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    return true;
  });

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto min-h-screen text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
            Notifications
          </h1>
          <p className="text-gray-400 mt-1">Stay updated with your team's activities</p>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-[#1E293B] border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Notifications</option>
            <option value="unread">Unread Only</option>
          </select>
          <button 
            onClick={handleMarkAllAsRead}
            className="text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
          >
            Mark all as read
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence initial={false}>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif, index) => {
              const Icon = notif.icon;
              return (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-start p-4 rounded-xl border transition-all hover:bg-white/[0.07] ${
                    notif.read ? 'bg-white/5 border-white/5' : 'bg-white/[0.08] border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.1)]'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-4 ${notif.bg} ${notif.color}`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex justify-between items-start">
                      <h4 className={`text-base font-medium ${notif.read ? 'text-neutral-300' : 'text-white'}`}>
                        {notif.title}
                      </h4>
                      <div className="flex items-center space-x-3">
                        <span className="text-xs text-gray-400 whitespace-nowrap">{notif.time}</span>
                        <button 
                          onClick={() => handleDismiss(notif.id)}
                          className="text-gray-500 hover:text-rose-400 transition-colors p-1 rounded-md hover:bg-white/5"
                          title="Dismiss"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{notif.description}</p>
                    
                    {!notif.read && (
                      <div className="mt-3 flex space-x-2">
                        <button 
                          onClick={() => handleMarkAsRead(notif.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
                        >
                          <Check size={14} /> Mark as Read
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {!notif.read && (
                    <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full ml-4 mt-2 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></div>
                  )}
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-12 text-gray-500 bg-white/5 border border-white/5 rounded-2xl">
              No notifications to display.
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Notifications;
