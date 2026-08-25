import React from 'react';
import { motion } from 'framer-motion';

const ConversationItem = ({ user, active, onClick }) => {
  return (
    <motion.div
      className={`p-3 flex items-center space-x-3 cursor-pointer rounded-xl transition-all mb-1 ${
        active
          ? 'bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700'
          : 'hover:bg-neutral-50 dark:hover:bg-neutral-900 border border-transparent'
      }`}
      onClick={onClick}
    >
      <div className='relative flex-shrink-0'>
        <img
          src={user.avatar}
          alt={user.name}
          className='w-10 h-10 rounded-full object-cover ring-1 ring-neutral-200 dark:ring-neutral-700'
        />
        {user.online && (
          <div className='absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-neutral-900'></div>
        )}
      </div>
      <div className='flex-1 min-w-0 overflow-hidden'>
        <div className='flex justify-between items-baseline mb-0.5'>
          <h4 className='text-sm font-semibold text-neutral-900 dark:text-white truncate'>
            {user.name}
          </h4>
          <span className='text-xs text-neutral-400'>{user.time}</span>
        </div>
        <p
          className={`text-xs truncate ${
            user.unread
              ? 'text-neutral-900 dark:text-white font-medium'
              : 'text-neutral-500'
          }`}
        >
          {user.lastMessage}
        </p>
      </div>
      {user.unread > 0 && (
        <div className='w-5 h-5 bg-black text-white dark:bg-white dark:text-black rounded-full flex items-center justify-center text-[10px] font-bold'>
          {user.unread}
        </div>
      )}
    </motion.div>
  );
};

export default ConversationItem;
