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
 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 dark:focus:ring-offset-black';

 const variants = {
 primary:
 'bg-black text-black dark:text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 rounded-full',
 secondary:
 'border border-neutral-300 dark:border-neutral-700 bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-900 text-neutral-900 dark:text-neutral-100 rounded-full',
 danger: 'bg-red-600 hover:bg-red-700 text-black dark:text-white rounded-full',
 ghost:
 'bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full',
 };

 const sizes = {
 sm: 'px-4 py-1.5 text-sm',
 md: 'px-6 py-2.5 text-sm',
 lg: 'px-8 py-3 text-base',
 };

 const classes = classNames(
 baseClasses,
 variants[variant],
 sizes[size],
 fullWidth ? 'w-full' : '',
 disabled || isLoading
 ? 'opacity-50 cursor-not-allowed pointer-events-none'
 : '',
 className,
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
 <Loader2 className='w-5 h-5 mr-2 animate-spin' />
 ) : Icon ? (
 <Icon className={classNames('w-5 h-5', children ? 'mr-2' : '')} />
 ) : null}
 {children}
 </motion.button>
 );
 },
);

Button.displayName = 'Button';
export default Button;
