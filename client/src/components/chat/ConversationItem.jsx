import React from 'react';
import { motion } from 'framer-motion';

const ConversationItem = ({ user, active, onClick }) => {
  return (
    <motion.div
      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
      className={`p-3 flex items-center space-x-3 cursor-pointer rounded-xl transition-colors mb-1 ${active ? 'bg-white/10 border border-white/5' : 'hover:bg-white/5 border border-transparent'}`}
      onClick={onClick}
    >
      <div className="relative flex-shrink-0">
        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
        {user.online && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900"></div>
        )}
      </div>
      <div className="flex-1 min-w-0 overflow-hidden">
        <div className="flex justify-between items-baseline mb-0.5">
          <h4 className="text-sm font-medium text-white truncate">{user.name}</h4>
          <span className="text-xs text-gray-400">{user.time}</span>
        </div>
        <p className={`text-xs truncate ${user.unread ? 'text-white font-medium' : 'text-gray-400'}`}>
          {user.lastMessage}
        </p>
      </div>
      {user.unread > 0 && (
        <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
          {user.unread}
        </div>
      )}
    </motion.div>
  );
};

export default ConversationItem;
