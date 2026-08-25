import React from 'react';
import { motion } from 'framer-motion';
import {
 FileText,
 Image as ImageIcon,
 FileArchive,
 Download,
 MoreVertical,
} from 'lucide-react';

const getFileIcon = (type) => {
 switch (type) {
 case 'pdf':
 case 'doc':
 return <FileText className='w-8 h-8 text-neutral-600 dark:text-neutral-400' />;
 case 'png':
 case 'jpg':
 return <ImageIcon className='w-8 h-8 text-emerald-400' />;
 case 'zip':
 return <FileArchive className='w-8 h-8 text-amber-400' />;
 default:
 return <FileText className='w-8 h-8 text-neutral-400' />;
 }
};

const FileCard = ({ file, index }) => {
 return (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.3, delay: index * 0.05 }}
 className='bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors group flex flex-col'
 >
 <div className='flex justify-between items-start mb-4'>
 <div className='p-3 bg-white/5 rounded-xl'>
 {getFileIcon(file.type)}
 </div>
 <div className='flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
 <button className='p-1.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-black dark:text-white transition-colors'>
 <Download className='w-4 h-4' />
 </button>
 <button className='p-1.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-black dark:text-white transition-colors'>
 <MoreVertical className='w-4 h-4' />
 </button>
 </div>
 </div>

 <div className='mt-auto'>
 <h4
 className='text-sm font-medium text-black dark:text-white mb-1 truncate'
 title={file.name}
 >
 {file.name}
 </h4>
 <div className='flex items-center justify-between text-xs text-neutral-400'>
 <span>{file.size}</span>
 <span>{file.date}</span>
 </div>
 <div className='mt-3 pt-3 border-t border-white/5 flex items-center gap-2'>
 <img
 src={file.uploadedBy.avatar}
 alt={file.uploadedBy.name}
 className='w-5 h-5 rounded-full'
 />
 <span className='text-xs text-neutral-500 truncate'>
 Uploaded by {file.uploadedBy.name}
 </span>
 </div>
 </div>
 </motion.div>
 );
};

export default FileCard;
