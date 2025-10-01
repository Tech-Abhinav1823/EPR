import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import StatusIndicator from "../../../components/ui/StatusIndicator";

const AnnouncementsPanel = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  const announcementsData = [
    {
      id: 1,
      title: "Mid-Semester Examination Schedule Released",
      content: `The mid-semester examination schedule for all courses has been released. Students are advised to check their respective course schedules and prepare accordingly.\n\nExamination will commence from 25th October 2025. All students must carry their ID cards and admit cards to the examination hall.`,
      category: "academic",
      priority: "high",
      author: "Academic Office",
      publishDate: "13/09/2025",
      readTime: "2 min read",
      isRead: false,
      attachments: [{ name: "Exam_Schedule_2025.pdf", size: "245 KB" }],
    },
    {
      id: 2,
      title: "Hostel Fee Payment Deadline Extended",
      content: `Due to technical issues with the payment gateway, the hostel fee payment deadline has been extended to 30th October 2025.\n\nStudents can now pay their hostel fees without any late fee charges until the new deadline.`,
      category: "hostel",
      priority: "medium",
      author: "Hostel Administration",
      publishDate: "12/09/2025",
      readTime: "1 min read",
      isRead: true,
      attachments: [],
    },
    {
      id: 3,
      title: "Library New Book Collection Available",
      content: `The library has received a new collection of books on Computer Science, Mathematics, and Physics. Students can now access these books for reference and borrowing.\n\nNew digital resources have also been added to the online portal.`,
      category: "library",
      priority: "low",
      author: "Library Department",
      publishDate: "11/09/2025",
      readTime: "1 min read",
      isRead: true,
      attachments: [{ name: "New_Books_List.pdf", size: "180 KB" }],
    },
    {
      id: 4,
      title: "Campus Placement Drive - Tech Companies",
      content: `Major tech companies including TCS, Infosys, and Wipro will be conducting campus placement drives from 1st October 2025.\n\nEligible students must register through the placement portal by 20th September 2025.`,
      category: "placement",
      priority: "high",
      author: "Placement Cell",
      publishDate: "10/09/2025",
      readTime: "3 min read",
      isRead: false,
      attachments: [
        { name: "Placement_Guidelines.pdf", size: "320 KB" },
        { name: "Company_Profiles.pdf", size: "450 KB" },
      ],
    },
    {
      id: 5,
      title: "Student Council Elections 2025",
      content: `Nominations for Student Council Elections 2025 are now open. Students interested in participating can submit their nominations by 18th September 2025.\n\nElections will be held on 25th September 2025.`,
      category: "general",
      priority: "medium",
      author: "Student Affairs",
      publishDate: "09/09/2025",
      readTime: "2 min read",
      isRead: true,
      attachments: [],
    },
  ];

  const categories = [
    { value: "all", label: "All", count: announcementsData?.length },
    {
      value: "academic",
      label: "Academic",
      count: announcementsData?.filter((a) => a?.category === "academic")
        ?.length,
    },
    {
      value: "hostel",
      label: "Hostel",
      count: announcementsData?.filter((a) => a?.category === "hostel")?.length,
    },
    {
      value: "library",
      label: "Library",
      count: announcementsData?.filter((a) => a?.category === "library")
        ?.length,
    },
    {
      value: "placement",
      label: "Placement",
      count: announcementsData?.filter((a) => a?.category === "placement")
        ?.length,
    },
    {
      value: "general",
      label: "General",
      count: announcementsData?.filter((a) => a?.category === "general")
        ?.length,
    },
  ];

  const filteredAnnouncements =
    filter === "all"
      ? announcementsData
      : announcementsData?.filter(
          (announcement) => announcement?.category === filter
        );

  const unreadCount = announcementsData?.filter((a) => !a?.isRead)?.length;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "default";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "academic":
        return "GraduationCap";
      case "hostel":
        return "Building";
      case "library":
        return "Library";
      case "placement":
        return "Briefcase";
      case "general":
        return "Bell";
      default:
        return "Info";
    }
  };

  const handleViewAll = () => {
    navigate("/announcements");
  };

  const handleDownloadAttachment = (attachment) => {
    console.log(`Downloading: ${attachment?.name}`);
    // Simulate download
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Bell" size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">
                Announcements
              </h3>
              <p className="text-sm text-muted-foreground">
                Latest updates and notices
              </p>
            </div>
          </div>
          {unreadCount > 0 && (
            <StatusIndicator
              status="error"
              label={`${unreadCount} New`}
              size="sm"
            />
          )}
        </div>

        {/* Category Filter */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {categories?.map((category) => (
              <button
                key={category?.value}
                onClick={() => setFilter(category?.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  filter === category?.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category?.label} ({category?.count})
              </button>
            ))}
          </div>
        </div>

        {/* Announcements List */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredAnnouncements?.map((announcement) => (
            <div
              key={announcement?.id}
              className={`border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors ${
                !announcement?.isRead ? "bg-primary/5 border-primary/20" : ""
              }`}
            >
              {/* Announcement Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon
                      name={getCategoryIcon(announcement?.category)}
                      size={16}
                      className="text-muted-foreground"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4
                      className={`text-sm font-medium text-card-foreground line-clamp-2 ${
                        !announcement?.isRead ? "font-semibold" : ""
                      }`}
                    >
                      {announcement?.title}
                    </h4>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {announcement?.author}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {announcement?.publishDate}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {announcement?.readTime}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <StatusIndicator
                    status={getPriorityColor(announcement?.priority)}
                    variant="dot"
                    label=""
                  />
                  {!announcement?.isRead && (
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  )}
                </div>
              </div>

              {/* Announcement Content */}
              <div className="ml-11">
                <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                  {announcement?.content?.split("\n")?.[0]}
                </p>

                {/* Attachments */}
                {announcement?.attachments?.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-medium text-card-foreground mb-2">
                      Attachments:
                    </p>
                    <div className="space-y-1">
                      {announcement?.attachments?.map((attachment, index) => (
                        <button
                          key={index}
                          onClick={() => handleDownloadAttachment(attachment)}
                          className="flex items-center space-x-2 text-xs text-primary hover:text-primary/80 transition-colors"
                        >
                          <Icon name="Paperclip" size={12} />
                          <span>{attachment?.name}</span>
                          <span className="text-muted-foreground">
                            ({attachment?.size})
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      iconSize={12}
                    >
                      Read More
                    </Button>
                    {announcement?.attachments?.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Download"
                        iconSize={12}
                      >
                        Download
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Share2"
                      iconSize={12}
                    >
                      Share
                    </Button>
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
            onClick={handleViewAll}
            iconName="ExternalLink"
            iconPosition="left"
            iconSize={16}
            fullWidth
          >
            View All Announcements
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsPanel;
