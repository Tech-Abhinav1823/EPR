import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AcademicSection = ({ formData, errors, onChange, onBlur }) => {
  const boardOptions = [
    { value: 'cbse', label: 'CBSE' },
    { value: 'icse', label: 'ICSE' },
    { value: 'state-board', label: 'State Board' },
    { value: 'ib', label: 'International Baccalaureate (IB)' },
    { value: 'other', label: 'Other' }
  ];

  const streamOptions = [
    { value: 'science', label: 'Science' },
    { value: 'commerce', label: 'Commerce' },
    { value: 'arts', label: 'Arts/Humanities' }
  ];

  const gradeTypeOptions = [
    { value: 'percentage', label: 'Percentage' },
    { value: 'cgpa', label: 'CGPA' },
    { value: 'grade', label: 'Grade' }
  ];

  const entranceExamOptions = [
    { value: 'jee-main', label: 'JEE Main' },
    { value: 'jee-advanced', label: 'JEE Advanced' },
    { value: 'neet', label: 'NEET' },
    { value: 'bitsat', label: 'BITSAT' },
    { value: 'comedk', label: 'COMEDK' },
    { value: 'mht-cet', label: 'MHT CET' },
    { value: 'kcet', label: 'KCET' },
    { value: 'eamcet', label: 'EAMCET' },
    { value: 'wbjee', label: 'WBJEE' },
    { value: 'other', label: 'Other' },
    { value: 'none', label: 'Not Applicable' }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h3 className="text-lg font-semibold text-foreground">Academic Background</h3>
        <p className="text-sm text-muted-foreground mt-1">Please provide your educational qualifications</p>
      </div>
      {/* Class 10th Details */}
      <div className="space-y-6">
        <h4 className="text-md font-medium text-foreground">Class 10th Details</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Board"
            name="class10Board"
            options={boardOptions}
            value={formData?.class10Board || ''}
            onChange={(value) => onChange({ target: { name: 'class10Board', value } })}
            placeholder="Select board"
            error={errors?.class10Board}
            required
          />

          <Input
            label="School Name"
            type="text"
            name="class10School"
            placeholder="Enter school name"
            value={formData?.class10School || ''}
            onChange={onChange}
            onBlur={onBlur}
            error={errors?.class10School}
            required
          />

          <Input
            label="Year of Passing"
            type="number"
            name="class10Year"
            placeholder="Enter year (e.g., 2020)"
            value={formData?.class10Year || ''}
            onChange={onChange}
            onBlur={onBlur}
            error={errors?.class10Year}
            required
            min="2000"
            max="2025"
          />

          <div className="space-y-4">
            <Select
              label="Grade Type"
              name="class10GradeType"
              options={gradeTypeOptions}
              value={formData?.class10GradeType || ''}
              onChange={(value) => onChange({ target: { name: 'class10GradeType', value } })}
              placeholder="Select grade type"
              error={errors?.class10GradeType}
              required
            />

            <Input
              label={`Marks (${formData?.class10GradeType === 'percentage' ? '%' : formData?.class10GradeType === 'cgpa' ? 'CGPA' : 'Grade'})`}
              type={formData?.class10GradeType === 'grade' ? 'text' : 'number'}
              name="class10Marks"
              placeholder={`Enter ${formData?.class10GradeType || 'marks'}`}
              value={formData?.class10Marks || ''}
              onChange={onChange}
              onBlur={onBlur}
              error={errors?.class10Marks}
              required
              min={formData?.class10GradeType === 'percentage' ? '0' : formData?.class10GradeType === 'cgpa' ? '0' : undefined}
              max={formData?.class10GradeType === 'percentage' ? '100' : formData?.class10GradeType === 'cgpa' ? '10' : undefined}
              step={formData?.class10GradeType === 'cgpa' ? '0.01' : undefined}
            />
          </div>
        </div>
      </div>
      {/* Class 12th Details */}
      <div className="space-y-6">
        <h4 className="text-md font-medium text-foreground">Class 12th Details</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Board"
            name="class12Board"
            options={boardOptions}
            value={formData?.class12Board || ''}
            onChange={(value) => onChange({ target: { name: 'class12Board', value } })}
            placeholder="Select board"
            error={errors?.class12Board}
            required
          />

          <Input
            label="School Name"
            type="text"
            name="class12School"
            placeholder="Enter school name"
            value={formData?.class12School || ''}
            onChange={onChange}
            onBlur={onBlur}
            error={errors?.class12School}
            required
          />

          <Select
            label="Stream"
            name="class12Stream"
            options={streamOptions}
            value={formData?.class12Stream || ''}
            onChange={(value) => onChange({ target: { name: 'class12Stream', value } })}
            placeholder="Select stream"
            error={errors?.class12Stream}
            required
          />

          <Input
            label="Year of Passing"
            type="number"
            name="class12Year"
            placeholder="Enter year (e.g., 2022)"
            value={formData?.class12Year || ''}
            onChange={onChange}
            onBlur={onBlur}
            error={errors?.class12Year}
            required
            min="2000"
            max="2025"
          />

          <div className="space-y-4">
            <Select
              label="Grade Type"
              name="class12GradeType"
              options={gradeTypeOptions}
              value={formData?.class12GradeType || ''}
              onChange={(value) => onChange({ target: { name: 'class12GradeType', value } })}
              placeholder="Select grade type"
              error={errors?.class12GradeType}
              required
            />

            <Input
              label={`Marks (${formData?.class12GradeType === 'percentage' ? '%' : formData?.class12GradeType === 'cgpa' ? 'CGPA' : 'Grade'})`}
              type={formData?.class12GradeType === 'grade' ? 'text' : 'number'}
              name="class12Marks"
              placeholder={`Enter ${formData?.class12GradeType || 'marks'}`}
              value={formData?.class12Marks || ''}
              onChange={onChange}
              onBlur={onBlur}
              error={errors?.class12Marks}
              required
              min={formData?.class12GradeType === 'percentage' ? '0' : formData?.class12GradeType === 'cgpa' ? '0' : undefined}
              max={formData?.class12GradeType === 'percentage' ? '100' : formData?.class12GradeType === 'cgpa' ? '10' : undefined}
              step={formData?.class12GradeType === 'cgpa' ? '0.01' : undefined}
            />
          </div>
        </div>
      </div>
      {/* Entrance Exam Details */}
      <div className="space-y-6">
        <h4 className="text-md font-medium text-foreground">Entrance Exam Details (If Applicable)</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Entrance Exam"
            name="entranceExam"
            options={entranceExamOptions}
            value={formData?.entranceExam || ''}
            onChange={(value) => onChange({ target: { name: 'entranceExam', value } })}
            placeholder="Select entrance exam"
            error={errors?.entranceExam}
          />

          {formData?.entranceExam && formData?.entranceExam !== 'none' && (
            <>
              <Input
                label="Roll Number"
                type="text"
                name="entranceRollNumber"
                placeholder="Enter roll number"
                value={formData?.entranceRollNumber || ''}
                onChange={onChange}
                onBlur={onBlur}
                error={errors?.entranceRollNumber}
              />

              <Input
                label="Score/Rank"
                type="text"
                name="entranceScore"
                placeholder="Enter score or rank"
                value={formData?.entranceScore || ''}
                onChange={onChange}
                onBlur={onBlur}
                error={errors?.entranceScore}
              />

              <Input
                label="Year of Exam"
                type="number"
                name="entranceYear"
                placeholder="Enter year (e.g., 2023)"
                value={formData?.entranceYear || ''}
                onChange={onChange}
                onBlur={onBlur}
                error={errors?.entranceYear}
                min="2020"
                max="2025"
              />
            </>
          )}
        </div>
      </div>
      {/* Additional Qualifications */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-foreground">Additional Qualifications (Optional)</h4>
        
        <Input
          label="Other Qualifications"
          type="text"
          name="additionalQualifications"
          placeholder="Diploma, certifications, achievements, etc."
          value={formData?.additionalQualifications || ''}
          onChange={onChange}
          onBlur={onBlur}
          error={errors?.additionalQualifications}
          description="List any additional qualifications, certifications, or achievements"
        />
      </div>
    </div>
  );
};

export default AcademicSection;