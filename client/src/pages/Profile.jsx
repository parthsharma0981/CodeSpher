import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Globe, MapPin, Calendar, Edit2, CheckCircle, MessageCircle } from 'lucide-react';

const Profile = () => {
  return (
    <div className="min-h-screen text-white pb-12">
      {/* Cover Banner */}
      <div className="h-64 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 relative">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Profile Header Info */}
        <div className="relative -mt-24 mb-8 flex flex-col sm:flex-row items-center sm:items-end sm:justify-between">
          <div className="flex flex-col sm:flex-row items-center sm:items-end text-center sm:text-left">
            <div className="relative p-1 bg-slate-900 rounded-full">
              <img
                src="https://i.pravatar.cc/300?u=dev"
                alt="Profile"
                className="w-36 h-36 rounded-full border-4 border-slate-900 object-cover bg-slate-800"
              />
              <div className="absolute bottom-4 right-4 w-5 h-5 bg-emerald-500 rounded-full border-4 border-slate-900"></div>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-6 pb-2">
              <h1 className="text-3xl font-bold">Alex Developer</h1>
              <p className="text-indigo-400 font-medium text-lg">Senior Frontend Engineer</p>
              <div className="flex items-center justify-center sm:justify-start space-x-4 mt-2 text-gray-400 text-sm">
                <span className="flex items-center"><MapPin size={14} className="mr-1"/> San Francisco, CA</span>
                <span className="flex items-center"><Calendar size={14} className="mr-1"/> Joined Sep 2022</span>
              </div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 sm:mt-0 px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-medium flex items-center transition-colors backdrop-blur-md"
          >
            <Edit2 size={16} className="mr-2" />
            Edit Profile
          </motion.button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Projects', value: '12' },
            { label: 'Tasks Completed', value: '148' },
            { label: 'Contributions', value: '389' },
            { label: 'Streak', value: '14 days' },
          ].map((stat, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center backdrop-blur-xl hover:bg-white/[0.07] transition-colors"
            >
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">{stat.value}</div>
              <div className="text-sm text-gray-400 mt-1 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl"
            >
              <h3 className="text-lg font-bold mb-4">About Me</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Passionate frontend engineer with 5+ years of experience building scalable web applications. I love working with React, Tailwind, and exploring new UI/UX trends.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl"
            >
              <h3 className="text-lg font-bold mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Next.js', 'GraphQL', 'Figma'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-lg text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl"
            >
              <h3 className="text-lg font-bold mb-4">Links</h3>
              <div className="space-y-3">
                <a href="#" className="flex items-center text-gray-300 hover:text-indigo-400 transition-colors">
                  <Github size={18} className="mr-3" /> GitHub
                </a>
                <a href="#" className="flex items-center text-gray-300 hover:text-indigo-400 transition-colors">
                  <Linkedin size={18} className="mr-3" /> LinkedIn
                </a>
                <a href="#" className="flex items-center text-gray-300 hover:text-indigo-400 transition-colors">
                  <Globe size={18} className="mr-3" /> Portfolio
                </a>
                <a href="#" className="flex items-center text-gray-300 hover:text-indigo-400 transition-colors">
                  <Mail size={18} className="mr-3" /> alex@example.com
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl"
            >
              <h3 className="text-lg font-bold mb-4">Contribution Activity</h3>
              {/* Dummy Heatmap */}
              <div className="flex gap-1 overflow-x-auto pb-2 custom-scrollbar">
                {Array.from({ length: 52 }).map((_, colIndex) => (
                  <div key={colIndex} className="flex flex-col gap-1">
                    {Array.from({ length: 7 }).map((_, rowIndex) => {
                      const intensity = Math.random();
                      let bgClass = 'bg-white/5';
                      if (intensity > 0.8) bgClass = 'bg-indigo-500';
                      else if (intensity > 0.6) bgClass = 'bg-indigo-500/80';
                      else if (intensity > 0.4) bgClass = 'bg-indigo-500/60';
                      else if (intensity > 0.2) bgClass = 'bg-indigo-500/40';
                      
                      return (
                        <div
                          key={`${colIndex}-${rowIndex}`}
                          className={`w-3 h-3 rounded-sm ${bgClass}`}
                          title={`${Math.floor(intensity * 10)} contributions`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="flex justify-end items-center mt-2 text-xs text-gray-400 space-x-2">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-sm bg-white/5"></div>
                  <div className="w-3 h-3 rounded-sm bg-indigo-500/40"></div>
                  <div className="w-3 h-3 rounded-sm bg-indigo-500/60"></div>
                  <div className="w-3 h-3 rounded-sm bg-indigo-500/80"></div>
                  <div className="w-3 h-3 rounded-sm bg-indigo-500"></div>
                </div>
                <span>More</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl"
            >
              <h3 className="text-lg font-bold mb-6">Recent Activity</h3>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                {[
                  { text: 'Pushed code to feature/auth-flow', time: '2 hours ago', type: 'code' },
                  { text: 'Completed task "Update Landing Page"', time: 'Yesterday', type: 'task' },
                  { text: 'Commented on PR #142', time: 'Oct 12', type: 'comment' },
                ].map((act, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-slate-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-indigo-400">
                      {act.type === 'code' ? <Github size={16}/> : act.type === 'task' ? <CheckCircle size={16}/> : <MessageCircle size={16}/>}
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 border border-white/10 p-4 rounded-xl shadow backdrop-blur-sm group-hover:bg-white/10 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-white">{act.text}</span>
                      </div>
                      <div className="text-sm text-gray-400">{act.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
