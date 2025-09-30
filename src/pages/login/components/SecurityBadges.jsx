import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Encrypted',
      description: 'End-to-end encryption'
    },
    {
      icon: 'Lock',
      title: 'Secure Authentication',
      description: 'Firebase Auth integration'
    },
    {
      icon: 'Eye',
      title: 'Privacy Protected',
      description: 'GDPR compliant'
    },
    {
      icon: 'Database',
      title: 'Data Security',
      description: 'Firestore secured'
    }
  ];

  return (
    <div className="hidden lg:block">
      <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="ShieldCheck" size={20} className="mr-2 text-success" />
          Security & Trust
        </h3>
        
        <div className="space-y-4">
          {securityFeatures?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={feature?.icon} size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{feature?.title}</p>
                <p className="text-xs text-muted-foreground">{feature?.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Compliance Badges */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={16} className="text-accent" />
              <span className="text-xs font-medium text-foreground">ISO 27001</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-xs font-medium text-foreground">SOC 2</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-primary" />
              <span className="text-xs font-medium text-foreground">GDPR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;