import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AttendanceFilters = ({ 
  filters, 
  onFiltersChange, 
  userRole,
  onExport,
  onRefresh,
  isLoading 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: filters?.startDate || '',
    endDate: filters?.endDate || ''
  });

  const subjectOptions = [
    "All Subjects",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "English",
    "History",
    "Geography"
  ];

  const classOptions = [
    "All Classes",
    "Class 10-A",
    "Class 10-B",
    "Class 11-A",
    "Class 11-B",
    "Class 12-A",
    "Class 12-B"
  ];

  const attendanceRanges = [
    { label: "All Students", value: "all" },
    { label: "Excellent (90%+)", value: "excellent" },
    { label: "Satisfactory (75-89%)", value: "satisfactory" },
    { label: "Below Average (60-74%)", value: "below" },
    { label: "Critical (<60%)", value: "critical" }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleDateRangeChange = (key, value) => {
    const newDateRange = { ...dateRange, [key]: value };
    setDateRange(newDateRange);
    onFiltersChange({
      ...filters,
      ...newDateRange
    });
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      subject: 'All Subjects',
      class: 'All Classes',
      attendanceRange: 'all',
      startDate: '',
      endDate: ''
    };
    setDateRange({ startDate: '', endDate: '' });
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = filters?.search || 
    filters?.subject !== 'All Subjects' || 
    filters?.class !== 'All Classes' || 
    filters?.attendanceRange !== 'all' ||
    filters?.startDate || 
    filters?.endDate;

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      {/* Main Filter Bar */}
      <div className="p-4 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search and Quick Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 flex-1">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={18} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                />
                <Input
                  type="text"
                  placeholder="Search students by name or roll number..."
                  value={filters?.search}
                  onChange={(e) => handleFilterChange('search', e?.target?.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <select
                value={filters?.subject}
                onChange={(e) => handleFilterChange('subject', e?.target?.value)}
                className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {subjectOptions?.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>

              <select
                value={filters?.class}
                onChange={(e) => handleFilterChange('class', e?.target?.value)}
                className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {classOptions?.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              iconPosition="right"
              iconSize={16}
            >
              More Filters
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onRefresh}
              loading={isLoading}
              iconName="RefreshCw"
              iconSize={16}
            >
              Refresh
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              iconName="Download"
              iconPosition="left"
              iconSize={16}
            >
              Export
            </Button>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                iconName="X"
                iconSize={16}
                className="text-error hover:bg-error/10"
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* Expanded Filters */}
      {isExpanded && (
        <div className="p-4 bg-muted/30 border-b border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Date Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Date Range</label>
              <div className="space-y-2">
                <Input
                  type="date"
                  placeholder="Start Date"
                  value={dateRange?.startDate}
                  onChange={(e) => handleDateRangeChange('startDate', e?.target?.value)}
                />
                <Input
                  type="date"
                  placeholder="End Date"
                  value={dateRange?.endDate}
                  onChange={(e) => handleDateRangeChange('endDate', e?.target?.value)}
                />
              </div>
            </div>

            {/* Attendance Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Attendance Range</label>
              <select
                value={filters?.attendanceRange}
                onChange={(e) => handleFilterChange('attendanceRange', e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {attendanceRanges?.map(range => (
                  <option key={range?.value} value={range?.value}>{range?.label}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Today's Status</label>
              <select
                value={filters?.todayStatus || 'all'}
                onChange={(e) => handleFilterChange('todayStatus', e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Status</option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="not-marked">Not Marked</option>
              </select>
            </div>

            {/* Sort Options */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Sort By</label>
              <select
                value={filters?.sortBy || 'name'}
                onChange={(e) => handleFilterChange('sortBy', e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="name">Student Name</option>
                <option value="rollNumber">Roll Number</option>
                <option value="percentage">Attendance %</option>
                <option value="lastUpdated">Last Updated</option>
              </select>
            </div>
          </div>

          {/* Filter Summary */}
          {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {filters?.search && (
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    Search: "{filters?.search}"
                  </span>
                )}
                {filters?.subject !== 'All Subjects' && (
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    Subject: {filters?.subject}
                  </span>
                )}
                {filters?.class !== 'All Classes' && (
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    Class: {filters?.class}
                  </span>
                )}
                {filters?.attendanceRange !== 'all' && (
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    Range: {attendanceRanges?.find(r => r?.value === filters?.attendanceRange)?.label}
                  </span>
                )}
                {(filters?.startDate || filters?.endDate) && (
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    Date: {filters?.startDate || 'Start'} - {filters?.endDate || 'End'}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AttendanceFilters;