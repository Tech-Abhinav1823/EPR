import React from 'react';
import { Helmet } from 'react-helmet';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import LoginFooter from './components/LoginFooter';
import SecurityBadges from './components/SecurityBadges';

const Login = () => {
  return (
    <>
      <Helmet>
        <title>Login - EduManage Pro | College Management System</title>
        <meta name="description" content="Secure login to EduManage Pro - Comprehensive College Management ERP System for Students, Teachers, and Administrators" />
        <meta name="keywords" content="college management, ERP, student portal, teacher dashboard, admin panel, education system" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Main Container */}
        <div className="flex min-h-screen">
          {/* Left Side - Login Form */}
          <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
              <LoginHeader />
              <LoginForm />
              <LoginFooter />
            </div>
          </div>

          {/* Right Side - Security Information (Desktop Only) */}
          <div className="hidden lg:flex lg:w-96 xl:w-1/3 bg-muted/30 items-center justify-center p-8">
            <div className="w-full max-w-sm">
              <SecurityBadges />
              
              {/* Additional Information */}
              <div className="mt-8 bg-card border border-border rounded-xl p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  EduManage Pro Features
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span>Student Admission Management</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span>Real-time Attendance Tracking</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span>Fee Payment Integration</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span>Hostel & Library Management</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span>Analytics & Reporting</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span>AI-Powered Chatbot Support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Security Info */}
        <div className="lg:hidden px-4 pb-8">
          <div className="max-w-md mx-auto">
            <div className="bg-card border border-border rounded-xl p-4 shadow-soft">
              <div className="flex items-center justify-center space-x-6 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-muted-foreground">Secure</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Encrypted</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-muted-foreground">Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;