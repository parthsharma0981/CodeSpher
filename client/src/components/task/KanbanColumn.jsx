import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';
import { Plus } from 'lucide-react';

const columnColors = {
  backlog: 'bg-slate-500',
  todo: 'bg-blue-500',
  'in-progress': 'bg-amber-500',
  review: 'bg-purple-500',
  testing: 'bg-cyan-500',
  completed: 'bg-emerald-500',
};

const KanbanColumn = ({ column, tasks, onTaskClick }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div className="flex flex-col w-80 shrink-0">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${columnColors[column.id]}`} />
          <h3 className="text-sm font-semibold text-white">{column.title}</h3>
          <span className="bg-white/10 text-slate-300 text-xs px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
        <button className="text-slate-400 hover:text-white p-1 hover:bg-white/10 rounded">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div 
        ref={setNodeRef}
        className={`flex-1 bg-white/5 border rounded-2xl p-2 min-h-[500px] flex flex-col gap-2 transition-all duration-200 ${
          isOver ? 'border-indigo-500/50 bg-indigo-500/5 shadow-lg shadow-indigo-500/10' : 'border-white/5'
        }`}
      >
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} onClick={onTaskClick} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default KanbanColumn;
