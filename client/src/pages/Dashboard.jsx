import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, CheckCircle2, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../components/dashboard/StatCard';
import ProjectCard from '../components/dashboard/ProjectCard';
import TaskItem from '../components/dashboard/TaskItem';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import { dashboardService } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../utils/constants';

// Fallback seed data
const DEFAULT_PROJECTS = [
  {
    _id: '1',
    name: 'Mobile App Redesign',
    description: 'Overhauling the user interface for iOS and Android apps.',
    progress: 75,
    status: 'On Track',
    deadline: 'Oct 24, 2024',
    members: [{ name: 'Alex', avatar: 'https://i.pravatar.cc/150?u=1' }, { name: 'Sarah', avatar: 'https://i.pravatar.cc/150?u=2' }],
    totalMembers: 4,
  },
  {
    _id: '2',
    name: 'API V2 Migration',
    description: 'Migrating legacy endpoints to GraphQL.',
    progress: 40,
    status: 'At Risk',
    deadline: 'Nov 12, 2024',
    members: [{ name: 'John', avatar: 'https://i.pravatar.cc/150?u=4' }, { name: 'Emily', avatar: 'https://i.pravatar.cc/150?u=5' }],
    totalMembers: 2,
  },
  {
    _id: '3',
    name: 'Marketing Website',
    description: 'New landing pages for Q4 campaign.',
    progress: 90,
    status: 'Completed',
    deadline: 'Sep 30, 2024',
    members: [{ name: 'Chris', avatar: 'https://i.pravatar.cc/150?u=6' }, { name: 'Anna', avatar: 'https://i.pravatar.cc/150?u=7' }],
    totalMembers: 3,
  },
  {
    _id: '4',
    name: 'Security Audit',
    description: 'Annual penetration testing and vulnerability assessment.',
    progress: 15,
    status: 'Planning',
    deadline: 'Dec 05, 2024',
    members: [{ name: 'Lisa', avatar: 'https://i.pravatar.cc/150?u=9' }],
    totalMembers: 1,
  },
];

const DEFAULT_TASKS = [
  { id: '1', title: 'Fix navigation bug on mobile', project: 'Mobile App Redesign', priority: 'high', dueTime: '2:00 PM', assignee: { name: 'Alex', avatar: 'https://i.pravatar.cc/150?u=1' } },
  { id: '2', title: 'Update user schema', project: 'API V2 Migration', priority: 'medium', dueTime: '4:30 PM', assignee: { name: 'Sarah', avatar: 'https://i.pravatar.cc/150?u=2' } },
  { id: '3', title: 'Write release notes', project: 'Marketing Website', priority: 'low', dueTime: '5:00 PM', assignee: { name: 'Mike', avatar: 'https://i.pravatar.cc/150?u=3' } },
  { id: '4', title: 'Review PR #442', project: 'Mobile App Redesign', priority: 'medium', dueTime: '6:00 PM', assignee: { name: 'John', avatar: 'https://i.pravatar.cc/150?u=4' } },
  { id: '5', title: 'Deploy staging environment', project: 'API V2 Migration', priority: 'high', dueTime: '8:00 PM', assignee: { name: 'Emily', avatar: 'https://i.pravatar.cc/150?u=5' } },
];

const DEFAULT_ACTIVITIES = [
  { id: 1, type: 'commit', user: { name: 'Alex', avatar: 'https://i.pravatar.cc/150?u=1' }, action: 'pushed to main branch', timestamp: '10 mins ago' },
  { id: 2, type: 'review', user: { name: 'Sarah', avatar: 'https://i.pravatar.cc/150?u=2' }, action: 'approved PR #442', timestamp: '1 hour ago' },
  { id: 3, type: 'comment', user: { name: 'Mike', avatar: 'https://i.pravatar.cc/150?u=3' }, action: 'commented on Task #128', timestamp: '2 hours ago' },
  { id: 4, type: 'merge', user: { name: 'John', avatar: 'https://i.pravatar.cc/150?u=4' }, action: 'merged feature/auth into main', timestamp: '4 hours ago' },
];

const weeklyData = [
  { day: 'Mon', value: 40 },
  { day: 'Tue', value: 65 },
  { day: 'Wed', value: 85 },
  { day: 'Thu', value: 50 },
  { day: 'Fri', value: 90 },
  { day: 'Sat', value: 20 },
  { day: 'Sun', value: 10 },
];

