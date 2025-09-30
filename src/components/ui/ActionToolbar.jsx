import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const ActionToolbar = ({ 
  actions = [], 
  userRole = 'student', 
  orientation = 'horizontal',
  size = 'default',
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const defaultActions = {
    student: [
      { 
        id: 'download', 
        label: 'Download', 
        icon: 'Download', 
        variant: 'outline',
        onClick: () => console.log('Download clicked')
      },
      { 
        id: 'share', 
        label: 'Share', 
        icon: 'Share2', 
        variant: 'ghost',
        onClick: () => console.log('Share clicked')
      },
      { 
        id: 'print', 
        label: 'Print', 
        icon: 'Printer', 
        variant: 'ghost',
        onClick: () => console.log('Print clicked')
      }
    ],
    teacher: [
      { 
        id: 'upload', 
        label: 'Upload', 
        icon: 'Upload', 
        variant: 'default',
        onClick: () => console.log('Upload clicked')
      },
      { 
        id: 'share', 
        label: 'Share', 
        icon: 'Share2', 
        variant: 'outline',
        onClick: () => console.log('Share clicked')
      },
      { 
        id: 'export', 
        label: 'Export', 
        icon: 'FileDown', 
        variant: 'ghost',
        onClick: () => console.log('Export clicked')
      },
      { 
        id: 'settings', 
        label: 'Settings', 
        icon: 'Settings', 
        variant: 'ghost',
        onClick: () => console.log('Settings clicked')
      }
    ],
    admin: [
      { 
        id: 'create', 
        label: 'Create New', 
        icon: 'Plus', 
        variant: 'default',
        onClick: () => console.log('Create clicked')
      },
      { 
        id: 'import', 
        label: 'Import', 
        icon: 'FileUp', 
        variant: 'outline',
        onClick: () => console.log('Import clicked')
      },
      { 
        id: 'export', 
        label: 'Export', 
        icon: 'FileDown', 
        variant: 'outline',
        onClick: () => console.log('Export clicked')
      },
      { 
        id: 'manage', 
        label: 'Manage', 
        icon: 'Settings', 
        variant: 'ghost',
        onClick: () => console.log('Manage clicked')
      },
      { 
        id: 'reports', 
        label: 'Reports', 
        icon: 'BarChart3', 
        variant: 'ghost',
        onClick: () => console.log('Reports clicked')
      }
    ]
  };

  const toolbarActions = actions?.length > 0 ? actions : (defaultActions?.[userRole] || defaultActions?.student);
  const visibleActions = orientation === 'horizontal' ? toolbarActions?.slice(0, 3) : toolbarActions;
  const hiddenActions = orientation === 'horizontal' ? toolbarActions?.slice(3) : [];

  const getContainerClasses = () => {
    const base = 'flex items-center';
    const orientationClasses = orientation === 'horizontal' ? 'space-x-2' : 'flex-col space-y-2';
    return `${base} ${orientationClasses} ${className}`;
  };

  const handleActionClick = (action) => {
    if (action?.onClick) {
      action?.onClick();
    }
    if (orientation === 'horizontal' && hiddenActions?.length > 0) {
      setIsExpanded(false);
    }
  };

  return (
    <div className={getContainerClasses()}>
      {/* Visible Actions */}
      {visibleActions?.map((action) => (
        <Button
          key={action?.id}
          variant={action?.variant || 'ghost'}
          size={size}
          onClick={() => handleActionClick(action)}
          iconName={action?.icon}
          iconPosition="left"
          iconSize={size === 'sm' ? 14 : size === 'lg' ? 18 : 16}
          disabled={action?.disabled}
          loading={action?.loading}
          className="transition-smooth"
        >
          {orientation === 'vertical' || size !== 'icon' ? action?.label : ''}
        </Button>
      ))}
      {/* More Actions Menu (Horizontal only) */}
      {orientation === 'horizontal' && hiddenActions?.length > 0 && (
        <div className="relative">
          <Button
            variant="ghost"
            size={size}
            onClick={() => setIsExpanded(!isExpanded)}
            iconName="MoreHorizontal"
            iconSize={size === 'sm' ? 14 : size === 'lg' ? 18 : 16}
          >
            {size !== 'icon' && 'More'}
          </Button>

          {isExpanded && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevated z-50">
              <div className="py-2">
                {hiddenActions?.map((action) => (
                  <button
                    key={action?.id}
                    onClick={() => handleActionClick(action)}
                    disabled={action?.disabled}
                    className="w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-muted transition-smooth flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Icon name={action?.icon} size={16} />
                    <span>{action?.label}</span>
                    {action?.loading && (
                      <Icon name="Loader2" size={14} className="animate-spin ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {/* Quick Access Floating Button (Mobile) */}
      {orientation === 'horizontal' && (
        <div className="md:hidden fixed bottom-6 right-6 z-50">
          <Button
            variant="default"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-14 h-14 rounded-full shadow-elevated"
          >
            <Icon name={isExpanded ? "X" : "Plus"} size={24} />
          </Button>

          {isExpanded && (
            <div className="absolute bottom-16 right-0 w-48 bg-popover border border-border rounded-lg shadow-elevated">
              <div className="py-2">
                {toolbarActions?.map((action) => (
                  <button
                    key={action?.id}
                    onClick={() => handleActionClick(action)}
                    disabled={action?.disabled}
                    className="w-full px-4 py-3 text-left text-sm text-popover-foreground hover:bg-muted transition-smooth flex items-center space-x-3 disabled:opacity-50"
                  >
                    <Icon name={action?.icon} size={18} />
                    <span className="font-medium">{action?.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ActionToolbar;