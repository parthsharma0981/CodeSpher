import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Shield } from 'lucide-react';
import Button from '../common/Button';

const InviteMemberModal = ({ isOpen, onClose, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Member');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;

    const newMember = {
      name,
      email,
      role,
      joinedDate: new Date().toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      }),
      avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(name)}`,
    };

    onSubmit(newMember);
    setEmail('');
    setName('');
    setRole('Member');
  };

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
          className='relative w-full max-w-md bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 text-white'
        >
          <div className='p-6 border-b border-white/10 flex justify-between items-center bg-neutral-900'>
            <h2 className='text-xl font-bold'>Invite Team Member</h2>
            <button
              onClick={onClose}
              type='button'
              className='p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors'
            >
              <X className='w-5 h-5' />
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className='p-6 space-y-4 bg-neutral-950/50'
          >
            <div>
              <label className='block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2'>
                Member Name *
              </label>
              <input
                type='text'
                required
                placeholder='e.g. Emily Davis'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors'
              />
            </div>

            <div>
              <label className='block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1'>
                <Mail className='w-3.5 h-3.5' /> Email Address *
              </label>
              <input
                type='email'
                required
                placeholder='e.g. emily@codesphere.io'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors'
              />
            </div>

            <div>
              <label className='block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1'>
                <Shield className='w-3.5 h-3.5' /> Workspace Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className='w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors'
              >
                <option value='Admin'>Admin</option>
                <option value='Member'>Member</option>
                <option value='Viewer'>Viewer</option>
              </select>
            </div>

            <div className='pt-4 border-t border-white/10 flex justify-end gap-3'>
              <Button variant='secondary' onClick={onClose}>
                Cancel
              </Button>
              <Button type='submit' variant='primary'>
                Send Invitation
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default InviteMemberModal;
