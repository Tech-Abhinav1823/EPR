import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for different roles
  const mockCredentials = {
    student: { email: 'student@edumanage.edu', password: 'student123' },
    teacher: { email: 'teacher@edumanage.edu', password: 'teacher123' },
    admin: { email: 'admin@edumanage.edu', password: 'admin123' }
  };

  const roleOptions = [
    { value: 'student', label: 'Student' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'admin', label: 'Administrator' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRoleChange = (value) => {
    setFormData(prev => ({
      ...prev,
      role: value
    }));
    
    if (errors?.role) {
      setErrors(prev => ({
        ...prev,
        role: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData?.role) {
      newErrors.role = 'Please select your role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check credentials
      const roleCredentials = mockCredentials?.[formData?.role];
      if (formData?.email === roleCredentials?.email && formData?.password === roleCredentials?.password) {
        // Successful login - navigate to appropriate dashboard
        const dashboardRoutes = {
          student: '/student-dashboard',
          teacher: '/teacher-dashboard',
          admin: '/admin-dashboard'
        };
        
        navigate(dashboardRoutes?.[formData?.role]);
      } else {
        setErrors({
          general: `Invalid credentials. Use ${roleCredentials?.email} / ${roleCredentials?.password} for ${formData?.role} access.`
        });
      }
    } catch (error) {
      setErrors({
        general: 'Authentication failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Mock forgot password functionality
    alert('Password reset link would be sent to your registered email address.');
  };

  const handleRegister = () => {
    navigate('/student-admission-form');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error Message */}
        {errors?.general && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
              <p className="text-sm text-error">{errors?.general}</p>
            </div>
          </div>
        )}

        {/* Role Selection */}
        <Select
          label="Select Role"
          placeholder="Choose your role"
          options={roleOptions}
          value={formData?.role}
          onChange={handleRoleChange}
          error={errors?.role}
          required
          className="mb-4"
        />

        {/* Email Input */}
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your institutional email"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          className="mb-4"
        />

        {/* Password Input */}
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
          className="mb-6"
        />

        {/* Sign In Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          iconName="LogIn"
          iconPosition="left"
          iconSize={18}
          className="mb-4"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>

        {/* Secondary Actions */}
        <div className="space-y-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            fullWidth
            onClick={handleForgotPassword}
            iconName="Key"
            iconPosition="left"
            iconSize={16}
          >
            Forgot Password?
          </Button>

          <div className="text-center">
            <span className="text-sm text-muted-foreground">New to EduManage Pro? </span>
            <Button
              type="button"
              variant="link"
              size="sm"
              onClick={handleRegister}
              className="p-0 h-auto text-primary hover:text-primary/80"
            >
              Register Here
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;