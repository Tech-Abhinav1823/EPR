import React from 'react';
import Header from '../../components/ui/Header';
import FeeStatusCard from './components/FeeStatusCard';
import AttendanceCard from './components/AttendanceCard';
import AcademicResourcesCard from './components/AcademicResourcesCard';
import HostelInfoCard from './components/HostelInfoCard';
import AnnouncementsPanel from './components/AnnouncementsPanel';
import ExamSchedulePanel from './components/ExamSchedulePanel';
import AIChatbot from './components/AIChatbot';
import Icon from '../../components/AppIcon';

const StudentDashboard = () => {
  const studentInfo = {
    name: "Arjun Sharma",
    studentId: "STU2024001",
    course: "B.Tech Computer Science",
    semester: "5th Semester",
    year: "3rd Year",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  };

  const quickStats = [
    {
      label: "CGPA",
      value: "8.7",
      icon: "Award",
      color: "text-success"
    },
    {
      label: "Attendance",
      value: "78%",
      icon: "Calendar",
      color: "text-warning"
    },
    {
      label: "Credits",
      value: "142/160",
      icon: "BookOpen",
      color: "text-primary"
    },
    {
      label: "Rank",
      value: "#12",
      icon: "Trophy",
      color: "text-accent"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header userRole="student" userName={studentInfo?.name} />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={32} color="white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Welcome back, {studentInfo?.name}!
                  </h1>
                  <p className="text-muted-foreground">
                    {studentInfo?.studentId} • {studentInfo?.course} • {studentInfo?.semester}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Academic Year 2024-25 • {studentInfo?.year}
                  </p>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Today's Date</p>
                  <p className="text-lg font-semibold text-foreground">
                    {new Date()?.toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {quickStats?.map((stat, index) => (
                <div key={index} className="bg-card/50 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Icon name={stat?.icon} size={20} className={stat?.color} />
                  </div>
                  <p className={`text-xl font-bold ${stat?.color}`}>{stat?.value}</p>
                  <p className="text-xs text-muted-foreground">{stat?.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Primary Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Fee Status and Attendance Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeeStatusCard />
              <AttendanceCard />
            </div>

            {/* Academic Resources and Hostel Info Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AcademicResourcesCard />
              <HostelInfoCard />
            </div>
          </div>

          {/* Right Column - Information Panels */}
          <div className="space-y-6">
            <AnnouncementsPanel />
            <ExamSchedulePanel />
          </div>
        </div>

        {/* Additional Quick Actions */}
        <div className="mt-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex flex-col items-center space-y-2 p-4 bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors">
                <Icon name="CreditCard" size={24} className="text-primary" />
                <span className="text-sm font-medium text-card-foreground">Pay Fees</span>
              </button>
              <button className="flex flex-col items-center space-y-2 p-4 bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors">
                <Icon name="Download" size={24} className="text-primary" />
                <span className="text-sm font-medium text-card-foreground">Download</span>
              </button>
              <button className="flex flex-col items-center space-y-2 p-4 bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors">
                <Icon name="MessageCircle" size={24} className="text-primary" />
                <span className="text-sm font-medium text-card-foreground">Support</span>
              </button>
              <button className="flex flex-col items-center space-y-2 p-4 bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors">
                <Icon name="Settings" size={24} className="text-primary" />
                <span className="text-sm font-medium text-card-foreground">Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
};

export default StudentDashboard;