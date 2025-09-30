import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ userRole = 'student', isCollapsed = false, onToggleCollapse }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarSections = {
    student: [
      {
        title: 'Academic',
        items: [
          { label: 'Dashboard', path: '/student-dashboard', icon: 'LayoutDashboard' },
          { label: 'My Courses', path: '/courses', icon: 'BookOpen' },
          { label: 'Assignments', path: '/assignments', icon: 'FileText' },
          { label: 'Grades', path: '/grades', icon: 'Award' },
          { label: 'Attendance', path: '/attendance-tracking', icon: 'Calendar' }
        ]
      },
      {
        title: 'Services',
        items: [
          { label: 'Fee Payment', path: '/fee-payment', icon: 'CreditCard' },
          { label: 'Library', path: '/library', icon: 'Library' },
          { label: 'Support', path: '/support', icon: 'MessageCircle' }
        ]
      }
    ],
    teacher: [
      {
        title: 'Teaching',
        items: [
          { label: 'Dashboard', path: '/teacher-dashboard', icon: 'LayoutDashboard' },
          { label: 'My Classes', path: '/classes', icon: 'Users' },
          { label: 'Attendance', path: '/attendance-tracking', icon: 'Calendar' },
          { label: 'Assignments', path: '/teacher-assignments', icon: 'FileText' },
          { label: 'Gradebook', path: '/gradebook', icon: 'BookOpen' }
        ]
      },
      {
        title: 'Resources',
        items: [
          { label: 'Course Materials', path: '/materials', icon: 'FolderOpen' },
          { label: 'Schedule', path: '/schedule', icon: 'Clock' },
          { label: 'Reports', path: '/teacher-reports', icon: 'BarChart3' }
        ]
      }
    ],
    admin: [
      {
        title: 'Administration',
        items: [
          { label: 'Dashboard', path: '/admin-dashboard', icon: 'LayoutDashboard' },
          { label: 'Student Management', path: '/student-management', icon: 'Users' },
          { label: 'Teacher Management', path: '/teacher-management', icon: 'UserCheck' },
          { label: 'Admissions', path: '/student-admission-form', icon: 'UserPlus' }
        ]
      },
      {
        title: 'Operations',
        items: [
          { label: 'Attendance System', path: '/attendance-tracking', icon: 'Calendar' },
          { label: 'Fee Management', path: '/fee-management', icon: 'DollarSign' },
          { label: 'Reports & Analytics', path: '/analytics', icon: 'TrendingUp' },
          { label: 'System Settings', path: '/system-settings', icon: 'Settings' }
        ]
      }
    ]
  };

  const currentSections = sidebarSections?.[userRole] || sidebarSections?.student;

  const toggleSection = (sectionTitle) => {
    if (isCollapsed) return;
    setExpandedSections(prev => ({
      ...prev,
      [sectionTitle]: !prev?.[sectionTitle]
    }));
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <aside className={`bg-card border-r border-border shadow-soft lg:fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Collapse Toggle */}
        <div className="p-4 border-b border-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="w-full justify-center"
          >
            <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={20} />
          </Button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto py-4">
          {currentSections?.map((section) => (
            <div key={section?.title} className="mb-6">
              {!isCollapsed && (
                <button
                  onClick={() => toggleSection(section?.title)}
                  className="w-full px-4 py-2 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-smooth flex items-center justify-between"
                >
                  <span>{section?.title}</span>
                  <Icon 
                    name="ChevronDown" 
                    size={14} 
                    className={`transition-transform ${
                      expandedSections?.[section?.title] ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              )}
              
              <div className={`space-y-1 px-2 ${
                isCollapsed || expandedSections?.[section?.title] !== false ? 'block' : 'hidden'
              }`}>
                {section?.items?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-smooth group ${
                      isActivePath(item?.path)
                        ? 'bg-primary text-primary-foreground shadow-soft'
                        : 'text-foreground hover:bg-muted'
                    }`}
                    title={isCollapsed ? item?.label : ''}
                  >
                    <Icon 
                      name={item?.icon} 
                      size={18} 
                      className={`flex-shrink-0 ${
                        isActivePath(item?.path) ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'
                      }`}
                    />
                    {!isCollapsed && (
                      <span className="font-medium truncate">{item?.label}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* User Info Section */}
        <div className="p-4 border-t border-border">
          <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="User" size={16} color="white" />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {userRole === 'student' ? 'Student Portal' : 
                   userRole === 'teacher' ? 'Teacher Portal' : 'Admin Portal'}
                </p>
                <p className="text-xs text-muted-foreground">EduManage Pro</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        {!isCollapsed && (
          <div className="p-4 border-t border-border bg-muted/30">
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="MessageCircle"
                iconPosition="left"
                iconSize={14}
                onClick={() => handleNavigation('/support')}
              >
                Help & Support
              </Button>
              <Button
                variant="ghost"
                size="sm"
                fullWidth
                iconName="Settings"
                iconPosition="left"
                iconSize={14}
                onClick={() => handleNavigation('/settings')}
              >
                Settings
              </Button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;