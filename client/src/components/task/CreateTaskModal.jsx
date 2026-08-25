import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Tag, AlertTriangle, User } from 'lucide-react';
import Button from '../common/Button';

const CreateTaskModal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [labels, setLabels] = useState('');
  const [assigneeName, setAssigneeName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const labelArray = labels
      ? labels
          .split(',')
          .map((l) => l.trim())
          .filter(Boolean)
      : [];

    const newTask = {
      title,
      description,
      priority,
      dueDate: dueDate || undefined,
      labels: labelArray,
      status: 'todo',
      comments: 0,
      attachments: 0,
      assignee: assigneeName
        ? {
            name: assigneeName,
            avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(assigneeName)}`,
          }
        : undefined,
    };

    onSubmit(newTask);

    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setLabels('');
    setAssigneeName('');
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
          className='relative w-full max-w-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10'
        >
          {/* Header */}
          <div className='p-6 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center bg-white dark:bg-neutral-900'>
            <h2 className='text-xl font-bold text-neutral-900 dark:text-white'>Create New Task</h2>
            <button
              onClick={onClose}
              type='button'
              className='p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors'
            >
              <X className='w-5 h-5' />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className='p-6 space-y-4 overflow-y-auto max-h-[70vh] bg-white dark:bg-neutral-900'
          >
            {/* Title */}
            <div>
              <label className='block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-2'>
                Task Title *
              </label>
              <input
                type='text'
                required
                placeholder='What needs to be done?'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-all'
              />
            </div>

            {/* Description */}
            <div>
              <label className='block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-2'>
                Description
              </label>
              <textarea
                placeholder='Provide a detailed description of this task...'
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-all resize-none'
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              {/* Priority */}
              <div>
                <label className='block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-2'>
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className='w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-all'
                >
                  <option value='low'>Low</option>
                  <option value='medium'>Medium</option>
                  <option value='high'>High</option>
                  <option value='urgent'>Urgent</option>
                </select>
              </div>

              {/* Due Date */}
              <div>
                <label className='block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1'>
                  <Calendar className='w-3.5 h-3.5' /> Due Date
                </label>
                <input
                  type='date'
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className='w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-all'
                />
              </div>
            </div>

            {/* Labels */}
            <div>
              <label className='block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1'>
                <Tag className='w-3.5 h-3.5' /> Labels (comma separated)
              </label>
              <input
                type='text'
                placeholder='Frontend, Bug, High Priority'
                value={labels}
                onChange={(e) => setLabels(e.target.value)}
                className='w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-all'
              />
            </div>

            {/* Assignee */}
            <div>
              <label className='block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1'>
                <User className='w-3.5 h-3.5' /> Assignee Name
              </label>
              <input
                type='text'
                placeholder='e.g., Alex Johnson'
                value={assigneeName}
                onChange={(e) => setAssigneeName(e.target.value)}
                className='w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-all'
              />
            </div>

            {/* Footer buttons */}
            <div className='flex justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800'>
              <Button variant='secondary' onClick={onClose} type='button'>
                Cancel
              </Button>
              <Button type='submit'>
                Create Task
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CreateTaskModal;
