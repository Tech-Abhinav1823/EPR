import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StatusIndicator from '../../../components/ui/StatusIndicator';

const FeeStatusCard = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const feeData = {
    totalFees: 85000,
    paidAmount: 65000,
    pendingAmount: 20000,
    dueDate: "15/12/2024",
    lastPayment: {
      amount: 25000,
      date: "15/09/2024",
      transactionId: "TXN123456789"
    },
    paymentHistory: [
      { id: 1, amount: 25000, date: "15/09/2024", status: "success", description: "Semester Fee - I" },
      { id: 2, amount: 40000, date: "15/06/2024", status: "success", description: "Admission Fee" },
      { id: 3, amount: 20000, date: "pending", status: "pending", description: "Semester Fee - II" }
    ]
  };

  const paymentPercentage = (feeData?.paidAmount / feeData?.totalFees) * 100;

  const handlePayNow = () => {
    navigate('/fee-payment');
  };

  const handleViewHistory = () => {
    navigate('/payment-history');
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft hover:shadow-elevated transition-all duration-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="CreditCard" size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">Fee Status</h3>
              <p className="text-sm text-muted-foreground">Academic Year 2024-25</p>
            </div>
          </div>
          <StatusIndicator 
            status={feeData?.pendingAmount > 0 ? "warning" : "success"}
            label={feeData?.pendingAmount > 0 ? "Pending" : "Paid"}
          />
        </div>

        {/* Fee Overview */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Payment Progress</span>
            <span className="text-sm font-medium text-card-foreground">{Math.round(paymentPercentage)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${paymentPercentage}%` }}
            />
          </div>
        </div>

        {/* Amount Details */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-card-foreground">₹{feeData?.totalFees?.toLocaleString('en-IN')}</p>
            <p className="text-xs text-muted-foreground">Total Fees</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">₹{feeData?.paidAmount?.toLocaleString('en-IN')}</p>
            <p className="text-xs text-muted-foreground">Paid Amount</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-warning">₹{feeData?.pendingAmount?.toLocaleString('en-IN')}</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </div>
        </div>

        {/* Due Date Alert */}
        {feeData?.pendingAmount > 0 && (
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 mb-4">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-warning" />
              <span className="text-sm font-medium text-warning">Due Date: {feeData?.dueDate}</span>
            </div>
          </div>
        )}

        {/* Last Payment Info */}
        <div className="bg-muted/50 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-card-foreground">Last Payment</p>
              <p className="text-xs text-muted-foreground">₹{feeData?.lastPayment?.amount?.toLocaleString('en-IN')} on {feeData?.lastPayment?.date}</p>
            </div>
            <StatusIndicator status="success" variant="dot" label="Completed" />
          </div>
        </div>

        {/* Expandable Payment History */}
        <div className="mb-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between p-2 text-left hover:bg-muted/50 rounded-lg transition-colors"
          >
            <span className="text-sm font-medium text-card-foreground">Payment History</span>
            <Icon 
              name="ChevronDown" 
              size={16} 
              className={`text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
          
          {isExpanded && (
            <div className="mt-3 space-y-2">
              {feeData?.paymentHistory?.map((payment) => (
                <div key={payment?.id} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-card-foreground">{payment?.description}</p>
                    <p className="text-xs text-muted-foreground">{payment?.date}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-card-foreground">
                      ₹{payment?.amount?.toLocaleString('en-IN')}
                    </span>
                    <StatusIndicator 
                      status={payment?.status} 
                      variant="dot"
                      label={payment?.status === 'success' ? 'Paid' : 'Pending'}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          {feeData?.pendingAmount > 0 && (
            <Button
              variant="default"
              onClick={handlePayNow}
              iconName="CreditCard"
              iconPosition="left"
              iconSize={16}
              className="flex-1"
            >
              Pay Now
            </Button>
          )}
          <Button
            variant="outline"
            onClick={handleViewHistory}
            iconName="FileText"
            iconPosition="left"
            iconSize={16}
            className="flex-1"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeeStatusCard;