import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Clock, MessageSquare, Paperclip, CheckSquare } from 'lucide-react';

const priorityColors = {
  urgent: 'bg-rose-500',
  high: 'bg-orange-500',
  medium: 'bg-yellow-500',
  low: 'bg-emerald-500',
};

const TaskCard = ({ task, onClick, isDragging: isDraggingProp }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const dragging = isDragging || isDraggingProp;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onClick(task)}
      className={`bg-neutral-800 border border-white/10 p-4 rounded-xl cursor-grab active:cursor-grabbing hover:bg-neutral-800/80 hover:border-white/20 transition-all hover:shadow-lg ${
        dragging
          ? 'opacity-80 shadow-2xl shadow-indigo-500/20 scale-105 border-indigo-500/30 rotate-2'
          : ''
      }`}
    >
      <div className='flex gap-2 mb-3 flex-wrap'>
        {task.labels?.map((label, i) => (
          <span
            key={i}
            className='px-2 py-0.5 rounded text-[10px] font-medium bg-white/10 text-neutral-300'
          >
            {label}
          </span>
        ))}
        <div
          className={`w-8 h-1 rounded-full ml-auto ${priorityColors[task.priority]}`}
        />
      </div>

      <h4 className='text-sm font-medium text-white mb-2 leading-snug'>
        {task.title}
      </h4>

      {task.description && (
        <p className='text-xs text-neutral-400 mb-4 line-clamp-2'>
          {task.description}
        </p>
      )}

      <div className='flex items-center justify-between mt-4'>
        <div className='flex items-center gap-3 text-xs text-neutral-500'>
          {task.comments > 0 && (
            <div className='flex items-center gap-1'>
              <MessageSquare className='w-3.5 h-3.5' /> {task.comments}
            </div>
          )}
          {task.attachments > 0 && (
            <div className='flex items-center gap-1'>
              <Paperclip className='w-3.5 h-3.5' /> {task.attachments}
            </div>
          )}
          {task.checklist && (
            <div className='flex items-center gap-1'>
              <CheckSquare className='w-3.5 h-3.5' /> {task.checklist.completed}
              /{task.checklist.total}
            </div>
          )}
        </div>

        <div className='flex items-center gap-2'>
          {task.dueDate && (
            <div
              className={`flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded ${
                task.isOverdue
                  ? 'bg-rose-500/10 text-rose-400'
                  : 'bg-neutral-700 text-neutral-300'
              }`}
            >
              <Clock className='w-3 h-3' />
              {task.dueDate}
            </div>
          )}
          {task.assignee && (
            <img
              src={task.assignee.avatar}
              alt={task.assignee.name}
              className='w-6 h-6 rounded-full border border-neutral-700'
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
