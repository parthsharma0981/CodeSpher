import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { authService } from '../services/api';
import { ROUTES } from '../utils/constants';
import { validatePassword } from '../utils/validators';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ strength: 0, message: '' });
  
  const location = useLocation();
  const navigate = useNavigate();
  
  const email = location.state?.email;
  const token = location.state?.token;

  // If no token/email, might want to redirect, but omitted for simplicity in mock

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
    if (!passwordStrength.isValid) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      await authService.resetPassword({ email, token, newPassword: formData.password });
      toast.success('Password reset successfully! You can now login.');
      navigate(ROUTES.LOGIN);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to reset password.');
    } finally {
      setIsLoading(false);
    }
  };

  const strengthColors = ['bg-slate-200', 'bg-danger', 'bg-warning', 'bg-blue-500', 'bg-success'];

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Set new password</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Create a strong password for your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Input
            id="password"
            label="New Password"
            type="password"
            placeholder="Enter new password"
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
          label="Confirm New Password"
          type="password"
          placeholder="Confirm new password"
          leftIcon={Lock}
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <Button type="submit" fullWidth isLoading={isLoading}>
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
