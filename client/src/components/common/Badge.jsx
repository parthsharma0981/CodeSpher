import React from 'react';
import { classNames } from '../../utils/helpers';

const Badge = ({ children, variant = 'default', icon: Icon, className = '' }) => {
  const variants = {
    default: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300',
    primary: 'bg-primary/10 text-primary dark:bg-primary/20',
    success: 'bg-success/10 text-success dark:bg-success/20',
    warning: 'bg-warning/10 text-warning dark:bg-warning/20',
    danger: 'bg-danger/10 text-danger dark:bg-danger/20',
    info: 'bg-accent/10 text-accent dark:bg-accent/20',
  };

  return (
    <span className={classNames(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors",
      variants[variant],
      className
    )}>
      {Icon && <Icon className="w-3.5 h-3.5 mr-1" />}
      {children}
    </span>
  );
};

export default Badge;
