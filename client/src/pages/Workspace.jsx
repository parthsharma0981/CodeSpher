import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Users, Folder, LayoutGrid, AlertTriangle } from 'lucide-react';
import ProjectCard from '../components/dashboard/ProjectCard';
import MemberCard from '../components/workspace/MemberCard';
import FileCard from '../components/workspace/FileCard';
import Button from '../components/common/Button';

// Modals
import CreateProjectModal from '../components/workspace/CreateProjectModal';
import InviteMemberModal from '../components/workspace/InviteMemberModal';
import UploadFileModal from '../components/workspace/UploadFileModal';

// Mock Data
const initialWorkspace = {
 name: "CodeSphere Team",
 description: "Main workspace for core engineering team collaborating on the CodeSphere platform.",
 memberCount: 24,
 projects: [
 { name: 'Mobile App Redesign', description: 'Overhauling UI.', progress: 75, status: 'On Track', deadline: 'Oct 24, 2023', members: [{avatar:'https://i.pravatar.cc/150?u=1'}], totalMembers: 5 },
 { name: 'API V2 Migration', description: 'Legacy endpoints to GraphQL.', progress: 40, status: 'At Risk', deadline: 'Nov 12, 2023', members: [{avatar:'https://i.pravatar.cc/150?u=4'}], totalMembers: 2 },
 ],
 members: [
 { name: 'Alex Johnson', email: 'alex@codesphere.io', role: 'Admin', joinedDate: 'Jan 2022', avatar: 'https://i.pravatar.cc/150?u=1' },
 { name: 'Sarah Miller', email: 'sarah@codesphere.io', role: 'Member', joinedDate: 'Mar 2022', avatar: 'https://i.pravatar.cc/150?u=2' },
 { name: 'Mike Smith', email: 'mike@codesphere.io', role: 'Member', joinedDate: 'Jun 2022', avatar: 'https://i.pravatar.cc/150?u=3' },
 { name: 'Emily Davis', email: 'emily@codesphere.io', role: 'Viewer', joinedDate: 'Aug 2022', avatar: 'https://i.pravatar.cc/150?u=5' },
 ],
 files: [
 { name: 'Q4_Architecture_Review.pdf', type: 'pdf', size: '2.4 MB', date: 'Oct 15, 2023', uploadedBy: { name: 'Alex', avatar: 'https://i.pravatar.cc/150?u=1' } },
 { name: 'Design_System_Assets.zip', type: 'zip', size: '45.1 MB', date: 'Oct 12, 2023', uploadedBy: { name: 'Sarah', avatar: 'https://i.pravatar.cc/150?u=2' } },
 { name: 'Hero_Illustration.png', type: 'png', size: '1.2 MB', date: 'Oct 10, 2023', uploadedBy: { name: 'Mike', avatar: 'https://i.pravatar.cc/150?u=3' } },
 ]
};

const tabs = [
 { id: 'projects', label: 'Projects', icon: LayoutGrid },
 { id: 'members', label: 'Members', icon: Users },
 { id: 'files', label: 'Files', icon: Folder },
 { id: 'settings', label: 'Settings', icon: Settings },
];

