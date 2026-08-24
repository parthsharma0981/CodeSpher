import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Bell, Palette, Shield, CreditCard, Save, Eye, EyeOff, Check } from 'lucide-react';

const TABS = [
  { id: 'account', label: 'Account', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'billing', label: 'Billing', icon: CreditCard },
];

const ToggleSwitch = ({ enabled, onToggle, label, description }) => (
  <div className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
    <div>
      <p className="text-sm font-medium text-white">{label}</p>
      {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
    </div>
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enabled ? 'bg-indigo-600' : 'bg-white/10'}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  </div>
);

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('dark');
  const [selectedAccent, setSelectedAccent] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [notifications, setNotifications] = useState({
    email: true, push: true, taskAssigned: true, taskCompleted: false,
    mentions: true, weeklyDigest: true, marketing: false,
  });

  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto min-h-[calc(100vh-4rem)] text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">Settings</h1>
        <p className="text-gray-400 mt-1">Manage your account preferences and settings</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-xl space-y-1">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 font-medium' : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}`}>
                  <Icon size={18} /><span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>

              {activeTab === 'account' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold mb-6">Account Settings</h2>
                  <div className="flex items-center space-x-6">
                    <img src="https://i.pravatar.cc/150?u=dev" alt="Avatar" className="w-20 h-20 rounded-full border-2 border-white/20 object-cover" />
                    <div>
                      <button className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-sm font-medium transition-colors mb-2">Change Avatar</button>
                      <p className="text-xs text-gray-400">JPG, GIF or PNG. Max size of 800K</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                      <input type="text" defaultValue="Alex Developer" className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                      <input type="email" defaultValue="alex@example.com" className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Username</label>
                      <input type="text" defaultValue="alexdev" className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Timezone</label>
                      <select className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 appearance-none">
                        <option>(UTC-08:00) Pacific Time</option><option>(UTC-05:00) Eastern Time</option><option>(UTC+00:00) GMT</option><option>(UTC+05:30) IST</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-400 mb-2">Bio</label>
                      <textarea rows="3" defaultValue="Passionate frontend engineer..." className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 resize-none"></textarea>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-white/10 flex justify-end">
                    <button className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"><Save size={18} /><span>Save Changes</span></button>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold mb-2">Notification Preferences</h2>
                  <p className="text-sm text-gray-400 mb-6">Choose how and when you want to be notified.</p>
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Delivery Channels</h3>
                    <ToggleSwitch enabled={notifications.email} onToggle={() => toggleNotification('email')} label="Email Notifications" description="Receive updates via email" />
                    <ToggleSwitch enabled={notifications.push} onToggle={() => toggleNotification('push')} label="Push Notifications" description="Browser push notifications" />
                  </div>
                  <div className="space-y-2 pt-4">
                    <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Activity</h3>
                    <ToggleSwitch enabled={notifications.taskAssigned} onToggle={() => toggleNotification('taskAssigned')} label="Task Assigned" description="When a task is assigned to you" />
                    <ToggleSwitch enabled={notifications.taskCompleted} onToggle={() => toggleNotification('taskCompleted')} label="Task Completed" description="When a team member completes a task" />
                    <ToggleSwitch enabled={notifications.mentions} onToggle={() => toggleNotification('mentions')} label="Mentions" description="When someone mentions you in a comment" />
                  </div>
                  <div className="space-y-2 pt-4">
                    <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Digest</h3>
                    <ToggleSwitch enabled={notifications.weeklyDigest} onToggle={() => toggleNotification('weeklyDigest')} label="Weekly Digest" description="Summary of weekly activity every Monday" />
                    <ToggleSwitch enabled={notifications.marketing} onToggle={() => toggleNotification('marketing')} label="Product Updates" description="News about new features and improvements" />
                  </div>
                  <div className="pt-6 border-t border-white/10 flex justify-end">
                    <button className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"><Save size={18} /><span>Save Preferences</span></button>
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold mb-6">Appearance</h2>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-4">Theme</h3>
                    <div className="grid grid-cols-3 gap-4 max-w-lg">
                      {[{ id: 'light', label: 'Light', bg: 'bg-white', border: 'border-gray-200' }, { id: 'dark', label: 'Dark', bg: 'bg-slate-900', border: 'border-white/20' }, { id: 'system', label: 'System', bg: 'bg-gradient-to-r from-white to-slate-900', border: 'border-white/20' }].map(theme => (
                        <button key={theme.id} onClick={() => setSelectedTheme(theme.id)}
                          className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${selectedTheme === theme.id ? 'border-2 border-indigo-500 bg-white/10' : 'border border-white/10 bg-white/5 hover:bg-white/10'}`}>
                          <div className={`w-full h-16 ${theme.bg} rounded-md mb-3 border ${theme.border}`}></div>
                          <span className={`text-sm font-medium ${selectedTheme === theme.id ? 'text-indigo-400' : ''}`}>{theme.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="pt-6 border-t border-white/10">
                    <h3 className="text-sm font-medium text-gray-400 mb-4">Accent Color</h3>
                    <div className="flex space-x-4">
                      {['bg-indigo-500', 'bg-purple-500', 'bg-cyan-500', 'bg-emerald-500', 'bg-rose-500', 'bg-amber-500'].map((color, i) => (
                        <button key={color} onClick={() => setSelectedAccent(i)} className={`w-10 h-10 rounded-full ${color} flex items-center justify-center transition-transform hover:scale-110 ${selectedAccent === i ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900' : ''}`}>
                          {selectedAccent === i && <div className="w-3 h-3 bg-white rounded-full"></div>}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="pt-6 border-t border-white/10">
                    <h3 className="text-sm font-medium text-gray-400 mb-4">Font Size</h3>
                    <div className="flex items-center gap-4 max-w-md">
                      <span className="text-xs text-gray-500">A</span>
                      <input type="range" min="12" max="18" defaultValue="14" className="flex-1 accent-indigo-500" />
                      <span className="text-lg text-gray-500">A</span>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-white/10 flex justify-end">
                    <button className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"><Save size={18} /><span>Save Changes</span></button>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-8">
                  <h2 className="text-xl font-bold mb-6">Security</h2>
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Change Password</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Current Password</label>
                      <div className="relative">
                        <input type={showCurrentPassword ? 'text' : 'password'} placeholder="Enter current password" className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 pr-10" />
                        <button onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                          {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">New Password</label>
                      <div className="relative">
                        <input type={showNewPassword ? 'text' : 'password'} placeholder="Enter new password" className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 pr-10" />
                        <button onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                          {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Confirm New Password</label>
                      <input type="password" placeholder="Confirm new password" className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500" />
                    </div>
                    <button className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"><Shield size={16} /><span>Update Password</span></button>
                  </div>
                  <div className="pt-6 border-t border-white/10 space-y-4">
                    <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                      <div><p className="text-sm font-medium text-white">Two-Factor Authentication</p><p className="text-xs text-gray-400 mt-0.5">Add an extra layer of security to your account</p></div>
                      <button className="px-4 py-2 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-sm font-medium hover:bg-emerald-600/30 transition-colors">Enable 2FA</button>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-white/10 space-y-4">
                    <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Active Sessions</h3>
                    {[{ device: 'Chrome on Windows', location: 'San Francisco, CA', time: 'Active now', current: true }, { device: 'Safari on iPhone', location: 'San Francisco, CA', time: '2 hours ago', current: false }].map((session, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                        <div><p className="text-sm font-medium text-white flex items-center gap-2">{session.device}{session.current && <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">Current</span>}</p><p className="text-xs text-gray-400 mt-0.5">{session.location} · {session.time}</p></div>
                        {!session.current && <button className="text-xs text-rose-400 hover:text-rose-300 font-medium transition-colors">Revoke</button>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'billing' && (
                <div className="space-y-8">
                  <h2 className="text-xl font-bold mb-2">Billing & Plans</h2>
                  <p className="text-sm text-gray-400 mb-6">Manage your subscription and payment methods.</p>
                  <div className="p-5 bg-indigo-600/10 border border-indigo-500/30 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <div><p className="text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-1">Current Plan</p><p className="text-2xl font-bold text-white">Pro Plan</p><p className="text-sm text-gray-400 mt-1">$12/month · Renews on Dec 1, 2023</p></div>
                      <div className="text-right"><p className="text-3xl font-bold text-white">$12</p><p className="text-xs text-gray-400">/month</p></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[{ id: 'starter', name: 'Starter', price: '$0', features: ['5 members', '3 projects', 'Basic analytics'] }, { id: 'pro', name: 'Pro', price: '$12', features: ['Unlimited members', 'Unlimited projects', 'Advanced analytics', 'Priority support'] }, { id: 'enterprise', name: 'Enterprise', price: '$49', features: ['Everything in Pro', 'SSO & SAML', 'Custom integrations', '24/7 phone support'] }].map(plan => (
                      <button key={plan.id} onClick={() => setSelectedPlan(plan.id)}
                        className={`p-5 rounded-xl text-left transition-all ${selectedPlan === plan.id ? 'bg-indigo-600/20 border-2 border-indigo-500' : 'bg-white/5 border border-white/10 hover:bg-white/[0.07]'}`}>
                        <div className="flex items-center justify-between mb-3"><h4 className="font-bold text-white">{plan.name}</h4>{selectedPlan === plan.id && <Check size={18} className="text-indigo-400" />}</div>
                        <p className="text-2xl font-bold text-white mb-3">{plan.price}<span className="text-sm font-normal text-gray-400">/mo</span></p>
                        <ul className="space-y-1.5">{plan.features.map((f, i) => (<li key={i} className="text-xs text-gray-400 flex items-center gap-2"><Check size={12} className="text-emerald-400 flex-shrink-0" />{f}</li>))}</ul>
                      </button>
                    ))}
                  </div>
                  <div className="pt-6 border-t border-white/10 space-y-4">
                    <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Payment Method</h3>
                    <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-[10px] font-bold">VISA</div>
                        <div><p className="text-sm font-medium text-white">•••• •••• •••• 4242</p><p className="text-xs text-gray-400">Expires 12/2025</p></div>
                      </div>
                      <button className="text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors">Update</button>
                    </div>
                  </div>
                  <div className="pt-4 flex justify-end">
                    <button className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"><Save size={18} /><span>Save Changes</span></button>
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
