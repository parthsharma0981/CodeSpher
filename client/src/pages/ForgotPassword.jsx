import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { authService } from '../services/api';
import { ROUTES } from '../utils/constants';
import { validateEmail } from '../utils/validators';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!validateEmail(email)) {
      setError('Invalid email address');
      return;
    }

    setIsLoading(true);
    try {
      await authService.forgotPassword(email);
      setIsSent(true);
      toast.success('OTP sent to your email!');
      // In a real app, you might navigate immediately or pass state
      setTimeout(() => {
        navigate(ROUTES.VERIFY_OTP, { state: { email } });
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <div className="text-center w-full">
        <div className="w-16 h-16 mx-auto bg-success/20 rounded-full flex items-center justify-center mb-6">
          <Mail className="w-8 h-8 text-success" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">Check your email</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          We've sent a 6-digit OTP to <strong>{email}</strong>. Please enter it on the next screen to reset your password.
        </p>
        <LoadingSpinner size="sm" className="mx-auto" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <Link to={ROUTES.LOGIN} className="inline-flex items-center text-sm text-neutral-500 hover:text-black dark:text-white transition-colors mb-6">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to login
      </Link>
      
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">Forgot Password</h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Enter your email address and we'll send you an OTP to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          id="email"
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          leftIcon={Mail}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError('');
          }}
          error={error}
        />

        <Button type="submit" fullWidth isLoading={isLoading}>
          Send Reset Link
        </Button>
      </form>
    </div>
  );
};

// Local component for convenience, usually imported
const LoadingSpinner = ({ size = 'md', className = '' }) => (
  <div className={`animate-spin rounded-full border-b-2 border-neutral-300 dark:border-neutral-700 ${size === 'sm' ? 'h-5 w-5' : 'h-8 w-8'} ${className}`}></div>
);

export default ForgotPassword;
