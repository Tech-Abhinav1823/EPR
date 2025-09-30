import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const DashboardCard = ({ 
  title, 
  description, 
  icon, 
  path, 
  status, 
  statusColor = 'default',
  actionLabel = 'View Details',
  stats = null,
  isLoading = false,
  onClick,
  className = ''
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (path) {
      navigate(path);
    }
  };

  const getStatusColor = (color) => {
    const colors = {
      success: 'text-success bg-success/10',
      warning: 'text-warning bg-warning/10',
      error: 'text-error bg-error/10',
      primary: 'text-primary bg-primary/10',
      default: 'text-muted-foreground bg-muted'
    };
    return colors?.[color] || colors?.default;
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-soft hover:shadow-elevated transition-all duration-200 group cursor-pointer ${className}`}>
      <div className="p-6" onClick={handleClick}>
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Icon name={icon} size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                {title}
              </h3>
              {description && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {description}
                </p>
              )}
            </div>
          </div>
          
          {status && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(statusColor)}`}>
              {status}
            </span>
          )}
        </div>

        {/* Stats Section */}
        {stats && (
          <div className="mb-4">
            {Array.isArray(stats) ? (
              <div className="grid grid-cols-2 gap-4">
                {stats?.map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className="text-2xl font-bold text-card-foreground">{stat?.value}</p>
                    <p className="text-xs text-muted-foreground">{stat?.label}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center">
                <p className="text-3xl font-bold text-card-foreground">{stats?.value}</p>
                <p className="text-sm text-muted-foreground">{stats?.label}</p>
              </div>
            )}
          </div>
        )}

        {/* Action Section */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            iconName="ArrowRight"
            iconPosition="right"
            iconSize={16}
            className="text-primary hover:text-primary-foreground hover:bg-primary transition-smooth"
            disabled={isLoading}
            loading={isLoading}
          >
            {actionLabel}
          </Button>
          
          <div className="flex items-center space-x-2">
            <Icon 
              name="TrendingUp" 
              size={16} 
              className="text-success opacity-0 group-hover:opacity-100 transition-opacity" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;