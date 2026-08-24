import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FolderKanban, CheckSquare, MessageSquare, 
  Calendar, BarChart3, Settings, LogOut, Bell, Search, 
  Menu, X, Code2, Moon, Sun, ChevronDown, Briefcase, User, Shield
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { ROUTES } from '../utils/constants';
import Avatar from '../components/common/Avatar';
import { classNames } from '../utils/helpers';
import { motion, AnimatePresence } from 'framer-motion';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const navItems = [
    { name: 'Dashboard', path: ROUTES.DASHBOARD, icon: LayoutDashboard },
    { name: 'Workspaces', path: ROUTES.WORKSPACES, icon: FolderKanban },
    { name: 'Projects', path: ROUTES.PROJECTS, icon: Briefcase },
    { name: 'Tasks', path: ROUTES.TASKS, icon: CheckSquare },
    { name: 'Chat', path: ROUTES.CHAT, icon: MessageSquare },
    { name: 'Calendar', path: ROUTES.CALENDAR, icon: Calendar },
    { name: 'Analytics', path: ROUTES.ANALYTICS, icon: BarChart3 },
    { name: 'Notifications', path: ROUTES.NOTIFICATIONS, icon: Bell },
    { name: 'Settings', path: ROUTES.SETTINGS, icon: Settings },
  ];

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
      <div className="p-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold dark:text-white">CodeSphere</span>
        </div>
        <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
          <X className="w-6 h-6 text-slate-500" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
        <nav className="px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => classNames(
                "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                isActive 
                  ? "bg-primary/10 text-primary dark:bg-primary/20" 
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <item.icon className={classNames("flex-shrink-0 w-5 h-5 mr-3 transition-colors")} />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar name={user?.name} size="sm" isOnline />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-900 dark:text-white truncate max-w-[120px]">
                {user?.name || 'User'}
              </span>
              <span className="text-xs text-slate-500 truncate max-w-[120px]">
                Free Plan
              </span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-danger rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex overflow-hidden bg-slate-50 dark:bg-background-dark">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden" 
            onClick={() => setSidebarOpen(false)} 
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div 
        className={classNames(
          "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 md:relative md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar />
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top header */}
        <header className="flex-shrink-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 h-16 flex items-center justify-between px-4 sm:px-6 z-30">
          <div className="flex items-center flex-1">
            <button 
              className="md:hidden p-2 -ml-2 mr-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Search */}
            <div className="hidden sm:flex max-w-md w-full relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 border focus:border-primary rounded-xl text-sm transition-all focus:ring-0 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={toggleTheme}
              className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <button 
              onClick={() => navigate(ROUTES.NOTIFICATIONS)}
              className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>

            <button 
              onClick={() => navigate(ROUTES.PROFILE)}
              className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-700 ml-2"
            >
              <Avatar name={user?.name} size="sm" />
              <ChevronDown className="w-4 h-4 text-slate-500 hidden sm:block" />
            </button>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
