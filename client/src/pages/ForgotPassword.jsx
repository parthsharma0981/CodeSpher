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
      toast.success('Reset link / OTP sent to your email!');
      navigate(ROUTES.VERIFY_OTP, { state: { email, isResetFlow: true } });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send reset link.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Link
        to={ROUTES.LOGIN}
        className="inline-flex items-center text-sm text-neutral-500 hover:text-black dark:hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to login
      </Link>

      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">Forgot Password</h2>
        <p className="text-neutral-500">
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

export default ForgotPassword;
