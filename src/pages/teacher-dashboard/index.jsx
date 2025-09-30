import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ActionToolbar from '../../components/ui/ActionToolbar';
import StudentManagementTable from './components/StudentManagementTable';
import AssignmentUploadPanel from './components/AssignmentUploadPanel';
import StudyNotesPanel from './components/StudyNotesPanel';
import SubmissionStatistics from './components/SubmissionStatistics';
import QuickActions from './components/QuickActions';
import Icon from '../../components/AppIcon';


const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('students');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for students
  const [students] = useState([
    {
      id: 1,
      name: "Aarav Sharma",
      rollNumber: "2024001",
      class: "class-12-a",
      subjects: ["mathematics", "physics", "chemistry"],
      attendance: 92.5,
      assignmentsSubmitted: 8,
      totalAssignments: 10,
      performance: 87.3
    },
    {
      id: 2,
      name: "Priya Patel",
      rollNumber: "2024002",
      class: "class-12-a",
      subjects: ["mathematics", "physics", "chemistry", "biology"],
      attendance: 88.7,
      assignmentsSubmitted: 9,
      totalAssignments: 10,
      performance: 91.2
    },
    {
      id: 3,
      name: "Rohit Kumar",
      rollNumber: "2024003",
      class: "class-11-b",
      subjects: ["mathematics", "physics", "computer-science"],
      attendance: 76.3,
      assignmentsSubmitted: 6,
      totalAssignments: 10,
      performance: 73.8
    },
    {
      id: 4,
      name: "Sneha Reddy",
      rollNumber: "2024004",
      class: "class-12-b",
      subjects: ["biology", "chemistry", "english"],
      attendance: 94.1,
      assignmentsSubmitted: 10,
      totalAssignments: 10,
      performance: 89.6
    },
    {
      id: 5,
      name: "Arjun Singh",
      rollNumber: "2024005",
      class: "class-11-a",
      subjects: ["mathematics", "physics", "chemistry"],
      attendance: 82.4,
      assignmentsSubmitted: 7,
      totalAssignments: 10,
      performance: 78.9
    },
    {
      id: 6,
      name: "Kavya Nair",
      rollNumber: "2024006",
      class: "class-12-a",
      subjects: ["english", "biology", "chemistry"],
      attendance: 96.8,
      assignmentsSubmitted: 10,
      totalAssignments: 10,
      performance: 93.4
    },
    {
      id: 7,
      name: "Vikram Gupta",
      rollNumber: "2024007",
      class: "class-11-b",
      subjects: ["computer-science", "mathematics", "physics"],
      attendance: 71.2,
      assignmentsSubmitted: 5,
      totalAssignments: 10,
      performance: 68.7
    },
    {
      id: 8,
      name: "Ananya Joshi",
      rollNumber: "2024008",
      class: "class-12-b",
      subjects: ["mathematics", "physics", "chemistry"],
      attendance: 90.3,
      assignmentsSubmitted: 9,
      totalAssignments: 10,
      performance: 85.1
    }
  ]);

  const [recentNotes] = useState([
    {
      id: 1,
      title: "Organic Chemistry - Reaction Mechanisms",
      subject: "chemistry",
      class: "class-12-a",
      createdAt: "2024-09-10T10:30:00Z",
      studentsNotified: 28
    },
    {
      id: 2,
      title: "Calculus - Integration Techniques",
      subject: "mathematics",
      class: "class-12-b",
      createdAt: "2024-09-09T14:15:00Z",
      studentsNotified: 25
    },
    {
      id: 3,
      title: "Physics - Wave Optics",
      subject: "physics",
      class: "class-11-a",
      createdAt: "2024-09-08T09:45:00Z",
      studentsNotified: 30
    }
  ]);

  const [assignments, setAssignments] = useState([]);
  const [sharedNotes, setSharedNotes] = useState(recentNotes);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleViewStudent = (student) => {
    navigate(`/student-profile/${student?.id}`);
  };

  const handleUpdateGrade = (student) => {
    navigate(`/gradebook?student=${student?.id}`);
  };

  const handleUploadAssignment = (assignment) => {
    setAssignments(prev => [assignment, ...prev]);
    // Show success notification
    console.log('Assignment uploaded:', assignment);
  };

  const handleShareNotes = (notes) => {
    setSharedNotes(prev => [notes, ...prev]);
    // Show success notification
    console.log('Notes shared:', notes);
  };

  const toolbarActions = [
    {
      id: 'upload',
      label: 'Upload Assignment',
      icon: 'Upload',
      variant: 'default',
      onClick: () => setActiveTab('assignments')
    },
    {
      id: 'share',
      label: 'Share Notes',
      icon: 'BookOpen',
      variant: 'outline',
      onClick: () => setActiveTab('notes')
    },
    {
      id: 'reports',
      label: 'Generate Report',
      icon: 'BarChart3',
      variant: 'outline',
      onClick: () => navigate('/teacher-reports')
    },
    {
      id: 'attendance',
      label: 'Mark Attendance',
      icon: 'Calendar',
      variant: 'ghost',
      onClick: () => navigate('/attendance-tracking')
    }
  ];

  const tabs = [
    { id: 'students', label: 'Student Management', icon: 'Users' },
    { id: 'assignments', label: 'Upload Assignments', icon: 'Upload' },
    { id: 'notes', label: 'Share Notes', icon: 'BookOpen' },
    { id: 'statistics', label: 'Statistics', icon: 'BarChart3' },
    { id: 'actions', label: 'Quick Actions', icon: 'Zap' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" size={48} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading teacher dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="teacher" userName="Dr. Sarah Johnson" />
      <div className="flex">
        <Sidebar 
          userRole="teacher" 
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        
        <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
          <div className="p-6">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Teacher Dashboard</h1>
                  <p className="text-muted-foreground mt-2">
                    Manage students, assignments, and academic content efficiently
                  </p>
                </div>
                
                <ActionToolbar 
                  actions={toolbarActions}
                  userRole="teacher"
                  orientation="horizontal"
                  size="default"
                />
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="mb-6">
              <div className="border-b border-border">
                <nav className="flex space-x-8 overflow-x-auto">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                        activeTab === tab?.id
                          ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                      }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span className="hidden sm:inline">{tab?.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === 'students' && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-foreground mb-2">Student Management</h2>
                    <p className="text-muted-foreground">
                      View and manage enrolled students with attendance and performance tracking
                    </p>
                  </div>
                  <StudentManagementTable
                    students={students}
                    onViewStudent={handleViewStudent}
                    onUpdateGrade={handleUpdateGrade}
                  />
                </div>
              )}

              {activeTab === 'assignments' && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-foreground mb-2">Assignment Management</h2>
                    <p className="text-muted-foreground">
                      Upload new assignments and distribute them to students
                    </p>
                  </div>
                  <AssignmentUploadPanel onUploadAssignment={handleUploadAssignment} />
                </div>
              )}

              {activeTab === 'notes' && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-foreground mb-2">Study Notes Sharing</h2>
                    <p className="text-muted-foreground">
                      Share study materials and notes with students
                    </p>
                  </div>
                  <StudyNotesPanel 
                    onShareNotes={handleShareNotes}
                    recentNotes={sharedNotes}
                  />
                </div>
              )}

              {activeTab === 'statistics' && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-foreground mb-2">Submission Statistics</h2>
                    <p className="text-muted-foreground">
                      Analyze assignment submissions and student performance
                    </p>
                  </div>
                  <SubmissionStatistics statistics={students} />
                </div>
              )}

              {activeTab === 'actions' && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-foreground mb-2">Quick Actions</h2>
                    <p className="text-muted-foreground">
                      Access frequently used teaching tools and functions
                    </p>
                  </div>
                  <QuickActions userRole="teacher" />
                </div>
              )}
            </div>

            {/* Mobile Tab Content (Accordion Style) */}
            <div className="md:hidden mt-8 space-y-4">
              {tabs?.map((tab) => (
                <div key={tab?.id} className="bg-card border border-border rounded-lg shadow-soft">
                  <button
                    onClick={() => setActiveTab(activeTab === tab?.id ? '' : tab?.id)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name={tab?.icon} size={20} className="text-primary" />
                      <span className="font-medium text-foreground">{tab?.label}</span>
                    </div>
                    <Icon 
                      name="ChevronDown" 
                      size={20} 
                      className={`text-muted-foreground transition-transform ${
                        activeTab === tab?.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {activeTab === tab?.id && (
                    <div className="px-4 pb-4 border-t border-border">
                      <div className="pt-4">
                        {tab?.id === 'students' && (
                          <StudentManagementTable
                            students={students}
                            onViewStudent={handleViewStudent}
                            onUpdateGrade={handleUpdateGrade}
                          />
                        )}
                        {tab?.id === 'assignments' && (
                          <AssignmentUploadPanel onUploadAssignment={handleUploadAssignment} />
                        )}
                        {tab?.id === 'notes' && (
                          <StudyNotesPanel 
                            onShareNotes={handleShareNotes}
                            recentNotes={sharedNotes}
                          />
                        )}
                        {tab?.id === 'statistics' && <SubmissionStatistics statistics={students} />}
                        {tab?.id === 'actions' && <QuickActions userRole="teacher" />}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;