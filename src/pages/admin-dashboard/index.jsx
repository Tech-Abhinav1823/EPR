import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MetricsCard from './components/MetricsCard';
import AdmissionsChart from './components/AdmissionsChart';
import FeeCollectionChart from './components/FeeCollectionChart';
import HostelOccupancyChart from './components/HostelOccupancyChart';
import AttendanceChart from './components/AttendanceChart';
import QuickActions from './components/QuickActions';

const AdminDashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const metricsData = [
    {
      title: 'Total Students',
      value: '3,247',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'Users',
      color: 'primary'
    },
    {
      title: 'Active Teachers',
      value: '187',
      change: '+3.2%',
      changeType: 'positive',
      icon: 'UserCheck',
      color: 'success'
    },
    {
      title: 'Pending Admissions',
      value: '236',
      change: '-8.1%',
      changeType: 'negative',
      icon: 'UserPlus',
      color: 'warning'
    },
    {
      title: 'Fee Collection',
      value: '₹52.3L',
      change: '+15.7%',
      changeType: 'positive',
      icon: 'CreditCard',
      color: 'success'
    }
  ];

  const systemAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Server Maintenance',
      message: 'Scheduled maintenance on Dec 15, 2025 from 2:00 AM - 4:00 AM',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'info',
      title: 'New Feature Update',
      message: 'Enhanced reporting dashboard is now available',
      time: '1 day ago'
    },
    {
      id: 3,
      type: 'success',
      title: 'Backup Completed',
      message: 'Daily database backup completed successfully',
      time: '2 days ago'
    }
  ];

  const formatDateTime = (date) => {
    return date?.toLocaleString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata'
    });
  };

  const getAlertIcon = (type) => {
    const icons = {
      warning: 'AlertTriangle',
      info: 'Info',
      success: 'CheckCircle',
      error: 'XCircle'
    };
    return icons?.[type] || 'Info';
  };

  const getAlertColor = (type) => {
    const colors = {
      warning: 'text-warning bg-warning/10',
      info: 'text-primary bg-primary/10',
      success: 'text-success bg-success/10',
      error: 'text-error bg-error/10'
    };
    return colors?.[type] || colors?.info;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="admin" userName="Dr. Rajesh Kumar" />
      <div className="flex">
        <Sidebar 
          userRole="admin" 
          isCollapsed={isSidebarCollapsed} 
          onToggleCollapse={handleToggleSidebar} 
        />
        
        <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
          <div className="p-6 space-y-6">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  Comprehensive institutional oversight and management
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {formatDateTime(currentTime)}
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                  iconSize={16}
                  onClick={() => console.log('Export dashboard data')}
                >
                  Export Data
                </Button>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={16}
                  onClick={() => navigate('/student-admission-form')}
                >
                  New Admission
                </Button>
              </div>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metricsData?.map((metric, index) => (
                <MetricsCard
                  key={index}
                  title={metric?.title}
                  value={metric?.value}
                  change={metric?.change}
                  changeType={metric?.changeType}
                  icon={metric?.icon}
                  color={metric?.color}
                />
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <AdmissionsChart />
              <FeeCollectionChart />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <HostelOccupancyChart />
              <AttendanceChart />
            </div>

            {/* Quick Actions and System Alerts */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <QuickActions />
              </div>
              
              {/* System Alerts */}
              <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground">System Alerts</h3>
                    <p className="text-sm text-muted-foreground">Important notifications and updates</p>
                  </div>
                  <Icon name="Bell" size={20} className="text-accent" />
                </div>

                <div className="space-y-4">
                  {systemAlerts?.map((alert) => (
                    <div key={alert?.id} className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getAlertColor(alert?.type)}`}>
                          <Icon name={getAlertIcon(alert?.type)} size={16} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-card-foreground text-sm">{alert?.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{alert?.message}</p>
                          <span className="text-xs text-muted-foreground mt-2 block">{alert?.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <Button variant="ghost" size="sm" fullWidth iconName="Eye" iconPosition="left" iconSize={16}>
                    View All Alerts
                  </Button>
                </div>
              </div>
            </div>

            {/* Navigation Quick Links */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">Quick Navigation</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { label: 'Student Dashboard', path: '/student-dashboard', icon: 'GraduationCap' },
                  { label: 'Teacher Dashboard', path: '/teacher-dashboard', icon: 'BookOpen' },
                  { label: 'Admissions', path: '/student-admission-form', icon: 'UserPlus' },
                  { label: 'Attendance', path: '/attendance-tracking', icon: 'Calendar' },
                  { label: 'Login Page', path: '/login', icon: 'LogIn' },
                  { label: 'Settings', path: '/settings', icon: 'Settings' }
                ]?.map((link, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(link?.path)}
                    iconName={link?.icon}
                    iconPosition="top"
                    iconSize={20}
                    className="h-auto py-4 flex-col space-y-2"
                  >
                    <span className="text-xs">{link?.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;