import React, { useState, useRef, useEffect } from 'react';
import { Smile, Paperclip, Send, X, FileText, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EMOJIS = ['👍', '❤️', '🔥', '🚀', '🎉', '😂', '👀', '✨', '💯', '✅', '👏', '🙏'];

const ChatInput = ({ onSend, placeholder = 'Type a message...' }) => {
  const [text, setText] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const fileInputRef = useRef(null);
  const emojiRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setShowEmojis(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const isImg = file.type.startsWith('image/');
      setAttachment({
        name: file.name,
        size: (file.size / 1024).toFixed(0) + ' KB',
        isImage: isImg,
        url: isImg ? URL.createObjectURL(file) : undefined,
      });
    }
  };

  const handleEmojiSelect = (emoji) => {
    setText((prev) => prev + emoji);
    setShowEmojis(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() || attachment) {
      onSend(text, attachment);
      setText('');
      setAttachment(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className='p-4 bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-800 relative'>
      {/* Emoji Picker Popover */}
      <AnimatePresence>
        {showEmojis && (
          <motion.div
            ref={emojiRef}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className='absolute bottom-20 left-12 z-30 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-3 shadow-xl grid grid-cols-6 gap-2'
          >
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type='button'
                onClick={() => handleEmojiSelect(emoji)}
                className='text-xl p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-transform hover:scale-125'
              >
                {emoji}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <form
        onSubmit={handleSubmit}
        className='flex flex-col bg-neutral-100 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden'
      >
        {/* Attachment preview preview pill */}
        {attachment && (
          <div className='px-4 pt-3 flex items-center gap-2'>
            <div className='flex items-center gap-2 bg-white dark:bg-neutral-800 px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs shadow-sm'>
              {attachment.isImage ? (
                <ImageIcon className='w-4 h-4 text-emerald-500' />
              ) : (
                <FileText className='w-4 h-4 text-indigo-500' />
              )}
              <span className='font-medium text-neutral-900 dark:text-white truncate max-w-[200px]'>
                {attachment.name}
              </span>
              <span className='text-neutral-400'>({attachment.size})</span>
              <button
                type='button'
                onClick={() => setAttachment(null)}
                className='text-neutral-400 hover:text-red-500 ml-1'
              >
                <X size={14} />
              </button>
            </div>
          </div>
        )}

        <div className='flex items-center px-3 py-2'>
          <input
            type='file'
            ref={fileInputRef}
            onChange={handleFileChange}
            className='hidden'
          />

          <button
            type='button'
            onClick={() => fileInputRef.current?.click()}
            title='Attach file or image'
            className='p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer'
          >
            <Paperclip size={18} />
          </button>

          <input
            type='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholder}
            className='flex-1 bg-transparent border-none outline-none text-neutral-900 dark:text-white placeholder-neutral-400 py-2 px-3 text-sm focus:ring-0'
          />

          <button
            type='button'
            onClick={() => setShowEmojis((prev) => !prev)}
            title='Add emoji'
            className='p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer mr-1'
          >
            <Smile size={18} />
          </button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type='submit'
            disabled={!text.trim() && !attachment}
            className='p-2.5 bg-black text-white dark:bg-white dark:text-black rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-85 transition-all flex items-center justify-center cursor-pointer shadow-sm'
          >
            <Send size={16} />
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
