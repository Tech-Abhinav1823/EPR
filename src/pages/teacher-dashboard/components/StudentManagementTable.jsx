import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import StatusIndicator from '../../../components/ui/StatusIndicator';

const StudentManagementTable = ({ students, onViewStudent, onUpdateGrade }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterClass, setFilterClass] = useState('all');
  const [filterSubject, setFilterSubject] = useState('all');

  const classOptions = [
    { value: 'all', label: 'All Classes' },
    { value: 'class-10-a', label: 'Class 10-A' },
    { value: 'class-10-b', label: 'Class 10-B' },
    { value: 'class-11-a', label: 'Class 11-A' },
    { value: 'class-11-b', label: 'Class 11-B' },
    { value: 'class-12-a', label: 'Class 12-A' },
    { value: 'class-12-b', label: 'Class 12-B' }
  ];

  const subjectOptions = [
    { value: 'all', label: 'All Subjects' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'english', label: 'English' },
    { value: 'computer-science', label: 'Computer Science' }
  ];

  const filteredAndSortedStudents = useMemo(() => {
    let filtered = students?.filter(student => {
      const matchesSearch = student?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           student?.rollNumber?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      const matchesClass = filterClass === 'all' || student?.class === filterClass;
      const matchesSubject = filterSubject === 'all' || student?.subjects?.includes(filterSubject);
      
      return matchesSearch && matchesClass && matchesSubject;
    });

    filtered?.sort((a, b) => {
      let aValue = a?.[sortBy];
      let bValue = b?.[sortBy];
      
      if (sortBy === 'attendance') {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [students, searchTerm, sortBy, sortOrder, filterClass, filterSubject]);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const getAttendanceStatus = (percentage) => {
    if (percentage >= 90) return 'success';
    if (percentage >= 75) return 'warning';
    return 'error';
  };

  const getPerformanceStatus = (grade) => {
    if (grade >= 85) return 'success';
    if (grade >= 70) return 'warning';
    return 'error';
  };

  const getSortIcon = (column) => {
    if (sortBy !== column) return 'ArrowUpDown';
    return sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      {/* Header with Search and Filters */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 max-w-md">
            <Input
              type="search"
              placeholder="Search students by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <Select
              options={classOptions}
              value={filterClass}
              onChange={setFilterClass}
              placeholder="Filter by class"
              className="w-full sm:w-40"
            />
            
            <Select
              options={subjectOptions}
              value={filterSubject}
              onChange={setFilterSubject}
              placeholder="Filter by subject"
              className="w-full sm:w-40"
            />
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
                >
                  <span>Student</span>
                  <Icon name={getSortIcon('name')} size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('class')}
                  className="flex items-center space-x-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
                >
                  <span>Class</span>
                  <Icon name={getSortIcon('class')} size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('attendance')}
                  className="flex items-center space-x-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
                >
                  <span>Attendance</span>
                  <Icon name={getSortIcon('attendance')} size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="text-sm font-semibold text-foreground">Assignments</span>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('performance')}
                  className="flex items-center space-x-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
                >
                  <span>Performance</span>
                  <Icon name={getSortIcon('performance')} size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-right">
                <span className="text-sm font-semibold text-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredAndSortedStudents?.map((student) => (
              <tr key={student?.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="User" size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{student?.name}</p>
                      <p className="text-sm text-muted-foreground">{student?.rollNumber}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-foreground">{student?.class}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <StatusIndicator
                      status={getAttendanceStatus(student?.attendance)}
                      variant="dot"
                      label={`${student?.attendance}% attendance`}
                    />
                    <span className="text-sm font-medium text-foreground">{student?.attendance}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-foreground">
                      {student?.assignmentsSubmitted}/{student?.totalAssignments}
                    </span>
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{
                          width: `${(student?.assignmentsSubmitted / student?.totalAssignments) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <StatusIndicator
                      status={getPerformanceStatus(student?.performance)}
                      variant="dot"
                      label={`${student?.performance}% performance`}
                    />
                    <span className="text-sm font-medium text-foreground">{student?.performance}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewStudent(student)}
                      iconName="Eye"
                      iconSize={14}
                    >
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onUpdateGrade(student)}
                      iconName="Edit"
                      iconSize={14}
                    >
                      Grade
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Empty State */}
      {filteredAndSortedStudents?.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No students found</h3>
          <p className="text-muted-foreground">
            {searchTerm || filterClass !== 'all' || filterSubject !== 'all' ? 'Try adjusting your search or filter criteria.' : 'No students are enrolled in your classes yet.'}
          </p>
        </div>
      )}
      {/* Footer with Results Count */}
      {filteredAndSortedStudents?.length > 0 && (
        <div className="px-6 py-4 border-t border-border bg-muted/20">
          <p className="text-sm text-muted-foreground">
            Showing {filteredAndSortedStudents?.length} of {students?.length} students
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentManagementTable;