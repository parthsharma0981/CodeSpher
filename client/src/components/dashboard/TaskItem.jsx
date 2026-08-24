import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const priorityColors = {
  high: 'bg-rose-500',
  medium: 'bg-amber-500',
  low: 'bg-emerald-500',
};

const TaskItem = ({ task, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="flex items-center p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/5 cursor-pointer"
    >
      <div className={`w-3 h-3 rounded-full ${priorityColors[task.priority]} mr-4`} />
      
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-white truncate mb-1">{task.title}</h4>
        <p className="text-xs text-slate-400 truncate">{task.project}</p>
      </div>
      
      <div className="flex items-center space-x-4 ml-4">
        <div className="flex items-center text-xs text-slate-400">
          <Clock className="w-3 h-3 mr-1" />
          {task.dueTime}
        </div>
        <img 
          src={task.assignee.avatar} 
          alt={task.assignee.name} 
          className="w-8 h-8 rounded-full border border-white/10"
        />
      </div>
    </motion.div>
  );
};

export default TaskItem;
