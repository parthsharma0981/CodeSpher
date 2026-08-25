import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors'
    >
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-sm text-neutral-400 font-medium mb-1'>{title}</p>
          <h3 className='text-3xl font-bold text-white'>{value}</h3>
        </div>
        <div className={`p-4 rounded-xl ${color}`}>
          <Icon className='w-6 h-6 text-white' />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
