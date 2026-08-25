import React from 'react';
import { classNames, getInitials } from '../../utils/helpers';

const Avatar = ({ src, name, size = 'md', isOnline = false, className = '' }) => {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  const onlineIndicatorSizes = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4',
  };

  return (
    <div className="relative inline-block flex-shrink-0">
      <div 
        className={classNames(
          "rounded-full flex items-center justify-center bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold ring-2 ring-white dark:ring-neutral-900 overflow-hidden shadow-sm",
          sizes[size],
          className
        )}
      >
        {src ? (
          <img src={src} alt={name || 'Avatar'} className="w-full h-full object-cover" />
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>
      
      {isOnline && (
        <span 
          className={classNames(
            "absolute bottom-0 right-0 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-neutral-900 block",
            onlineIndicatorSizes[size]
          )}
        />
      )}
    </div>
  );
};

export default Avatar;
