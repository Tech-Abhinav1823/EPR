import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const AttendanceChart = ({ chartData, chartType = 'line', userRole }) => {
  const COLORS = ['#1E40AF', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const monthlyData = [
    { month: 'Jan', attendance: 85, target: 75 },
    { month: 'Feb', attendance: 88, target: 75 },
    { month: 'Mar', attendance: 82, target: 75 },
    { month: 'Apr', attendance: 90, target: 75 },
    { month: 'May', attendance: 87, target: 75 },
    { month: 'Jun', attendance: 85, target: 75 },
    { month: 'Jul', attendance: 89, target: 75 },
    { month: 'Aug', attendance: 91, target: 75 },
    { month: 'Sep', attendance: 88, target: 75 }
  ];

  const subjectWiseData = [
    { subject: 'Mathematics', attendance: 92 },
    { subject: 'Physics', attendance: 88 },
    { subject: 'Chemistry', attendance: 85 },
    { subject: 'Biology', attendance: 90 },
    { subject: 'Computer Science', attendance: 95 },
    { subject: 'English', attendance: 87 }
  ];

  const attendanceDistribution = [
    { name: 'Excellent (90%+)', value: 35, count: 42 },
    { name: 'Good (80-89%)', value: 28, count: 34 },
    { name: 'Satisfactory (70-79%)', value: 22, count: 26 },
    { name: 'Below Average (60-69%)', value: 10, count: 12 },
    { name: 'Critical (<60%)', value: 5, count: 6 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg shadow-elevated p-3">
          <p className="font-medium text-popover-foreground">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="attendance" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="var(--color-warning)" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectWiseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="subject" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="attendance" 
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={attendanceDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {attendanceDistribution?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [`${value}%`, name]}
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  const getChartTitle = () => {
    switch (chartType) {
      case 'line':
        return userRole === 'student' ? 'Your Attendance Trend' : 'Monthly Attendance Trend';
      case 'bar':
        return userRole === 'student' ? 'Subject-wise Attendance' : 'Subject Performance';
      case 'pie':
        return 'Attendance Distribution';
      default:
        return 'Attendance Analytics';
    }
  };

  const getChartDescription = () => {
    switch (chartType) {
      case 'line':
        return 'Track attendance patterns over time with target benchmarks';
      case 'bar':
        return 'Compare attendance rates across different subjects';
      case 'pie':
        return 'Distribution of students by attendance performance levels';
      default:
        return 'Visual representation of attendance data';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">{getChartTitle()}</h3>
          <p className="text-sm text-muted-foreground mt-1">{getChartDescription()}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} className="text-success" />
          <span className="text-sm font-medium text-success">
            {chartType === 'line' ? '+2.5%' : chartType === 'bar' ? 'Avg 89%' : '120 Students'}
          </span>
        </div>
      </div>

      <div className="w-full">
        {renderChart()}
      </div>

      {/* Chart Legend/Summary */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {chartType === 'line' && (
            <>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">88.5%</p>
                <p className="text-sm text-muted-foreground">Average Attendance</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success">+3.2%</p>
                <p className="text-sm text-muted-foreground">vs Last Month</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">75%</p>
                <p className="text-sm text-muted-foreground">Target Threshold</p>
              </div>
            </>
          )}

          {chartType === 'bar' && (
            <>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">95%</p>
                <p className="text-sm text-muted-foreground">Highest Subject</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">85%</p>
                <p className="text-sm text-muted-foreground">Lowest Subject</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success">89%</p>
                <p className="text-sm text-muted-foreground">Overall Average</p>
              </div>
            </>
          )}

          {chartType === 'pie' && (
            <>
              <div className="text-center">
                <p className="text-2xl font-bold text-success">42</p>
                <p className="text-sm text-muted-foreground">Excellent Students</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-error">6</p>
                <p className="text-sm text-muted-foreground">Critical Cases</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">120</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;