const Workspace = () => {
 const [workspace, setWorkspace] = useState(initialWorkspace);
 const [activeTab, setActiveTab] = useState('projects');
 
 // Modals state
 const [showProjectModal, setShowProjectModal] = useState(false);
 const [showMemberModal, setShowMemberModal] = useState(false);
 const [showFileModal, setShowFileModal] = useState(false);

 const handleCreateProject = (newProject) => {
 setWorkspace(prev => ({
 ...prev,
 projects: [...prev.projects, newProject]
 }));
 setShowProjectModal(false);
 };

 const handleInviteMember = (newMember) => {
 setWorkspace(prev => ({
 ...prev,
 members: [...prev.members, newMember],
 memberCount: prev.memberCount + 1
 }));
 setShowMemberModal(false);
 };

 const handleUploadFile = (newFile) => {
 setWorkspace(prev => ({
 ...prev,
 files: [...prev.files, newFile]
 }));
 setShowFileModal(false);
 };

 return (
 <div className="p-8 max-w-7xl mx-auto min-h-screen">
 {/* Header */}
 <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 mb-8 relative overflow-hidden">
 <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
 <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
 <div>
 <div className="flex items-center gap-3 mb-2">
 <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-black to-cyan-500 flex items-center justify-center text-xl font-bold text-black dark:text-white shadow-lg">
 {workspace.name.charAt(0)}
 </div>
 <h1 className="text-3xl font-bold text-black dark:text-white">{workspace.name}</h1>
 </div>
 <p className="text-neutral-400 max-w-2xl">{workspace.description}</p>
 </div>
 <div className="flex gap-4">
 <div className="bg-white/5 rounded-xl p-3 px-5 border border-neutral-200 dark:border-neutral-800 text-center">
 <div className="text-2xl font-bold text-black dark:text-white">{workspace.memberCount}</div>
 <div className="text-xs text-neutral-400">Members</div>
 </div>
 <Button variant="primary" onClick={() => setActiveTab('settings')}>
 <Settings className="w-4 h-4 mr-2" />
 Settings
 </Button>
 </div>
 </div>
 </div>

 {/* Navigation */}
 <div className="flex space-x-1 mb-8 bg-white/5 p-1 rounded-2xl border border-neutral-200 dark:border-neutral-800 max-w-fit">
 {tabs.map((tab) => {
 const Icon = tab.icon;
 const isActive = activeTab === tab.id;
 return (
 <button
 key={tab.id}
 onClick={() => setActiveTab(tab.id)}
 className={`relative flex items-center px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
 isActive ? 'text-black dark:text-white' : 'text-neutral-400 hover:text-black dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800'
 }`}
 >
 {isActive && (
 <motion.div
 layoutId="workspace-active-tab"
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
 {activeTab === 'projects' && (
 <div>
 <div className="flex justify-between items-center mb-6">
 <h2 className="text-xl font-bold text-black dark:text-white">Workspace Projects</h2>
 <Button variant="primary" size="sm" onClick={() => setShowProjectModal(true)}>+ New Project</Button>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {workspace.projects.map((project, i) => (
 <ProjectCard key={i} index={i} project={project} />
 ))}
 </div>
 </div>
 )}

 {activeTab === 'members' && (
 <div>
 <div className="flex justify-between items-center mb-6">
 <h2 className="text-xl font-bold text-black dark:text-white">Team Members</h2>
 <Button variant="primary" size="sm" onClick={() => setShowMemberModal(true)}>+ Invite Member</Button>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
 {workspace.members.map((member, i) => (
 <MemberCard key={i} index={i} member={member} />
 ))}
 </div>
 </div>
 )}

 {activeTab === 'files' && (
 <div>
 <div className="flex justify-between items-center mb-6">
 <h2 className="text-xl font-bold text-black dark:text-white">Shared Files</h2>
 <Button variant="primary" size="sm" onClick={() => setShowFileModal(true)}>Upload File</Button>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
 {workspace.files.map((file, i) => (
 <FileCard key={i} index={i} file={file} />
 ))}
 </div>
 </div>
 )}

 {activeTab === 'settings' && (
 <div className="max-w-2xl">
 <h2 className="text-xl font-bold text-black dark:text-white mb-6">Workspace Settings</h2>
 
 <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 mb-8 space-y-6">
 <div>
 <label className="block text-sm font-medium text-neutral-300 mb-2">Workspace Name</label>
 <input 
 type="text" 
 defaultValue={workspace.name}
 className="w-full bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-neutral-300 mb-2">Description</label>
 <textarea 
 defaultValue={workspace.description}
 rows={4}
 className="w-full bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow resize-none"
 />
 </div>
 <div className="flex justify-end">
 <Button variant="primary">Save Changes</Button>
 </div>
 </div>

 <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-6">
 <div className="flex items-start gap-4">
 <div className="p-3 bg-rose-500/10 rounded-xl text-rose-500">
 <AlertTriangle className="w-6 h-6" />
 </div>
 <div>
 <h3 className="text-lg font-bold text-black dark:text-white mb-1">Danger Zone</h3>
 <p className="text-sm text-neutral-400 mb-4">
 Deleting this workspace will remove all associated projects, tasks, and files. This action cannot be undone.
 </p>
 <Button variant="danger">Delete Workspace</Button>
 </div>
 </div>
 </div>
 </div>
 )}
 </motion.div>
 </AnimatePresence>

 {/* Modal Declarations */}
 <CreateProjectModal
 isOpen={showProjectModal}
 onClose={() => setShowProjectModal(false)}
 onSubmit={handleCreateProject}
 />
 <InviteMemberModal
 isOpen={showMemberModal}
 onClose={() => setShowMemberModal(false)}
 onSubmit={handleInviteMember}
 />
 <UploadFileModal
 isOpen={showFileModal}
 onClose={() => setShowFileModal(false)}
 onSubmit={handleUploadFile}
 />
 </div>
 );
};

export default Workspace;
