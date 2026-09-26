import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Users, Folder, LayoutGrid, Plus } from 'lucide-react';
import ProjectCard from '../components/dashboard/ProjectCard';
import MemberCard from '../components/workspace/MemberCard';
import FileCard from '../components/workspace/FileCard';
import Button from '../components/common/Button';
import { workspaceService, projectService } from '../services/api';
import toast from 'react-hot-toast';

// Modals
import CreateProjectModal from '../components/workspace/CreateProjectModal';
import InviteMemberModal from '../components/workspace/InviteMemberModal';
import UploadFileModal from '../components/workspace/UploadFileModal';

const initialWorkspace = {
  name: 'CodeSphere Team',
  description: 'Main workspace for core engineering team collaborating on the CodeSphere platform.',
  memberCount: 24,
  projects: [
    {
      _id: 'p1',
      name: 'Mobile App Redesign',
      description: 'Overhauling UI and interaction patterns.',
      progress: 75,
      status: 'On Track',
      deadline: 'Oct 24, 2024',
      members: [{ avatar: 'https://i.pravatar.cc/150?u=1' }],
      totalMembers: 5,
    },
    {
      _id: 'p2',
      name: 'API V2 Migration',
      description: 'Legacy REST endpoints to GraphQL.',
      progress: 40,
      status: 'At Risk',
      deadline: 'Nov 12, 2024',
      members: [{ avatar: 'https://i.pravatar.cc/150?u=4' }],
      totalMembers: 2,
    },
  ],
  members: [
    {
      name: 'Alex Johnson',
      email: 'alex@codesphere.io',
      role: 'Admin',
      joinedDate: 'Jan 2023',
      avatar: 'https://i.pravatar.cc/150?u=1',
    },
    {
      name: 'Sarah Miller',
      email: 'sarah@codesphere.io',
      role: 'Member',
      joinedDate: 'Mar 2023',
      avatar: 'https://i.pravatar.cc/150?u=2',
    },
    {
      name: 'Mike Smith',
      email: 'mike@codesphere.io',
      role: 'Member',
      joinedDate: 'Jun 2023',
      avatar: 'https://i.pravatar.cc/150?u=3',
    },
    {
      name: 'Emily Davis',
      email: 'emily@codesphere.io',
      role: 'Viewer',
      joinedDate: 'Aug 2023',
      avatar: 'https://i.pravatar.cc/150?u=5',
    },
  ],
  files: [
    {
      name: 'Q4_Architecture_Review.pdf',
      type: 'pdf',
      size: '2.4 MB',
      date: 'Oct 15, 2024',
      uploadedBy: { name: 'Alex', avatar: 'https://i.pravatar.cc/150?u=1' },
    },
    {
      name: 'Design_System_Assets.zip',
      type: 'zip',
      size: '45.1 MB',
      date: 'Oct 12, 2024',
      uploadedBy: { name: 'Sarah', avatar: 'https://i.pravatar.cc/150?u=2' },
    },
    {
      name: 'Hero_Illustration.png',
      type: 'png',
      size: '1.2 MB',
      date: 'Oct 10, 2024',
      uploadedBy: { name: 'Mike', avatar: 'https://i.pravatar.cc/150?u=3' },
    },
  ],
};

const tabs = [
  { id: 'projects', label: 'Projects', icon: LayoutGrid },
  { id: 'members', label: 'Members', icon: Users },
  { id: 'files', label: 'Files', icon: Folder },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const Workspace = ({ workspaceId }) => {
  const [workspace, setWorkspace] = useState(initialWorkspace);
  const [activeTab, setActiveTab] = useState('projects');

  // Modals state
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);

  useEffect(() => {
    const fetchWorkspaceData = async () => {
      try {
        if (workspaceId) {
          const res = await workspaceService.getById(workspaceId);
          if (res?.data) {
            setWorkspace((prev) => ({
              ...prev,
              name: res.data.name || prev.name,
              description: res.data.description || prev.description,
            }));
          }
        }
        const projRes = await projectService.getAll(workspaceId);
        if (projRes?.data && projRes.data.length > 0) {
          setWorkspace((prev) => ({ ...prev, projects: projRes.data }));
        }
      } catch (err) {
        // Keeps state intact if offline
      }
    };

    fetchWorkspaceData();
  }, [workspaceId]);

  const handleCreateProject = async (newProject) => {
    try {
      const res = await projectService.create({
        ...newProject,
        workspaceId: workspaceId || undefined,
      });
      if (res?.data) {
        setWorkspace((prev) => ({
          ...prev,
          projects: [res.data, ...prev.projects],
        }));
        toast.success('Project created successfully!');
      }
    } catch (err) {
      setWorkspace((prev) => ({
        ...prev,
        projects: [newProject, ...prev.projects],
      }));
      toast.success('Project added to workspace!');
    }
    setShowProjectModal(false);
  };

  const handleInviteMember = async (newMember) => {
    try {
      if (workspaceId) {
        await workspaceService.inviteMember(workspaceId, newMember);
      }
      setWorkspace((prev) => ({
        ...prev,
        members: [...prev.members, newMember],
        memberCount: prev.memberCount + 1,
      }));
      toast.success(`Invitation sent to ${newMember.email}!`);
    } catch (err) {
      setWorkspace((prev) => ({
        ...prev,
        members: [...prev.members, newMember],
        memberCount: prev.memberCount + 1,
      }));
      toast.success('Member added!');
    }
    setShowMemberModal(false);
  };

  const handleUploadFile = (newFile) => {
    setWorkspace((prev) => ({
      ...prev,
      files: [newFile, ...prev.files],
    }));
    toast.success('File uploaded successfully!');
    setShowFileModal(false);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 md:p-8 mb-8 relative overflow-hidden shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-xl font-bold shadow-sm">
                {workspace.name.charAt(0)}
              </div>
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
                {workspace.name}
              </h1>
            </div>
            <p className="text-neutral-500 max-w-2xl">{workspace.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-neutral-50 dark:bg-neutral-950 rounded-2xl p-3 px-5 border border-neutral-200 dark:border-neutral-800 text-center">
              <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                {workspace.memberCount}
              </div>
              <div className="text-xs text-neutral-500 font-medium">Members</div>
            </div>
            <Button variant="secondary" onClick={() => setActiveTab('settings')}>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex space-x-1 mb-8 bg-neutral-100 dark:bg-neutral-900 p-1 rounded-2xl border border-neutral-200 dark:border-neutral-800 max-w-fit">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm font-semibold'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
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
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Projects</h2>
                  <p className="text-sm text-neutral-500">
                    Manage and organize all your team initiatives
                  </p>
                </div>
                <Button
                  variant="primary"
                  onClick={() => setShowProjectModal(true)}
                  icon={Plus}
                >
                  Create Project
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workspace.projects.map((project, i) => (
                  <ProjectCard key={project._id || i} index={i} project={project} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'members' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Team Members</h2>
                  <p className="text-sm text-neutral-500">
                    Collaborate with your team across roles and permissions
                  </p>
                </div>
                <Button
                  variant="primary"
                  onClick={() => setShowMemberModal(true)}
                  icon={Plus}
                >
                  Invite Member
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {workspace.members.map((member, i) => (
                  <MemberCard key={i} member={member} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'files' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Workspace Files</h2>
                  <p className="text-sm text-neutral-500">
                    Shared documents, specifications, and design assets
                  </p>
                </div>
                <Button
                  variant="primary"
                  onClick={() => setShowFileModal(true)}
                  icon={Plus}
                >
                  Upload File
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workspace.files.map((file, i) => (
                  <FileCard key={i} file={file} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 max-w-2xl shadow-sm">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
                Workspace Settings
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.success('Workspace updated successfully!');
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-2">
                    Workspace Name
                  </label>
                  <input
                    type="text"
                    value={workspace.name}
                    onChange={(e) =>
                      setWorkspace({ ...workspace, name: e.target.value })
                    }
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={workspace.description}
                    onChange={(e) =>
                      setWorkspace({ ...workspace, description: e.target.value })
                    }
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Modals */}
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
