import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/api';
import { ROUTES } from '../utils/constants';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const { verifyOTP } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const email = location.state?.email || 'your email';
  const isResetFlow = location.state?.isResetFlow || false;
  const [currentDevOtp, setCurrentDevOtp] = useState(location.state?.devOtp || null);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  const fillOtp = (code) => {
    if (!code) return;
    const digits = code.toString().split('').slice(0, 6);
    const newOtp = [...otp];
    digits.forEach((d, i) => {
      newOtp[i] = d;
    });
    setOtp(newOtp);
    if (digits.length === 6) {
      inputRefs.current[5]?.focus();
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = async () => {
    if (timeLeft > 0) return;
    try {
      const res = await authService.resendOTP({ email, isResetFlow });
      setTimeLeft(60);
      if (res?.data?.devOtp) {
        setCurrentDevOtp(res.data.devOtp);
      }
      toast.success(res?.message || 'New OTP sent successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to resend OTP.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      toast.error('Please enter a complete 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      if (isResetFlow) {
        const res = await authService.verifyOTP({ email, otp: otpValue, isResetFlow: true });
        const resetToken = res?.data?.resetToken || otpValue;
        toast.success('OTP verified!');
        navigate(ROUTES.RESET_PASSWORD, { state: { email, token: resetToken } });
      } else {
        await verifyOTP({ email, otp: otpValue });
        toast.success('Account verified successfully! Welcome to CodeSphere.');
        navigate(ROUTES.DASHBOARD);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid or expired OTP. Please try again.');
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

      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">Verify OTP</h2>
        <p className="text-neutral-500 text-sm">
          We've sent a 6-digit code to <br />
          <span className="font-semibold text-neutral-900 dark:text-white">{email}</span>
        </p>
      </div>

      {currentDevOtp && (
        <div className="mb-6 p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-center">
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
            Development Mode (SMTP unconfigured)
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
              Code: <span className="font-mono text-base tracking-widest text-black dark:text-white">{currentDevOtp}</span>
            </span>
            <button
              type="button"
              onClick={() => fillOtp(currentDevOtp)}
              className="text-xs font-semibold px-2 py-1 rounded bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition-opacity"
            >
              Autofill
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between gap-2 sm:gap-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-bold rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400 transition-all"
            />
          ))}
        </div>

        <Button type="submit" fullWidth isLoading={isLoading}>
          Verify & Continue
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-neutral-500">
          Didn't receive the code?{' '}
          <button
            type="button"
            onClick={handleResend}
            disabled={timeLeft > 0}
            className={`font-semibold transition-colors ${
              timeLeft > 0
                ? 'text-neutral-400 cursor-not-allowed'
                : 'text-neutral-900 dark:text-white hover:underline'
            }`}
          >
            {timeLeft > 0 ? `Resend in ${timeLeft}s` : 'Resend Code'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default OTPVerification;
