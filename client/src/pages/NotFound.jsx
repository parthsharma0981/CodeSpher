import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import Button from '../components/common/Button';
import { ROUTES } from '../utils/constants';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="max-w-2xl w-full text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          <h1 className="text-9xl font-black text-neutral-900 dark:text-white mb-4 tracking-tighter">
            404
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
            Page not found
          </h2>
          <p className="text-lg text-neutral-500 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={ROUTES.HOME}>
              <Button icon={Home} size="lg">
                Back to Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
