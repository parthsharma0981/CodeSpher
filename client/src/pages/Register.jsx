import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Github } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { ROUTES, GOOGLE_AUTH_URL, GITHUB_AUTH_URL } from '../utils/constants';
import { validateEmail, validatePassword, validateName } from '../utils/validators';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ strength: 0, message: '' });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (errors[id]) {
      setErrors({ ...errors, [id]: null });
    }

    if (id === 'password') {
      setPasswordStrength(validatePassword(value));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!validateName(formData.name)) newErrors.name = 'Name must be at least 2 characters';
    if (!validateEmail(formData.email)) newErrors.email = 'Invalid email address';
    if (!passwordStrength.isValid) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!termsAccepted) newErrors.terms = 'You must accept the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const res = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      const devOtp = res?.data?.devOtp;
      toast.success(res?.message || 'Registration successful! Please verify your email.');
      navigate(ROUTES.VERIFY_OTP, { state: { email: formData.email, devOtp } });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const strengthColors = ['bg-neutral-200', 'bg-red-600', 'bg-amber-500', 'bg-blue-500', 'bg-emerald-600'];

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">Create an account</h2>
        <p className="text-neutral-500">Join CodeSphere and start collaborating today.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="name"
          label="Full Name"
          placeholder="John Doe"
          leftIcon={User}
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />

        <Input
          id="email"
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          leftIcon={Mail}
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <div>
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Create a strong password"
            leftIcon={Lock}
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          {formData.password && (
            <div className="mt-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-neutral-500">Password strength:</span>
                <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">{passwordStrength.message}</span>
              </div>
              <div className="flex gap-1 h-1.5 w-full">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-full flex-1 rounded-full transition-colors duration-300 ${
                      level <= passwordStrength.strength ? strengthColors[passwordStrength.strength] : 'bg-neutral-200 dark:bg-neutral-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <Input
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          leftIcon={Lock}
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <div className="flex items-start mt-2">
          <input
            id="terms"
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => {
              setTermsAccepted(e.target.checked);
              if (errors.terms) setErrors({ ...errors, terms: null });
            }}
            className="mt-1 rounded border-neutral-300 text-black dark:text-white focus:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-900"
          />
          <div className="ml-2">
            <label htmlFor="terms" className="text-sm text-neutral-600 dark:text-neutral-400">
              I accept the <a href="#" className="text-black dark:text-white hover:underline font-medium">Terms of Service</a> and <a href="#" className="text-black dark:text-white hover:underline font-medium">Privacy Policy</a>
            </label>
            {errors.terms && <p className="mt-1 text-xs text-red-600">{errors.terms}</p>}
          </div>
        </div>

        <Button type="submit" fullWidth isLoading={isLoading} className="mt-2">
          Create Account
        </Button>
      </form>

      <div className="mt-6 text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-200 dark:border-neutral-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-neutral-800 text-neutral-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={() => {
              window.location.href = GOOGLE_AUTH_URL;
            }}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            icon={Github}
            onClick={() => {
              window.location.href = GITHUB_AUTH_URL;
            }}
          >
            GitHub
          </Button>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} className="font-semibold text-neutral-900 dark:text-white hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
