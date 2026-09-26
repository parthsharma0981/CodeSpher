import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UploadCloud, FileText } from 'lucide-react';
import Button from '../common/Button';

const UploadFileModal = ({ isOpen, onClose, onSubmit, isUploading = false }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [fileType, setFileType] = useState('pdf');
  const fileInputRef = React.useRef(null);

  if (!isOpen) return null;

  const processFile = (file) => {
    if (!file) return;
    setSelectedFile(file);
    setFileName(file.name);
    
    // Format size
    const sizeInMb = file.size / (1024 * 1024);
    if (sizeInMb >= 1) {
      setFileSize(`${sizeInMb.toFixed(1)} MB`);
    } else {
      setFileSize(`${(file.size / 1024).toFixed(0)} KB`);
    }

    // Determine type
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') setFileType('pdf');
    else if (ext === 'zip' || ext === 'rar' || ext === '7z' || ext === 'tar') setFileType('zip');
    else if (['png', 'jpg', 'jpeg', 'svg', 'webp', 'gif'].includes(ext)) setFileType('png');
    else if (['doc', 'docx', 'txt', 'md'].includes(ext)) setFileType('doc');
    else setFileType('other');
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) processFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fileName.trim()) return;

    const metadata = {
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

    onSubmit(selectedFile, metadata);
    setSelectedFile(null);
    setFileName('');
    setFileSize('');
    setFileType('pdf');
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
            <h2 className='text-xl font-bold text-neutral-900 dark:text-white'>Upload File</h2>
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
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleFileSelect}
              className='hidden'
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              className='border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl p-8 text-center bg-neutral-50 dark:bg-neutral-950 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-2'
            >
              <UploadCloud className='w-10 h-10 text-neutral-400 dark:text-neutral-500' />
              {selectedFile ? (
                <div className='text-center'>
                  <p className='text-sm font-semibold text-neutral-900 dark:text-white truncate max-w-xs'>
                    {selectedFile.name}
                  </p>
                  <p className='text-xs text-neutral-500 mt-1'>
                    {fileSize} • Click to choose another file
                  </p>
                </div>
              ) : (
                <>
                  <p className='text-sm font-semibold text-neutral-900 dark:text-white'>
                    Drag & drop your file here
                  </p>
                  <p className='text-xs text-neutral-500'>
                    or click to browse from device
                  </p>
                </>
              )}
            </div>

            <div>
              <label className='block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-2'>
                File Name *
              </label>
              <input
                type='text'
                required
                placeholder='e.g. Project_Brief.pdf'
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className='w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-all'
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1'>
                  File Size
                </label>
                <input
                  type='text'
                  placeholder='e.g. 2.4 MB'
                  value={fileSize}
                  onChange={(e) => setFileSize(e.target.value)}
                  className='w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-all'
                />
              </div>

              <div>
                <label className='block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-2'>
                  File Type
                </label>
                <select
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value)}
                  className='w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-all'
                >
                  <option value='pdf'>PDF</option>
                  <option value='zip'>ZIP Archive</option>
                  <option value='png'>PNG / Image</option>
                  <option value='doc'>Document / Doc</option>
                  <option value='other'>Other</option>
                </select>
              </div>
            </div>

            <div className='pt-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-end gap-3'>
              <Button variant='secondary' onClick={onClose} disabled={isUploading}>
                Cancel
              </Button>
              <Button type='submit' variant='primary' isLoading={isUploading}>
                {isUploading ? 'Uploading...' : 'Upload'}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default UploadFileModal;
