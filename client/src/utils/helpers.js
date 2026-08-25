import { TASK_STATUS, TASK_PRIORITY } from './constants';

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

export const getInitials = (name) => {
  if (!name) return '?';
  const parts = name.split(' ');
  let initials = '';
  for (let i = 0; i < Math.min(parts.length, 2); i++) {
    if (parts[i].length > 0) {
      initials += parts[i][0];
    }
  }
  return initials.toUpperCase();
};

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const getStatusColor = (status) => {
  switch (status) {
    case TASK_STATUS.TODO: return 'bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-300';
    case TASK_STATUS.IN_PROGRESS: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
    case TASK_STATUS.REVIEW: return 'bg-warning/20 text-warning dark:bg-warning/10';
    case TASK_STATUS.DONE: return 'bg-success/20 text-success dark:bg-success/10';
    default: return 'bg-neutral-100 text-neutral-800';
  }
};

export const getPriorityColor = (priority) => {
  switch (priority) {
    case TASK_PRIORITY.LOW: return 'bg-success/20 text-success dark:bg-success/10';
    case TASK_PRIORITY.MEDIUM: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
    case TASK_PRIORITY.HIGH: return 'bg-warning/20 text-warning dark:bg-warning/10';
    case TASK_PRIORITY.URGENT: return 'bg-danger/20 text-red-600 dark:bg-danger/10';
    default: return 'bg-neutral-100 text-neutral-800';
  }
};
