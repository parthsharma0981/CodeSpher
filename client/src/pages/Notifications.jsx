import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ClipboardCheck,
  CheckCircle,
  MessageCircle,
  Clock,
  UserPlus,
  UserCheck,
  Trash2,
  Check,
} from 'lucide-react';
import { notificationService } from '../services/api';
import toast from 'react-hot-toast';

const INITIAL_NOTIFICATIONS = [
  {
    id: '1',
    type: 'task_assigned',
    title: 'Task Assigned',
    description: 'You have been assigned to "Fix navigation bug on mobile"',
    time: '2 mins ago',
    read: false,
    icon: ClipboardCheck,
  },
  {
    id: '2',
    type: 'comment',
    title: 'New Comment',
    description: 'Sarah commented on your PR #142: "LGTM! Ready to merge."',
    time: '1 hour ago',
    read: false,
    icon: MessageCircle,
  },
  {
    id: '3',
    type: 'deadline',
    title: 'Approaching Deadline',
    description: 'Project "Mobile App Redesign" sprint deadline in 2 days',
    time: '3 hours ago',
    read: true,
    icon: Clock,
  },
  {
    id: '4',
    type: 'task_completed',
    title: 'Task Completed',
    description: 'Evan completed "Design System Architecture & Tokens"',
    time: 'Yesterday',
    read: true,
    icon: CheckCircle,
  },
  {
    id: '5',
    type: 'member_joined',
    title: 'New Team Member',
    description: 'Alex joined your workspace "CodeSphere Team"',
    time: 'Yesterday',
    read: true,
    icon: UserPlus,
  },
  {
    id: '6',
    type: 'invite_accepted',
    title: 'Invite Accepted',
    description: 'Dan accepted your invitation to collaborate',
    time: 'Oct 12',
    read: true,
    icon: UserCheck,
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await notificationService.getAll();
        if (res?.data && res.data.length > 0) {
          const mapped = res.data.map((n) => ({
            id: n._id,
            title: n.title,
            description: n.message || n.description,
            time: new Date(n.createdAt).toLocaleDateString([], {
              month: 'short',
              day: 'numeric',
            }),
            read: n.isRead,
            icon: ClipboardCheck,
          }));
          setNotifications(mapped);
        }
      } catch (err) {
        // Keeps initial notifications if offline
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
    } catch {}
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleDismiss = async (id) => {
    try {
      await notificationService.delete(id);
    } catch {}
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.success('Notification dismissed');
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
    } catch {}
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    return true;
  });

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto min-h-screen text-neutral-900 dark:text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Notifications
          </h1>
          <p className="text-neutral-500 mt-1">
            Stay updated with your team's activities and deadlines
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2 text-sm text-neutral-900 dark:text-white focus:outline-none"
          >
            <option value="all">All Notifications</option>
            <option value="unread">Unread Only</option>
          </select>
          <button
            onClick={handleMarkAllAsRead}
            className="text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Mark all as read
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif) => {
              const Icon = notif.icon;
              return (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-start p-4 rounded-2xl border transition-all ${
                    notif.read
                      ? 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800'
                      : 'bg-neutral-50 dark:bg-neutral-950 border-neutral-300 dark:border-neutral-700 shadow-sm'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center flex-shrink-0 mr-4 text-neutral-900 dark:text-white">
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex justify-between items-start">
                      <h4
                        className={`text-sm font-semibold ${
                          notif.read
                            ? 'text-neutral-600 dark:text-neutral-400'
                            : 'text-neutral-900 dark:text-white'
                        }`}
                      >
                        {notif.title}
                      </h4>
                      <div className="flex items-center space-x-3">
                        <span className="text-xs text-neutral-400 whitespace-nowrap">
                          {notif.time}
                        </span>
                        <button
                          onClick={() => handleDismiss(notif.id)}
                          className="text-neutral-400 hover:text-red-500 transition-colors p-1 rounded-md"
                          title="Dismiss"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">
                      {notif.description}
                    </p>

                    {!notif.read && (
                      <div className="mt-3 flex space-x-2">
                        <button
                          onClick={() => handleMarkAsRead(notif.id)}
                          className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-black text-white dark:bg-white dark:text-black rounded-lg transition-opacity hover:opacity-80"
                        >
                          <Check size={12} /> Mark as Read
                        </button>
                      </div>
                    )}
                  </div>

                  {!notif.read && (
                    <div className="w-2 h-2 bg-black dark:bg-white rounded-full ml-3 mt-2 flex-shrink-0"></div>
                  )}
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-12 text-neutral-500 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
              No notifications to display.
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Notifications;
