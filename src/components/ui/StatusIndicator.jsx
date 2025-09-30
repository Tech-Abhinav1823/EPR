import React from 'react';
import Icon from '../AppIcon';

const StatusIndicator = ({ 
  status = 'default', 
  label, 
  showIcon = true, 
  size = 'default',
  variant = 'badge',
  isLoading = false,
  className = ''
}) => {
  const getStatusConfig = (status) => {
    const configs = {
      success: {
        color: 'text-success bg-success/10 border-success/20',
        icon: 'CheckCircle',
        pulse: false
      },
      warning: {
        color: 'text-warning bg-warning/10 border-warning/20',
        icon: 'AlertTriangle',
        pulse: false
      },
      error: {
        color: 'text-error bg-error/10 border-error/20',
        icon: 'XCircle',
        pulse: false
      },
      pending: {
        color: 'text-accent bg-accent/10 border-accent/20',
        icon: 'Clock',
        pulse: true
      },
      active: {
        color: 'text-primary bg-primary/10 border-primary/20',
        icon: 'Activity',
        pulse: true
      },
      inactive: {
        color: 'text-muted-foreground bg-muted border-border',
        icon: 'Circle',
        pulse: false
      },
      default: {
        color: 'text-muted-foreground bg-muted border-border',
        icon: 'Info',
        pulse: false
      }
    };
    return configs?.[status] || configs?.default;
  };

  const getSizeClasses = (size) => {
    const sizes = {
      sm: 'px-2 py-1 text-xs',
      default: 'px-3 py-1.5 text-sm',
      lg: 'px-4 py-2 text-base'
    };
    return sizes?.[size] || sizes?.default;
  };

  const getIconSize = (size) => {
    const sizes = {
      sm: 12,
      default: 14,
      lg: 16
    };
    return sizes?.[size] || sizes?.default;
  };

  const config = getStatusConfig(status);
  const sizeClasses = getSizeClasses(size);
  const iconSize = getIconSize(size);

  if (variant === 'dot') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className={`w-2 h-2 rounded-full ${config?.color?.split(' ')?.[1]} ${config?.pulse ? 'animate-pulse' : ''}`} />
        {label && <span className="text-sm text-foreground">{label}</span>}
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        {showIcon && !isLoading && (
          <Icon 
            name={config?.icon} 
            size={iconSize} 
            className={`${config?.color?.split(' ')?.[0]} ${config?.pulse ? 'animate-pulse' : ''}`}
          />
        )}
        {isLoading && (
          <Icon name="Loader2" size={iconSize} className="animate-spin text-muted-foreground" />
        )}
        {label && (
          <span className={`${sizeClasses?.includes('text-xs') ? 'text-xs' : sizeClasses?.includes('text-base') ? 'text-base' : 'text-sm'} font-medium ${config?.color?.split(' ')?.[0]}`}>
            {label}
          </span>
        )}
      </div>
    );
  }

  // Default badge variant
  return (
    <div className={`inline-flex items-center space-x-1.5 ${sizeClasses} font-medium rounded-full border ${config?.color} ${config?.pulse ? 'animate-pulse' : ''} ${className}`}>
      {showIcon && !isLoading && (
        <Icon name={config?.icon} size={iconSize} />
      )}
      {isLoading && (
        <Icon name="Loader2" size={iconSize} className="animate-spin" />
      )}
      {label && <span>{label}</span>}
    </div>
  );
};

export default StatusIndicator;