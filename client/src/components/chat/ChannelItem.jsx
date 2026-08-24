import React from 'react';
import { Hash } from 'lucide-react';
import { motion } from 'framer-motion';

const ChannelItem = ({ channel, active, onClick }) => {
  return (
    <motion.div
      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
      className={`px-3 py-2 flex items-center justify-between cursor-pointer rounded-lg transition-colors mb-0.5 ${active ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-2">
        <Hash size={16} className={active ? 'text-indigo-400' : 'text-gray-500'} />
        <span className="text-sm font-medium">{channel.name}</span>
      </div>
      {channel.unread > 0 && (
        <div className="bg-white/10 text-xs px-2 py-0.5 rounded-full text-white font-medium">
          {channel.unread}
        </div>
      )}
    </motion.div>
  );
};

export default ChannelItem;
