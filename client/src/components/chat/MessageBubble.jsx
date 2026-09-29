import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Heart, ThumbsUp } from 'lucide-react';

const MessageBubble = ({ message, isOwn }) => {
  const [reaction, setReaction] = useState(message.reaction || null);

  const toggleReaction = (type) => {
    setReaction((prev) => (prev === type ? null : type));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex w-full mb-4 group ${isOwn ? 'justify-end' : 'justify-start'}`}
    >
      {!isOwn && (
        <div className='mr-3 flex-shrink-0'>
          <img
            src={message.avatar}
            alt={message.sender}
            className='w-8 h-8 rounded-full object-cover ring-1 ring-neutral-200 dark:ring-neutral-800'
          />
        </div>
      )}
      <div
        className={`max-w-[75%] sm:max-w-[65%] flex flex-col relative ${
          isOwn ? 'items-end' : 'items-start'
        }`}
      >
        {!isOwn && (
          <div className='flex items-baseline space-x-2 mb-1 px-1'>
            <span className='text-xs font-semibold text-neutral-900 dark:text-white'>
              {message.sender}
            </span>
            <span className='text-[10px] text-neutral-400'>{message.timestamp}</span>
          </div>
        )}

        {/* Message Bubble Body */}
        <div
          className={`px-4 py-2.5 rounded-2xl text-sm relative ${
            isOwn
              ? 'bg-black text-white dark:bg-white dark:text-black rounded-tr-sm shadow-sm'
              : 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white rounded-tl-sm border border-neutral-200 dark:border-neutral-700/60 shadow-sm'
          }`}
        >
          {message.content && (
            <p className='leading-relaxed break-words whitespace-pre-wrap'>
              {message.content}
            </p>
          )}

          {/* Attachment rendering */}
          {message.attachment && (
            <div className='mt-2'>
              {message.attachment.isImage && message.attachment.url ? (
                <div className='rounded-xl overflow-hidden max-w-xs border border-white/20 my-1'>
                  <img
                    src={message.attachment.url}
                    alt={message.attachment.name}
                    className='w-full h-auto object-cover max-h-48'
                  />
                </div>
              ) : (
                <div
                  className={`flex items-center gap-2 p-2 rounded-xl text-xs font-medium ${
                    isOwn
                      ? 'bg-white/10 text-white'
                      : 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200'
                  }`}
                >
                  <FileText className='w-4 h-4 flex-shrink-0' />
                  <span className='truncate max-w-[160px]'>
                    {message.attachment.name}
                  </span>
                  <span className='text-[10px] opacity-75'>
                    ({message.attachment.size})
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Reaction badge */}
          {reaction && (
            <div className='absolute -bottom-2.5 right-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-full px-1.5 py-0.5 text-xs shadow-md'>
              {reaction === 'heart' ? '❤️' : '👍'}
            </div>
          )}
        </div>

        {/* Hover Quick Reaction & Timestamp */}
        <div className='flex items-center gap-2 mt-1 px-1 opacity-0 group-hover:opacity-100 transition-opacity'>
          <button
            type='button'
            onClick={() => toggleReaction('like')}
            className='text-neutral-400 hover:text-black dark:hover:text-white text-xs transition-colors'
            title='Like'
          >
            <ThumbsUp size={12} />
          </button>
          <button
            type='button'
            onClick={() => toggleReaction('heart')}
            className='text-neutral-400 hover:text-red-500 text-xs transition-colors'
            title='Heart'
          >
            <Heart size={12} />
          </button>
          {isOwn && (
            <span className='text-[10px] text-neutral-400'>
              {message.timestamp}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
