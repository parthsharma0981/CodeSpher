import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar } from 'lucide-react';
import Button from '../common/Button';

const CreateProjectModal = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('On Track');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newProject = {
      name,
      description,
      progress: 0,
      status,
      deadline: deadline
        ? new Date(deadline).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })
        : 'No deadline',
      members: [{ avatar: 'https://i.pravatar.cc/150?u=current_user' }],
      totalMembers: 1,
    };

    onSubmit(newProject);
    setName('');
    setDescription('');
    setDeadline('');
    setStatus('On Track');
  };

  return (
    <AnimatePresence>
      <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='absolute inset-0 bg-black/40 backdrop-blur-sm'
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className='relative w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10'
        >
          <div className='p-6 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center bg-white dark:bg-neutral-900'>
            <h2 className='text-xl font-bold text-neutral-900 dark:text-white'>Create New Project</h2>
            <button
              onClick={onClose}
              type='button'
              className='p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors'
            >
              <X className='w-5 h-5' />
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className='p-6 space-y-4 bg-white dark:bg-neutral-900'
          >
            <div>
              <label className='block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-2'>
                Project Name *
              </label>
              <input
                type='text'
                required
                placeholder='e.g. Design Redesign Sprint'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-all'
              />
            </div>

            <div>
              <label className='block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-2'>
                Description
              </label>
              <textarea
                placeholder='Brief summary of the project goals...'
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-all resize-none'
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1'>
                  <Calendar className='w-3.5 h-3.5' /> Deadline
                </label>
                <input
                  type='date'
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className='w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-all'
                />
              </div>

              <div>
                <label className='block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-2'>
                  Initial Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className='w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-all'
                >
                  <option value='On Track'>On Track</option>
                  <option value='At Risk'>At Risk</option>
                  <option value='Critical'>Critical</option>
                </select>
              </div>
            </div>

            <div className='pt-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-end gap-3'>
              <Button variant='secondary' onClick={onClose}>
                Cancel
              </Button>
              <Button type='submit' variant='primary'>
                Create Project
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CreateProjectModal;
