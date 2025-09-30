import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo and Branding */}
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-elevated">
          <Icon name="GraduationCap" size={32} color="white" />
        </div>
      </div>

      {/* Title and Subtitle */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome Back
        </h1>
        <p className="text-lg text-muted-foreground">
          Sign in to EduManage Pro
        </p>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Access your college management portal with secure authentication
        </p>
      </div>

      {/* Trust Indicators */}
      <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-xs text-muted-foreground">Secure Login</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-primary" />
          <span className="text-xs text-muted-foreground">24/7 Access</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={16} className="text-accent" />
          <span className="text-xs text-muted-foreground">Multi-Role</span>
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;