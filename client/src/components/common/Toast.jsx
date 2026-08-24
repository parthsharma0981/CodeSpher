import React from 'react';
import { Toaster, resolveValue } from 'react-hot-toast';
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Toast = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
      }}
    >
      {(t) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-success" />,
          error: <XCircle className="w-5 h-5 text-danger" />,
          loading: <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />,
          blank: <Info className="w-5 h-5 text-primary" />,
          custom: <AlertTriangle className="w-5 h-5 text-warning" />
        };

        return (
          <AnimatePresence>
            {t.visible && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="flex items-center gap-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl rounded-xl p-4 max-w-sm w-full backdrop-blur-md bg-opacity-90 dark:bg-opacity-90"
              >
                <div className="flex-shrink-0">
                  {icons[t.type] || icons.blank}
                </div>
                <div className="flex-1 text-sm font-medium text-slate-800 dark:text-slate-200">
                  {resolveValue(t.message, t)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        );
      }}
    </Toaster>
  );
};

export default Toast;
