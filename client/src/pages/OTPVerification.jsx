import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { authService } from '../services/api';
import { ROUTES } from '../utils/constants';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  
  const location = useLocation();
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  
  const email = location.state?.email || 'your email';

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // Take only the last character if multiple are entered
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input if not empty
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResend = async () => {
    if (timeLeft > 0) return;
    try {
      await authService.forgotPassword(email);
      setTimeLeft(60);
      toast.success('New OTP sent successfully!');
    } catch (err) {
      toast.error('Failed to resend OTP.');
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
      await authService.verifyOTP({ email, otp: otpValue });
      toast.success('OTP verified successfully!');
      navigate(ROUTES.RESET_PASSWORD, { state: { email, token: 'mock-reset-token' } });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Link to={ROUTES.FORGOT_PASSWORD} className="inline-flex items-center text-sm text-neutral-500 hover:text-black dark:text-white transition-colors mb-6">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back
      </Link>
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">Verify OTP</h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          We've sent a code to <br/><span className="font-medium text-neutral-900 dark:text-neutral-200">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex justify-between gap-2 sm:gap-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-bold rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-300 dark:border-neutral-700 transition-all"
            />
          ))}
        </div>

        <Button type="submit" fullWidth isLoading={isLoading}>
          Verify
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Didn't receive the code?{' '}
          <button 
            type="button"
            onClick={handleResend}
            disabled={timeLeft > 0}
            className={`font-semibold transition-colors ${timeLeft > 0 ? 'text-neutral-400 cursor-not-allowed' : 'text-black dark:text-white hover:text-neutral-600'}`}
          >
            {timeLeft > 0 ? `Resend in ${timeLeft}s` : 'Resend Code'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default OTPVerification;
