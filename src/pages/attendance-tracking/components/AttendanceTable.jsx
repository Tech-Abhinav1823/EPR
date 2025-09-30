import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StatusIndicator from '../../../components/ui/StatusIndicator';

const AttendanceTable = ({ 
  attendanceData, 
  userRole, 
  onMarkAttendance, 
  onViewDetails,
  selectedStudents,
  onStudentSelect,
  onBulkAction
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const getAttendanceStatus = (percentage) => {
    if (percentage >= 90) return { status: 'success', label: 'Excellent' };
    if (percentage >= 75) return { status: 'active', label: 'Satisfactory' };
    if (percentage >= 60) return { status: 'warning', label: 'Below Average' };
    return { status: 'error', label: 'Critical' };
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig?.key) return attendanceData;
    
    return [...attendanceData]?.sort((a, b) => {
      if (sortConfig?.key === 'percentage') {
        return sortConfig?.direction === 'asc' 
          ? a?.percentage - b?.percentage 
          : b?.percentage - a?.percentage;
      }
      
      const aValue = a?.[sortConfig?.key]?.toString()?.toLowerCase() || '';
      const bValue = b?.[sortConfig?.key]?.toString()?.toLowerCase() || '';
      
      if (sortConfig?.direction === 'asc') {
        return aValue?.localeCompare(bValue);
      }
      return bValue?.localeCompare(aValue);
    });
  }, [attendanceData, sortConfig]);

  const SortIcon = ({ column }) => {
    if (sortConfig?.key !== column) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-primary" />
      : <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft overflow-hidden">
      {/* Bulk Actions Bar */}
      {userRole === 'teacher' && selectedStudents?.length > 0 && (
        <div className="bg-primary/5 border-b border-border px-6 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              {selectedStudents?.length} student{selectedStudents?.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('present')}
                iconName="Check"
                iconPosition="left"
                iconSize={14}
              >
                Mark Present
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('absent')}
                iconName="X"
                iconPosition="left"
                iconSize={14}
              >
                Mark Absent
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              {userRole === 'teacher' && (
                <th className="w-12 px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedStudents?.length === attendanceData?.length}
                    onChange={(e) => {
                      if (e?.target?.checked) {
                        onStudentSelect(attendanceData?.map(student => student?.id));
                      } else {
                        onStudentSelect([]);
                      }
                    }}
                    className="rounded border-border"
                  />
                </th>
              )}
              <th className="text-left px-6 py-4">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
                >
                  <span>Student Name</span>
                  <SortIcon column="name" />
                </button>
              </th>
              <th className="text-left px-6 py-4">
                <button
                  onClick={() => handleSort('rollNumber')}
                  className="flex items-center space-x-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
                >
                  <span>Roll Number</span>
                  <SortIcon column="rollNumber" />
                </button>
              </th>
              <th className="text-left px-6 py-4">
                <button
                  onClick={() => handleSort('subject')}
                  className="flex items-center space-x-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
                >
                  <span>Subject</span>
                  <SortIcon column="subject" />
                </button>
              </th>
              <th className="text-left px-6 py-4">
                <button
                  onClick={() => handleSort('percentage')}
                  className="flex items-center space-x-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
                >
                  <span>Attendance %</span>
                  <SortIcon column="percentage" />
                </button>
              </th>
              <th className="text-left px-6 py-4">Today's Status</th>
              <th className="text-left px-6 py-4">Last Updated</th>
              <th className="text-right px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedData?.map((student) => {
              const attendanceStatus = getAttendanceStatus(student?.percentage);
              return (
                <tr key={student?.id} className="hover:bg-muted/30 transition-colors">
                  {userRole === 'teacher' && (
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedStudents?.includes(student?.id)}
                        onChange={(e) => {
                          if (e?.target?.checked) {
                            onStudentSelect([...selectedStudents, student?.id]);
                          } else {
                            onStudentSelect(selectedStudents?.filter(id => id !== student?.id));
                          }
                        }}
                        className="rounded border-border"
                      />
                    </td>
                  )}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name="User" size={16} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{student?.name}</p>
                        <p className="text-sm text-muted-foreground">{student?.class}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-foreground">{student?.rollNumber}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-foreground">{student?.subject}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-semibold text-foreground">{student?.percentage}%</span>
                      <StatusIndicator
                        status={attendanceStatus?.status}
                        label={attendanceStatus?.label}
                        size="sm"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusIndicator
                      status={student?.todayStatus === 'present' ? 'success' : student?.todayStatus === 'absent' ? 'error' : 'pending'}
                      label={student?.todayStatus === 'present' ? 'Present' : student?.todayStatus === 'absent' ? 'Absent' : 'Not Marked'}
                      variant="badge"
                      size="sm"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">{student?.lastUpdated}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {userRole === 'teacher' && (
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onMarkAttendance(student?.id, 'present')}
                            className="text-success hover:bg-success/10"
                          >
                            <Icon name="Check" size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onMarkAttendance(student?.id, 'absent')}
                            className="text-error hover:bg-error/10"
                          >
                            <Icon name="X" size={16} />
                          </Button>
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onViewDetails(student?.id)}
                      >
                        <Icon name="Eye" size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-border">
        {sortedData?.map((student) => {
          const attendanceStatus = getAttendanceStatus(student?.percentage);
          return (
            <div key={student?.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {userRole === 'teacher' && (
                    <input
                      type="checkbox"
                      checked={selectedStudents?.includes(student?.id)}
                      onChange={(e) => {
                        if (e?.target?.checked) {
                          onStudentSelect([...selectedStudents, student?.id]);
                        } else {
                          onStudentSelect(selectedStudents?.filter(id => id !== student?.id));
                        }
                      }}
                      className="rounded border-border"
                    />
                  )}
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="User" size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{student?.name}</p>
                    <p className="text-sm text-muted-foreground">{student?.rollNumber} • {student?.class}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onViewDetails(student?.id)}
                >
                  <Icon name="Eye" size={16} />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Subject</p>
                  <p className="text-sm font-medium text-foreground">{student?.subject}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Attendance</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-foreground">{student?.percentage}%</span>
                    <StatusIndicator
                      status={attendanceStatus?.status}
                      label={attendanceStatus?.label}
                      size="sm"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">Today:</span>
                  <StatusIndicator
                    status={student?.todayStatus === 'present' ? 'success' : student?.todayStatus === 'absent' ? 'error' : 'pending'}
                    label={student?.todayStatus === 'present' ? 'Present' : student?.todayStatus === 'absent' ? 'Absent' : 'Not Marked'}
                    variant="badge"
                    size="sm"
                  />
                </div>
                {userRole === 'teacher' && (
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onMarkAttendance(student?.id, 'present')}
                      className="text-success hover:bg-success/10"
                      iconName="Check"
                      iconSize={14}
                    >
                      Present
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onMarkAttendance(student?.id, 'absent')}
                      className="text-error hover:bg-error/10"
                      iconName="X"
                      iconSize={14}
                    >
                      Absent
                    </Button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttendanceTable;