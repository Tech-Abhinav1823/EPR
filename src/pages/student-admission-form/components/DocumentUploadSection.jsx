import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentUploadSection = ({ formData, errors, onChange }) => {
  const [draggedOver, setDraggedOver] = useState(null);

  const requiredDocuments = [
    {
      id: 'photo',
      label: 'Passport Size Photo',
      description: 'Recent passport size photograph (JPG, PNG - Max 2MB)',
      required: true,
      accept: '.jpg,.jpeg,.png',
      maxSize: 2 * 1024 * 1024 // 2MB
    },
    {
      id: 'class10Certificate',
      label: 'Class 10th Certificate',
      description: 'Class 10th mark sheet or certificate (PDF, JPG - Max 5MB)',
      required: true,
      accept: '.pdf,.jpg,.jpeg,.png',
      maxSize: 5 * 1024 * 1024 // 5MB
    },
    {
      id: 'class12Certificate',
      label: 'Class 12th Certificate',
      description: 'Class 12th mark sheet or certificate (PDF, JPG - Max 5MB)',
      required: true,
      accept: '.pdf,.jpg,.jpeg,.png',
      maxSize: 5 * 1024 * 1024 // 5MB
    },
    {
      id: 'entranceCertificate',
      label: 'Entrance Exam Certificate',
      description: 'Entrance exam scorecard (PDF, JPG - Max 5MB)',
      required: false,
      accept: '.pdf,.jpg,.jpeg,.png',
      maxSize: 5 * 1024 * 1024 // 5MB
    },
    {
      id: 'casteCertificate',
      label: 'Caste Certificate',
      description: 'Caste certificate if applicable (PDF, JPG - Max 5MB)',
      required: false,
      accept: '.pdf,.jpg,.jpeg,.png',
      maxSize: 5 * 1024 * 1024 // 5MB
    },
    {
      id: 'incomeCertificate',
      label: 'Income Certificate',
      description: 'Family income certificate (PDF, JPG - Max 5MB)',
      required: false,
      accept: '.pdf,.jpg,.jpeg,.png',
      maxSize: 5 * 1024 * 1024 // 5MB
    },
    {
      id: 'aadharCard',
      label: 'Aadhar Card',
      description: 'Aadhar card copy (PDF, JPG - Max 5MB)',
      required: true,
      accept: '.pdf,.jpg,.jpeg,.png',
      maxSize: 5 * 1024 * 1024 // 5MB
    },
    {
      id: 'transferCertificate',
      label: 'Transfer Certificate',
      description: 'School leaving certificate (PDF, JPG - Max 5MB)',
      required: false,
      accept: '.pdf,.jpg,.jpeg,.png',
      maxSize: 5 * 1024 * 1024 // 5MB
    }
  ];

  const handleFileSelect = (documentId, file) => {
    const document = requiredDocuments?.find(doc => doc?.id === documentId);
    
    if (!file) return;

    // Validate file type
    const fileExtension = '.' + file?.name?.split('.')?.pop()?.toLowerCase();
    if (!document?.accept?.includes(fileExtension)) {
      onChange({
        target: {
          name: 'documentErrors',
          value: {
            ...formData?.documentErrors,
            [documentId]: `Invalid file type. Accepted formats: ${document?.accept}`
          }
        }
      });
      return;
    }

    // Validate file size
    if (file?.size > document?.maxSize) {
      const maxSizeMB = document?.maxSize / (1024 * 1024);
      onChange({
        target: {
          name: 'documentErrors',
          value: {
            ...formData?.documentErrors,
            [documentId]: `File size too large. Maximum size: ${maxSizeMB}MB`
          }
        }
      });
      return;
    }

    // Clear any previous errors
    const newErrors = { ...formData?.documentErrors };
    delete newErrors?.[documentId];
    
    onChange({
      target: {
        name: 'documentErrors',
        value: newErrors
      }
    });

    // Store the file
    onChange({
      target: {
        name: 'documents',
        value: {
          ...formData?.documents,
          [documentId]: file
        }
      }
    });
  };

  const handleDragOver = (e, documentId) => {
    e?.preventDefault();
    setDraggedOver(documentId);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setDraggedOver(null);
  };

  const handleDrop = (e, documentId) => {
    e?.preventDefault();
    setDraggedOver(null);
    const files = e?.dataTransfer?.files;
    if (files?.length > 0) {
      handleFileSelect(documentId, files?.[0]);
    }
  };

  const removeFile = (documentId) => {
    const newDocuments = { ...formData?.documents };
    delete newDocuments?.[documentId];
    
    onChange({
      target: {
        name: 'documents',
        value: newDocuments
      }
    });

    // Clear any errors for this document
    const newErrors = { ...formData?.documentErrors };
    delete newErrors?.[documentId];
    
    onChange({
      target: {
        name: 'documentErrors',
        value: newErrors
      }
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getFileIcon = (fileName) => {
    const extension = fileName?.split('.')?.pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'FileText';
      case 'jpg': case'jpeg': case'png':
        return 'Image';
      default:
        return 'File';
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h3 className="text-lg font-semibold text-foreground">Document Upload</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Please upload all required documents. Ensure files are clear and readable.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {requiredDocuments?.map((document) => (
          <div key={document?.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">
                {document?.label}
                {document?.required && <span className="text-error ml-1">*</span>}
              </label>
            </div>
            
            <p className="text-xs text-muted-foreground">{document?.description}</p>

            {/* File Upload Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                draggedOver === document?.id
                  ? 'border-primary bg-primary/5'
                  : formData?.documents?.[document?.id]
                  ? 'border-success bg-success/5' :'border-border hover:border-primary/50'
              }`}
              onDragOver={(e) => handleDragOver(e, document?.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, document?.id)}
            >
              {formData?.documents?.[document?.id] ? (
                // File uploaded state
                (<div className="space-y-3">
                  <div className="flex items-center justify-center space-x-2">
                    <Icon 
                      name={getFileIcon(formData?.documents?.[document?.id]?.name)} 
                      size={24} 
                      className="text-success" 
                    />
                    <span className="text-sm font-medium text-foreground">
                      {formData?.documents?.[document?.id]?.name}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(formData?.documents?.[document?.id]?.size)}
                  </p>
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const input = document?.createElement('input');
                        input.type = 'file';
                        input.accept = document?.accept;
                        input.onchange = (e) => handleFileSelect(document?.id, e?.target?.files?.[0]);
                        input?.click();
                      }}
                    >
                      Replace
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(document?.id)}
                      iconName="Trash2"
                      iconSize={14}
                    >
                      Remove
                    </Button>
                  </div>
                </div>)
              ) : (
                // Upload state
                (<div className="space-y-3">
                  <Icon name="Upload" size={32} className="text-muted-foreground mx-auto" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Drag and drop your file here
                    </p>
                    <p className="text-xs text-muted-foreground">or</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const input = document?.createElement('input');
                      input.type = 'file';
                      input.accept = document?.accept;
                      input.onchange = (e) => handleFileSelect(document?.id, e?.target?.files?.[0]);
                      input?.click();
                    }}
                    iconName="FolderOpen"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Browse Files
                  </Button>
                </div>)
              )}
            </div>

            {/* Error Display */}
            {formData?.documentErrors?.[document?.id] && (
              <div className="flex items-center space-x-2 text-error">
                <Icon name="AlertCircle" size={16} />
                <span className="text-xs">{formData?.documentErrors?.[document?.id]}</span>
              </div>
            )}

            {/* General Error for Required Documents */}
            {errors?.[document?.id] && (
              <div className="flex items-center space-x-2 text-error">
                <Icon name="AlertCircle" size={16} />
                <span className="text-xs">{errors?.[document?.id]}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Upload Progress Summary */}
      <div className="bg-muted/30 p-4 rounded-lg border border-border">
        <h4 className="text-md font-medium text-foreground mb-3">Upload Summary</h4>
        <div className="space-y-2">
          {requiredDocuments?.map((document) => (
            <div key={document?.id} className="flex items-center justify-between text-sm">
              <span className={document?.required ? 'text-foreground' : 'text-muted-foreground'}>
                {document?.label}
                {document?.required && <span className="text-error ml-1">*</span>}
              </span>
              <div className="flex items-center space-x-2">
                {formData?.documents?.[document?.id] ? (
                  <>
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    <span className="text-success">Uploaded</span>
                  </>
                ) : document?.required ? (
                  <>
                    <Icon name="AlertCircle" size={16} className="text-warning" />
                    <span className="text-warning">Required</span>
                  </>
                ) : (
                  <>
                    <Icon name="Circle" size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Optional</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Important Notes */}
      <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
        <h4 className="text-md font-medium text-foreground mb-2 flex items-center">
          <Icon name="Info" size={16} className="mr-2" />
          Important Notes
        </h4>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>All documents should be clear and readable</li>
          <li>File formats accepted: PDF, JPG, PNG</li>
          <li>Maximum file size varies by document type</li>
          <li>Ensure all required documents are uploaded before submission</li>
          <li>Documents will be verified by the admission committee</li>
        </ul>
      </div>
    </div>
  );
};

export default DocumentUploadSection;