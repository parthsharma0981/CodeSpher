import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 cursor-pointer'
    >
      <div className='flex justify-between items-start mb-4'>
        <div>
          <h3 className='text-xl font-bold text-white mb-1'>{project.name}</h3>
          <p className='text-sm text-neutral-400'>{project.description}</p>
        </div>
        <span className='px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs font-medium border border-indigo-500/20'>
          {project.status}
        </span>
      </div>

      <div className='mb-6'>
        <div className='flex justify-between text-xs text-neutral-400 mb-2'>
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>
        <div className='h-2 bg-neutral-800 rounded-full overflow-hidden'>
          <div
            className='h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full'
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className='flex items-center justify-between'>
        <div className='flex -space-x-3'>
          {project.members.map((member, i) => (
            <div
              key={i}
              className='w-8 h-8 rounded-full border-2 border-neutral-900 overflow-hidden bg-neutral-700'
            >
              <img
                src={member.avatar}
                alt={member.name}
                className='w-full h-full object-cover'
              />
            </div>
          ))}
          {project.totalMembers > project.members.length && (
            <div className='w-8 h-8 rounded-full border-2 border-neutral-900 bg-neutral-800 flex items-center justify-center text-xs text-neutral-300 font-medium'>
              +{project.totalMembers - project.members.length}
            </div>
          )}
        </div>
        <div className='flex items-center text-sm text-neutral-400'>
          <Calendar className='w-4 h-4 mr-2' />
          {project.deadline}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
