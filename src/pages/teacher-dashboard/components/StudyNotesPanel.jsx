import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const StudyNotesPanel = ({ onShareNotes, recentNotes = [] }) => {
  const [noteData, setNoteData] = useState({
    title: '',
    description: '',
    subject: '',
    class: '',
    chapter: '',
    attachments: []
  });
  const [isSharing, setIsSharing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

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
    setNoteData(prev => ({
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
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
      const maxSize = 15 * 1024 * 1024; // 15MB
      return validTypes?.includes(file?.type) && file?.size <= maxSize;
    });

    setNoteData(prev => ({
      ...prev,
      attachments: [...prev?.attachments, ...validFiles]
    }));
  };

  const removeAttachment = (index) => {
    setNoteData(prev => ({
      ...prev,
      attachments: prev?.attachments?.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSharing(true);

    try {
      // Simulate sharing process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newNote = {
        id: Date.now(),
        ...noteData,
        createdAt: new Date()?.toISOString(),
        status: 'shared',
        studentsNotified: 25
      };

      onShareNotes(newNote);
      
      // Reset form
      setNoteData({
        title: '',
        description: '',
        subject: '',
        class: '',
        chapter: '',
        attachments: []
      });
    } catch (error) {
      console.error('Sharing failed:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const isFormValid = noteData?.title && noteData?.subject && noteData?.class;

  return (
    <div className="space-y-6">
      {/* Share New Notes Form */}
      <div className="bg-card border border-border rounded-lg shadow-soft">
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="BookOpen" size={20} className="text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Share Study Notes</h3>
              <p className="text-sm text-muted-foreground">Upload and distribute study materials to students</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Notes Title"
              type="text"
              placeholder="Enter notes title"
              value={noteData?.title}
              onChange={(e) => handleInputChange('title', e?.target?.value)}
              required
            />
            
            <Input
              label="Chapter/Topic"
              type="text"
              placeholder="Enter chapter or topic name"
              value={noteData?.chapter}
              onChange={(e) => handleInputChange('chapter', e?.target?.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Subject"
              options={subjectOptions}
              value={noteData?.subject}
              onChange={(value) => handleInputChange('subject', value)}
              required
            />
            
            <Select
              label="Class"
              options={classOptions}
              value={noteData?.class}
              onChange={(value) => handleInputChange('class', value)}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows="3"
              placeholder="Brief description of the study notes..."
              value={noteData?.description}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
            />
          </div>

          {/* File Upload Area */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Upload Files
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                isDragOver
                  ? 'border-accent bg-accent/5' :'border-border hover:border-accent/50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Icon name="FileUp" size={40} className="text-muted-foreground mx-auto mb-3" />
              <p className="text-foreground font-medium mb-1">
                Drop study materials here
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                PDF, DOC, DOCX, PPT, PPTX, TXT (Max 15MB each)
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('notes-file-input')?.click()}
              >
                Browse Files
              </Button>
              <input
                id="notes-file-input"
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                className="hidden"
                onChange={(e) => handleFileSelection(Array.from(e?.target?.files))}
              />
            </div>
          </div>

          {/* Attached Files List */}
          {noteData?.attachments?.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Attached Files</h4>
              <div className="space-y-2">
                {noteData?.attachments?.map((file, index) => (
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
              {isFormValid ? 'Ready to share with students' : 'Please fill in required fields'}
            </div>
            <Button
              type="submit"
              variant="default"
              disabled={!isFormValid}
              loading={isSharing}
              iconName="Share2"
              iconPosition="left"
              iconSize={16}
            >
              {isSharing ? 'Sharing...' : 'Share Notes'}
            </Button>
          </div>
        </form>
      </div>
      {/* Recent Notes */}
      {recentNotes?.length > 0 && (
        <div className="bg-card border border-border rounded-lg shadow-soft">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Recently Shared Notes</h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {recentNotes?.slice(0, 5)?.map((note) => (
                <div key={note?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon name="BookOpen" size={16} className="text-accent" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{note?.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {note?.subject} • {note?.class} • {new Date(note.createdAt)?.toLocaleDateString('en-GB')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-success font-medium">
                      {note?.studentsNotified} notified
                    </span>
                    <Button variant="ghost" size="sm" iconName="ExternalLink" iconSize={14} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyNotesPanel;