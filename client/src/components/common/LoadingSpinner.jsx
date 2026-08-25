import React from 'react';
import { Loader2 } from 'lucide-react';
import { classNames } from '../../utils/helpers';

const LoadingSpinner = ({ size = 'md', className = '', fullScreen = false }) => {
 const sizes = {
 sm: 'w-4 h-4',
 md: 'w-8 h-8',
 lg: 'w-12 h-12',
 xl: 'w-16 h-16'
 };

 const spinner = (
 <Loader2 
 className={classNames(
 "animate-spin text-black dark:text-white", 
 sizes[size], 
 className
 )} 
 />
 );

 if (fullScreen) {
 return (
 <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-sm">
 {spinner}
 </div>
 );
 }

 return (
 <div className="flex items-center justify-center w-full h-full min-h-[100px]">
 {spinner}
 </div>
 );
};

export default LoadingSpinner;
