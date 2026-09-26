import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Image as ImageIcon,
  FileArchive,
  Download,
} from 'lucide-react';

const getFileIcon = (type) => {
  switch (type) {
    case 'pdf':
    case 'doc':
      return <FileText className="w-8 h-8 text-neutral-600 dark:text-neutral-400" />;
    case 'png':
    case 'jpg':
    case 'jpeg':
      return <ImageIcon className="w-8 h-8 text-emerald-400" />;
    case 'zip':
    case 'rar':
      return <FileArchive className="w-8 h-8 text-amber-400" />;
    default:
      return <FileText className="w-8 h-8 text-neutral-400" />;
  }
};

const FileCard = ({ file, index }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (e) => {
    e.stopPropagation();
    setIsDownloading(true);

    try {
      if (file.url) {
        const response = await fetch(file.url);
        if (!response.ok) throw new Error('Download failed');
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = file.name || 'download';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobUrl);
      } else {
        const blob = new Blob([`Sample file content for: ${file.name}`], { type: 'text/plain' });
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobUrl);
      }
    } catch (err) {
      if (file.url) {
        window.open(file.url, '_blank');
      }
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 hover:bg-neutral-50 dark:hover:bg-neutral-800/80 transition-colors group flex flex-col"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
          {getFileIcon(file.type)}
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            title="Download file"
            className="p-1.5 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg text-neutral-500 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
          >
            <Download className={`w-4 h-4 ${isDownloading ? 'animate-bounce text-indigo-500' : ''}`} />
          </button>
        </div>
      </div>

      <div className="mt-auto">
        <h4
          onClick={handleDownload}
          className="text-sm font-medium text-black dark:text-white mb-1 truncate cursor-pointer hover:underline"
          title={file.name}
        >
          {file.name}
        </h4>
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <span>{file.size}</span>
          <span>{file.date}</span>
        </div>
        <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-2">
          <img
            src={file.uploadedBy?.avatar || 'https://i.pravatar.cc/150'}
            alt={file.uploadedBy?.name || 'User'}
            className="w-5 h-5 rounded-full object-cover"
          />
          <span className="text-xs text-neutral-500 truncate">
            Uploaded by {file.uploadedBy?.name || 'You'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default FileCard;
