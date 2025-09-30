import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StatusIndicator from '../../../components/ui/StatusIndicator';

const AcademicResourcesCard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('assignments');

  const resourcesData = {
    assignments: [
      {
        id: 1,
        title: "Calculus Problem Set - Chapter 5",
        subject: "Mathematics",
        dueDate: "20/09/2024",
        status: "pending",
        priority: "high",
        submissionType: "PDF Upload"
      },
      {
        id: 2,
        title: "Physics Lab Report - Optics",
        subject: "Physics",
        dueDate: "18/09/2024",
        status: "submitted",
        priority: "medium",
        submissionType: "Document"
      },
      {
        id: 3,
        title: "Chemistry Practical Analysis",
        subject: "Chemistry",
        dueDate: "25/09/2024",
        status: "pending",
        priority: "medium",
        submissionType: "Report"
      }
    ],
    studyNotes: [
      {
        id: 1,
        title: "Advanced Calculus Notes",
        subject: "Mathematics",
        uploadDate: "10/09/2024",
        fileType: "PDF",
        size: "2.5 MB",
        downloads: 45
      },
      {
        id: 2,
        title: "Quantum Physics Fundamentals",
        subject: "Physics",
        uploadDate: "08/09/2024",
        fileType: "PDF",
        size: "3.2 MB",
        downloads: 32
      },
      {
        id: 3,
        title: "Organic Chemistry Reactions",
        subject: "Chemistry",
        uploadDate: "12/09/2024",
        fileType: "PDF",
        size: "1.8 MB",
        downloads: 28
      }
    ],
    stats: {
      totalAssignments: 12,
      completedAssignments: 9,
      pendingAssignments: 3,
      totalNotes: 25,
      recentDownloads: 8
    }
  };

  const getAssignmentStatus = (status) => {
    switch (status) {
      case 'submitted': return 'success';
      case 'pending': return 'warning';
      case 'overdue': return 'error';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const handleDownload = (resourceId, type) => {
    console.log(`Downloading ${type} with ID: ${resourceId}`);
    // Simulate download
  };

  const handleViewAllAssignments = () => {
    navigate('/assignments');
  };

  const handleViewAllNotes = () => {
    navigate('/study-notes');
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft hover:shadow-elevated transition-all duration-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="BookOpen" size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">Academic Resources</h3>
              <p className="text-sm text-muted-foreground">Assignments & Study Materials</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <StatusIndicator 
              status="active"
              label={`${resourcesData?.stats?.pendingAssignments} Pending`}
              size="sm"
            />
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-muted/30 rounded-lg p-3 text-center">
            <p className="text-xl font-bold text-card-foreground">{resourcesData?.stats?.completedAssignments}/{resourcesData?.stats?.totalAssignments}</p>
            <p className="text-xs text-muted-foreground">Assignments Done</p>
          </div>
          <div className="bg-muted/30 rounded-lg p-3 text-center">
            <p className="text-xl font-bold text-card-foreground">{resourcesData?.stats?.totalNotes}</p>
            <p className="text-xs text-muted-foreground">Study Notes</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-4 bg-muted/50 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('assignments')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'assignments' ?'bg-background text-foreground shadow-soft' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Assignments
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'notes' ?'bg-background text-foreground shadow-soft' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Study Notes
          </button>
        </div>

        {/* Content Area */}
        <div className="mb-4">
          {activeTab === 'assignments' ? (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {resourcesData?.assignments?.map((assignment) => (
                <div key={assignment?.id} className="border border-border rounded-lg p-3 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-card-foreground line-clamp-1">
                        {assignment?.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">{assignment?.subject}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name="Flag" 
                        size={12} 
                        className={getPriorityColor(assignment?.priority)}
                      />
                      <StatusIndicator 
                        status={getAssignmentStatus(assignment?.status)}
                        label={assignment?.status}
                        size="sm"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-xs text-muted-foreground flex items-center space-x-1">
                        <Icon name="Calendar" size={12} />
                        <span>Due: {assignment?.dueDate}</span>
                      </span>
                      <span className="text-xs text-muted-foreground">{assignment?.submissionType}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName={assignment?.status === 'submitted' ? 'Eye' : 'Download'}
                      iconSize={14}
                      onClick={() => handleDownload(assignment?.id, 'assignment')}
                    >
                      {assignment?.status === 'submitted' ? 'View' : 'Download'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {resourcesData?.studyNotes?.map((note) => (
                <div key={note?.id} className="border border-border rounded-lg p-3 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-card-foreground line-clamp-1">
                        {note?.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">{note?.subject}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{note?.size}</p>
                      <p className="text-xs text-muted-foreground">{note?.downloads} downloads</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-xs text-muted-foreground flex items-center space-x-1">
                        <Icon name="Calendar" size={12} />
                        <span>{note?.uploadDate}</span>
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center space-x-1">
                        <Icon name="FileText" size={12} />
                        <span>{note?.fileType}</span>
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Download"
                      iconSize={14}
                      onClick={() => handleDownload(note?.id, 'note')}
                    >
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={activeTab === 'assignments' ? handleViewAllAssignments : handleViewAllNotes}
            iconName="ExternalLink"
            iconPosition="left"
            iconSize={16}
            className="flex-1"
          >
            View All {activeTab === 'assignments' ? 'Assignments' : 'Notes'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AcademicResourcesCard;