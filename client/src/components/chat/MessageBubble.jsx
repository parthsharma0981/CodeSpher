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
 <span className='text-sm font-medium text-black dark:text-white'>
 {message.sender}
 </span>
 <span className='text-xs text-gray-400'>{message.timestamp}</span>
 </div>
 )}
 <div
 className={`px-4 py-2 rounded-2xl ${isOwn ? 'bg-indigo-600 text-black dark:text-white rounded-tr-sm' : 'bg-white/10 text-gray-100 rounded-tl-sm border border-white/5 backdrop-blur-md'}`}
 >
 <p className='text-sm'>{message.content}</p>
 </div>
 {isOwn && (
 <div className='mt-1'>
 <span className='text-xs text-gray-400'>{message.timestamp}</span>
 </div>
 )}
 </div>
 </motion.div>
 );
};

export default MessageBubble;
