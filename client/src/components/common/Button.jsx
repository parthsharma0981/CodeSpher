import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { classNames } from '../../utils/helpers';

const Button = React.forwardRef(({
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
}, ref) => {
  
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white shadow-lg shadow-primary/25 focus:ring-primary',
    secondary: 'border border-slate-300 dark:border-slate-600 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 focus:ring-slate-400',
    danger: 'bg-danger hover:bg-rose-600 text-white shadow-lg shadow-danger/25 focus:ring-danger',
    ghost: 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 focus:ring-slate-400'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const classes = classNames(
    baseClasses,
    variants[variant],
    sizes[size],
    fullWidth ? 'w-full' : '',
    (disabled || isLoading) ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
    className
  );

  return (
    <motion.button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled || isLoading}
      whileHover={disabled || isLoading ? {} : { scale: 1.02 }}
      whileTap={disabled || isLoading ? {} : { scale: 0.98 }}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
      ) : Icon ? (
        <Icon className={classNames("w-5 h-5", children ? "mr-2" : "")} />
      ) : null}
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';
export default Button;
