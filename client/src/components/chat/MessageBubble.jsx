import React from 'react';
import { motion } from 'framer-motion';

const MessageBubble = ({ message, isOwn }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex w-full mb-4 ${isOwn ? 'justify-end' : 'justify-start'}`}
    >
      {!isOwn && (
        <div className='mr-3 flex-shrink-0'>
          <img
            src={message.avatar}
            alt={message.sender}
            className='w-8 h-8 rounded-full object-cover'
          />
        </div>
      )}
      <div
        className={`max-w-[70%] flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}
      >
        {!isOwn && (
          <div className='flex items-baseline space-x-2 mb-1'>
            <span className='text-sm font-semibold text-neutral-900 dark:text-white'>
              {message.sender}
            </span>
            <span className='text-xs text-neutral-400'>{message.timestamp}</span>
          </div>
        )}
        <div
          className={`px-4 py-2.5 rounded-2xl text-sm ${
            isOwn
              ? 'bg-black text-white dark:bg-white dark:text-black rounded-tr-sm shadow-sm'
              : 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white rounded-tl-sm border border-neutral-200 dark:border-neutral-700 shadow-sm'
          }`}
        >
          <p className='leading-relaxed'>{message.content}</p>
        </div>
        {isOwn && (
          <div className='mt-1'>
            <span className='text-xs text-neutral-400'>{message.timestamp}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MessageBubble;
