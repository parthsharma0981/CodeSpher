import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Clock,
  User,
  Tag,
  CheckSquare,
  Paperclip,
  MessageSquare,
} from 'lucide-react';
import Button from '../common/Button';

const TaskDetailModal = ({ task, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='absolute inset-0 bg-neutral-900/80 backdrop-blur-sm'
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className='relative w-full max-w-3xl bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col'
        >
          {/* Header */}
          <div className='p-6 border-b border-white/10 flex justify-between items-start'>
            <div>
              <div className='flex items-center gap-3 mb-2'>
                <span className='text-xs font-medium text-neutral-400'>
                  PROJ-{task?.id || '123'}
                </span>
                <span className='px-2 py-1 bg-white/5 rounded-md text-xs font-medium text-neutral-300'>
                  {task?.status || 'To Do'}
                </span>
              </div>
              <h2 className='text-2xl font-bold text-white'>
                {task?.title || 'Task Title'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className='p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors'
            >
              <X className='w-5 h-5' />
            </button>
          </div>

          {/* Body */}
          <div className='p-6 overflow-y-auto flex-1 flex flex-col md:flex-row gap-8'>
            {/* Main Content */}
            <div className='flex-1 space-y-8'>
              <div>
                <h3 className='text-sm font-medium text-neutral-300 mb-3 flex items-center gap-2'>
                  <User className='w-4 h-4' /> Description
                </h3>
                <textarea
                  className='w-full h-32 bg-neutral-800/50 border border-white/10 rounded-xl p-4 text-sm text-neutral-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none'
                  defaultValue={task?.description || 'No description provided.'}
                />
              </div>

              <div>
                <h3 className='text-sm font-medium text-neutral-300 mb-3 flex items-center gap-2'>
                  <CheckSquare className='w-4 h-4' /> Checklist
                </h3>
                <div className='space-y-2'>
                  <div className='flex items-center gap-3'>
                    <input
                      type='checkbox'
                      className='w-4 h-4 rounded border-white/20 bg-neutral-800 text-indigo-500 focus:ring-indigo-500/20'
                    />
                    <span className='text-sm text-neutral-300'>
                      Update API endpoints
                    </span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <input
                      type='checkbox'
                      defaultChecked
                      className='w-4 h-4 rounded border-white/20 bg-neutral-800 text-indigo-500 focus:ring-indigo-500/20'
                    />
                    <span className='text-sm text-neutral-500 line-through'>
                      Write tests
                    </span>
                  </div>
                  <Button variant='ghost' size='sm' className='mt-2'>
                    + Add Item
                  </Button>
                </div>
              </div>

              <div>
                <h3 className='text-sm font-medium text-neutral-300 mb-3 flex items-center gap-2'>
                  <MessageSquare className='w-4 h-4' /> Comments
                </h3>
                <div className='flex gap-4'>
                  <div className='w-8 h-8 rounded-full bg-indigo-500/20 flex-shrink-0' />
                  <div className='flex-1'>
                    <input
                      type='text'
                      placeholder='Write a comment...'
                      className='w-full bg-neutral-800/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className='w-full md:w-64 space-y-6'>
              <div>
                <h4 className='text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2'>
                  Assignee
                </h4>
                <div className='flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer'>
                  <img
                    src={task?.assignee?.avatar || 'https://i.pravatar.cc/150'}
                    alt='Assignee'
                    className='w-8 h-8 rounded-full'
                  />
                  <span className='text-sm text-neutral-300'>
                    {task?.assignee?.name || 'Unassigned'}
                  </span>
                </div>
              </div>

              <div>
                <h4 className='text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2'>
                  Priority
                </h4>
                <select className='w-full bg-neutral-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none'>
                  <option value='high'>High</option>
                  <option value='medium'>Medium</option>
                  <option value='low'>Low</option>
                </select>
              </div>

              <div>
                <h4 className='text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2'>
                  Due Date
                </h4>
                <div className='flex items-center gap-2 text-sm text-neutral-300 bg-neutral-800 p-2 rounded-lg border border-white/10 cursor-pointer'>
                  <Clock className='w-4 h-4' />
                  {task?.dueDate || 'No due date'}
                </div>
              </div>

              <div>
                <h4 className='text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2'>
                  Labels
                </h4>
                <div className='flex flex-wrap gap-2'>
                  {task?.labels?.map((label, i) => (
                    <span
                      key={i}
                      className='px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded-md text-xs'
                    >
                      {label}
                    </span>
                  ))}
                  <button className='px-2 py-1 bg-white/5 text-neutral-400 rounded-md text-xs hover:bg-white/10'>
                    + Add
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className='p-6 border-t border-white/10 bg-neutral-900/50 flex justify-end gap-3'>
            <Button variant='ghost' onClick={onClose}>
              Cancel
            </Button>
            <Button variant='primary'>Save Changes</Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TaskDetailModal;
