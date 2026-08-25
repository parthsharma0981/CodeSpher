import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Database, Server, Activity, Search, Filter, Trash2, ShieldAlert } from 'lucide-react';

const INITIAL_USERS = [
  { id: 1, name: 'Alex Developer', email: 'alex@example.com', role: 'Admin', status: 'Active', joined: 'Sep 12, 2022', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'Sarah Drasner', email: 'sarah@example.com', role: 'User', status: 'Active', joined: 'Oct 05, 2022', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Suspended', joined: 'Jan 15, 2023', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, name: 'Mike Smith', email: 'mike@example.com', role: 'User', status: 'Active', joined: 'Jun 22, 2022', avatar: 'https://i.pravatar.cc/150?u=4' },
];

const AdminPanel = () => {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const handleRoleChange = (userId, newRole) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
  };

  const toggleUserStatus = (userId) => {
    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u
    ));
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(prev => prev.filter(u => u.id !== userId));
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
            Admin Panel
          </h1>
          <p className="text-gray-400 mt-1">System overview and user management</p>
        </div>
        <div className="flex items-center space-x-4 bg-white/5 border border-white/10 rounded-xl px-4 py-2 backdrop-blur-md">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
            <span className="text-gray-300">API</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
            <span className="text-gray-300">DB</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
            <span className="text-gray-300">Socket</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Users', value: users.length, icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-500/20' },
          { label: 'Active Workspaces', value: '342', icon: Activity, color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
          { label: 'Total Tasks', value: '45.2k', icon: Database, color: 'text-cyan-400', bg: 'bg-cyan-500/20' },
          { label: 'Storage Used', value: '1.2 TB', icon: Server, color: 'text-purple-400', bg: 'bg-purple-500/20' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl flex items-center space-x-4"
            >
              <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
                <Icon size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* User Management Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl mb-8"
      >
        <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="text-lg font-bold">User Management</h3>
          <div className="flex items-center space-x-3 w-full sm:w-auto relative">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-900 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            
            {/* Filter Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 border rounded-lg text-gray-400 hover:text-white transition-colors ${showFilters ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white/5 border-white/10'}`}
              >
                <Filter size={18} />
              </button>
              {showFilters && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-neutral-800 border border-white/10 rounded-xl shadow-xl z-50 p-2">
                  <p className="text-xs font-semibold text-neutral-400 uppercase px-3 py-2">Role Filter</p>
                  {['All', 'Admin', 'User'].map(r => (
                    <button
                      key={r}
                      onClick={() => { setRoleFilter(r); setShowFilters(false); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${roleFilter === r ? 'bg-indigo-600/20 text-indigo-400' : 'text-neutral-300 hover:bg-white/5'}`}
                    >
                      {r} Users
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/[0.02] text-xs uppercase text-gray-400 font-medium">
              <tr>
                <th className="px-6 py-4 text-left">User</th>
                <th className="px-6 py-4 text-left">Role</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Joined</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, i) => (
                  <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <div className="font-medium text-white">{user.name}</div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select 
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        className="bg-transparent text-sm text-gray-300 focus:outline-none cursor-pointer border border-white/10 rounded px-2 py-1 bg-neutral-900"
                      >
                        <option value="Admin" className="bg-neutral-900">Admin</option>
                        <option value="User" className="bg-neutral-900">User</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => toggleUserStatus(user.id)}
                        className={`px-2.5 py-1 text-xs font-semibold rounded-full border transition-all ${
                          user.status === 'Active' 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20' 
                            : 'bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/20'
                        }`}
                      >
                        {user.status}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {user.joined}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-gray-500 hover:text-rose-400 transition-colors p-1.5 rounded-lg hover:bg-white/5"
                        title="Delete User"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500 italic">
                    No users matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-white/10 flex items-center justify-between bg-white/[0.02]">
          <span className="text-sm text-gray-400">Showing {filteredUsers.length} of {users.length} users</span>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-sm text-gray-400 hover:text-white transition-colors">Prev</button>
            <button className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm font-medium">1</button>
            <button className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-sm text-gray-400 hover:text-white transition-colors">Next</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminPanel;
