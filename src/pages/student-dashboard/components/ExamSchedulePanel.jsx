import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import StatusIndicator from "../../../components/ui/StatusIndicator";

const ExamSchedulePanel = () => {
  const navigate = useNavigate();
  const [selectedExamType, setSelectedExamType] = useState("upcoming");

  const examData = {
    upcoming: [
      {
        id: 1,
        subject: "Advanced Mathematics",
        subjectCode: "MATH301",
        examType: "Mid-Semester",
        date: "25/10/2025",
        time: "09:00 AM - 12:00 PM",
        duration: "3 hours",
        venue: "Exam Hall A",
        seat: "A-45",
        syllabus: "Chapters 1-5",
        status: "scheduled",
        daysLeft: 12,
      },
      {
        id: 2,
        subject: "Physics Laboratory",
        subjectCode: "PHY302L",
        examType: "Practical",
        date: "27/10/2025",
        time: "02:00 PM - 05:00 PM",
        duration: "3 hours",
        venue: "Physics Lab 2",
        seat: "Lab Station 12",
        syllabus: "All Experiments",
        status: "scheduled",
        daysLeft: 14,
      },
      {
        id: 3,
        subject: "Computer Programming",
        subjectCode: "CSE201",
        examType: "Mid-Semester",
        date: "30/10/2025",
        time: "10:00 AM - 01:00 PM",
        duration: "3 hours",
        venue: "Computer Lab 1",
        seat: "PC-23",
        syllabus: "Programming Concepts",
        status: "scheduled",
        daysLeft: 17,
      },
    ],
    completed: [
      {
        id: 4,
        subject: "English Literature",
        subjectCode: "ENG101",
        examType: "Quiz",
        date: "10/09/2025",
        time: "11:00 AM - 12:00 PM",
        duration: "1 hour",
        venue: "Classroom 201",
        seat: "21",
        syllabus: "Poetry Analysis",
        status: "completed",
        result: "85/100",
      },
      {
        id: 5,
        subject: "Chemistry Basics",
        subjectCode: "CHEM101",
        examType: "Unit Test",
        date: "05/09/2025",
        time: "02:00 PM - 04:00 PM",
        duration: "2 hours",
        venue: "Exam Hall B",
        seat: "B-67",
        syllabus: "Organic Chemistry",
        status: "completed",
        result: "92/100",
      },
    ],
  };

  const currentExams = examData?.[selectedExamType];
  const upcomingCount = examData?.upcoming?.length;
  const completedCount = examData?.completed?.length;

  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled":
        return "warning";
      case "completed":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const getExamTypeIcon = (examType) => {
    switch (examType?.toLowerCase()) {
      case "mid-semester":
        return "BookOpen";
      case "final":
        return "Award";
      case "practical":
        return "Wrench";
      case "quiz":
        return "HelpCircle";
      case "unit test":
        return "FileText";
      default:
        return "Calendar";
    }
  };

  const getDaysLeftColor = (daysLeft) => {
    if (daysLeft <= 3) return "text-error";
    if (daysLeft <= 7) return "text-warning";
    return "text-success";
  };

  const handleViewDetails = (examId) => {
    navigate(`/exam-details/${examId}`);
  };

  const handleDownloadAdmitCard = (examId) => {
    console.log(`Downloading admit card for exam: ${examId}`);
    // Simulate download
  };

  const handleViewAllExams = () => {
    navigate("/exam-schedule");
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">
                Exam Schedule
              </h3>
              <p className="text-sm text-muted-foreground">
                Mid-Semester Examinations
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <StatusIndicator
              status="warning"
              label={`${upcomingCount} Upcoming`}
              size="sm"
            />
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-muted/30 rounded-lg p-3 text-center">
            <p className="text-xl font-bold text-warning">{upcomingCount}</p>
            <p className="text-xs text-muted-foreground">Upcoming Exams</p>
          </div>
          <div className="bg-muted/30 rounded-lg p-3 text-center">
            <p className="text-xl font-bold text-success">{completedCount}</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-4 bg-muted/50 rounded-lg p-1">
          <button
            onClick={() => setSelectedExamType("upcoming")}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              selectedExamType === "upcoming"
                ? "bg-background text-foreground shadow-soft"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Upcoming ({upcomingCount})
          </button>
          <button
            onClick={() => setSelectedExamType("completed")}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              selectedExamType === "completed"
                ? "bg-background text-foreground shadow-soft"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Completed ({completedCount})
          </button>
        </div>

        {/* Exam List */}
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {currentExams?.map((exam) => (
            <div
              key={exam?.id}
              className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors"
            >
              {/* Exam Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon
                      name={getExamTypeIcon(exam?.examType)}
                      size={18}
                      className="text-primary"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-card-foreground line-clamp-1">
                      {exam?.subject}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {exam?.subjectCode} - {exam?.examType}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <StatusIndicator
                        status={getStatusColor(exam?.status)}
                        label={exam?.status}
                        size="sm"
                      />
                      {exam?.daysLeft && (
                        <span
                          className={`text-xs font-medium ${getDaysLeftColor(
                            exam?.daysLeft
                          )}`}
                        >
                          {exam?.daysLeft} days left
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {exam?.result && (
                  <div className="text-right">
                    <p className="text-sm font-bold text-success">
                      {exam?.result}
                    </p>
                    <p className="text-xs text-muted-foreground">Score</p>
                  </div>
                )}
              </div>

              {/* Exam Details */}
              <div className="ml-13 space-y-2">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="flex items-center space-x-2">
                    <Icon
                      name="Calendar"
                      size={12}
                      className="text-muted-foreground"
                    />
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium text-card-foreground">
                      {exam?.date}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon
                      name="Clock"
                      size={12}
                      className="text-muted-foreground"
                    />
                    <span className="text-muted-foreground">Time:</span>
                    <span className="font-medium text-card-foreground">
                      {exam?.time}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon
                      name="MapPin"
                      size={12}
                      className="text-muted-foreground"
                    />
                    <span className="text-muted-foreground">Venue:</span>
                    <span className="font-medium text-card-foreground">
                      {exam?.venue}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon
                      name="User"
                      size={12}
                      className="text-muted-foreground"
                    />
                    <span className="text-muted-foreground">Seat:</span>
                    <span className="font-medium text-card-foreground">
                      {exam?.seat}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-xs">
                  <Icon
                    name="BookOpen"
                    size={12}
                    className="text-muted-foreground"
                  />
                  <span className="text-muted-foreground">Syllabus:</span>
                  <span className="font-medium text-card-foreground">
                    {exam?.syllabus}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetails(exam?.id)}
                      iconName="Eye"
                      iconSize={12}
                    >
                      Details
                    </Button>
                    {exam?.status === "scheduled" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadAdmitCard(exam?.id)}
                        iconName="Download"
                        iconSize={12}
                      >
                        Admit Card
                      </Button>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Duration: {exam?.duration}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={handleViewAllExams}
            iconName="Calendar"
            iconPosition="left"
            iconSize={16}
            fullWidth
          >
            View Complete Schedule
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExamSchedulePanel;
