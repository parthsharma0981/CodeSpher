import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import TaskCard from './TaskCard';
import { Plus } from 'lucide-react';

const columnColors = {
  backlog: 'bg-neutral-500',
  todo: 'bg-blue-500',
  'in-progress': 'bg-amber-500',
  review: 'bg-purple-500',
  testing: 'bg-cyan-500',
  completed: 'bg-emerald-500',
};

const KanbanColumn = ({ column, tasks, onTaskClick, onAddTask }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div className="flex flex-col w-80 shrink-0">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${columnColors[column.id] || 'bg-neutral-500'}`} />
          <h3 className="text-sm font-semibold text-black dark:text-white">{column.title}</h3>
          <span className="bg-neutral-200 dark:bg-white/10 text-neutral-700 dark:text-neutral-300 text-xs px-2 py-0.5 rounded-full font-medium">
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddTask && onAddTask(column.id)}
          title={`Add task to ${column.title}`}
          className="text-neutral-500 hover:text-black dark:hover:text-white p-1 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div
        ref={setNodeRef}
        className={`flex-1 bg-neutral-100/60 dark:bg-white/5 border rounded-2xl p-2 min-h-[520px] flex flex-col gap-2 transition-all duration-200 ${
          isOver
            ? 'border-indigo-500/50 bg-indigo-500/10 shadow-lg shadow-indigo-500/10'
            : 'border-neutral-200 dark:border-white/5'
        }`}
      >
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onClick={onTaskClick} />
          ))}
        </SortableContext>

        <button
          onClick={() => onAddTask && onAddTask(column.id)}
          className="mt-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 text-neutral-500 hover:text-black dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-white/40 dark:hover:bg-white/5 text-xs font-medium transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add task</span>
        </button>
      </div>
    </div>
  );
};

export default KanbanColumn;
