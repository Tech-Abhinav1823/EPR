import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ userRole = 'student', userName = 'User', isCollapsed = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { 
      label: 'Dashboard', 
      path: `/${userRole}-dashboard`, 
      icon: 'LayoutDashboard',
      roles: ['student', 'teacher', 'admin']
    },
    { 
      label: 'Attendance', 
      path: '/attendance-tracking', 
      icon: 'Calendar',
      roles: ['student', 'teacher', 'admin']
    },
    { 
      label: 'Admissions', 
      path: '/student-admission-form', 
      icon: 'UserPlus',
      roles: ['admin', 'teacher']
    },
    { 
      label: 'Students', 
      path: '/students', 
      icon: 'Users',
      roles: ['teacher', 'admin']
    },
    { 
      label: 'Reports', 
      path: '/reports', 
      icon: 'FileText',
      roles: ['admin']
    }
  ];

  const moreItems = [
    { label: 'Settings', path: '/settings', icon: 'Settings' },
    { label: 'Help', path: '/help', icon: 'HelpCircle' },
    { label: 'Profile', path: '/profile', icon: 'User' }
  ];

  const visibleItems = navigationItems?.filter(item => item?.roles?.includes(userRole))?.slice(0, 4);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    navigate('/login');
    setIsProfileOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <header className="bg-card border-b border-border shadow-soft sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="GraduationCap" size={20} color="white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold text-foreground">EduManage Pro</h1>
              <span className="text-xs text-muted-foreground capitalize">{userRole} Portal</span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {visibleItems?.map((item) => (
            <Button
              key={item?.path}
              variant={isActivePath(item?.path) ? "default" : "ghost"}
              size="sm"
              onClick={() => handleNavigation(item?.path)}
              iconName={item?.icon}
              iconPosition="left"
              iconSize={16}
              className="transition-smooth"
            >
              {item?.label}
            </Button>
          ))}
          
          {/* More Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              iconName="MoreHorizontal"
              iconSize={16}
            >
              More
            </Button>
            
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevated z-50">
                <div className="py-2">
                  {moreItems?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className="w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-muted transition-smooth flex items-center space-x-2"
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* User Profile Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Icon name="Bell" size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full text-xs"></span>
          </Button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-smooth"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-foreground">{userName}</p>
                <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
              </div>
              <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-elevated z-50">
                <div className="p-4 border-b border-border">
                  <p className="font-medium text-popover-foreground">{userName}</p>
                  <p className="text-sm text-muted-foreground capitalize">{userRole} Account</p>
                </div>
                <div className="py-2">
                  <button
                    onClick={() => handleNavigation('/profile')}
                    className="w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-muted transition-smooth flex items-center space-x-2"
                  >
                    <Icon name="User" size={16} />
                    <span>Profile Settings</span>
                  </button>
                  <button
                    onClick={() => handleNavigation('/preferences')}
                    className="w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-muted transition-smooth flex items-center space-x-2"
                  >
                    <Icon name="Settings" size={16} />
                    <span>Preferences</span>
                  </button>
                  <hr className="my-2 border-border" />
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-error hover:bg-muted transition-smooth flex items-center space-x-2"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="px-4 py-4 space-y-2">
            {visibleItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-smooth ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span className="font-medium">{item?.label}</span>
              </button>
            ))}
            
            <hr className="my-3 border-border" />
            
            {moreItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-foreground hover:bg-muted transition-smooth"
              >
                <Icon name={item?.icon} size={18} />
                <span className="font-medium">{item?.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;