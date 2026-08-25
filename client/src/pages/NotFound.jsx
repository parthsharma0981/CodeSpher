import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';
import Button from '../components/common/Button';
import { ROUTES } from '../utils/constants';

const NotFound = () => {
 return (
 <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-4 relative overflow-hidden">
 {/* Background elements */}
 <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
 <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px]" />
 
 <div className="max-w-2xl w-full text-center z-10">
 <motion.div
 initial={{ opacity: 0, scale: 0.8 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ type: "spring", bounce: 0.5 }}
 >
 <h1 className="text-9xl font-black text-transparent bg-clip-text bg-black mb-4">
 404
 </h1>
 </motion.div>
 
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.2 }}
 >
 <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
 Lost in cyberspace?
 </h2>
 <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-md mx-auto">
 The page you're looking for doesn't exist or has been moved to another universe.
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
