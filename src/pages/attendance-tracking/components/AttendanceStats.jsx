import React from 'react';

import DashboardCard from '../../../components/ui/DashboardCard';

const AttendanceStats = ({ stats, userRole }) => {
  const getStatsForRole = () => {
    if (userRole === 'student') {
      return [
        {
          title: "Overall Attendance",
          description: "Your total attendance percentage",
          icon: "TrendingUp",
          stats: { value: `${stats?.overallPercentage}%`, label: "This Semester" },
          status: stats?.overallPercentage >= 75 ? "Good Standing" : "Below Requirement",
          statusColor: stats?.overallPercentage >= 75 ? "success" : "warning"
        },
        {
          title: "Present Days",
          description: "Total days you attended",
          icon: "CheckCircle",
          stats: { value: stats?.presentDays, label: "Days Present" },
          status: "Active",
          statusColor: "success"
        },
        {
          title: "Absent Days",
          description: "Total days you were absent",
          icon: "XCircle",
          stats: { value: stats?.absentDays, label: "Days Absent" },
          status: stats?.absentDays > 10 ? "High" : "Normal",
          statusColor: stats?.absentDays > 10 ? "error" : "default"
        },
        {
          title: "Subjects at Risk",
          description: "Subjects below 75% attendance",
          icon: "AlertTriangle",
          stats: { value: stats?.subjectsAtRisk, label: "Subjects" },
          status: stats?.subjectsAtRisk > 0 ? "Attention Required" : "All Good",
          statusColor: stats?.subjectsAtRisk > 0 ? "warning" : "success"
        }
      ];
    }

    if (userRole === 'teacher') {
      return [
        {
          title: "Total Students",
          description: "Students under your supervision",
          icon: "Users",
          stats: { value: stats?.totalStudents, label: "Active Students" },
          status: "Active",
          statusColor: "primary"
        },
        {
          title: "Average Attendance",
          description: "Class average attendance rate",
          icon: "BarChart3",
          stats: { value: `${stats?.averageAttendance}%`, label: "Class Average" },
          status: stats?.averageAttendance >= 80 ? "Excellent" : stats?.averageAttendance >= 70 ? "Good" : "Needs Improvement",
          statusColor: stats?.averageAttendance >= 80 ? "success" : stats?.averageAttendance >= 70 ? "primary" : "warning"
        },
        {
          title: "Students at Risk",
          description: "Students with low attendance",
          icon: "AlertCircle",
          stats: { value: stats?.studentsAtRisk, label: "Students" },
          status: stats?.studentsAtRisk > 0 ? "Action Required" : "All Good",
          statusColor: stats?.studentsAtRisk > 0 ? "error" : "success"
        },
        {
          title: "Today's Attendance",
          description: "Attendance marked for today",
          icon: "Calendar",
          stats: { value: `${stats?.todayMarked}/${stats?.totalStudents}`, label: "Marked Today" },
          status: stats?.todayMarked === stats?.totalStudents ? "Complete" : "Pending",
          statusColor: stats?.todayMarked === stats?.totalStudents ? "success" : "warning"
        }
      ];
    }

    // Admin stats
    return [
      {
        title: "Total Students",
        description: "All students in the system",
        icon: "Users",
        stats: { value: stats?.totalStudents, label: "Active Students" },
        status: "Active",
        statusColor: "primary"
      },
      {
        title: "Overall Attendance",
        description: "Institution-wide attendance rate",
        icon: "TrendingUp",
        stats: { value: `${stats?.institutionAverage}%`, label: "Institution Average" },
        status: stats?.institutionAverage >= 85 ? "Excellent" : stats?.institutionAverage >= 75 ? "Good" : "Needs Attention",
        statusColor: stats?.institutionAverage >= 85 ? "success" : stats?.institutionAverage >= 75 ? "primary" : "warning"
      },
      {
        title: "Classes Monitored",
        description: "Total classes being tracked",
        icon: "BookOpen",
        stats: { value: stats?.totalClasses, label: "Active Classes" },
        status: "Monitoring",
        statusColor: "primary"
      },
      {
        title: "Critical Cases",
        description: "Students requiring immediate attention",
        icon: "AlertTriangle",
        stats: { value: stats?.criticalCases, label: "Students" },
        status: stats?.criticalCases > 0 ? "Urgent" : "All Clear",
        statusColor: stats?.criticalCases > 0 ? "error" : "success"
      }
    ];
  };

  const statsCards = getStatsForRole();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsCards?.map((card, index) => (
        <DashboardCard
          key={index}
          title={card?.title}
          description={card?.description}
          icon={card?.icon}
          stats={card?.stats}
          status={card?.status}
          statusColor={card?.statusColor}
          actionLabel="View Details"
          path="#"
          onClick={() => {}}
          className="hover:scale-105 transition-transform duration-200"
        />
      ))}
    </div>
  );
};

export default AttendanceStats;