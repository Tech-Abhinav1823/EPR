import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StatusIndicator from '../../../components/ui/StatusIndicator';

const AttendanceCard = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState('overall');

  const attendanceData = {
    overall: {
      percentage: 78,
      present: 156,
      total: 200,
      status: 'warning'
    },
    subjects: [
      { id: 'math', name: 'Mathematics', percentage: 85, present: 34, total: 40, status: 'success' },
      { id: 'physics', name: 'Physics', percentage: 72, present: 29, total: 40, status: 'warning' },
      { id: 'chemistry', name: 'Chemistry', percentage: 80, present: 32, total: 40, status: 'success' },
      { id: 'english', name: 'English', percentage: 75, present: 30, total: 40, status: 'warning' },
      { id: 'computer', name: 'Computer Science', percentage: 90, present: 36, total: 40, status: 'success' }
    ],
    recentActivity: [
      { date: '13/09/2024', subject: 'Mathematics', status: 'present', time: '09:00 AM' },
      { date: '12/09/2024', subject: 'Physics', status: 'absent', time: '11:00 AM' },
      { date: '11/09/2024', subject: 'Chemistry', status: 'present', time: '02:00 PM' },
      { date: '10/09/2024', subject: 'English', status: 'present', time: '10:00 AM' }
    ]
  };

  const currentData = selectedSubject === 'overall' 
    ? attendanceData?.overall 
    : attendanceData?.subjects?.find(s => s?.id === selectedSubject);

  const getStatusColor = (percentage) => {
    if (percentage >= 85) return 'success';
    if (percentage >= 75) return 'warning';
    return 'error';
  };

  const handleViewDetails = () => {
    navigate('/attendance-tracking');
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft hover:shadow-elevated transition-all duration-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">Attendance</h3>
              <p className="text-sm text-muted-foreground">Current Semester</p>
            </div>
          </div>
          <StatusIndicator 
            status={getStatusColor(currentData?.percentage)}
            label={`${currentData?.percentage}%`}
          />
        </div>

        {/* Subject Selector */}
        <div className="mb-4">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e?.target?.value)}
            className="w-full p-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="overall">Overall Attendance</option>
            {attendanceData?.subjects?.map((subject) => (
              <option key={subject?.id} value={subject?.id}>
                {subject?.name}
              </option>
            ))}
          </select>
        </div>

        {/* Attendance Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Attendance Rate</span>
            <span className="text-sm font-medium text-card-foreground">
              {currentData?.present}/{currentData?.total} classes
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-300 ${
                currentData?.percentage >= 85 ? 'bg-success' :
                currentData?.percentage >= 75 ? 'bg-warning' : 'bg-error'
              }`}
              style={{ width: `${currentData?.percentage}%` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground">0%</span>
            <span className="text-xs text-muted-foreground">100%</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-success">{currentData?.present}</p>
            <p className="text-xs text-muted-foreground">Present</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-error">{currentData?.total - currentData?.present}</p>
            <p className="text-xs text-muted-foreground">Absent</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-card-foreground">{currentData?.total}</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
        </div>

        {/* Minimum Attendance Alert */}
        {currentData?.percentage < 75 && (
          <div className="bg-error/10 border border-error/20 rounded-lg p-3 mb-4">
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-error" />
              <span className="text-sm font-medium text-error">
                Below minimum requirement (75%)
              </span>
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-card-foreground mb-3">Recent Activity</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {attendanceData?.recentActivity?.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-card-foreground">{activity?.subject}</p>
                  <p className="text-xs text-muted-foreground">{activity?.date} at {activity?.time}</p>
                </div>
                <StatusIndicator 
                  status={activity?.status === 'present' ? 'success' : 'error'}
                  label={activity?.status === 'present' ? 'P' : 'A'}
                  variant="badge"
                  size="sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant="outline"
          onClick={handleViewDetails}
          iconName="BarChart3"
          iconPosition="left"
          iconSize={16}
          fullWidth
        >
          View Detailed Report
        </Button>
      </div>
    </div>
  );
};

export default AttendanceCard;