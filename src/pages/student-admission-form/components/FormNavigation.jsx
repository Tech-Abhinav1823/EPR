import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FormNavigation = ({ 
  currentStep, 
  totalSteps, 
  onPrevious, 
  onNext, 
  onSaveDraft, 
  onSubmit, 
  isLoading, 
  canProceed,
  hasUnsavedChanges 
}) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Left Side - Previous Button */}
        <div className="flex items-center space-x-3">
          {!isFirstStep && (
            <Button
              variant="outline"
              onClick={onPrevious}
              disabled={isLoading}
              iconName="ChevronLeft"
              iconPosition="left"
              iconSize={16}
            >
              Previous
            </Button>
          )}
          
          {/* Save Draft Button */}
          <Button
            variant="ghost"
            onClick={onSaveDraft}
            disabled={isLoading}
            loading={isLoading && 'draft'}
            iconName="Save"
            iconPosition="left"
            iconSize={16}
            className="text-muted-foreground hover:text-foreground"
          >
            Save Draft
          </Button>
        </div>

        {/* Center - Step Information */}
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">
              Step {currentStep} of {totalSteps}
            </p>
            <p className="text-xs text-muted-foreground">
              {currentStep === 1 && "Personal Information"}
              {currentStep === 2 && "Academic Background"}
              {currentStep === 3 && "Course Selection"}
              {currentStep === 4 && "Document Upload"}
            </p>
          </div>
          
          {hasUnsavedChanges && (
            <div className="flex items-center space-x-1 text-warning">
              <Icon name="AlertCircle" size={14} />
              <span className="text-xs">Unsaved changes</span>
            </div>
          )}
        </div>

        {/* Right Side - Next/Submit Button */}
        <div className="flex items-center space-x-3">
          {!isLastStep ? (
            <Button
              variant="default"
              onClick={onNext}
              disabled={!canProceed || isLoading}
              loading={isLoading && 'next'}
              iconName="ChevronRight"
              iconPosition="right"
              iconSize={16}
            >
              Next Step
            </Button>
          ) : (
            <Button
              variant="default"
              onClick={onSubmit}
              disabled={!canProceed || isLoading}
              loading={isLoading && 'submit'}
              iconName="Send"
              iconPosition="left"
              iconSize={16}
              className="bg-success hover:bg-success/90"
            >
              Submit Application
            </Button>
          )}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Progress</span>
          <span className="text-xs text-muted-foreground">
            {Math.round(((currentStep - 1) / (totalSteps - 1)) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-1.5">
          <div
            className="bg-primary h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Validation Messages */}
      {!canProceed && currentStep < totalSteps && (
        <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
            <div>
              <p className="text-sm font-medium text-warning">Complete Required Fields</p>
              <p className="text-xs text-muted-foreground mt-1">
                Please fill in all required fields before proceeding to the next step.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Final Step Instructions */}
      {isLastStep && (
        <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-accent mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Ready to Submit</p>
              <p className="text-xs text-muted-foreground mt-1">
                Please review all information carefully before submitting your application. 
                Once submitted, you will receive a confirmation email with your application ID.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Info */}
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Ctrl</kbd>
            <span>+</span>
            <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">S</kbd>
            <span>Save Draft</span>
          </div>
          {!isLastStep && (
            <div className="flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Tab</kbd>
              <span>Navigate Fields</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormNavigation;