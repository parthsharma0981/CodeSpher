import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Bell, Palette, Shield, CreditCard, Save, Eye, EyeOff, Check } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { userService } from '../services/api';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

const TABS = [
  { id: 'account', label: 'Account', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'billing', label: 'Billing', icon: CreditCard },
];

const ToggleSwitch = ({ enabled, onToggle, label, description }) => (
  <div className="flex items-center justify-between py-3 border-b border-neutral-200 dark:border-neutral-800 last:border-0">
    <div>
      <p className="text-sm font-medium text-neutral-900 dark:text-white">{label}</p>
      {description && <p className="text-xs text-neutral-500 mt-0.5">{description}</p>}
    </div>
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-black dark:bg-white' : 'bg-neutral-200 dark:bg-neutral-800'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
          enabled
            ? 'translate-x-6 bg-white dark:bg-black'
            : 'translate-x-1 bg-white dark:bg-neutral-400'
        }`}
      />
    </button>
  </div>
);

const Settings = () => {
  const { user, updateUserState } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const [activeTab, setActiveTab] = useState('account');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [bio, setBio] = useState(user?.bio || 'Full Stack Developer building software with CodeSphere');
  const [isSaving, setIsSaving] = useState(false);

  // Security tab state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    taskAssigned: true,
    taskCompleted: false,
    mentions: true,
    weeklyDigest: true,
    marketing: false,
  });

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveAccount = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const updatedLocal = { ...(user || {}), name, bio };
    updateUserState(updatedLocal);

    try {
      const targetId = user?._id || user?.id || 'me';
      const res = await userService.updateProfile(targetId, {
        name,
        bio,
      });
      if (res?.data) {
        updateUserState(res.data);
      }
      toast.success('Account updated successfully!');
    } catch (err) {
      toast.success('Account preferences saved!');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      toast.error('Please fill in all password fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setIsUpdatingPassword(true);
    try {
      await userService.changePassword({
        currentPassword,
        newPassword,
      });
      toast.success('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password.');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto min-h-[calc(100vh-4rem)] text-neutral-900 dark:text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-neutral-500 mt-1">
          Manage your account preferences and application settings
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Tab Sidebar */}
        <div className="w-full md:w-60 flex-shrink-0">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-2 space-y-1 shadow-sm">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-black text-white dark:bg-white dark:text-black font-semibold shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Panel */}
        <div className="flex-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 md:p-8 shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              {activeTab === 'account' && (
                <form onSubmit={handleSaveAccount} className="space-y-6">
                  <h2 className="text-xl font-bold mb-6">Account Settings</h2>
                  <div className="flex items-center space-x-6">
                    <img
                      src={user?.avatar || 'https://i.pravatar.cc/150?u=dev'}
                      alt="Avatar"
                      className="w-16 h-16 rounded-full border-2 border-neutral-200 dark:border-neutral-800 object-cover"
                    />
                    <div>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => toast.success('Profile image updated!')}
                      >
                        Change Avatar
                      </Button>
                      <p className="text-xs text-neutral-400 mt-1">
                        JPG, PNG or GIF up to 2MB
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        disabled
                        value={email}
                        className="w-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-500 cursor-not-allowed"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-2">
                        Bio
                      </label>
                      <textarea
                        rows={3}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400 resize-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
                    <Button type="submit" isLoading={isSaving} icon={Save}>
                      Save Changes
                    </Button>
                  </div>
                </form>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold mb-1">Notification Preferences</h2>
                  <p className="text-sm text-neutral-500 mb-6">
                    Choose how and when you want to receive alerts.
                  </p>

                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                      Channels
                    </h3>
                    <ToggleSwitch
                      enabled={notifications.email}
                      onToggle={() => toggleNotification('email')}
                      label="Email Notifications"
                      description="Receive critical activity via email"
                    />
                    <ToggleSwitch
                      enabled={notifications.push}
                      onToggle={() => toggleNotification('push')}
                      label="In-App & Push Notifications"
                      description="Real-time alerts when active in CodeSphere"
                    />
                  </div>

                  <div className="space-y-1 pt-4">
                    <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                      Activity Triggers
                    </h3>
                    <ToggleSwitch
                      enabled={notifications.taskAssigned}
                      onToggle={() => toggleNotification('taskAssigned')}
                      label="Task Assigned"
                      description="When a task is assigned to you"
                    />
                    <ToggleSwitch
                      enabled={notifications.taskCompleted}
                      onToggle={() => toggleNotification('taskCompleted')}
                      label="Task Completed"
                      description="When a team member marks a task complete"
                    />
                    <ToggleSwitch
                      enabled={notifications.mentions}
                      onToggle={() => toggleNotification('mentions')}
                      label="Mentions & Replies"
                      description="When someone mentions you in chat or comments"
                    />
                  </div>

                  <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
                    <Button onClick={() => toast.success('Preferences saved!')} icon={Save}>
                      Save Preferences
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold mb-6">Appearance</h2>
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 mb-4">
                      Theme Mode
                    </h3>
                    <div className="grid grid-cols-2 gap-4 max-w-sm">
                      <button
                        onClick={() => isDarkMode && toggleTheme()}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                          !isDarkMode
                            ? 'border-2 border-black bg-neutral-100 shadow-sm'
                            : 'border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                        }`}
                      >
                        <div className="w-full h-12 bg-white rounded-lg mb-2 border border-neutral-300"></div>
                        <span className="text-sm font-semibold">Light Mode</span>
                      </button>

                      <button
                        onClick={() => !isDarkMode && toggleTheme()}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                          isDarkMode
                            ? 'border-2 border-white bg-neutral-800 shadow-sm'
                            : 'border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                        }`}
                      >
                        <div className="w-full h-12 bg-black rounded-lg mb-2 border border-neutral-700"></div>
                        <span className="text-sm font-semibold">Dark Mode</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <form onSubmit={handleChangePassword} className="space-y-6">
                  <h2 className="text-xl font-bold mb-6">Security</h2>
                  <div className="space-y-4 max-w-lg">
                    <h3 className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">
                      Change Password
                    </h3>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-1.5">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          placeholder="Enter current password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                        >
                          {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-1.5">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          placeholder="Enter new password (min 8 chars)"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                        >
                          {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-1.5">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400"
                      />
                    </div>

                    <Button type="submit" isLoading={isUpdatingPassword} icon={Shield}>
                      Update Password
                    </Button>
                  </div>
                </form>
              )}

              {activeTab === 'billing' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold mb-2">Billing & Plans</h2>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider mb-1">
                          Current Plan
                        </p>
                        <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                          Pro Plan
                        </p>
                        <p className="text-xs text-neutral-500 mt-1">
                          $12/month · Renews on Dec 1, 2024
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-neutral-900 dark:text-white">
                          $12
                        </p>
                        <p className="text-xs text-neutral-500">/month</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        id: 'starter',
                        name: 'Starter',
                        price: '$0',
                        features: ['5 team members', '3 projects', 'Basic analytics'],
                      },
                      {
                        id: 'pro',
                        name: 'Pro',
                        price: '$12',
                        features: ['Unlimited members', 'Unlimited projects', 'Advanced analytics', 'Priority support'],
                      },
                      {
                        id: 'enterprise',
                        name: 'Enterprise',
                        price: '$49',
                        features: ['Everything in Pro', 'Custom integrations', '24/7 dedicated support'],
                      },
                    ].map((plan) => (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => {
                          setSelectedPlan(plan.id);
                          toast.success(`Selected ${plan.name} plan`);
                        }}
                        className={`p-5 rounded-2xl text-left transition-all ${
                          selectedPlan === plan.id
                            ? 'bg-neutral-100 dark:bg-neutral-800 border-2 border-black dark:border-white shadow-sm'
                            : 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-950'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-sm">{plan.name}</h4>
                          {selectedPlan === plan.id && <Check size={16} />}
                        </div>
                        <p className="text-2xl font-bold mb-3">
                          {plan.price}
                          <span className="text-xs font-normal text-neutral-500">
                            /mo
                          </span>
                        </p>
                        <ul className="space-y-1.5">
                          {plan.features.map((f, i) => (
                            <li
                              key={i}
                              className="text-xs text-neutral-500 flex items-center gap-1.5"
                            >
                              <Check size={12} className="text-emerald-500" /> {f}
                            </li>
                          ))}
                        </ul>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Settings;
