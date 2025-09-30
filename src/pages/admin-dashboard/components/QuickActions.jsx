import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const QuickActions = () => {
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [announcementData, setAnnouncementData] = useState({
    title: '',
    message: '',
    recipients: 'all',
    priority: 'normal'
  });

  const quickActionItems = [
    {
      id: 'announcement',
      title: 'Post Announcement',
      description: 'Broadcast message to students and faculty',
      icon: 'Megaphone',
      color: 'primary',
      action: () => setShowAnnouncementForm(true)
    },
    {
      id: 'reports',
      title: 'Generate Reports',
      description: 'Create institutional analytics reports',
      icon: 'FileText',
      color: 'success',
      action: () => console.log('Generate reports')
    },
    {
      id: 'users',
      title: 'Manage Users',
      description: 'Add, edit, or remove user accounts',
      icon: 'Users',
      color: 'warning',
      action: () => console.log('Manage users')
    },
    {
      id: 'settings',
      title: 'System Settings',
      description: 'Configure application preferences',
      icon: 'Settings',
      color: 'secondary',
      action: () => console.log('System settings')
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'New student admission approved',
      user: 'Priya Sharma',
      time: '2 minutes ago',
      icon: 'UserCheck',
      color: 'success'
    },
    {
      id: 2,
      action: 'Fee payment received',
      user: 'Rahul Kumar - ₹45,000',
      time: '5 minutes ago',
      icon: 'CreditCard',
      color: 'primary'
    },
    {
      id: 3,
      action: 'Hostel room allocated',
      user: 'Anjali Patel - Room B-204',
      time: '12 minutes ago',
      icon: 'Building',
      color: 'warning'
    },
    {
      id: 4,
      action: 'Library book issued',
      user: 'Vikram Singh - Data Structures',
      time: '18 minutes ago',
      icon: 'BookOpen',
      color: 'secondary'
    }
  ];

  const handleAnnouncementSubmit = (e) => {
    e?.preventDefault();
    console.log('Announcement posted:', announcementData);
    setShowAnnouncementForm(false);
    setAnnouncementData({ title: '', message: '', recipients: 'all', priority: 'normal' });
  };

  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary/10 text-primary hover:bg-primary/20',
      success: 'bg-success/10 text-success hover:bg-success/20',
      warning: 'bg-warning/10 text-warning hover:bg-warning/20',
      secondary: 'bg-secondary/10 text-secondary hover:bg-secondary/20'
    };
    return colors?.[color] || colors?.primary;
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions Grid */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Quick Actions</h3>
            <p className="text-sm text-muted-foreground">Frequently used administrative tools</p>
          </div>
          <Icon name="Zap" size={20} className="text-accent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActionItems?.map((item) => (
            <button
              key={item?.id}
              onClick={item?.action}
              className={`p-4 rounded-lg border border-border text-left transition-all duration-200 hover:shadow-soft ${getColorClasses(item?.color)}`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(item?.color)}`}>
                  <Icon name={item?.icon} size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-card-foreground mb-1">{item?.title}</h4>
                  <p className="text-sm text-muted-foreground">{item?.description}</p>
                </div>
                <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Recent Activities */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Recent Activities</h3>
            <p className="text-sm text-muted-foreground">Latest system activities and updates</p>
          </div>
          <Button variant="outline" size="sm" iconName="RefreshCw" iconPosition="left" iconSize={16}>
            Refresh
          </Button>
        </div>

        <div className="space-y-4">
          {recentActivities?.map((activity) => (
            <div key={activity?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getColorClasses(activity?.color)}`}>
                <Icon name={activity?.icon} size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-card-foreground">{activity?.action}</p>
                <p className="text-sm text-muted-foreground">{activity?.user}</p>
              </div>
              <span className="text-xs text-muted-foreground">{activity?.time}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="ghost" size="sm" fullWidth iconName="Eye" iconPosition="left" iconSize={16}>
            View All Activities
          </Button>
        </div>
      </div>
      {/* Announcement Form Modal */}
      {showAnnouncementForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md shadow-elevated">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">Post Announcement</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAnnouncementForm(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <form onSubmit={handleAnnouncementSubmit} className="space-y-4">
              <Input
                label="Announcement Title"
                type="text"
                placeholder="Enter announcement title"
                value={announcementData?.title}
                onChange={(e) => setAnnouncementData({...announcementData, title: e?.target?.value})}
                required
              />

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">Message</label>
                <textarea
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={4}
                  placeholder="Enter your announcement message..."
                  value={announcementData?.message}
                  onChange={(e) => setAnnouncementData({...announcementData, message: e?.target?.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">Recipients</label>
                <select
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  value={announcementData?.recipients}
                  onChange={(e) => setAnnouncementData({...announcementData, recipients: e?.target?.value})}
                >
                  <option value="all">All Users</option>
                  <option value="students">Students Only</option>
                  <option value="teachers">Teachers Only</option>
                  <option value="staff">Staff Only</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">Priority</label>
                <select
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  value={announcementData?.priority}
                  onChange={(e) => setAnnouncementData({...announcementData, priority: e?.target?.value})}
                >
                  <option value="low">Low Priority</option>
                  <option value="normal">Normal Priority</option>
                  <option value="high">High Priority</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  fullWidth
                  onClick={() => setShowAnnouncementForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  fullWidth
                  iconName="Send"
                  iconPosition="left"
                  iconSize={16}
                >
                  Post Announcement
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActions;