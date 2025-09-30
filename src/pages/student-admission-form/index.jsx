import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import PersonalInfoSection from './components/PersonalInfoSection';
import AcademicSection from './components/AcademicSection';
import CourseSelectionSection from './components/CourseSelectionSection';
import DocumentUploadSection from './components/DocumentUploadSection';
import FormProgress from './components/FormProgress';
import FormNavigation from './components/FormNavigation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const StudentAdmissionForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [completedSections, setCompletedSections] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [applicationId, setApplicationId] = useState('');

  const totalSteps = 4;

  // Form data state
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    fatherName: '',
    motherName: '',
    bloodGroup: '',
    category: '',
    mobile: '',
    email: '',
    alternateMobile: '',
    guardianMobile: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pinCode: '',
    
    // Academic Background
    class10Board: '',
    class10School: '',
    class10Year: '',
    class10GradeType: '',
    class10Marks: '',
    class12Board: '',
    class12School: '',
    class12Stream: '',
    class12Year: '',
    class12GradeType: '',
    class12Marks: '',
    entranceExam: '',
    entranceRollNumber: '',
    entranceScore: '',
    entranceYear: '',
    additionalQualifications: '',
    
    // Course Selection
    course: '',
    specialization: '',
    admissionType: '',
    preferredCampus: '',
    secondPreference: '',
    thirdPreference: '',
    courseReason: '',
    careerGoals: '',
    
    // Documents
    documents: {},
    documentErrors: {}
  });

  // Form validation errors
  const [errors, setErrors] = useState({});

  // Load saved draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('admissionFormDraft');
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setFormData(parsedDraft?.formData || {});
        setCurrentStep(parsedDraft?.currentStep || 1);
        setCompletedSections(parsedDraft?.completedSections || []);
      } catch (error) {
        console.error('Error loading saved draft:', error);
      }
    }
  }, []);

  // Auto-save functionality with proper dependencies
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (hasUnsavedChanges) {
        saveDraft();
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [hasUnsavedChanges]); // Removed formData, currentStep, completedSections to prevent recreating interval

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e?.ctrlKey && e?.key === 's') {
        e?.preventDefault();
        saveDraft();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Memoized validation function that doesn't cause side effects
  const validateFieldValue = useCallback((name, value) => {
    let error = '';

    // Personal Information Validation
    if (name === 'firstName' && !value?.trim()) {
      error = 'First name is required';
    } else if (name === 'lastName' && !value?.trim()) {
      error = 'Last name is required';
    } else if (name === 'dateOfBirth' && !value) {
      error = 'Date of birth is required';
    } else if (name === 'gender' && !value) {
      error = 'Gender is required';
    } else if (name === 'fatherName' && !value?.trim()) {
      error = 'Father\'s name is required';
    } else if (name === 'motherName' && !value?.trim()) {
      error = 'Mother\'s name is required';
    } else if (name === 'category' && !value) {
      error = 'Category is required';
    } else if (name === 'mobile') {
      if (!value?.trim()) {
        error = 'Mobile number is required';
      } else if (!/^[0-9]{10}$/?.test(value)) {
        error = 'Please enter a valid 10-digit mobile number';
      }
    } else if (name === 'email') {
      if (!value?.trim()) {
        error = 'Email address is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(value)) {
        error = 'Please enter a valid email address';
      }
    } else if (name === 'guardianMobile') {
      if (!value?.trim()) {
        error = 'Guardian\'s mobile number is required';
      } else if (!/^[0-9]{10}$/?.test(value)) {
        error = 'Please enter a valid 10-digit mobile number';
      }
    } else if (name === 'addressLine1' && !value?.trim()) {
      error = 'Address is required';
    } else if (name === 'city' && !value?.trim()) {
      error = 'City is required';
    } else if (name === 'state' && !value) {
      error = 'State is required';
    } else if (name === 'pinCode') {
      if (!value?.trim()) {
        error = 'PIN code is required';
      } else if (!/^[0-9]{6}$/?.test(value)) {
        error = 'Please enter a valid 6-digit PIN code';
      }
    }

    // Academic Background Validation
    else if (name === 'class10Board' && !value) {
      error = 'Class 10th board is required';
    } else if (name === 'class10School' && !value?.trim()) {
      error = 'Class 10th school name is required';
    } else if (name === 'class10Year') {
      if (!value) {
        error = 'Class 10th year is required';
      } else if (value < 2000 || value > 2025) {
        error = 'Please enter a valid year';
      }
    } else if (name === 'class10GradeType' && !value) {
      error = 'Grade type is required';
    } else if (name === 'class10Marks' && !value) {
      error = 'Class 10th marks are required';
    } else if (name === 'class12Board' && !value) {
      error = 'Class 12th board is required';
    } else if (name === 'class12School' && !value?.trim()) {
      error = 'Class 12th school name is required';
    } else if (name === 'class12Stream' && !value) {
      error = 'Class 12th stream is required';
    } else if (name === 'class12Year') {
      if (!value) {
        error = 'Class 12th year is required';
      } else if (value < 2000 || value > 2025) {
        error = 'Please enter a valid year';
      }
    } else if (name === 'class12GradeType' && !value) {
      error = 'Grade type is required';
    } else if (name === 'class12Marks' && !value) {
      error = 'Class 12th marks are required';
    }

    // Course Selection Validation
    else if (name === 'course' && !value) {
      error = 'Course selection is required';
    } else if (name === 'specialization' && !value) {
      error = 'Specialization is required';
    } else if (name === 'admissionType' && !value) {
      error = 'Admission type is required';
    } else if (name === 'preferredCampus' && !value) {
      error = 'Preferred campus is required';
    }

    return error === '';
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setHasUnsavedChanges(true);
    
    // Clear error for this field
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleInputBlur = (e) => {
    const { name, value } = e?.target;
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let isValid = validateFieldValue(name, value);
    if (!isValid) {
      // Only set error if validation failed
      let error = '';
      
      // Duplicate validation logic for error message
      if (name === 'firstName' && !value?.trim()) {
        error = 'First name is required';
      } else if (name === 'lastName' && !value?.trim()) {
        error = 'Last name is required';
      } else if (name === 'dateOfBirth' && !value) {
        error = 'Date of birth is required';
      } else if (name === 'gender' && !value) {
        error = 'Gender is required';
      } else if (name === 'fatherName' && !value?.trim()) {
        error = 'Father\'s name is required';
      } else if (name === 'motherName' && !value?.trim()) {
        error = 'Mother\'s name is required';
      } else if (name === 'category' && !value) {
        error = 'Category is required';
      } else if (name === 'mobile') {
        if (!value?.trim()) {
          error = 'Mobile number is required';
        } else if (!/^[0-9]{10}$/?.test(value)) {
          error = 'Please enter a valid 10-digit mobile number';
        }
      } else if (name === 'email') {
        if (!value?.trim()) {
          error = 'Email address is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(value)) {
          error = 'Please enter a valid email address';
        }
      } else if (name === 'guardianMobile') {
        if (!value?.trim()) {
          error = 'Guardian\'s mobile number is required';
        } else if (!/^[0-9]{10}$/?.test(value)) {
          error = 'Please enter a valid 10-digit mobile number';
        }
      } else if (name === 'addressLine1' && !value?.trim()) {
        error = 'Address is required';
      } else if (name === 'city' && !value?.trim()) {
        error = 'City is required';
      } else if (name === 'state' && !value) {
        error = 'State is required';
      } else if (name === 'pinCode') {
        if (!value?.trim()) {
          error = 'PIN code is required';
        } else if (!/^[0-9]{6}$/?.test(value)) {
          error = 'Please enter a valid 6-digit PIN code';
        }
      } else if (name === 'class10Board' && !value) {
        error = 'Class 10th board is required';
      } else if (name === 'class10School' && !value?.trim()) {
        error = 'Class 10th school name is required';
      } else if (name === 'class10Year') {
        if (!value) {
          error = 'Class 10th year is required';
        } else if (value < 2000 || value > 2025) {
          error = 'Please enter a valid year';
        }
      } else if (name === 'class10GradeType' && !value) {
        error = 'Grade type is required';
      } else if (name === 'class10Marks' && !value) {
        error = 'Class 10th marks are required';
      } else if (name === 'class12Board' && !value) {
        error = 'Class 12th board is required';
      } else if (name === 'class12School' && !value?.trim()) {
        error = 'Class 12th school name is required';
      } else if (name === 'class12Stream' && !value) {
        error = 'Class 12th stream is required';
      } else if (name === 'class12Year') {
        if (!value) {
          error = 'Class 12th year is required';
        } else if (value < 2000 || value > 2025) {
          error = 'Please enter a valid year';
        }
      } else if (name === 'class12GradeType' && !value) {
        error = 'Grade type is required';
      } else if (name === 'class12Marks' && !value) {
        error = 'Class 12th marks are required';
      } else if (name === 'course' && !value) {
        error = 'Course selection is required';
      } else if (name === 'specialization' && !value) {
        error = 'Specialization is required';
      } else if (name === 'admissionType' && !value) {
        error = 'Admission type is required';
      } else if (name === 'preferredCampus' && !value) {
        error = 'Preferred campus is required';
      }

      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    } else {
      // Clear error if validation passed
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    return isValid;
  };

  // Memoized validation check that doesn't cause side effects
  const canProceedToNext = useMemo(() => {
    if (currentStep === 1) {
      // Personal Information validation
      const requiredFields = [
        'firstName', 'lastName', 'dateOfBirth', 'gender', 'fatherName', 
        'motherName', 'category', 'mobile', 'email', 'guardianMobile',
        'addressLine1', 'city', 'state', 'pinCode'
      ];

      return requiredFields?.every(field => validateFieldValue(field, formData?.[field]));
    } else if (currentStep === 2) {
      // Academic Background validation
      const requiredFields = [
        'class10Board', 'class10School', 'class10Year', 'class10GradeType', 'class10Marks',
        'class12Board', 'class12School', 'class12Stream', 'class12Year', 'class12GradeType', 'class12Marks'
      ];

      return requiredFields?.every(field => validateFieldValue(field, formData?.[field]));
    } else if (currentStep === 3) {
      // Course Selection validation
      const requiredFields = ['course', 'specialization', 'admissionType', 'preferredCampus'];

      return requiredFields?.every(field => validateFieldValue(field, formData?.[field]));
    } else if (currentStep === 4) {
      // Document validation
      const requiredDocuments = ['photo', 'class10Certificate', 'class12Certificate', 'aadharCard'];
      
      return requiredDocuments?.every(docId => formData?.documents?.[docId]);
    }

    return false;
  }, [currentStep, formData, validateFieldValue]);

  const validateCurrentSection = () => {
    let sectionErrors = {};
    let isValid = true;

    if (currentStep === 1) {
      // Personal Information validation
      const requiredFields = [
        'firstName', 'lastName', 'dateOfBirth', 'gender', 'fatherName', 
        'motherName', 'category', 'mobile', 'email', 'guardianMobile',
        'addressLine1', 'city', 'state', 'pinCode'
      ];

      requiredFields?.forEach(field => {
        if (!validateField(field, formData?.[field])) {
          isValid = false;
        }
      });
    } else if (currentStep === 2) {
      // Academic Background validation
      const requiredFields = [
        'class10Board', 'class10School', 'class10Year', 'class10GradeType', 'class10Marks',
        'class12Board', 'class12School', 'class12Stream', 'class12Year', 'class12GradeType', 'class12Marks'
      ];

      requiredFields?.forEach(field => {
        if (!validateField(field, formData?.[field])) {
          isValid = false;
        }
      });
    } else if (currentStep === 3) {
      // Course Selection validation
      const requiredFields = ['course', 'specialization', 'admissionType', 'preferredCampus'];

      requiredFields?.forEach(field => {
        if (!validateField(field, formData?.[field])) {
          isValid = false;
        }
      });
    } else if (currentStep === 4) {
      // Document validation
      const requiredDocuments = ['photo', 'class10Certificate', 'class12Certificate', 'aadharCard'];
      
      requiredDocuments?.forEach(docId => {
        if (!formData?.documents?.[docId]) {
          sectionErrors[docId] = 'This document is required';
          isValid = false;
        }
      });

      setErrors(prev => ({ ...prev, ...sectionErrors }));
    }

    return isValid;
  };

  const saveDraft = useCallback(() => {
    const draftData = {
      formData,
      currentStep,
      completedSections,
      timestamp: new Date()?.toISOString()
    };
    
    localStorage.setItem('admissionFormDraft', JSON.stringify(draftData));
    setHasUnsavedChanges(false);
  }, [formData, currentStep, completedSections]);

  const handleNext = () => {
    if (validateCurrentSection()) {
      setCompletedSections(prev => [...new Set([...prev, currentStep])]);
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
      saveDraft();
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateCurrentSection()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate application ID
      const appId = `EDU${Date.now()?.toString()?.slice(-6)}`;
      setApplicationId(appId);
      
      // Clear saved draft
      localStorage.removeItem('admissionFormDraft');
      
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Submission error:', error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  const renderCurrentSection = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoSection
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        );
      case 2:
        return (
          <AcademicSection
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        );
      case 3:
        return (
          <CourseSelectionSection
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        );
      case 4:
        return (
          <DocumentUploadSection
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="student" userName="Prospective Student" />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Student Admission Application</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Complete your admission application by providing accurate information in all sections. 
            Your application will be reviewed by our admission committee.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <FormProgress
              currentStep={currentStep}
              totalSteps={totalSteps}
              completedSections={completedSections}
            />
          </div>

          {/* Main Form Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Form Section */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
              {renderCurrentSection()}
            </div>

            {/* Navigation */}
            <FormNavigation
              currentStep={currentStep}
              totalSteps={totalSteps}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onSaveDraft={saveDraft}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              canProceed={canProceedToNext}
              hasUnsavedChanges={hasUnsavedChanges}
            />
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full shadow-elevated">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name="CheckCircle" size={32} className="text-success" />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Application Submitted Successfully!
                </h3>
                <p className="text-muted-foreground">
                  Your admission application has been submitted successfully. 
                  You will receive a confirmation email shortly.
                </p>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg border border-border">
                <p className="text-sm font-medium text-foreground">Application ID</p>
                <p className="text-lg font-mono font-bold text-primary">{applicationId}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Please save this ID for future reference
                </p>
              </div>

              <div className="space-y-2">
                <Button
                  variant="default"
                  fullWidth
                  onClick={() => navigate('/student-dashboard')}
                  iconName="LayoutDashboard"
                  iconPosition="left"
                  iconSize={16}
                >
                  Go to Dashboard
                </Button>
                
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => window.print()}
                  iconName="Printer"
                  iconPosition="left"
                  iconSize={16}
                >
                  Print Confirmation
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAdmissionForm;