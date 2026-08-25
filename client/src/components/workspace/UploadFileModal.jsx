import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UploadCloud, FileText } from 'lucide-react';
import Button from '../common/Button';

const UploadFileModal = ({ isOpen, onClose, onSubmit }) => {
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [fileType, setFileType] = useState('pdf');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fileName.trim()) return;

    const newFile = {
      name: fileName,
      type: fileType,
      size: fileSize || '1.0 MB',
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      uploadedBy: {
        name: 'You',
        avatar: 'https://i.pravatar.cc/150?u=current_user',
      },
    };

    onSubmit(newFile);
    setFileName('');
    setFileSize('');
    setFileType('pdf');
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      setFileSize((file.size / (1024 * 1024)).toFixed(1) + ' MB');
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (
        ext === 'pdf' ||
        ext === 'zip' ||
        ext === 'png' ||
        ext === 'jpg' ||
        ext === 'jpeg'
      ) {
        setFileType(ext === 'jpg' || ext === 'jpeg' ? 'png' : ext);
      } else {
        setFileType('pdf');
      }
    }
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
            <h2 className='text-xl font-bold'>Upload File</h2>
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
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              className='border-2 border-dashed border-white/15 rounded-xl p-8 text-center bg-neutral-900/50 hover:bg-neutral-900 hover:border-indigo-500/50 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-2'
            >
              <UploadCloud className='w-10 h-10 text-indigo-400' />
              <p className='text-sm font-semibold text-white'>
                Drag & drop your file here
              </p>
              <p className='text-xs text-neutral-400'>
                or click to browse from device
              </p>
            </div>

            <div>
              <label className='block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2'>
                File Name *
              </label>
              <input
                type='text'
                required
                placeholder='e.g. Q4_Report.pdf'
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className='w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors'
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1'>
                  File Size
                </label>
                <input
                  type='text'
                  placeholder='e.g. 2.4 MB'
                  value={fileSize}
                  onChange={(e) => setFileSize(e.target.value)}
                  className='w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors'
                />
              </div>

              <div>
                <label className='block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2'>
                  File Type
                </label>
                <select
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value)}
                  className='w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors'
                >
                  <option value='pdf'>PDF</option>
                  <option value='zip'>ZIP Archive</option>
                  <option value='png'>PNG / Image</option>
                </select>
              </div>
            </div>

            <div className='pt-4 border-t border-white/10 flex justify-end gap-3'>
              <Button variant='secondary' onClick={onClose}>
                Cancel
              </Button>
              <Button type='submit' variant='primary'>
                Upload
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default UploadFileModal;
