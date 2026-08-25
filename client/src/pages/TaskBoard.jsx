import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DndContext, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import KanbanColumn from '../components/task/KanbanColumn';
import TaskDetailModal from '../components/task/TaskDetailModal';
import TaskCard from '../components/task/TaskCard';
import Button from '../components/common/Button';
import CreateTaskModal from '../components/task/CreateTaskModal';
import { Filter, Search, X } from 'lucide-react';

const initialColumns = [
  { id: 'backlog', title: 'Backlog' },
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'review', title: 'Review' },
  { id: 'testing', title: 'Testing' },
  { id: 'completed', title: 'Completed' },
];

const mockTasks = [
  { id: 't1', status: 'backlog', title: 'Research new authentication methods', description: 'Investigate WebAuthn and passkeys for future implementation.', priority: 'low', comments: 2, attachments: 0, dueDate: 'Oct 30', labels: ['Research', 'Security'], assignee: { name: 'Alex', avatar: 'https://i.pravatar.cc/150?u=1' } },
  { id: 't2', status: 'todo', title: 'Design user profile settings page', description: 'Create high-fidelity mockups for the new settings page layout.', priority: 'medium', comments: 5, attachments: 3, checklist: { completed: 1, total: 4 }, labels: ['Design', 'UI/UX'], assignee: { name: 'Sarah', avatar: 'https://i.pravatar.cc/150?u=2' } },
  { id: 't3', status: 'todo', title: 'Set up CI/CD pipeline', priority: 'high', comments: 0, attachments: 0, dueDate: 'Oct 25', labels: ['DevOps'], assignee: { name: 'Mike', avatar: 'https://i.pravatar.cc/150?u=3' } },
  { id: 't4', status: 'in-progress', title: 'Implement Kanban drag and drop', description: 'Use dnd-kit to add drag and drop functionality to the task board.', priority: 'urgent', comments: 12, attachments: 1, checklist: { completed: 3, total: 5 }, dueDate: 'Oct 24', isOverdue: true, labels: ['Frontend', 'Feature'], assignee: { name: 'Alex', avatar: 'https://i.pravatar.cc/150?u=1' } },
  { id: 't5', status: 'review', title: 'API performance optimization', priority: 'high', comments: 8, attachments: 2, labels: ['Backend', 'Performance'], assignee: { name: 'Mike', avatar: 'https://i.pravatar.cc/150?u=3' } },
  { id: 't6', status: 'testing', title: 'Mobile responsive layout fixes', priority: 'medium', comments: 3, attachments: 4, dueDate: 'Oct 26', labels: ['Frontend', 'Bug'], assignee: { name: 'Sarah', avatar: 'https://i.pravatar.cc/150?u=2' } },
  { id: 't7', status: 'completed', title: 'Initial project setup', priority: 'high', comments: 1, attachments: 0, dueDate: 'Oct 20', labels: ['Config'], assignee: { name: 'Alex', avatar: 'https://i.pravatar.cc/150?u=1' } },
  { id: 't8', status: 'completed', title: 'Database schema design', priority: 'urgent', comments: 15, attachments: 5, dueDate: 'Oct 21', labels: ['Database', 'Architecture'], assignee: { name: 'Mike', avatar: 'https://i.pravatar.cc/150?u=3' } },
];

const TaskBoard = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState(mockTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find(t => t.id === active.id);
    const overTask = tasks.find(t => t.id === over.id);

    if (!activeTask) return;

    // Determine the target column
    let targetColumn;
    if (overTask) {
      targetColumn = overTask.status;
    } else {
      // Dropped on a column directly
      targetColumn = over.id;
    }

    if (activeTask.status !== targetColumn) {
      setTasks(prev => prev.map(t =>
        t.id === active.id ? { ...t, status: targetColumn } : t
      ));
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const activeTask = tasks.find(t => t.id === active.id);
    const overTask = tasks.find(t => t.id === over.id);

    if (activeTask && overTask && activeTask.status === overTask.status && active.id !== over.id) {
      const columnTasks = tasks.filter(t => t.status === activeTask.status);
      const oldIndex = columnTasks.findIndex(t => t.id === active.id);
      const newIndex = columnTasks.findIndex(t => t.id === over.id);
      const reordered = arrayMove(columnTasks, oldIndex, newIndex);
      
      setTasks(prev => {
        const otherTasks = prev.filter(t => t.status !== activeTask.status);
        return [...otherTasks, ...reordered];
      });
    }
  };

  const handleCreateTask = (newTask) => {
    setTasks(prev => [...prev, { ...newTask, id: `t${Date.now()}` }]);
    setShowCreateModal(false);
  };

  const activeTask = tasks.find(t => t.id === activeId);

  const filteredTasks = tasks.filter(t => {
    if (filterPriority !== 'all' && t.priority !== filterPriority) return false;
    if (searchQuery && !t.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="h-screen flex flex-col pt-4 overflow-hidden">
      {/* Board Header */}
      <div className="px-8 pb-4 border-b border-white/5 flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Task Board</h1>
          <p className="text-sm text-neutral-400">Mobile App Redesign Sprint</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2 mr-4">
            {['1','2','3'].map(u => (
              <img key={u} src={`https://i.pravatar.cc/150?u=${u}`} alt="User" className="w-8 h-8 rounded-full border-2 border-neutral-900" />
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-neutral-900 bg-neutral-800 flex items-center justify-center text-xs text-neutral-300">
              +2
            </div>
          </div>

          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 w-48"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white">
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Filter */}
          <div className="relative">
            <Button variant="secondary" size="sm" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="w-4 h-4 mr-2" /> Filter
              {filterPriority !== 'all' && <span className="ml-1.5 w-2 h-2 bg-indigo-500 rounded-full"></span>}
            </Button>
            {showFilters && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-neutral-800 border border-white/10 rounded-xl shadow-xl z-50 p-2">
                <p className="text-xs font-semibold text-neutral-400 uppercase px-3 py-2">Priority</p>
                {['all', 'urgent', 'high', 'medium', 'low'].map(p => (
                  <button
                    key={p}
                    onClick={() => { setFilterPriority(p); setShowFilters(false); }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm capitalize transition-colors ${filterPriority === p ? 'bg-indigo-600/20 text-indigo-400' : 'text-neutral-300 hover:bg-white/5'}`}
                  >
                    {p === 'all' ? 'All Priorities' : p}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Button variant="primary" size="sm" onClick={() => setShowCreateModal(true)}>
            + New Task
          </Button>
        </div>
      </div>

      {/* Board Columns */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden p-8">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 h-full pb-4">
            {initialColumns.map(column => (
              <KanbanColumn 
                key={column.id} 
                column={column} 
                tasks={filteredTasks.filter(t => t.status === column.id)} 
                onTaskClick={setSelectedTask}
              />
            ))}
          </div>
          <DragOverlay>
            {activeTask ? <TaskCard task={activeTask} onClick={() => {}} isDragging /> : null}
          </DragOverlay>
        </DndContext>
      </div>

      {/* Modals */}
      <TaskDetailModal 
        task={selectedTask} 
        isOpen={!!selectedTask} 
        onClose={() => setSelectedTask(null)} 
      />
      <CreateTaskModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateTask}
      />
    </div>
  );
};

export default TaskBoard;
