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
    <div className='p-4 bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-800'>
      <form
        onSubmit={handleSubmit}
        className='flex items-center space-x-2 bg-neutral-100 dark:bg-neutral-900 rounded-xl px-4 py-2 border border-neutral-200 dark:border-neutral-800'
      >
        <button
          type='button'
          className='p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors'
        >
          <Paperclip size={18} />
        </button>
        <input
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Type a message...'
          className='flex-1 bg-transparent border-none outline-none text-neutral-900 dark:text-white placeholder-neutral-400 py-1.5 px-2 text-sm focus:ring-0'
        />
        <button
          type='button'
          className='p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors'
        >
          <Smile size={18} />
        </button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type='submit'
          disabled={!text.trim()}
          className='p-2 bg-black text-white dark:bg-white dark:text-black rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-80 transition-all flex items-center justify-center'
        >
          <Send size={16} />
        </motion.button>
      </form>
    </div>
  );
};

export default ChatInput;