const teamOnline = [
  { name: 'Alex', avatar: 'https://i.pravatar.cc/150?u=1', status: 'online' },
  { name: 'Sarah', avatar: 'https://i.pravatar.cc/150?u=2', status: 'online' },
  { name: 'Mike', avatar: 'https://i.pravatar.cc/150?u=3', status: 'away' },
  { name: 'John', avatar: 'https://i.pravatar.cc/150?u=4', status: 'busy' },
  { name: 'Emily', avatar: 'https://i.pravatar.cc/150?u=5', status: 'online' },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [statsData, setStatsData] = useState({
    activeProjects: 12,
    tasksDueToday: 5,
    completedTasks: 148,
    teamMembers: 24,
  });
  const [projectsList, setProjectsList] = useState(DEFAULT_PROJECTS);
  const [tasksList, setTasksList] = useState(DEFAULT_TASKS);
  const [activityList, setActivityList] = useState(DEFAULT_ACTIVITIES);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await dashboardService.getStats();
        if (res?.data) {
          if (res.data.stats) setStatsData(res.data.stats);
          if (res.data.projects?.length > 0) setProjectsList(res.data.projects);
          if (res.data.tasks?.length > 0) {
            setTasksList(
              res.data.tasks.map((t) => ({
                id: t._id,
                title: t.title,
                project: t.project?.name || 'General',
                priority: t.priority?.toLowerCase() || 'medium',
                dueTime: t.dueDate ? new Date(t.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Today',
                assignee: t.assignee || { name: 'Assignee', avatar: 'https://i.pravatar.cc/150' },
              }))
            );
          }
          if (res.data.activities?.length > 0) setActivityList(res.data.activities);
        }
      } catch (err) {
        // Keeps graceful defaults if offline
      }
    };

    fetchDashboardData();
  }, []);

  const stats = [
    { title: 'Active Projects', value: String(statsData.activeProjects), icon: Briefcase },
    { title: 'Tasks Due Today', value: String(statsData.tasksDueToday), icon: Clock },
    { title: 'Completed Tasks', value: String(statsData.completedTasks), icon: CheckCircle2 },
    { title: 'Team Members', value: String(statsData.teamMembers), icon: Users },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
          Welcome back, {user?.name || 'Developer'}! 👋
        </h1>
        <p className="text-neutral-500">Here's what's happening with your projects today.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <StatCard key={i} index={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-10">
          {/* Active Projects */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Active Projects</h2>
              <Link
                to={ROUTES.PROJECTS}
                className="text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projectsList.map((project, i) => (
                <ProjectCard key={project._id || i} index={i} project={project} />
              ))}
            </div>
          </section>

          {/* Chart Section */}
          <section className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">Weekly Productivity</h2>
            <div className="h-48 flex items-end justify-between gap-2">
              {weeklyData.map((data, i) => (
                <div key={i} className="flex flex-col items-center flex-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${data.value}%` }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="w-full max-w-[40px] bg-black dark:bg-white rounded-t-lg"
                  />
                  <span className="text-xs font-medium text-neutral-500 mt-2">{data.day}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          {/* Tasks Due Today */}
          <section className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Tasks Due Today</h2>
              <Link
                to={ROUTES.TASKS}
                className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                Kanban →
              </Link>
            </div>
            <div className="space-y-3">
              {tasksList.map((task, i) => (
                <TaskItem key={task.id || i} index={i} task={task} />
              ))}
            </div>
          </section>

          {/* Recent Activity */}
          <section className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-6">Recent Activity</h2>
            <ActivityFeed activities={activityList} />
          </section>

          {/* Team Online */}
          <section className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">Team Online</h2>
            <div className="flex gap-2 flex-wrap">
              {teamOnline.map((member, i) => (
                <div key={i} className="relative">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-10 h-10 rounded-full border-2 border-white dark:border-neutral-900 object-cover"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-neutral-900 ${
                      member.status === 'online'
                        ? 'bg-emerald-500'
                        : member.status === 'away'
                        ? 'bg-amber-500'
                        : 'bg-neutral-400'
                    }`}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
