import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const QuickActions = ({ userRole, onAction }) => {
  const [isMarkingAttendance, setIsMarkingAttendance] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()?.toISOString()?.split('T')?.[0]);
  const [selectedSubject, setSelectedSubject] = useState('');

  const subjects = [
    "Mathematics",
    "Physics", 
    "Chemistry",
    "Biology",
    "Computer Science",
    "English"
  ];

  const getActionsForRole = () => {
    if (userRole === 'student') {
      return [
        {
          id: 'view-attendance',
          title: 'View My Attendance',
          description: 'Check your attendance records and statistics',
          icon: 'Eye',
          variant: 'default',
          action: () => onAction('view-attendance')
        },
        {
          id: 'download-report',
          title: 'Download Report',
          description: 'Get your attendance report in PDF format',
          icon: 'Download',
          variant: 'outline',
          action: () => onAction('download-report')
        },
        {
          id: 'attendance-alerts',
          title: 'Set Alerts',
          description: 'Configure attendance threshold notifications',
          icon: 'Bell',
          variant: 'ghost',
          action: () => onAction('set-alerts')
        }
      ];
    }

    if (userRole === 'teacher') {
      return [
        {
          id: 'mark-attendance',
          title: 'Mark Attendance',
          description: 'Quickly mark attendance for your classes',
          icon: 'CheckSquare',
          variant: 'default',
          action: () => setIsMarkingAttendance(true)
        },
        {
          id: 'view-reports',
          title: 'View Reports',
          description: 'Access detailed attendance analytics',
          icon: 'BarChart3',
          variant: 'outline',
          action: () => onAction('view-reports')
        },
        {
          id: 'export-data',
          title: 'Export Data',
          description: 'Export attendance data for external use',
          icon: 'FileDown',
          variant: 'ghost',
          action: () => onAction('export-data')
        },
        {
          id: 'send-notifications',
          title: 'Send Notifications',
          description: 'Notify students about attendance issues',
          icon: 'Send',
          variant: 'ghost',
          action: () => onAction('send-notifications')
        }
      ];
    }

    // Admin actions
    return [
      {
        id: 'system-overview',
        title: 'System Overview',
        description: 'View institution-wide attendance metrics',
        icon: 'LayoutDashboard',
        variant: 'default',
        action: () => onAction('system-overview')
      },
      {
        id: 'manage-classes',
        title: 'Manage Classes',
        description: 'Configure classes and attendance settings',
        icon: 'Settings',
        variant: 'outline',
        action: () => onAction('manage-classes')
      },
      {
        id: 'generate-reports',
        title: 'Generate Reports',
        description: 'Create comprehensive attendance reports',
        icon: 'FileText',
        variant: 'ghost',
        action: () => onAction('generate-reports')
      },
      {
        id: 'bulk-operations',
        title: 'Bulk Operations',
        description: 'Perform bulk attendance operations',
        icon: 'Database',
        variant: 'ghost',
        action: () => onAction('bulk-operations')
      }
    ];
  };

  const actions = getActionsForRole();

  const handleQuickMarkAttendance = () => {
    if (!selectedSubject) {
      alert('Please select a subject');
      return;
    }
    
    onAction('quick-mark-attendance', {
      date: selectedDate,
      subject: selectedSubject
    });
    setIsMarkingAttendance(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-card-foreground">Quick Actions</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Frequently used attendance management tools
        </p>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {actions?.map((action) => (
            <div
              key={action?.id}
              className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors cursor-pointer group"
              onClick={action?.action}
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon name={action?.icon} size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-card-foreground group-hover:text-primary transition-colors">
                    {action?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {action?.description}
                  </p>
                </div>
                <Icon 
                  name="ArrowRight" 
                  size={16} 
                  className="text-muted-foreground group-hover:text-primary transition-colors" 
                />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Mark Attendance Modal */}
        {isMarkingAttendance && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card border border-border rounded-lg shadow-elevated w-full max-w-md mx-4">
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-card-foreground">Quick Mark Attendance</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMarkingAttendance(false)}
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </div>
              </div>

              <div className="p-4 space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Select Date
                  </label>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e?.target?.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Select Subject
                  </label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e?.target?.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Choose a subject...</option>
                    {subjects?.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4">
                  <Button
                    variant="ghost"
                    onClick={() => setIsMarkingAttendance(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    onClick={handleQuickMarkAttendance}
                    iconName="CheckSquare"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Start Marking
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className="mt-6 pt-4 border-t border-border">
          <h4 className="text-sm font-semibold text-card-foreground mb-3">Recent Activity</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-muted-foreground">Attendance marked for Mathematics - Class 10A</span>
              <span className="text-xs text-muted-foreground ml-auto">2 min ago</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-muted-foreground">Report generated for September 2025</span>
              <span className="text-xs text-muted-foreground ml-auto">15 min ago</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span className="text-muted-foreground">Low attendance alert sent to 3 students</span>
              <span className="text-xs text-muted-foreground ml-auto">1 hour ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;