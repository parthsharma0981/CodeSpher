import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color, index }) => {
 return (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.3, delay: index * 0.1 }}
 className='bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors'
 >
 <div className='flex items-center justify-between'>
 <div>
 <p className='text-sm text-neutral-500 font-medium mb-1'>{title}</p>
 <h3 className='text-3xl font-bold text-black dark:text-white'>{value}</h3>
 </div>
 <div className='p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800'>
 <Icon className='w-6 h-6 text-black dark:text-white' />
 </div>
 </div>
 </motion.div>
 );
};

export default StatCard;
