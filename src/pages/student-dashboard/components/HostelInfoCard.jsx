import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import StatusIndicator from "../../../components/ui/StatusIndicator";

const HostelInfoCard = () => {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);

  const hostelData = {
    roomInfo: {
      roomNumber: "A-204",
      blockName: "Block A - Boys Hostel",
      roomType: "Double Sharing",
      floorNumber: 2,
      occupancy: "2/2",
      roommates: [
        { name: "Rahul Kumar", course: "B.Tech CSE", year: "3rd Year" },
      ],
    },
    feeInfo: {
      monthlyFee: 8500,
      securityDeposit: 15000,
      paidAmount: 42500,
      pendingAmount: 8500,
      dueDate: "30/10/2025",
      lastPayment: {
        amount: 8500,
        date: "01/10/2025",
      },
    },
    facilities: [
      { name: "WiFi", status: "active", icon: "Wifi" },
      { name: "Laundry", status: "active", icon: "Shirt" },
      { name: "Mess", status: "active", icon: "UtensilsCrossed" },
      { name: "Study Room", status: "active", icon: "BookOpen" },
      { name: "Recreation", status: "active", icon: "Gamepad2" },
      { name: "Medical", status: "active", icon: "Heart" },
    ],
    complaints: [
      { id: 1, issue: "AC not working", status: "pending", date: "10/10/2025" },
      {
        id: 2,
        issue: "Water pressure low",
        status: "resolved",
        date: "05/10/2025",
      },
    ],
    notices: [
      {
        id: 1,
        title: "Hostel Maintenance on 15/10/2025",
        date: "12/10/2025",
        priority: "high",
      },
      {
        id: 2,
        title: "New Mess Menu Available",
        date: "10/10/2025",
        priority: "medium",
      },
    ],
  };

  const handlePayHostelFee = () => {
    navigate("/hostel-fee-payment");
  };

  const handleComplaint = () => {
    navigate("/hostel-complaints");
  };

  const handleRoomChange = () => {
    navigate("/room-change-request");
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft hover:shadow-elevated transition-all duration-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Building" size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">
                Hostel Information
              </h3>
              <p className="text-sm text-muted-foreground">
                {hostelData?.roomInfo?.roomNumber} -{" "}
                {hostelData?.roomInfo?.blockName}
              </p>
            </div>
          </div>
          <StatusIndicator
            status={
              hostelData?.feeInfo?.pendingAmount > 0 ? "warning" : "success"
            }
            label={hostelData?.feeInfo?.pendingAmount > 0 ? "Fee Due" : "Paid"}
          />
        </div>

        {/* Room Details */}
        <div className="bg-muted/30 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-card-foreground">
                Room Details
              </p>
              <p className="text-xs text-muted-foreground">
                Type: {hostelData?.roomInfo?.roomType}
              </p>
              <p className="text-xs text-muted-foreground">
                Floor: {hostelData?.roomInfo?.floorNumber}
              </p>
              <p className="text-xs text-muted-foreground">
                Occupancy: {hostelData?.roomInfo?.occupancy}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-card-foreground">
                Roommate
              </p>
              <p className="text-xs text-muted-foreground">
                {hostelData?.roomInfo?.roommates?.[0]?.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {hostelData?.roomInfo?.roommates?.[0]?.course}
              </p>
              <p className="text-xs text-muted-foreground">
                {hostelData?.roomInfo?.roommates?.[0]?.year}
              </p>
            </div>
          </div>
        </div>

        {/* Fee Status */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-card-foreground">
              Monthly Fee Status
            </span>
            <span className="text-sm text-muted-foreground">
              ₹{hostelData?.feeInfo?.monthlyFee?.toLocaleString("en-IN")}/month
            </span>
          </div>

          {hostelData?.feeInfo?.pendingAmount > 0 && (
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 mb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon
                    name="AlertTriangle"
                    size={16}
                    className="text-warning"
                  />
                  <span className="text-sm font-medium text-warning">
                    ₹
                    {hostelData?.feeInfo?.pendingAmount?.toLocaleString(
                      "en-IN"
                    )}{" "}
                    Due by {hostelData?.feeInfo?.dueDate}
                  </span>
                </div>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={handlePayHostelFee}
                  iconName="CreditCard"
                  iconSize={14}
                >
                  Pay Now
                </Button>
              </div>
            </div>
          )}

          <div className="text-xs text-muted-foreground">
            Last Payment: ₹
            {hostelData?.feeInfo?.lastPayment?.amount?.toLocaleString("en-IN")}{" "}
            on {hostelData?.feeInfo?.lastPayment?.date}
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-card-foreground mb-3">
            Facilities
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {hostelData?.facilities?.map((facility, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 p-2 bg-muted/20 rounded-lg"
              >
                <Icon
                  name={facility?.icon}
                  size={14}
                  className="text-primary"
                />
                <span className="text-xs text-card-foreground">
                  {facility?.name}
                </span>
                <StatusIndicator
                  status={facility?.status}
                  variant="dot"
                  label={facility?.status}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Expandable Details */}
        <div className="mb-4">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full flex items-center justify-between p-2 text-left hover:bg-muted/50 rounded-lg transition-colors"
          >
            <span className="text-sm font-medium text-card-foreground">
              Recent Activity
            </span>
            <Icon
              name="ChevronDown"
              size={16}
              className={`text-muted-foreground transition-transform ${
                showDetails ? "rotate-180" : ""
              }`}
            />
          </button>

          {showDetails && (
            <div className="mt-3 space-y-3">
              {/* Complaints */}
              <div>
                <p className="text-xs font-medium text-card-foreground mb-2">
                  Recent Complaints
                </p>
                {hostelData?.complaints?.map((complaint) => (
                  <div
                    key={complaint?.id}
                    className="flex items-center justify-between p-2 bg-muted/30 rounded-lg mb-1"
                  >
                    <div className="flex-1">
                      <p className="text-xs font-medium text-card-foreground">
                        {complaint?.issue}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {complaint?.date}
                      </p>
                    </div>
                    <StatusIndicator
                      status={
                        complaint?.status === "resolved" ? "success" : "warning"
                      }
                      label={complaint?.status}
                      size="sm"
                    />
                  </div>
                ))}
              </div>

              {/* Notices */}
              <div>
                <p className="text-xs font-medium text-card-foreground mb-2">
                  Hostel Notices
                </p>
                {hostelData?.notices?.map((notice) => (
                  <div
                    key={notice?.id}
                    className="flex items-center justify-between p-2 bg-muted/30 rounded-lg mb-1"
                  >
                    <div className="flex-1">
                      <p className="text-xs font-medium text-card-foreground">
                        {notice?.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notice?.date}
                      </p>
                    </div>
                    <StatusIndicator
                      status={notice?.priority === "high" ? "error" : "warning"}
                      variant="dot"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleComplaint}
            iconName="MessageSquare"
            iconPosition="left"
            iconSize={14}
            className="flex-1"
          >
            Complaint
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRoomChange}
            iconName="ArrowRightLeft"
            iconPosition="left"
            iconSize={14}
            className="flex-1"
          >
            Room Change
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HostelInfoCard;
