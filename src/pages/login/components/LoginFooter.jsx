import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginFooter = () => {
  const currentYear = new Date()?.getFullYear();

  return (
    <div className="mt-12 pt-8 border-t border-border">
      {/* Quick Access Information */}
      <div className="bg-muted/30 rounded-lg p-4 mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center">
          <Icon name="Info" size={16} className="mr-2 text-primary" />
          Demo Credentials
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="space-y-1">
            <p className="font-medium text-foreground">Student Access:</p>
            <p className="text-muted-foreground">student@edumanage.edu</p>
            <p className="text-muted-foreground">student123</p>
          </div>
          <div className="space-y-1">
            <p className="font-medium text-foreground">Teacher Access:</p>
            <p className="text-muted-foreground">teacher@edumanage.edu</p>
            <p className="text-muted-foreground">teacher123</p>
          </div>
          <div className="space-y-1">
            <p className="font-medium text-foreground">Admin Access:</p>
            <p className="text-muted-foreground">admin@edumanage.edu</p>
            <p className="text-muted-foreground">admin123</p>
          </div>
        </div>
      </div>

      {/* Support Links */}
      <div className="flex flex-wrap items-center justify-center space-x-6 mb-6 text-sm">
        <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-1">
          <Icon name="HelpCircle" size={14} />
          <span>Help Center</span>
        </a>
        <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-1">
          <Icon name="Phone" size={14} />
          <span>Support</span>
        </a>
        <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-1">
          <Icon name="FileText" size={14} />
          <span>Privacy Policy</span>
        </a>
      </div>

      {/* Copyright and Institution Info */}
      <div className="text-center space-y-2">
        <p className="text-xs text-muted-foreground">
          © {currentYear} EduManage Pro. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground">
          Comprehensive College Management ERP System
        </p>
        <div className="flex items-center justify-center space-x-4 mt-3">
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={12} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">India</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Globe" size={12} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">English</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="IndianRupee" size={12} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">INR</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginFooter;