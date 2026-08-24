import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Github } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../utils/constants';
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
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      toast.success('Registration successful! Please login.');
      navigate(ROUTES.LOGIN);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const strengthColors = ['bg-slate-200', 'bg-danger', 'bg-warning', 'bg-blue-500', 'bg-success'];

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Create an account</h2>
        <p className="text-slate-600 dark:text-slate-400">Join CodeSphere and start collaborating today.</p>
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
                <span className="text-xs text-slate-500">Password strength:</span>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{passwordStrength.message}</span>
              </div>
              <div className="flex gap-1 h-1.5 w-full">
                {[1, 2, 3, 4].map((level) => (
                  <div 
                    key={level} 
                    className={`h-full flex-1 rounded-full transition-colors duration-300 ${
                      level <= passwordStrength.strength ? strengthColors[passwordStrength.strength] : 'bg-slate-200 dark:bg-slate-700'
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
            className="mt-1 rounded border-slate-300 text-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-900" 
          />
          <div className="ml-2">
            <label htmlFor="terms" className="text-sm text-slate-600 dark:text-slate-400">
              I accept the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
            </label>
            {errors.terms && <p className="mt-1 text-xs text-danger">{errors.terms}</p>}
          </div>
        </div>

        <Button type="submit" fullWidth isLoading={isLoading} className="mt-2">
          Create Account
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} className="font-semibold text-primary hover:text-accent transition-colors">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
