import React, { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AttendanceChart = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [timeRange, setTimeRange] = useState('week');

  const weeklyData = [
    { day: 'Mon', cse: 92, ece: 88, mech: 85, civil: 90, overall: 89 },
    { day: 'Tue', cse: 94, ece: 91, mech: 87, civil: 92, overall: 91 },
    { day: 'Wed', cse: 89, ece: 86, mech: 83, civil: 88, overall: 87 },
    { day: 'Thu', cse: 96, ece: 93, mech: 89, civil: 94, overall: 93 },
    { day: 'Fri', cse: 91, ece: 88, mech: 86, civil: 89, overall: 89 },
    { day: 'Sat', cse: 87, ece: 84, mech: 82, civil: 85, overall: 85 }
  ];

  const monthlyData = [
    { period: 'Week 1', cse: 91, ece: 88, mech: 85, civil: 89, overall: 88 },
    { period: 'Week 2', cse: 93, ece: 90, mech: 87, civil: 91, overall: 90 },
    { period: 'Week 3', cse: 89, ece: 86, mech: 84, civil: 88, overall: 87 },
    { period: 'Week 4', cse: 95, ece: 92, mech: 88, civil: 93, overall: 92 }
  ];

  const currentData = timeRange === 'week' ? weeklyData : monthlyData;

  const departments = [
    { key: 'all', label: 'All Departments', color: '#1E40AF' },
    { key: 'cse', label: 'Computer Science', color: '#10B981' },
    { key: 'ece', label: 'Electronics', color: '#F59E0B' },
    { key: 'mech', label: 'Mechanical', color: '#EF4444' },
    { key: 'civil', label: 'Civil', color: '#8B5CF6' }
  ];

  const getDataKey = () => {
    return selectedDepartment === 'all' ? 'overall' : selectedDepartment;
  };

  const getLineColor = () => {
    const dept = departments?.find(d => d?.key === selectedDepartment);
    return dept ? dept?.color : '#1E40AF';
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated">
          <p className="font-medium text-popover-foreground mb-2">{label}</p>
          {selectedDepartment === 'all' ? (
            <div className="space-y-1">
              <p className="text-sm text-primary">Overall: {payload?.[0]?.value}%</p>
              <p className="text-sm text-success">CSE: {currentData?.find(d => d?.[timeRange === 'week' ? 'day' : 'period'] === label)?.cse}%</p>
              <p className="text-sm text-warning">ECE: {currentData?.find(d => d?.[timeRange === 'week' ? 'day' : 'period'] === label)?.ece}%</p>
              <p className="text-sm text-error">Mech: {currentData?.find(d => d?.[timeRange === 'week' ? 'day' : 'period'] === label)?.mech}%</p>
              <p className="text-sm text-accent">Civil: {currentData?.find(d => d?.[timeRange === 'week' ? 'day' : 'period'] === label)?.civil}%</p>
            </div>
          ) : (
            <p className="text-sm" style={{ color: payload?.[0]?.color }}>
              Attendance: {payload?.[0]?.value}%
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const averageAttendance = currentData?.reduce((sum, item) => sum + item?.[getDataKey()], 0) / currentData?.length;

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Attendance Trends</h3>
          <p className="text-sm text-muted-foreground">Department-wise attendance tracking</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e?.target?.value)}
            className="px-3 py-1.5 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {departments?.map(dept => (
              <option key={dept?.key} value={dept?.key}>{dept?.label}</option>
            ))}
          </select>
          <Button
            variant={timeRange === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('week')}
            iconName="Calendar"
            iconPosition="left"
            iconSize={16}
          >
            Week
          </Button>
          <Button
            variant={timeRange === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('month')}
            iconName="CalendarDays"
            iconPosition="left"
            iconSize={16}
          >
            Month
          </Button>
        </div>
      </div>
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={getLineColor()} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={getLineColor()} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey={timeRange === 'week' ? 'day' : 'period'} 
              stroke="#64748B" 
              fontSize={12} 
            />
            <YAxis 
              stroke="#64748B" 
              fontSize={12} 
              domain={[70, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey={getDataKey()}
              stroke={getLineColor()}
              fillOpacity={1}
              fill="url(#attendanceGradient)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-medium text-card-foreground">Average</span>
          </div>
          <p className="text-xl font-bold text-success">{averageAttendance?.toFixed(1)}%</p>
          <p className="text-xs text-muted-foreground">This {timeRange}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name="Users" size={16} className="text-primary" />
            <span className="text-sm font-medium text-card-foreground">Present Today</span>
          </div>
          <p className="text-xl font-bold text-primary">2,847</p>
          <p className="text-xs text-muted-foreground">Out of 3,200</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name="UserX" size={16} className="text-warning" />
            <span className="text-sm font-medium text-card-foreground">Absent</span>
          </div>
          <p className="text-xl font-bold text-warning">353</p>
          <p className="text-xs text-muted-foreground">11.0% absent rate</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name="Clock" size={16} className="text-accent" />
            <span className="text-sm font-medium text-card-foreground">Late Arrivals</span>
          </div>
          <p className="text-xl font-bold text-accent">127</p>
          <p className="text-xs text-muted-foreground">4.0% late rate</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getLineColor() }}></div>
            <span className="text-sm text-muted-foreground">
              {departments?.find(d => d?.key === selectedDepartment)?.label}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="RefreshCw" size={14} />
          <span>Updated 5 mins ago</span>
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;