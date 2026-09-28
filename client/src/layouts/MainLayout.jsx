import React, { useState, useEffect, useRef } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  MessageSquare,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  Code2,
  Moon,
  Sun,
  ChevronDown,
  User as UserIcon,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { ROUTES } from '../utils/constants';
import Avatar from '../components/common/Avatar';
import { classNames } from '../utils/helpers';
import { motion, AnimatePresence } from 'framer-motion';
import { notificationService } from '../services/api';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const notifRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Welcome to CodeSphere! 🚀',
      description: 'Your developer workspace is ready. Collaborate on tasks, upload files, and chat with your team.',
      time: 'Just now',
      read: false,
    },
    {
      id: '2',
      title: 'Task Assigned',
      description: 'You have been assigned to "Review project architecture and design tokens"',
      time: '1 hour ago',
      read: false,
    },
  ]);

  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await notificationService.getAll();
        if (res?.data && res.data.length > 0) {
          setNotifications(
            res.data.map((n) => ({
              id: n._id,
              title: n.title || 'Notification',
              description: n.message || n.content || n.description || '',
              time: new Date(n.createdAt).toLocaleDateString([], {
                month: 'short',
                day: 'numeric',
              }),
              read: n.isRead,
            }))
          );
        }
      } catch (err) {}
    };

    fetchNotifications();
  }, []);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const handleMarkAllRead = async () => {
    try {
      await notificationService.markAllAsRead();
    } catch {}
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleNotificationClick = async (notif) => {
    if (!notif.read) {
      try {
        await notificationService.markAsRead(notif.id);
      } catch {}
      setNotifications((prev) =>
        prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
      );
    }
    navigate(ROUTES.NOTIFICATIONS);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navItems = [
    { name: 'Dashboard', path: ROUTES.DASHBOARD, icon: LayoutDashboard },
    { name: 'Workspaces', path: ROUTES.WORKSPACES, icon: FolderKanban },
    { name: 'Projects', path: ROUTES.PROJECTS, icon: FolderKanban },
    { name: 'Tasks', path: ROUTES.TASKS, icon: CheckSquare },
    { name: 'Chat', path: ROUTES.CHAT, icon: MessageSquare },
    { name: 'Calendar', path: ROUTES.CALENDAR, icon: Calendar },
    { name: 'Analytics', path: ROUTES.ANALYTICS, icon: BarChart3 },
    { name: 'Notifications', path: ROUTES.NOTIFICATIONS, icon: Bell },
    { name: 'Settings', path: ROUTES.SETTINGS, icon: Settings },
  ];

  const Sidebar = () => (
    <div className='flex flex-col h-full bg-white dark:bg-black border-r border-neutral-200 dark:border-neutral-800'>
      <div className='p-4 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800'>
        <Link to={ROUTES.HOME} className='flex items-center gap-2 group hover:opacity-80 transition-opacity' title='Go to Landing Page'>
          <div className='w-8 h-8 rounded-lg bg-black dark:bg-white flex items-center justify-center shadow-sm'>
            <Code2 className='w-5 h-5 text-white dark:text-black' />
          </div>
          <span className='text-xl font-bold tracking-tight text-neutral-900 dark:text-white'>
            CodeSphere
          </span>
        </Link>
        <button className='md:hidden' onClick={() => setSidebarOpen(false)}>
          <X className='w-6 h-6 text-neutral-500' />
        </button>
      </div>

      <div className='flex-1 overflow-y-auto py-4 custom-scrollbar'>
        <nav className='px-3 space-y-1'>
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                classNames(
                  'group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
                  isActive
                    ? 'bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white'
                    : 'text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:text-black dark:hover:text-white',
                )
              }
            >
              <item.icon className='flex-shrink-0 w-5 h-5 mr-3 transition-colors' />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className='p-4 border-t border-neutral-200 dark:border-neutral-800'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <Avatar name={user?.name} size='sm' isOnline />
            <div className='flex flex-col'>
              <span className='text-sm font-medium text-black dark:text-white truncate max-w-[120px]'>
                {user?.name || 'User'}
              </span>
              <span className='text-xs text-neutral-400 truncate max-w-[120px]'>
                Free Plan
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className='p-2 text-neutral-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors'
            title='Logout'
          >
            <LogOut className='w-5 h-5' />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className='h-screen flex overflow-hidden bg-neutral-50 dark:bg-neutral-950'>
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden'
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        className={classNames(
          'fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 md:relative md:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <Sidebar />
      </motion.div>

      {/* Main content */}
      <div className='flex-1 flex flex-col min-w-0 overflow-hidden'>
        {/* Top header */}
        <header className='flex-shrink-0 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 h-16 flex items-center justify-between px-4 sm:px-6 z-30'>
          <div className='flex items-center flex-1'>
            <button
              className='md:hidden p-2 -ml-2 mr-2 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg'
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className='w-6 h-6' />
            </button>

            {/* Search */}
            <div className='hidden sm:flex max-w-md w-full relative'>
              <Search className='w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400' />
              <input
                type='text'
                placeholder='Search...'
                className='w-full pl-10 pr-4 py-2 bg-neutral-100 dark:bg-neutral-900 border border-transparent focus:bg-white dark:focus:bg-neutral-800 focus:border-neutral-300 dark:focus:border-neutral-700 rounded-xl text-sm transition-all focus:ring-0 dark:text-white placeholder-neutral-400'
              />
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <button
              onClick={toggleTheme}
              className='p-2 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors'
            >
              {isDarkMode ? (
                <Sun className='w-5 h-5' />
              ) : (
                <Moon className='w-5 h-5' />
              )}
            </button>

            {/* Notifications Dropdown */}
            <div className='relative' ref={notifRef}>
              <button
                type='button'
                onClick={() => {
                  setNotificationsOpen((prev) => !prev);
                  setUserMenuOpen(false);
                }}
                title='Notifications'
                className='relative p-2 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors cursor-pointer'
              >
                <Bell className='w-5 h-5 text-neutral-700 dark:text-neutral-300' />
                {unreadCount > 0 && (
                  <span className='absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-black text-white dark:bg-white dark:text-black rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-white dark:border-black shadow-sm'>
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className='absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl z-50 overflow-hidden'
                  >
                    <div className='p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between'>
                      <div className='flex items-center gap-2'>
                        <h3 className='font-semibold text-sm text-neutral-900 dark:text-white'>
                          Notifications
                        </h3>
                        {unreadCount > 0 && (
                          <span className='bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs px-2 py-0.5 rounded-full font-medium'>
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={handleMarkAllRead}
                          type='button'
                          className='text-xs text-neutral-500 hover:text-black dark:hover:text-white transition-colors cursor-pointer'
                        >
                          Mark all read
                        </button>
                      )}
                    </div>

                    <div className='max-h-72 overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-800/60 custom-scrollbar'>
                      {notifications.length > 0 ? (
                        notifications.slice(0, 5).map((n) => (
                          <div
                            key={n.id}
                            onClick={() => {
                              handleNotificationClick(n);
                              setNotificationsOpen(false);
                            }}
                            className={`p-3.5 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-pointer transition-colors flex items-start gap-3 ${
                              !n.read ? 'bg-neutral-50/70 dark:bg-neutral-800/20' : ''
                            }`}
                          >
                            <div
                              className='w-2 h-2 rounded-full mt-1.5 flex-shrink-0 bg-neutral-900 dark:bg-white'
                              style={{ opacity: n.read ? 0.2 : 1 }}
                            />
                            <div className='flex-1 min-w-0'>
                              <p
                                className={`text-xs font-semibold ${
                                  !n.read
                                    ? 'text-black dark:text-white'
                                    : 'text-neutral-500'
                                }`}
                              >
                                {n.title}
                              </p>
                              <p className='text-xs text-neutral-400 truncate mt-0.5'>
                                {n.description}
                              </p>
                              <span className='text-[10px] text-neutral-400 mt-1 block'>
                                {n.time}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className='p-6 text-center text-xs text-neutral-400'>
                          No notifications yet
                        </div>
                      )}
                    </div>

                    <div className='p-2.5 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50 text-center'>
                      <Link
                        to={ROUTES.NOTIFICATIONS}
                        onClick={() => setNotificationsOpen(false)}
                        className='text-xs font-medium text-black dark:text-white hover:underline inline-flex items-center gap-1'
                      >
                        View all notifications
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile Menu */}
            <div className='relative' ref={userMenuRef}>
              <button
                type='button'
                onClick={() => {
                  setUserMenuOpen((prev) => !prev);
                  setNotificationsOpen(false);
                }}
                className='flex items-center gap-2 pl-2 border-l border-neutral-200 dark:border-neutral-700 ml-2 cursor-pointer p-1 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors'
                title='Account menu'
              >
                <Avatar name={user?.name || 'User'} size='sm' />
                <ChevronDown className='w-4 h-4 text-neutral-500 hidden sm:block' />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className='absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl z-50 overflow-hidden py-1.5'
                  >
                    <div className='px-4 py-2.5 border-b border-neutral-100 dark:border-neutral-800'>
                      <p className='text-xs font-bold text-black dark:text-white truncate'>
                        {user?.name || 'Developer'}
                      </p>
                      <p className='text-[11px] text-neutral-400 truncate mt-0.5'>
                        {user?.email || 'user@codesphere.io'}
                      </p>
                    </div>
                    <Link
                      to={ROUTES.PROFILE}
                      onClick={() => setUserMenuOpen(false)}
                      className='flex items-center px-4 py-2 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors'
                    >
                      My Profile
                    </Link>
                    <Link
                      to={ROUTES.SETTINGS}
                      onClick={() => setUserMenuOpen(false)}
                      className='flex items-center px-4 py-2 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors'
                    >
                      Account Settings
                    </Link>
                    <Link
                      to={ROUTES.NOTIFICATIONS}
                      onClick={() => setUserMenuOpen(false)}
                      className='flex items-center px-4 py-2 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors'
                    >
                      Notifications ({unreadCount})
                    </Link>
                    <div className='my-1 border-t border-neutral-100 dark:border-neutral-800' />
                    <button
                      type='button'
                      onClick={() => {
                        setUserMenuOpen(false);
                        handleLogout();
                      }}
                      className='w-full text-left flex items-center px-4 py-2 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer font-medium'
                    >
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className='flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 relative'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
