import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { classNames } from '../../utils/helpers';

const Input = React.forwardRef(({
  id,
  label,
  type = 'text',
  error,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className = '',
  wrapperClassName = '',
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={classNames("w-full relative", wrapperClassName)}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {LeftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
            <LeftIcon className="h-5 w-5" />
          </div>
        )}
        
        <input
          id={id}
          ref={ref}
          type={inputType}
          className={classNames(
            "block w-full rounded-xl border bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm",
            "px-4 py-2.5 text-sm transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-neutral-400/50",
            error 
              ? "border-danger text-red-600 focus:border-danger focus:ring-danger/50" 
              : "border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white focus:border-neutral-300 dark:border-neutral-700",
            LeftIcon ? "pl-10" : "",
            (RightIcon || isPassword) ? "pr-10" : "",
            className
          )}
          {...props}
        />

        {isPassword ? (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        ) : RightIcon ? (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-neutral-400">
            <RightIcon className="h-5 w-5" />
          </div>
        ) : null}
      </div>
      
      {error && (
        <p className="mt-1.5 text-sm text-red-600 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
