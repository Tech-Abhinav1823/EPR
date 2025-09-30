import React from 'react';
import Icon from '../../../components/AppIcon';

const FormProgress = ({ currentStep, totalSteps, completedSections }) => {
  const steps = [
    { id: 1, label: 'Personal Info', icon: 'User' },
    { id: 2, label: 'Academic', icon: 'GraduationCap' },
    { id: 3, label: 'Course Selection', icon: 'BookOpen' },
    { id: 4, label: 'Documents', icon: 'FileText' }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground border-success';
      case 'current':
        return 'bg-primary text-primary-foreground border-primary';
      case 'upcoming':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getConnectorClasses = (stepId) => {
    return stepId < currentStep ? 'bg-success' : 'bg-border';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Application Progress</h3>
        <span className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Overall Progress</span>
          <span className="text-sm text-muted-foreground">
            {Math.round(((currentStep - 1) / (totalSteps - 1)) * 100)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>
      </div>
      {/* Step Indicators */}
      <div className="relative">
        <div className="flex items-center justify-between">
          {steps?.map((step, index) => {
            const status = getStepStatus(step?.id);
            const isCompleted = completedSections?.includes(step?.id);
            
            return (
              <div key={step?.id} className="flex flex-col items-center relative">
                {/* Connector Line */}
                {index < steps?.length - 1 && (
                  <div
                    className={`absolute top-6 left-6 w-full h-0.5 ${getConnectorClasses(step?.id)} transition-colors duration-300`}
                    style={{ width: 'calc(100% + 2rem)' }}
                  />
                )}
                {/* Step Circle */}
                <div
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 relative z-10 ${getStepClasses(status)}`}
                >
                  {status === 'completed' || isCompleted ? (
                    <Icon name="Check" size={20} />
                  ) : (
                    <Icon name={step?.icon} size={20} />
                  )}
                </div>
                {/* Step Label */}
                <div className="mt-3 text-center">
                  <p className={`text-sm font-medium ${
                    status === 'current' ? 'text-primary' : 
                    status === 'completed'? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {step?.label}
                  </p>
                  {status === 'current' && (
                    <p className="text-xs text-muted-foreground mt-1">In Progress</p>
                  )}
                  {(status === 'completed' || isCompleted) && (
                    <p className="text-xs text-success mt-1">Completed</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Section Completion Status */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Section Status</h4>
        <div className="space-y-2">
          {steps?.map((step) => {
            const isCompleted = completedSections?.includes(step?.id);
            const isCurrent = step?.id === currentStep;
            
            return (
              <div key={step?.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={step?.icon} 
                    size={16} 
                    className={
                      isCompleted ? 'text-success' : isCurrent ?'text-primary': 'text-muted-foreground'
                    } 
                  />
                  <span className={`text-sm ${
                    isCompleted ? 'text-success' : isCurrent ?'text-primary': 'text-muted-foreground'
                  }`}>
                    {step?.label}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  {isCompleted ? (
                    <>
                      <Icon name="CheckCircle" size={16} className="text-success" />
                      <span className="text-xs text-success">Done</span>
                    </>
                  ) : isCurrent ? (
                    <>
                      <Icon name="Clock" size={16} className="text-primary" />
                      <span className="text-xs text-primary">Active</span>
                    </>
                  ) : (
                    <>
                      <Icon name="Circle" size={16} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Pending</span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Quick Tips */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="bg-accent/10 p-3 rounded-lg border border-accent/20">
          <div className="flex items-start space-x-2">
            <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
            <div>
              <h5 className="text-sm font-medium text-foreground">Quick Tip</h5>
              <p className="text-xs text-muted-foreground mt-1">
                {currentStep === 1 && "Double-check your personal information for accuracy."}
                {currentStep === 2 && "Have your academic certificates ready for reference."}
                {currentStep === 3 && "Research course details before making your selection."}
                {currentStep === 4 && "Ensure all documents are clear and properly formatted."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormProgress;