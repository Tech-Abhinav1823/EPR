import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AttendanceTable from './components/AttendanceTable';
import AttendanceFilters from './components/AttendanceFilters';
import AttendanceStats from './components/AttendanceStats';
import AttendanceChart from './components/AttendanceChart';
import QuickActions from './components/QuickActions';

const AttendanceTracking = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('teacher'); // Mock role - can be 'student', 'teacher', 'admin'
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [chartType, setChartType] = useState('line');

  // Mock attendance data
  const [attendanceData, setAttendanceData] = useState([
    {
      id: 1,
      name: "Aarav Sharma",
      rollNumber: "2025001",
      class: "Class 12-A",
      subject: "Mathematics",
      percentage: 92,
      presentDays: 46,
      absentDays: 4,
      todayStatus: "present",
      lastUpdated: "13/09/2025 09:30 AM"
    },
    {
      id: 2,
      name: "Priya Patel",
      rollNumber: "2025002",
      class: "Class 12-A",
      subject: "Physics",
      percentage: 88,
      presentDays: 44,
      absentDays: 6,
      todayStatus: "present",
      lastUpdated: "13/09/2025 09:30 AM"
    },
    {
      id: 3,
      name: "Rahul Kumar",
      rollNumber: "2025003",
      class: "Class 12-A",
      subject: "Chemistry",
      percentage: 76,
      presentDays: 38,
      absentDays: 12,
      todayStatus: "absent",
      lastUpdated: "13/09/2025 09:30 AM"
    },
    {
      id: 4,
      name: "Sneha Gupta",
      rollNumber: "2025004",
      class: "Class 12-A",
      subject: "Biology",
      percentage: 95,
      presentDays: 47,
      absentDays: 3,
      todayStatus: "present",
      lastUpdated: "13/09/2025 09:30 AM"
    },
    {
      id: 5,
      name: "Arjun Singh",
      rollNumber: "2025005",
      class: "Class 12-A",
      subject: "Computer Science",
      percentage: 58,
      presentDays: 29,
      absentDays: 21,
      todayStatus: "not-marked",
      lastUpdated: "12/09/2025 02:15 PM"
    },
    {
      id: 6,
      name: "Kavya Reddy",
      rollNumber: "2025006",
      class: "Class 12-A",
      subject: "English",
      percentage: 84,
      presentDays: 42,
      absentDays: 8,
      todayStatus: "present",
      lastUpdated: "13/09/2025 09:30 AM"
    }
  ]);

  const [filters, setFilters] = useState({
    search: '',
    subject: 'All Subjects',
    class: 'All Classes',
    attendanceRange: 'all',
    startDate: '',
    endDate: '',
    todayStatus: 'all',
    sortBy: 'name'
  });

  // Mock stats based on user role
  const getStatsForRole = () => {
    if (userRole === 'student') {
      return {
        overallPercentage: 88,
        presentDays: 44,
        absentDays: 6,
        subjectsAtRisk: 1
      };
    }
    
    if (userRole === 'teacher') {
      return {
        totalStudents: 120,
        averageAttendance: 84,
        studentsAtRisk: 15,
        todayMarked: 118
      };
    }
    
    // Admin stats
    return {
      totalStudents: 1250,
      institutionAverage: 82,
      totalClasses: 45,
      criticalCases: 28
    };
  };

  const stats = getStatsForRole();

  // Filter attendance data based on current filters
  const filteredData = React.useMemo(() => {
    return attendanceData?.filter(student => {
      const matchesSearch = !filters?.search || 
        student?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        student?.rollNumber?.toLowerCase()?.includes(filters?.search?.toLowerCase());
      
      const matchesSubject = filters?.subject === 'All Subjects' || student?.subject === filters?.subject;
      const matchesClass = filters?.class === 'All Classes' || student?.class === filters?.class;
      
      const matchesAttendanceRange = filters?.attendanceRange === 'all' ||
        (filters?.attendanceRange === 'excellent' && student?.percentage >= 90) ||
        (filters?.attendanceRange === 'satisfactory' && student?.percentage >= 75 && student?.percentage < 90) ||
        (filters?.attendanceRange === 'below' && student?.percentage >= 60 && student?.percentage < 75) ||
        (filters?.attendanceRange === 'critical' && student?.percentage < 60);
      
      const matchesTodayStatus = filters?.todayStatus === 'all' || student?.todayStatus === filters?.todayStatus;
      
      return matchesSearch && matchesSubject && matchesClass && matchesAttendanceRange && matchesTodayStatus;
    });
  }, [attendanceData, filters]);

  const handleMarkAttendance = (studentId, status) => {
    setAttendanceData(prev => prev?.map(student => 
      student?.id === studentId 
        ? { 
            ...student, 
            todayStatus: status,
            lastUpdated: new Date()?.toLocaleString('en-IN', {
              day: '2-digit',
              month: '2-digit', 
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })
          }
        : student
    ));
  };

  const handleBulkAction = (action) => {
    setAttendanceData(prev => prev?.map(student => 
      selectedStudents?.includes(student?.id)
        ? { 
            ...student, 
            todayStatus: action,
            lastUpdated: new Date()?.toLocaleString('en-IN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric', 
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })
          }
        : student
    ));
    setSelectedStudents([]);
  };

  const handleViewDetails = (studentId) => {
    console.log('View details for student:', studentId);
    // Navigate to detailed view or show modal
  };

  const handleExport = () => {
    setIsLoading(true);
    setTimeout(() => {
      console.log('Exporting attendance data...');
      setIsLoading(false);
    }, 2000);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      console.log('Refreshing attendance data...');
      setIsLoading(false);
    }, 1000);
  };

  const handleQuickAction = (actionId, data) => {
    console.log('Quick action:', actionId, data);
    switch (actionId) {
      case 'view-attendance': setActiveTab('table');
        break;
      case 'download-report':
        handleExport();
        break;
      case 'quick-mark-attendance': setActiveTab('table');
        break;
      default:
        console.log('Action not implemented:', actionId);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'table', label: 'Attendance Table', icon: 'Table' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { id: 'actions', label: 'Quick Actions', icon: 'Zap' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole={userRole} 
        userName={userRole === 'student' ? 'Aarav Sharma' : userRole === 'teacher' ? 'Dr. Rajesh Kumar' : 'Admin User'}
        isCollapsed={isSidebarCollapsed}
      />
      <div className="flex">
        <Sidebar 
          userRole={userRole}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        
        <main className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        }`}>
          <div className="p-6">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Attendance Tracking</h1>
                  <p className="text-muted-foreground mt-2">
                    {userRole === 'student' ? 'Monitor your attendance records and academic progress'
                      : userRole === 'teacher' ? 'Manage and track student attendance for your classes' : 'Comprehensive attendance monitoring and analytics dashboard'
                    }
                  </p>
                </div>
                
                <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                  <Button
                    variant="outline"
                    onClick={handleRefresh}
                    loading={isLoading}
                    iconName="RefreshCw"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Refresh
                  </Button>
                  
                  <Button
                    variant="default"
                    onClick={handleExport}
                    loading={isLoading}
                    iconName="Download"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Export Report
                  </Button>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="mb-6">
              <div className="border-b border-border">
                <nav className="flex space-x-8">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab?.id
                          ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                      }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span>{tab?.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === 'overview' && (
                <>
                  <AttendanceStats stats={stats} userRole={userRole} />
                  
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2">
                      <AttendanceChart 
                        chartType={chartType} 
                        userRole={userRole}
                        chartData={attendanceData}
                      />
                      
                      <div className="flex items-center justify-center space-x-2 mt-4">
                        <Button
                          variant={chartType === 'line' ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => setChartType('line')}
                        >
                          Trend
                        </Button>
                        <Button
                          variant={chartType === 'bar' ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => setChartType('bar')}
                        >
                          Subjects
                        </Button>
                        <Button
                          variant={chartType === 'pie' ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => setChartType('pie')}
                        >
                          Distribution
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <QuickActions 
                        userRole={userRole}
                        onAction={handleQuickAction}
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'table' && (
                <>
                  <AttendanceFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                    userRole={userRole}
                    onExport={handleExport}
                    onRefresh={handleRefresh}
                    isLoading={isLoading}
                  />
                  
                  <AttendanceTable
                    attendanceData={filteredData}
                    userRole={userRole}
                    onMarkAttendance={handleMarkAttendance}
                    onViewDetails={handleViewDetails}
                    selectedStudents={selectedStudents}
                    onStudentSelect={setSelectedStudents}
                    onBulkAction={handleBulkAction}
                  />
                  
                  {filteredData?.length === 0 && (
                    <div className="text-center py-12">
                      <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">No results found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your filters or search terms to find what you're looking for.
                      </p>
                    </div>
                  )}
                </>
              )}

              {activeTab === 'analytics' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <AttendanceChart chartType="line" userRole={userRole} chartData={attendanceData} />
                  <AttendanceChart chartType="bar" userRole={userRole} chartData={attendanceData} />
                  <div className="lg:col-span-2">
                    <AttendanceChart chartType="pie" userRole={userRole} chartData={attendanceData} />
                  </div>
                </div>
              )}

              {activeTab === 'actions' && (
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <div className="xl:col-span-2">
                    <QuickActions 
                      userRole={userRole}
                      onAction={handleQuickAction}
                    />
                  </div>
                  <div>
                    <AttendanceStats stats={stats} userRole={userRole} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AttendanceTracking;