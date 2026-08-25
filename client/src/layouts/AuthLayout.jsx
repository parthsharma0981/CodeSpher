import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { ROUTES } from '../utils/constants';

const AuthLayout = () => {
  return (
    <div className='min-h-screen flex bg-white dark:bg-black'>
      {/* Left side - branding */}
      <div className='hidden lg:flex lg:w-1/2 bg-neutral-50 dark:bg-neutral-950 items-center justify-center border-r border-neutral-200 dark:border-neutral-800 p-12'>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className='max-w-md'
        >
          <Link 
            to={ROUTES.HOME} 
            className='inline-flex items-center gap-3 mb-8 group hover:opacity-80 transition-opacity'
            title='Go to Landing Page'
          >
            <div className='w-10 h-10 rounded-xl bg-black dark:bg-white flex items-center justify-center shadow-sm'>
              <Code2 className='w-6 h-6 text-white dark:text-black' />
            </div>
            <span className='text-2xl font-bold tracking-tight text-neutral-900 dark:text-white'>
              CodeSphere
            </span>
          </Link>
          <h2 className='text-4xl font-bold tracking-tight leading-tight text-neutral-900 dark:text-white'>
            One workspace for
            <br />
            planning, coding,
            <br />
            and collaborating.
          </h2>
          <p className='mt-4 text-neutral-500 leading-relaxed'>
            Join thousands of developer teams building amazing products
            together.
          </p>
        </motion.div>
      </div>

      {/* Right side - form */}
      <div className='flex-1 flex items-center justify-center p-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='w-full max-w-md'
        >
          {/* Mobile logo */}
          <div className='mb-8 lg:hidden'>
            <Link 
              to={ROUTES.HOME} 
              className='inline-flex items-center gap-2 group hover:opacity-80 transition-opacity'
              title='Go to Landing Page'
            >
              <div className='w-8 h-8 rounded-lg bg-black dark:bg-white flex items-center justify-center shadow-sm'>
                <Code2 className='w-5 h-5 text-white dark:text-black' />
              </div>
              <span className='text-xl font-bold tracking-tight text-neutral-900 dark:text-white'>
                CodeSphere
              </span>
            </Link>
          </div>
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
