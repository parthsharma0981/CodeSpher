import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trello, Clock, Users, Folder, Settings, Activity } from 'lucide-react';
import Button from '../components/common/Button';
import MemberCard from '../components/workspace/MemberCard';
import FileCard from '../components/workspace/FileCard';
import ActivityFeed from '../components/dashboard/ActivityFeed';

// Modals
import InviteMemberModal from '../components/workspace/InviteMemberModal';
import UploadFileModal from '../components/workspace/UploadFileModal';

// Mock Data
const initialProject = {
  id: 'proj-1',
  name: "Mobile App Redesign",
  description: "Comprehensive overhaul of the iOS and Android applications aiming for a more modern, intuitive user experience.",
  progress: 68,
  deadline: 'Oct 24, 2023',
  status: 'In Progress',
  members: [
    { name: 'Alex Johnson', email: 'alex@codesphere.io', role: 'Lead Design', joinedDate: 'Jan 2022', avatar: 'https://i.pravatar.cc/150?u=1' },
    { name: 'Sarah Miller', email: 'sarah@codesphere.io', role: 'Frontend', joinedDate: 'Mar 2022', avatar: 'https://i.pravatar.cc/150?u=2' },
    { name: 'Mike Smith', email: 'mike@codesphere.io', role: 'Backend', joinedDate: 'Jun 2022', avatar: 'https://i.pravatar.cc/150?u=3' },
  ],
  files: [
    { name: 'Figma_Links.pdf', type: 'pdf', size: '1.4 MB', date: 'Oct 15, 2023', uploadedBy: { name: 'Alex', avatar: 'https://i.pravatar.cc/150?u=1' } },
    { name: 'Assets_Export.zip', type: 'zip', size: '24.1 MB', date: 'Oct 12, 2023', uploadedBy: { name: 'Sarah', avatar: 'https://i.pravatar.cc/150?u=2' } },
  ],
  activities: [
    { id: 1, type: 'commit', user: { name: 'Sarah', avatar: 'https://i.pravatar.cc/150?u=2' }, action: 'pushed to feature/nav', timestamp: '10 mins ago' },
    { id: 2, type: 'comment', user: { name: 'Alex', avatar: 'https://i.pravatar.cc/150?u=1' }, action: 'commented on Task #45', timestamp: '1 hour ago' },
    { id: 3, type: 'merge', user: { name: 'Mike', avatar: 'https://i.pravatar.cc/150?u=3' }, action: 'merged API integration', timestamp: '3 hours ago' },
  ]
};

const tabs = [
  { id: 'overview', label: 'Overview', icon: Activity },
  { id: 'board', label: 'Task Board', icon: Trello },
  { id: 'members', label: 'Members', icon: Users },
  { id: 'files', label: 'Files', icon: Folder },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState(initialProject);
  const [activeTab, setActiveTab] = useState('overview');

  // Modals state
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);

  const handleAddMember = (newMember) => {
    setProject(prev => ({
      ...prev,
      members: [...prev.members, newMember]
    }));
    setShowMemberModal(false);
  };

  const handleUploadFile = (newFile) => {
    setProject(prev => ({
      ...prev,
      files: [...prev.files, newFile]
    }));
    setShowFileModal(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-medium border border-amber-500/20">
                {project.status}
              </span>
              <span className="flex items-center text-sm text-neutral-400">
                <Clock className="w-4 h-4 mr-1.5" />
                Due {project.deadline}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{project.name}</h1>
            <p className="text-neutral-400 max-w-2xl">{project.description}</p>
          </div>

          <div className="flex items-center gap-8 bg-neutral-900/50 p-6 rounded-2xl border border-white/5">
            {/* Progress Circle */}
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                <circle 
                  cx="50" cy="50" r="45" fill="none" stroke="url(#gradient)" 
                  strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - project.progress / 100)}`}
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366F1" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute text-lg font-bold text-white">{project.progress}%</span>
            </div>
            
            <div className="flex -space-x-3">
              {project.members.map((member, i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-neutral-900 overflow-hidden bg-neutral-700">
                  <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex space-x-1 mb-8 bg-white/5 p-1 rounded-2xl border border-white/10 max-w-fit overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center px-5 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                isActive ? 'text-white' : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="project-active-tab"
                  className="absolute inset-0 bg-white/10 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className="w-4 h-4 mr-2 relative z-10" />
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
                  <ActivityFeed activities={project.activities} />
                </section>
              </div>
              <div className="space-y-8">
                <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h2 className="text-lg font-bold text-white mb-4">Quick Links</h2>
                  <div className="space-y-2">
                    <Link to={`/projects/${id || 'proj-1'}/board`} className="flex items-center p-3 rounded-xl hover:bg-white/5 text-neutral-300 transition-colors border border-transparent hover:border-white/10">
                      <Trello className="w-5 h-5 mr-3 text-indigo-400" />
                      Go to Task Board
                    </Link>
                  </div>
                </section>
              </div>
            </div>
          )}

          {activeTab === 'board' && (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
              <Trello className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Kanban Board</h2>
              <p className="text-neutral-400 mb-6 max-w-md mx-auto">Track tasks, manage workflows, and collaborate with your team visually.</p>
              <Link to={`/projects/${id || 'proj-1'}/board`}>
                <Button variant="primary">Open Full Board</Button>
              </Link>
            </div>
          )}

          {activeTab === 'members' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Project Members</h2>
                <Button variant="primary" size="sm" onClick={() => setShowMemberModal(true)}>+ Add Member</Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {project.members.map((member, i) => (
                  <MemberCard key={i} index={i} member={member} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'files' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Project Files</h2>
                <Button variant="primary" size="sm" onClick={() => setShowFileModal(true)}>Upload File</Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {project.files.map((file, i) => (
                  <FileCard key={i} index={i} file={file} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-2xl">
              <h2 className="text-xl font-bold text-white mb-6">Project Settings</h2>
              
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">Project Name</label>
                  <input 
                    type="text" 
                    defaultValue={project.name}
                    className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">Description</label>
                  <textarea 
                    defaultValue={project.description}
                    rows={4}
                    className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow resize-none"
                  />
                </div>
                <div className="flex justify-end">
                  <Button variant="primary">Save Changes</Button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <InviteMemberModal
        isOpen={showMemberModal}
        onClose={() => setShowMemberModal(false)}
        onSubmit={handleAddMember}
      />
      <UploadFileModal
        isOpen={showFileModal}
        onClose={() => setShowFileModal(false)}
        onSubmit={handleUploadFile}
      />
    </div>
  );
};

export default Project;
