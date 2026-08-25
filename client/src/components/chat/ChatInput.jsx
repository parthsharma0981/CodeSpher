import React, { useState } from 'react';
import { Smile, Paperclip, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const ChatInput = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <div className='p-4 bg-neutral-900 border-t border-white/10'>
      <form
        onSubmit={handleSubmit}
        className='flex items-center space-x-2 bg-white/5 rounded-full px-4 py-2 border border-white/10 backdrop-blur-md'
      >
        <button
          type='button'
          className='p-2 text-gray-400 hover:text-indigo-400 transition-colors'
        >
          <Paperclip size={20} />
        </button>
        <input
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Type a message...'
          className='flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500 py-2 px-2'
        />
        <button
          type='button'
          className='p-2 text-gray-400 hover:text-indigo-400 transition-colors'
        >
          <Smile size={20} />
        </button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type='submit'
          disabled={!text.trim()}
          className='p-2 bg-indigo-600 rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-500 transition-colors'
        >
          <Send size={18} className='ml-0.5' />
        </motion.button>
      </form>
    </div>
  );
};

export default ChatInput;
