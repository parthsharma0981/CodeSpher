import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Calendar, Edit2, CheckCircle2, Award } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/constants';

const Profile = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Active Projects', value: '12' },
    { label: 'Tasks Completed', value: '148' },
    { label: 'Code Reviews', value: '89' },
    { label: 'Collaborators', value: '24' },
  ];

  return (
    <div className="min-h-screen text-neutral-900 dark:text-white pb-12 max-w-5xl mx-auto">
      {/* Cover Banner */}
      <div className="h-48 w-full bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-700 rounded-3xl relative overflow-hidden shadow-sm">
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      <div className="px-6 sm:px-8">
        {/* Profile Header Info */}
        <div className="relative -mt-20 mb-8 flex flex-col sm:flex-row items-center sm:items-end sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-end text-center sm:text-left">
            <div className="relative p-1 bg-white dark:bg-black rounded-full shadow-md">
              <img
                src={user?.avatar || 'https://i.pravatar.cc/300?u=dev'}
                alt={user?.name || 'Profile'}
                className="w-32 h-32 rounded-full border-4 border-white dark:border-black object-cover bg-neutral-100 dark:bg-neutral-800"
              />
              <div className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-black"></div>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-6 pb-1">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  {user?.name || 'Alex Developer'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                  {user?.role || 'Member'}
                </span>
              </div>
              <p className="text-neutral-500 font-medium text-sm mt-0.5">
                {user?.bio || 'Full Stack Developer building modern software with CodeSphere'}
              </p>
              <div className="flex items-center justify-center sm:justify-start space-x-4 mt-2 text-neutral-400 text-xs">
                <span className="flex items-center">
                  <Mail size={13} className="mr-1" /> {user?.email || 'alex@codesphere.io'}
                </span>
                <span className="flex items-center">
                  <Calendar size={13} className="mr-1" /> Member since 2023
                </span>
              </div>
            </div>
          </div>
          <Link
            to={ROUTES.SETTINGS}
            className="mt-4 sm:mt-0 px-5 py-2.5 bg-black text-white dark:bg-white dark:text-black rounded-xl font-medium text-sm flex items-center shadow-sm hover:opacity-80 transition-all"
          >
            <Edit2 size={15} className="mr-2" />
            Edit Profile
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              key={i}
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 text-center shadow-sm"
            >
              <div className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-xs text-neutral-500 mt-1 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* About & Skills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-3">About</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Passionate engineer focused on building intuitive, performant user interfaces and resilient distributed backends. Enthusiastic about TypeScript, React, Node.js, and automated deployment pipelines.
            </p>

            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mt-6 mb-3">
              Skills & Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Socket.IO', 'Docker', 'GraphQL'].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-lg text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold mb-4">Badges & Recognition</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-white">
                    <Award size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold">Top Contributor</h4>
                    <p className="text-[11px] text-neutral-400">100+ tasks completed</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-white">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold">Verified Developer</h4>
                    <p className="text-[11px] text-neutral-400">Email & credentials verified</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <p className="text-xs text-neutral-400 text-center">CodeSphere Member</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
