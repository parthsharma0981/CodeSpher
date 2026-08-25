import React from 'react';
import { Hash } from 'lucide-react';
import { motion } from 'framer-motion';

const ChannelItem = ({ channel, active, onClick }) => {
  return (
    <motion.div
      className={`px-3 py-2 flex items-center justify-between cursor-pointer rounded-xl transition-all mb-1 ${
        active
          ? 'bg-black text-white dark:bg-white dark:text-black font-semibold shadow-sm'
          : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white'
      }`}
      onClick={onClick}
    >
      <div className='flex items-center space-x-2'>
        <Hash
          size={16}
          className={active ? 'text-white dark:text-black' : 'text-neutral-400'}
        />
        <span className='text-sm'>{channel.name}</span>
      </div>
      {channel.unread > 0 && (
        <div
          className={`text-xs px-2 py-0.5 rounded-full font-bold ${
            active
              ? 'bg-white/20 text-white dark:bg-black/20 dark:text-black'
              : 'bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200'
          }`}
        >
          {channel.unread}
        </div>
      )}
    </motion.div>
  );
};

export default ChannelItem;
