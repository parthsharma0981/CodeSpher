import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, CheckCircle2, Clock, Users } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import ProjectCard from '../components/dashboard/ProjectCard';
import TaskItem from '../components/dashboard/TaskItem';
import ActivityFeed from '../components/dashboard/ActivityFeed';

// Mock Data
const stats = [
  { title: 'Active Projects', value: '12', icon: Briefcase, color: 'bg-indigo-500/20 text-indigo-400' },
  { title: 'Tasks Due Today', value: '5', icon: Clock, color: 'bg-amber-500/20 text-amber-400' },
  { title: 'Completed Tasks', value: '148', icon: CheckCircle2, color: 'bg-emerald-500/20 text-emerald-400' },
  { title: 'Team Members', value: '24', icon: Users, color: 'bg-cyan-500/20 text-cyan-400' },
];

const projects = [
  {
    name: 'Mobile App Redesign',
    description: 'Overhauling the user interface for iOS and Android apps.',
    progress: 75,
    status: 'On Track',
    deadline: 'Oct 24, 2023',
    members: [{ name: 'Alex', avatar: 'https://i.pravatar.cc/150?u=1' }, { name: 'Sarah', avatar: 'https://i.pravatar.cc/150?u=2' }, { name: 'Mike', avatar: 'https://i.pravatar.cc/150?u=3' }],
    totalMembers: 5
  },
  {
    name: 'API V2 Migration',
    description: 'Migrating legacy endpoints to GraphQL.',
    progress: 40,
    status: 'At Risk',
    deadline: 'Nov 12, 2023',
    members: [{ name: 'John', avatar: 'https://i.pravatar.cc/150?u=4' }, { name: 'Emily', avatar: 'https://i.pravatar.cc/150?u=5' }],
    totalMembers: 2
  },
  {
    name: 'Marketing Website',
    description: 'New landing pages for Q4 campaign.',
    progress: 90,
    status: 'Completed',
    deadline: 'Sep 30, 2023',
    members: [{ name: 'Chris', avatar: 'https://i.pravatar.cc/150?u=6' }, { name: 'Anna', avatar: 'https://i.pravatar.cc/150?u=7' }, { name: 'David', avatar: 'https://i.pravatar.cc/150?u=8' }],
    totalMembers: 4
  },
  {
    name: 'Security Audit',
    description: 'Annual penetration testing and vulnerability assessment.',
    progress: 15,
    status: 'Planning',
    deadline: 'Dec 05, 2023',
    members: [{ name: 'Lisa', avatar: 'https://i.pravatar.cc/150?u=9' }],
    totalMembers: 3
  }
];

const tasks = [
  { title: 'Fix navigation bug on mobile', project: 'Mobile App Redesign', priority: 'high', dueTime: '2:00 PM', assignee: { name: 'Alex', avatar: 'https://i.pravatar.cc/150?u=1' } },
  { title: 'Update user schema', project: 'API V2 Migration', priority: 'medium', dueTime: '4:30 PM', assignee: { name: 'Sarah', avatar: 'https://i.pravatar.cc/150?u=2' } },
  { title: 'Write release notes', project: 'Marketing Website', priority: 'low', dueTime: '5:00 PM', assignee: { name: 'Mike', avatar: 'https://i.pravatar.cc/150?u=3' } },
  { title: 'Review PR #442', project: 'Mobile App Redesign', priority: 'medium', dueTime: '6:00 PM', assignee: { name: 'John', avatar: 'https://i.pravatar.cc/150?u=4' } },
  { title: 'Deploy staging environment', project: 'API V2 Migration', priority: 'high', dueTime: '8:00 PM', assignee: { name: 'Emily', avatar: 'https://i.pravatar.cc/150?u=5' } },
];

const activities = [
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
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Developer! 👋</h1>
        <p className="text-slate-400">Here's what's happening with your projects today.</p>
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
              <h2 className="text-xl font-bold text-white">Active Projects</h2>
              <button className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">View All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, i) => (
                <ProjectCard key={i} index={i} project={project} />
              ))}
            </div>
          </section>

          {/* Chart Section */}
          <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Weekly Productivity</h2>
            <div className="h-48 flex items-end justify-between gap-2">
              {weeklyData.map((data, i) => (
                <div key={i} className="flex flex-col items-center flex-1">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${data.value}%` }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="w-full max-w-[40px] bg-gradient-to-t from-indigo-500/50 to-cyan-400 rounded-t-lg"
                  />
                  <span className="text-xs text-slate-400 mt-2">{data.day}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          {/* Tasks Due Today */}
          <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">Tasks Due Today</h2>
            </div>
            <div className="space-y-3">
              {tasks.map((task, i) => (
                <TaskItem key={i} index={i} task={task} />
              ))}
            </div>
          </section>

          {/* Recent Activity */}
          <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-6">Recent Activity</h2>
            <ActivityFeed activities={activities} />
          </section>

          {/* Team Online */}
          <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Team Online</h2>
            <div className="flex gap-2 flex-wrap">
              {teamOnline.map((member, i) => (
                <div key={i} className="relative">
                  <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full border-2 border-slate-900" />
                  <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-900 ${
                    member.status === 'online' ? 'bg-emerald-500' :
                    member.status === 'away' ? 'bg-amber-500' : 'bg-rose-500'
                  }`} />
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
