import React from 'react';
import { motion } from 'framer-motion';

const activityColors = {
 commit: 'bg-emerald-500',
 comment: 'bg-indigo-500',
 review: 'bg-amber-500',
 merge: 'bg-cyan-500',
};

const ActivityFeed = ({ activities }) => {
 return (
 <div className='relative pl-6 border-l border-neutral-700/50 space-y-6'>
 {activities.map((activity, index) => (
 <motion.div
 key={activity.id}
 initial={{ opacity: 0, x: 20 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.3, delay: index * 0.1 }}
 className='relative'
 >
 <div
 className={`absolute -left-[30px] w-3 h-3 rounded-full ${activityColors[activity.type]} ring-4 ring-neutral-900`}
 />
 <div className='bg-white/5 rounded-xl p-4 border border-white/5 flex gap-4 items-start'>
 <img
 src={activity.user.avatar}
 alt={activity.user.name}
 className='w-10 h-10 rounded-full'
 />
 <div>
 <p className='text-sm text-neutral-300'>
 <span className='font-semibold text-black dark:text-white'>
 {activity.user.name}
 </span>{' '}
 {activity.action}
 </p>
 <p className='text-xs text-neutral-500 mt-1'>
 {activity.timestamp}
 </p>
 </div>
 </div>
 </motion.div>
 ))}
 </div>
 );
};

export default ActivityFeed;
