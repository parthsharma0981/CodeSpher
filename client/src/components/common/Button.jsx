import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { classNames } from '../../utils/helpers';

const Button = React.forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      className = '',
      disabled,
      type = 'button',
      icon: Icon,
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 dark:focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none rounded-xl';

    const variants = {
      primary:
        'bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 border border-transparent shadow-sm',
      secondary:
        'border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-sm',
      danger:
        'bg-red-600 hover:bg-red-700 text-white shadow-sm border border-transparent',
      ghost:
        'bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300',
      outline:
        'border border-neutral-300 dark:border-neutral-700 bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-900 text-neutral-900 dark:text-white',
    };

    const sizes = {
      sm: 'px-3.5 py-1.5 text-xs',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-6 py-3 text-base',
    };

    const classes = classNames(
      baseClasses,
      variants[variant] || variants.primary,
      sizes[size] || sizes.md,
      fullWidth ? 'w-full' : '',
      className,
    );

    return (
      <motion.button
        ref={ref}
        type={type}
        className={classes}
        disabled={disabled || isLoading}
        whileHover={disabled || isLoading ? {} : { scale: 1.01 }}
        whileTap={disabled || isLoading ? {} : { scale: 0.99 }}
        {...props}
      >
        {isLoading ? (
          <Loader2 className='w-4 h-4 mr-2 animate-spin' />
        ) : Icon ? (
          <Icon className={classNames('w-4 h-4', children ? 'mr-2' : '')} />
        ) : null}
        {children}
      </motion.button>
    );
  },
);

Button.displayName = 'Button';
export default Button;
