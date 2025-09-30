import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';
import StatusIndicator from '../../../components/ui/StatusIndicator';

const SubmissionStatistics = ({ statistics }) => {
  const submissionData = [
    { name: 'Mathematics', submitted: 23, pending: 7, total: 30 },
    { name: 'Physics', submitted: 18, pending: 12, total: 30 },
    { name: 'Chemistry', submitted: 25, pending: 5, total: 30 },
    { name: 'Biology', submitted: 20, pending: 10, total: 30 },
    { name: 'English', submitted: 28, pending: 2, total: 30 },
    { name: 'Computer Science', submitted: 22, pending: 8, total: 30 }
  ];

  const performanceData = [
    { grade: 'A+ (90-100)', count: 15, color: '#10B981' },
    { grade: 'A (80-89)', count: 25, color: '#3B82F6' },
    { grade: 'B (70-79)', count: 35, color: '#F59E0B' },
    { grade: 'C (60-69)', count: 20, color: '#EF4444' },
    { grade: 'Below 60', count: 5, color: '#6B7280' }
  ];

  const weeklyTrend = [
    { week: 'Week 1', submissions: 45 },
    { week: 'Week 2', submissions: 52 },
    { week: 'Week 3', submissions: 48 },
    { week: 'Week 4', submissions: 58 },
    { week: 'Week 5', submissions: 55 },
    { week: 'Week 6', submissions: 62 }
  ];

  const overallStats = {
    totalAssignments: 24,
    totalSubmissions: 156,
    averageGrade: 78.5,
    onTimeSubmissions: 89,
    lateSubmissions: 11
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg shadow-elevated p-3">
          <p className="font-medium text-popover-foreground">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.dataKey}: {entry?.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 shadow-soft">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{overallStats?.totalAssignments}</p>
              <p className="text-sm text-muted-foreground">Total Assignments</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 shadow-soft">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{overallStats?.totalSubmissions}</p>
              <p className="text-sm text-muted-foreground">Total Submissions</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 shadow-soft">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Award" size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{overallStats?.averageGrade}%</p>
              <p className="text-sm text-muted-foreground">Average Grade</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 shadow-soft">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{overallStats?.onTimeSubmissions}%</p>
              <p className="text-sm text-muted-foreground">On-Time Rate</p>
            </div>
          </div>
        </div>
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submission Status by Subject */}
        <div className="bg-card border border-border rounded-lg shadow-soft">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Submission Status by Subject</h3>
            <p className="text-sm text-muted-foreground">Current assignment submission rates</p>
          </div>
          <div className="p-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={submissionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    stroke="var(--color-muted-foreground)"
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    stroke="var(--color-muted-foreground)"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="submitted" fill="var(--color-success)" name="Submitted" />
                  <Bar dataKey="pending" fill="var(--color-warning)" name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Grade Distribution */}
        <div className="bg-card border border-border rounded-lg shadow-soft">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Grade Distribution</h3>
            <p className="text-sm text-muted-foreground">Overall performance breakdown</p>
          </div>
          <div className="p-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={performanceData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="count"
                    label={({ grade, count }) => `${grade}: ${count}`}
                    labelLine={false}
                  >
                    {performanceData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      {/* Weekly Submission Trend */}
      <div className="bg-card border border-border rounded-lg shadow-soft">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Weekly Submission Trend</h3>
          <p className="text-sm text-muted-foreground">Assignment submission patterns over time</p>
        </div>
        <div className="p-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="week" 
                  tick={{ fontSize: 12 }}
                  stroke="var(--color-muted-foreground)"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="var(--color-muted-foreground)"
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="submissions" 
                  stroke="var(--color-primary)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Subject Performance Summary */}
      <div className="bg-card border border-border rounded-lg shadow-soft">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Subject Performance Summary</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {submissionData?.map((subject) => {
              const submissionRate = (subject?.submitted / subject?.total) * 100;
              const status = submissionRate >= 90 ? 'success' : submissionRate >= 75 ? 'warning' : 'error';
              
              return (
                <div key={subject?.name} className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">{subject?.name}</h4>
                    <StatusIndicator status={status} variant="dot" label={`${submissionRate?.toFixed(1)}% completion`} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Submitted:</span>
                      <span className="text-foreground font-medium">{subject?.submitted}/{subject?.total}</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${submissionRate}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground text-center">
                      {submissionRate?.toFixed(1)}% completion rate
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionStatistics;