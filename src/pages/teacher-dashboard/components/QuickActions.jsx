import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ userRole = 'teacher' }) => {
  const navigate = useNavigate();

  const teacherActions = [
    {
      id: 'attendance',
      title: 'Mark Attendance',
      description: 'Record student attendance for today',
      icon: 'Calendar',
      color: 'primary',
      path: '/attendance-tracking',
      stats: { label: 'Classes Today', value: '4' }
    },
    {
      id: 'gradebook',
      title: 'Update Grades',
      description: 'Review and update student grades',
      icon: 'Award',
      color: 'success',
      path: '/gradebook',
      stats: { label: 'Pending Reviews', value: '12' }
    },
    {
      id: 'schedule',
      title: 'View Schedule',
      description: 'Check today\'s class schedule',
      icon: 'Clock',
      color: 'accent',
      path: '/schedule',
      stats: { label: 'Next Class', value: '2:30 PM' }
    },
    {
      id: 'reports',
      title: 'Generate Reports',
      description: 'Create performance and attendance reports',
      icon: 'BarChart3',
      color: 'warning',
      path: '/teacher-reports',
      stats: { label: 'Due Reports', value: '3' }
    }
  ];

  const handleActionClick = (action) => {
    if (action?.path) {
      navigate(action?.path);
    }
  };

  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary/10 text-primary hover:bg-primary/20',
      success: 'bg-success/10 text-success hover:bg-success/20',
      warning: 'bg-warning/10 text-warning hover:bg-warning/20',
      accent: 'bg-accent/10 text-accent hover:bg-accent/20',
      error: 'bg-error/10 text-error hover:bg-error/20'
    };
    return colors?.[color] || colors?.primary;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Zap" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
            <p className="text-sm text-muted-foreground">Frequently used teaching tools</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teacherActions?.map((action) => (
            <div
              key={action?.id}
              className="group cursor-pointer"
              onClick={() => handleActionClick(action)}
            >
              <div className="p-4 border border-border rounded-lg hover:shadow-elevated transition-all duration-200 hover:border-primary/30">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${getColorClasses(action?.color)}`}>
                    <Icon name={action?.icon} size={24} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {action?.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {action?.description}
                    </p>
                    
                    {action?.stats && (
                      <div className="mt-3 flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">
                          {action?.stats?.label}
                        </div>
                        <div className="text-sm font-bold text-foreground">
                          {action?.stats?.value}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <Icon 
                    name="ArrowRight" 
                    size={16} 
                    className="text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Quick Tools */}
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-sm font-semibold text-foreground mb-4">Quick Tools</h4>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="MessageCircle"
              iconPosition="left"
              iconSize={14}
              onClick={() => navigate('/messages')}
            >
              Messages
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Calendar"
              iconPosition="left"
              iconSize={14}
              onClick={() => navigate('/calendar')}
            >
              Calendar
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Users"
              iconPosition="left"
              iconSize={14}
              onClick={() => navigate('/students')}
            >
              Students
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Settings"
              iconPosition="left"
              iconSize={14}
              onClick={() => navigate('/settings')}
            >
              Settings
            </Button>
          </div>
        </div>

        {/* Today's Summary */}
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-sm font-semibold text-foreground mb-4">Today's Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">4</div>
              <div className="text-xs text-muted-foreground">Classes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">89%</div>
              <div className="text-xs text-muted-foreground">Attendance</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">12</div>
              <div className="text-xs text-muted-foreground">Submissions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">3</div>
              <div className="text-xs text-muted-foreground">Announcements</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;