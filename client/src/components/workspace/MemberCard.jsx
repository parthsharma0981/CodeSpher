import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MoreVertical } from 'lucide-react';

const MemberCard = ({ member, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center relative group hover:bg-white/10 transition-colors'
    >
      <button className='absolute top-4 right-4 text-neutral-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity'>
        <MoreVertical className='w-5 h-5' />
      </button>

      <img
        src={member.avatar}
        alt={member.name}
        className='w-20 h-20 rounded-full mb-4 border-2 border-white/10'
      />
      <h3 className='text-lg font-bold text-white mb-1'>{member.name}</h3>

      <div className='flex items-center text-xs text-neutral-400 mb-4'>
        <Mail className='w-3 h-3 mr-1' />
        {member.email}
      </div>

      <div className='mt-auto flex items-center justify-between w-full'>
        <span
          className={`px-2 py-1 rounded-md text-xs font-medium ${
            member.role === 'Admin'
              ? 'bg-indigo-500/20 text-indigo-400'
              : member.role === 'Member'
                ? 'bg-cyan-500/20 text-cyan-400'
                : 'bg-neutral-500/20 text-neutral-400'
          }`}
        >
          {member.role}
        </span>
        <span className='text-xs text-neutral-500'>
          Joined {member.joinedDate}
        </span>
      </div>
    </motion.div>
  );
};

export default MemberCard;
