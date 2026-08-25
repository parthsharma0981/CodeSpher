import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Code2, CheckSquare, MessageSquare, 
  BarChart3, Calendar, FolderKanban,
  ArrowRight, CheckCircle2, Play, Users, 
  Globe, Zap
} from 'lucide-react';
import Button from '../components/common/Button';
import { ROUTES } from '../utils/constants';

const LandingPage = () => {
  const features = [
    { icon: CheckSquare, title: 'Task Management', desc: 'Organize, assign, and track tasks with customizable workflows.' },
    { icon: MessageSquare, title: 'Real-time Chat', desc: 'Communicate with your team instantly with built-in messaging.' },
    { icon: FolderKanban, title: 'Kanban Boards', desc: 'Visualize your progress with intuitive drag-and-drop boards.' },
    { icon: BarChart3, title: 'Team Analytics', desc: 'Get insights into team velocity and project health.' },
    { icon: Calendar, title: 'Calendar Sync', desc: 'Keep track of deadlines and meetings in one place.' },
    { icon: Code2, title: 'Developer First', desc: 'Integrates perfectly with your favorite developer tools.' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black overflow-hidden selection:bg-primary/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-black to-neutral-700 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold dark:text-white">CodeSphere</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm font-medium text-neutral-600 hover:text-black dark:text-white dark:text-neutral-300 dark:hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-sm font-medium text-neutral-600 hover:text-black dark:text-white dark:text-neutral-300 dark:hover:text-white transition-colors">Pricing</a>
              <a href="#about" className="text-sm font-medium text-neutral-600 hover:text-black dark:text-white dark:text-neutral-300 dark:hover:text-white transition-colors">About</a>
            </div>
            <div className="flex items-center gap-4">
              <Link to={ROUTES.LOGIN} className="text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:text-black dark:text-white dark:hover:text-white transition-colors hidden sm:block">
                Log in
              </Link>
              <Link to={ROUTES.REGISTER}>
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-mesh opacity-30 dark:opacity-40" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-6">
              One workspace for <br className="hidden md:block" />
              <span className="text-gradient">planning, coding, and collaborating.</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-600 dark:text-neutral-300 mb-10">
              CodeSphere brings your team's work together in one unified platform. Manage projects, chat in real-time, and ship faster.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link to={ROUTES.REGISTER}>
                <Button size="lg" className="w-full sm:w-auto font-semibold">
                  Get Started for Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </motion.div>

          {/* Floating UI Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 mx-auto max-w-5xl relative"
          >
            <div className="glass-card p-2 rounded-2xl md:p-4 bg-white/40 dark:bg-neutral-900/40">
              <img 
                src="https://images.unsplash.com/photo-1618477247222-ac60c28cb939?q=80&w=2670&auto=format&fit=crop" 
                alt="Dashboard Preview" 
                className="w-full h-auto rounded-xl shadow-2xl object-cover max-h-[600px] opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 cursor-pointer"
              />
            </div>
            
            {/* Decorative elements */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 md:-top-12 md:-left-12 glass p-4 rounded-2xl hidden md:flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm font-bold dark:text-white">Task Completed</p>
                <p className="text-xs text-neutral-500">Just now</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 md:-bottom-12 md:-right-12 glass p-4 rounded-2xl hidden md:flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full bg-neutral-300 dark:bg-neutral-700 border-2 border-white dark:border-neutral-800 flex items-center justify-center text-xs font-bold">
                    U{i}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-bold dark:text-white">Active Team</p>
                <p className="text-xs text-neutral-500">Collaborating now</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 border-y border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Teams', value: '10K+', icon: Users },
              { label: 'Tasks Completed', value: '500K+', icon: CheckSquare },
              { label: 'Uptime', value: '99.9%', icon: Zap },
              { label: 'Countries', value: '120+', icon: Globe },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-10 h-10 mb-3 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center text-black dark:text-white">
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="text-3xl font-extrabold text-neutral-900 dark:text-white">{stat.value}</div>
                <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-base text-black dark:text-white font-semibold tracking-wide uppercase">Everything you need</h2>
            <p className="mt-2 text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white">
              Powerful features for modern teams
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-black dark:text-white" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white">
              Simple, transparent pricing
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="glass-card p-8 flex flex-col">
              <h3 className="text-xl font-bold dark:text-white mb-2">Starter</h3>
              <div className="text-4xl font-extrabold dark:text-white mb-6">$0<span className="text-base font-medium text-neutral-500">/mo</span></div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Up to 5 team members', 'Basic task management', 'Community support'].map((feat, i) => (
                  <li key={i} className="flex items-center text-neutral-600 dark:text-neutral-300">
                    <CheckCircle2 className="w-5 h-5 text-success mr-3 flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Button variant="secondary" className="w-full">Get Started</Button>
            </div>

            {/* Pro Plan */}
            <div className="glass-card p-8 flex flex-col relative transform md:-translate-y-4 border-neutral-300 dark:border-neutral-700/50 shadow-primary/20">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Most Popular
                </span>
              </div>
              <h3 className="text-xl font-bold dark:text-white mb-2">Pro</h3>
              <div className="text-4xl font-extrabold dark:text-white mb-6">$12<span className="text-base font-medium text-neutral-500">/mo</span></div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Unlimited team members', 'Advanced analytics', 'Custom workflows', 'Priority support'].map((feat, i) => (
                  <li key={i} className="flex items-center text-neutral-600 dark:text-neutral-300">
                    <CheckCircle2 className="w-5 h-5 text-success mr-3 flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Button className="w-full">Start Free Trial</Button>
            </div>

            {/* Enterprise */}
            <div className="glass-card p-8 flex flex-col">
              <h3 className="text-xl font-bold dark:text-white mb-2">Enterprise</h3>
              <div className="text-4xl font-extrabold dark:text-white mb-6">Custom</div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Dedicated success manager', 'SSO & Advanced Security', 'Custom integrations', '24/7 phone support'].map((feat, i) => (
                  <li key={i} className="flex items-center text-neutral-600 dark:text-neutral-300">
                    <CheckCircle2 className="w-5 h-5 text-success mr-3 flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Button variant="secondary" className="w-full">Contact Sales</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Code2 className="w-6 h-6 text-black dark:text-white" />
              <span className="text-xl font-bold dark:text-white">CodeSphere</span>
            </div>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">
              &copy; {new Date().getFullYear()} CodeSphere. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
