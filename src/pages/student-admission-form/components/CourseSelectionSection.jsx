import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const CourseSelectionSection = ({ formData, errors, onChange, onBlur }) => {
  const courseOptions = [
    { 
      value: 'btech', 
      label: 'B.Tech (Bachelor of Technology)',
      description: '4-year undergraduate engineering program'
    },
    { 
      value: 'bsc', 
      label: 'B.Sc (Bachelor of Science)',
      description: '3-year undergraduate science program'
    },
    { 
      value: 'bcom', 
      label: 'B.Com (Bachelor of Commerce)',
      description: '3-year undergraduate commerce program'
    },
    { 
      value: 'ba', 
      label: 'B.A (Bachelor of Arts)',
      description: '3-year undergraduate arts program'
    },
    { 
      value: 'bba', 
      label: 'BBA (Bachelor of Business Administration)',
      description: '3-year undergraduate management program'
    },
    { 
      value: 'bca', 
      label: 'BCA (Bachelor of Computer Applications)',
      description: '3-year undergraduate computer applications program'
    },
    { 
      value: 'mtech', 
      label: 'M.Tech (Master of Technology)',
      description: '2-year postgraduate engineering program'
    },
    { 
      value: 'msc', 
      label: 'M.Sc (Master of Science)',
      description: '2-year postgraduate science program'
    },
    { 
      value: 'mcom', 
      label: 'M.Com (Master of Commerce)',
      description: '2-year postgraduate commerce program'
    },
    { 
      value: 'mba', 
      label: 'MBA (Master of Business Administration)',
      description: '2-year postgraduate management program'
    }
  ];

  const btechSpecializations = [
    { value: 'computer-science', label: 'Computer Science & Engineering' },
    { value: 'information-technology', label: 'Information Technology' },
    { value: 'electronics-communication', label: 'Electronics & Communication' },
    { value: 'electrical', label: 'Electrical Engineering' },
    { value: 'mechanical', label: 'Mechanical Engineering' },
    { value: 'civil', label: 'Civil Engineering' },
    { value: 'chemical', label: 'Chemical Engineering' },
    { value: 'aerospace', label: 'Aerospace Engineering' },
    { value: 'biotechnology', label: 'Biotechnology' },
    { value: 'automobile', label: 'Automobile Engineering' }
  ];

  const bscSpecializations = [
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'biology', label: 'Biology' },
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'biotechnology', label: 'Biotechnology' },
    { value: 'microbiology', label: 'Microbiology' },
    { value: 'environmental-science', label: 'Environmental Science' }
  ];

  const bcomSpecializations = [
    { value: 'general', label: 'General' },
    { value: 'accounting-finance', label: 'Accounting & Finance' },
    { value: 'banking-insurance', label: 'Banking & Insurance' },
    { value: 'taxation', label: 'Taxation' },
    { value: 'international-business', label: 'International Business' }
  ];

  const baSpecializations = [
    { value: 'english', label: 'English Literature' },
    { value: 'history', label: 'History' },
    { value: 'political-science', label: 'Political Science' },
    { value: 'economics', label: 'Economics' },
    { value: 'psychology', label: 'Psychology' },
    { value: 'sociology', label: 'Sociology' },
    { value: 'philosophy', label: 'Philosophy' },
    { value: 'journalism', label: 'Journalism & Mass Communication' }
  ];

  const bbaSpecializations = [
    { value: 'general', label: 'General Management' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'finance', label: 'Finance' },
    { value: 'human-resources', label: 'Human Resources' },
    { value: 'international-business', label: 'International Business' },
    { value: 'operations', label: 'Operations Management' }
  ];

  const bcaSpecializations = [
    { value: 'general', label: 'General' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'mobile-app-development', label: 'Mobile App Development' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'cyber-security', label: 'Cyber Security' }
  ];

  const getSpecializationOptions = (course) => {
    switch (course) {
      case 'btech': case'mtech':
        return btechSpecializations;
      case 'bsc': case'msc':
        return bscSpecializations;
      case 'bcom': case'mcom':
        return bcomSpecializations;
      case 'ba':
        return baSpecializations;
      case 'bba': case'mba':
        return bbaSpecializations;
      case 'bca':
        return bcaSpecializations;
      default:
        return [];
    }
  };

  const admissionTypeOptions = [
    { value: 'merit', label: 'Merit Based' },
    { value: 'entrance', label: 'Entrance Exam Based' },
    { value: 'management', label: 'Management Quota' },
    { value: 'nri', label: 'NRI Quota' },
    { value: 'sports', label: 'Sports Quota' }
  ];

  const preferredCampusOptions = [
    { value: 'main-campus', label: 'Main Campus - Bangalore' },
    { value: 'north-campus', label: 'North Campus - Delhi' },
    { value: 'south-campus', label: 'South Campus - Chennai' },
    { value: 'west-campus', label: 'West Campus - Mumbai' },
    { value: 'east-campus', label: 'East Campus - Kolkata' }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h3 className="text-lg font-semibold text-foreground">Course Selection</h3>
        <p className="text-sm text-muted-foreground mt-1">Choose your preferred course and specialization</p>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Course"
            name="course"
            options={courseOptions}
            value={formData?.course || ''}
            onChange={(value) => {
              onChange({ target: { name: 'course', value } });
              // Reset specialization when course changes
              onChange({ target: { name: 'specialization', value: '' } });
            }}
            placeholder="Select course"
            error={errors?.course}
            required
            searchable
          />

          {formData?.course && (
            <Select
              label="Specialization"
              name="specialization"
              options={getSpecializationOptions(formData?.course)}
              value={formData?.specialization || ''}
              onChange={(value) => onChange({ target: { name: 'specialization', value } })}
              placeholder="Select specialization"
              error={errors?.specialization}
              required
              searchable
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Admission Type"
            name="admissionType"
            options={admissionTypeOptions}
            value={formData?.admissionType || ''}
            onChange={(value) => onChange({ target: { name: 'admissionType', value } })}
            placeholder="Select admission type"
            error={errors?.admissionType}
            required
          />

          <Select
            label="Preferred Campus"
            name="preferredCampus"
            options={preferredCampusOptions}
            value={formData?.preferredCampus || ''}
            onChange={(value) => onChange({ target: { name: 'preferredCampus', value } })}
            placeholder="Select preferred campus"
            error={errors?.preferredCampus}
            required
          />
        </div>

        {/* Course Information Display */}
        {formData?.course && (
          <div className="bg-muted/30 p-4 rounded-lg border border-border">
            <h4 className="text-md font-medium text-foreground mb-2">Course Information</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              {courseOptions?.find(c => c?.value === formData?.course)?.description && (
                <p>
                  <span className="font-medium">Description:</span> {courseOptions?.find(c => c?.value === formData?.course)?.description}
                </p>
              )}
              <p>
                <span className="font-medium">Duration:</span> {
                  ['btech', 'mtech']?.includes(formData?.course) ? '4 years' :
                  ['mtech', 'msc', 'mcom', 'mba']?.includes(formData?.course) ? '2 years' : '3 years'
                }
              </p>
              <p>
                <span className="font-medium">Eligibility:</span> {
                  ['btech', 'bsc', 'bcom', 'ba', 'bba', 'bca']?.includes(formData?.course) ? 
                  'Class 12th passed with minimum 50% marks': 'Bachelor\'s degree with minimum 50% marks'
                }
              </p>
            </div>
          </div>
        )}

        {/* Alternative Course Preferences */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-foreground">Alternative Preferences (Optional)</h4>
          <p className="text-sm text-muted-foreground">
            Select alternative courses in case your first preference is not available
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Second Preference"
              name="secondPreference"
              options={courseOptions?.filter(option => option?.value !== formData?.course)}
              value={formData?.secondPreference || ''}
              onChange={(value) => onChange({ target: { name: 'secondPreference', value } })}
              placeholder="Select second preference"
              error={errors?.secondPreference}
              searchable
            />

            <Select
              label="Third Preference"
              name="thirdPreference"
              options={courseOptions?.filter(option => 
                option?.value !== formData?.course && option?.value !== formData?.secondPreference
              )}
              value={formData?.thirdPreference || ''}
              onChange={(value) => onChange({ target: { name: 'thirdPreference', value } })}
              placeholder="Select third preference"
              error={errors?.thirdPreference}
              searchable
            />
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-4">
          <Input
            label="Reason for Course Selection"
            type="text"
            name="courseReason"
            placeholder="Why did you choose this course?"
            value={formData?.courseReason || ''}
            onChange={onChange}
            onBlur={onBlur}
            error={errors?.courseReason}
            description="Brief explanation of your interest in this course (optional)"
          />

          <Input
            label="Career Goals"
            type="text"
            name="careerGoals"
            placeholder="What are your career aspirations?"
            value={formData?.careerGoals || ''}
            onChange={onChange}
            onBlur={onBlur}
            error={errors?.careerGoals}
            description="Your future career plans and goals (optional)"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseSelectionSection;