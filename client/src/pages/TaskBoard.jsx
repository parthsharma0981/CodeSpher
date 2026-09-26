import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import KanbanColumn from '../components/task/KanbanColumn';
import TaskDetailModal from '../components/task/TaskDetailModal';
import TaskCard from '../components/task/TaskCard';
import Button from '../components/common/Button';
import CreateTaskModal from '../components/task/CreateTaskModal';
import { Filter, Search, X } from 'lucide-react';
import { taskService } from '../services/api';
import toast from 'react-hot-toast';

const initialColumns = [
  { id: 'backlog', title: 'Backlog' },
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'review', title: 'Review' },
  { id: 'testing', title: 'Testing' },
  { id: 'completed', title: 'Completed' },
];

const mockTasks = [
  {
    id: 't1',
    status: 'backlog',
    title: 'Research WebAuthn & passkeys integration',
    description: 'Investigate passwordless login flow for enterprise tiers.',
    priority: 'low',
    comments: 2,
    attachments: 0,
    dueDate: 'Oct 30',
    labels: ['Research', 'Security'],
    assignee: { name: 'Alex', avatar: 'https://i.pravatar.cc/150?u=1' },
  },
  {
    id: 't2',
    status: 'todo',
    title: 'Design user profile settings page',
    description: 'Create high-fidelity mockups for settings and preferences.',
    priority: 'medium',
    comments: 5,
    attachments: 3,
    checklist: { completed: 1, total: 4 },
    labels: ['Design', 'UI/UX'],
    assignee: { name: 'Sarah', avatar: 'https://i.pravatar.cc/150?u=2' },
  },
  {
    id: 't3',
    status: 'todo',
    title: 'Set up CI/CD pipeline automation',
    description: 'Configure automated testing on pull requests.',
    priority: 'high',
    comments: 0,
    attachments: 0,
    dueDate: 'Oct 25',
    labels: ['DevOps'],
    assignee: { name: 'Mike', avatar: 'https://i.pravatar.cc/150?u=3' },
  },
  {
    id: 't4',
    status: 'in-progress',
    title: 'Implement Kanban drag and drop',
    description: 'Use dnd-kit for smooth interactive task cards.',
    priority: 'urgent',
    comments: 12,
    attachments: 1,
    checklist: { completed: 3, total: 5 },
    dueDate: 'Oct 24',
    isOverdue: false,
    labels: ['Frontend', 'Feature'],
    assignee: { name: 'Alex', avatar: 'https://i.pravatar.cc/150?u=1' },
  },
  {
    id: 't5',
    status: 'review',
    title: 'API query optimization & caching',
    description: 'Add Redis cache layer for high-throughput endpoints.',
    priority: 'high',
    comments: 8,
    attachments: 2,
    labels: ['Backend', 'Performance'],
    assignee: { name: 'Mike', avatar: 'https://i.pravatar.cc/150?u=3' },
  },
  {
    id: 't6',
    status: 'testing',
    title: 'Mobile responsive layout QA testing',
    description: 'Test sidebar and modals across viewport sizes.',
    priority: 'medium',
    comments: 3,
    attachments: 4,
    dueDate: 'Oct 26',
    labels: ['Frontend', 'Bug'],
    assignee: { name: 'Sarah', avatar: 'https://i.pravatar.cc/150?u=2' },
  },
  {
    id: 't7',
    status: 'completed',
    title: 'Initial architecture & MongoDB setup',
    description: 'Configured schemas, controllers, and Atlas connection.',
    priority: 'high',
    comments: 1,
    attachments: 0,
    dueDate: 'Oct 20',
    labels: ['Database'],
    assignee: { name: 'Alex', avatar: 'https://i.pravatar.cc/150?u=1' },
  },
];

const TaskBoard = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState(mockTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createTaskStatus, setCreateTaskStatus] = useState('todo');
  const [showFilters, setShowFilters] = useState(false);
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenCreateModal = (status = 'todo') => {
    setCreateTaskStatus(status);
    setShowCreateModal(true);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await taskService.getAll(id);
        if (res?.data && res.data.length > 0) {
          const formatted = res.data.map((t) => ({
            id: t._id,
            status: t.status || 'todo',
            title: t.title,
            description: t.description || '',
            priority: t.priority?.toLowerCase() || 'medium',
            comments: t.comments || 0,
            attachments: t.attachments || 0,
            dueDate: t.dueDate ? new Date(t.dueDate).toLocaleDateString([], { month: 'short', day: 'numeric' }) : undefined,
            labels: t.labels || [],
            assignee: t.assignee || { name: 'Alex', avatar: 'https://i.pravatar.cc/150?u=1' },
          }));
          setTasks(formatted);
        }
      } catch (err) {
        // Keeps local mock data if offline
      }
    };

    fetchTasks();
  }, [id]);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    const overTask = tasks.find((t) => t.id === over.id);

    if (!activeTask) return;

    let targetColumn;
    if (overTask) {
      targetColumn = overTask.status;
    } else {
      targetColumn = over.id;
    }

    if (activeTask.status !== targetColumn && initialColumns.some((c) => c.id === targetColumn)) {
      setTasks((prev) =>
        prev.map((t) => (t.id === active.id ? { ...t, status: targetColumn } : t))
      );
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    const overTask = tasks.find((t) => t.id === over.id);

    if (activeTask && overTask && activeTask.status === overTask.status && active.id !== over.id) {
      const columnTasks = tasks.filter((t) => t.status === activeTask.status);
      const oldIndex = columnTasks.findIndex((t) => t.id === active.id);
      const newIndex = columnTasks.findIndex((t) => t.id === over.id);
      const reordered = arrayMove(columnTasks, oldIndex, newIndex);

      setTasks((prev) => {
        const otherTasks = prev.filter((t) => t.status !== activeTask.status);
        return [...otherTasks, ...reordered];
      });
    }

    if (activeTask) {
      try {
        await taskService.updateStatus(activeTask.id, activeTask.status);
      } catch (err) {
        // Optimistic UI remains
      }
    }
  };

  const handleCreateTask = async (newTask) => {
    try {
      const res = await taskService.create({
        ...newTask,
        project: id || undefined,
        priority: newTask.priority?.toUpperCase(),
      });
      if (res?.data) {
        const created = {
          id: res.data._id,
          status: res.data.status || 'todo',
          title: res.data.title,
          description: res.data.description || '',
          priority: res.data.priority?.toLowerCase() || 'medium',
          comments: 0,
          attachments: 0,
          dueDate: res.data.dueDate ? new Date(res.data.dueDate).toLocaleDateString([], { month: 'short', day: 'numeric' }) : undefined,
          labels: res.data.labels || [],
          assignee: res.data.assignee || { name: 'You', avatar: 'https://i.pravatar.cc/150' },
        };
        setTasks((prev) => [created, ...prev]);
        toast.success('Task created successfully!');
      }
    } catch (err) {
      const localTask = { ...newTask, id: `t${Date.now()}` };
      setTasks((prev) => [localTask, ...prev]);
      toast.success('Task added to board!');
    }
    setShowCreateModal(false);
  };

  const activeTask = tasks.find((t) => t.id === activeId);

  const filteredTasks = tasks.filter((t) => {
    if (filterPriority !== 'all' && t.priority !== filterPriority) return false;
    if (searchQuery && !t.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col pt-2 overflow-hidden">
      {/* Board Header */}
      <div className="px-6 pb-4 border-b border-neutral-200 dark:border-neutral-800 flex flex-wrap justify-between items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">
            Kanban Task Board
          </h1>
          <p className="text-sm text-neutral-500">
            Drag and drop tasks between columns to update status
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl pl-9 pr-8 py-2 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 w-52 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter */}
          <div className="relative">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" /> Filter
              {filterPriority !== 'all' && (
                <span className="ml-1.5 w-2 h-2 bg-black dark:bg-white rounded-full"></span>
              )}
            </Button>
            {showFilters && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl z-50 p-2">
                <p className="text-xs font-semibold text-neutral-500 uppercase px-3 py-1.5">
                  Filter by Priority
                </p>
                {['all', 'urgent', 'high', 'medium', 'low'].map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setFilterPriority(p);
                      setShowFilters(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-sm capitalize transition-colors ${
                      filterPriority === p
                        ? 'bg-neutral-100 dark:bg-neutral-800 font-semibold text-neutral-900 dark:text-white'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                    }`}
                  >
                    {p === 'all' ? 'All Priorities' : p}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => handleOpenCreateModal('todo')}
          >
            + New Task
          </Button>
        </div>
      </div>

      {/* Board Columns */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden p-6 custom-scrollbar">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-5 h-full pb-4 min-w-max">
            {initialColumns.map((column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                tasks={filteredTasks.filter((t) => t.status === column.id)}
                onTaskClick={setSelectedTask}
                onAddTask={handleOpenCreateModal}
              />
            ))}
          </div>
          <DragOverlay>
            {activeTask ? (
              <TaskCard task={activeTask} onClick={() => {}} isDragging />
            ) : null}
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
        initialStatus={createTaskStatus}
      />
    </div>
  );
};

export default TaskBoard;
