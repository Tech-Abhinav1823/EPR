import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AssignmentUploadPanel = ({ onUploadAssignment }) => {
  const [assignmentData, setAssignmentData] = useState({
    title: '',
    description: '',
    dueDate: '',
    subject: '',
    class: '',
    maxMarks: '',
    attachments: []
  });
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const subjectOptions = [
    { value: '', label: 'Select Subject' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'english', label: 'English' },
    { value: 'computer-science', label: 'Computer Science' }
  ];

  const classOptions = [
    { value: '', label: 'Select Class' },
    { value: 'class-10-a', label: 'Class 10-A' },
    { value: 'class-10-b', label: 'Class 10-B' },
    { value: 'class-11-a', label: 'Class 11-A' },
    { value: 'class-11-b', label: 'Class 11-B' },
    { value: 'class-12-a', label: 'Class 12-A' },
    { value: 'class-12-b', label: 'Class 12-B' }
  ];

  const handleInputChange = (field, value) => {
    setAssignmentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e?.dataTransfer?.files);
    handleFileSelection(files);
  };

  const handleFileSelection = (files) => {
    const validFiles = files?.filter(file => {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      const maxSize = 10 * 1024 * 1024; // 10MB
      return validTypes?.includes(file?.type) && file?.size <= maxSize;
    });

    setAssignmentData(prev => ({
      ...prev,
      attachments: [...prev?.attachments, ...validFiles]
    }));
  };

  const removeAttachment = (index) => {
    setAssignmentData(prev => ({
      ...prev,
      attachments: prev?.attachments?.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsUploading(true);

    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newAssignment = {
        id: Date.now(),
        ...assignmentData,
        createdAt: new Date()?.toISOString(),
        status: 'published'
      };

      onUploadAssignment(newAssignment);
      
      // Reset form
      setAssignmentData({
        title: '',
        description: '',
        dueDate: '',
        subject: '',
        class: '',
        maxMarks: '',
        attachments: []
      });
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const isFormValid = assignmentData?.title && assignmentData?.subject && assignmentData?.class && assignmentData?.dueDate;

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Upload" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Upload Assignment</h3>
            <p className="text-sm text-muted-foreground">Create and distribute new assignments to students</p>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Assignment Title"
            type="text"
            placeholder="Enter assignment title"
            value={assignmentData?.title}
            onChange={(e) => handleInputChange('title', e?.target?.value)}
            required
          />
          
          <Input
            label="Maximum Marks"
            type="number"
            placeholder="Enter max marks"
            value={assignmentData?.maxMarks}
            onChange={(e) => handleInputChange('maxMarks', e?.target?.value)}
            min="1"
            max="100"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Subject"
            options={subjectOptions}
            value={assignmentData?.subject}
            onChange={(value) => handleInputChange('subject', value)}
            required
          />
          
          <Select
            label="Class"
            options={classOptions}
            value={assignmentData?.class}
            onChange={(value) => handleInputChange('class', value)}
            required
          />
          
          <Input
            label="Due Date"
            type="date"
            value={assignmentData?.dueDate}
            onChange={(e) => handleInputChange('dueDate', e?.target?.value)}
            min={new Date()?.toISOString()?.split('T')?.[0]}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Assignment Description
          </label>
          <textarea
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            rows="4"
            placeholder="Provide detailed instructions for the assignment..."
            value={assignmentData?.description}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
          />
        </div>

        {/* File Upload Area */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Attachment Files (Optional)
          </label>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Icon name="Upload" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-foreground font-medium mb-2">
              Drag and drop files here, or click to browse
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Supported formats: PDF, DOC, DOCX, TXT (Max 10MB each)
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('file-input')?.click()}
            >
              Browse Files
            </Button>
            <input
              id="file-input"
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
              onChange={(e) => handleFileSelection(Array.from(e?.target?.files))}
            />
          </div>
        </div>

        {/* Attached Files List */}
        {assignmentData?.attachments?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Attached Files</h4>
            <div className="space-y-2">
              {assignmentData?.attachments?.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon name="FileText" size={16} className="text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{file?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file?.size / 1024 / 1024)?.toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAttachment(index)}
                    iconName="X"
                    iconSize={14}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {isFormValid ? 'Ready to publish assignment' : 'Please fill in required fields'}
          </div>
          <Button
            type="submit"
            variant="default"
            disabled={!isFormValid}
            loading={isUploading}
            iconName="Send"
            iconPosition="left"
            iconSize={16}
          >
            {isUploading ? 'Publishing...' : 'Publish Assignment'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AssignmentUploadPanel;