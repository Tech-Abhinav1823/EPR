import React, { useState } from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeeCollectionChart = () => {
  const [viewType, setViewType] = useState('monthly');

  const monthlyData = [
    { period: 'Jan', collected: 2850000, pending: 450000, target: 3200000 },
    { period: 'Feb', collected: 3120000, pending: 380000, target: 3500000 },
    { period: 'Mar', collected: 4250000, pending: 520000, target: 4800000 },
    { period: 'Apr', collected: 3890000, pending: 410000, target: 4300000 },
    { period: 'May', collected: 4670000, pending: 330000, target: 5000000 },
    { period: 'Jun', collected: 5230000, pending: 270000, target: 5500000 }
  ];

  const weeklyData = [
    { period: 'Week 1', collected: 1200000, pending: 180000, target: 1400000 },
    { period: 'Week 2', collected: 1350000, pending: 150000, target: 1500000 },
    { period: 'Week 3', collected: 1180000, pending: 220000, target: 1400000 },
    { period: 'Week 4', collected: 1500000, pending: 100000, target: 1600000 }
  ];

  const currentData = viewType === 'monthly' ? monthlyData : weeklyData;

  const formatCurrency = (value) => {
    return `₹${(value / 100000)?.toFixed(1)}L`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated">
          <p className="font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.name}: ${formatCurrency(entry?.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const totalCollected = currentData?.reduce((sum, item) => sum + item?.collected, 0);
  const totalPending = currentData?.reduce((sum, item) => sum + item?.pending, 0);
  const totalTarget = currentData?.reduce((sum, item) => sum + item?.target, 0);
  const collectionRate = ((totalCollected / totalTarget) * 100)?.toFixed(1);

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Fee Collection Analytics</h3>
          <p className="text-sm text-muted-foreground">Revenue tracking with INR formatting</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewType === 'monthly' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewType('monthly')}
            iconName="Calendar"
            iconPosition="left"
            iconSize={16}
          >
            Monthly
          </Button>
          <Button
            variant={viewType === 'weekly' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewType('weekly')}
            iconName="CalendarDays"
            iconPosition="left"
            iconSize={16}
          >
            Weekly
          </Button>
        </div>
      </div>

      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="collectedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="pendingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="period" stroke="#64748B" fontSize={12} />
            <YAxis stroke="#64748B" fontSize={12} tickFormatter={formatCurrency} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="collected"
              stroke="#10B981"
              fillOpacity={1}
              fill="url(#collectedGradient)"
              name="Collected"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="pending"
              stroke="#F59E0B"
              fillOpacity={1}
              fill="url(#pendingGradient)"
              name="Pending"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#1E40AF"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Target"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t border-border">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-medium text-card-foreground">Total Collected</span>
          </div>
          <p className="text-xl font-bold text-success">{formatCurrency(totalCollected)}</p>
          <p className="text-xs text-muted-foreground">{collectionRate}% of target</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name="Clock" size={16} className="text-warning" />
            <span className="text-sm font-medium text-card-foreground">Pending</span>
          </div>
          <p className="text-xl font-bold text-warning">{formatCurrency(totalPending)}</p>
          <p className="text-xs text-muted-foreground">Outstanding amount</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-primary" />
            <span className="text-sm font-medium text-card-foreground">Target</span>
          </div>
          <p className="text-xl font-bold text-primary">{formatCurrency(totalTarget)}</p>
          <p className="text-xs text-muted-foreground">Monthly goal</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name="Percent" size={16} className="text-accent" />
            <span className="text-sm font-medium text-card-foreground">Collection Rate</span>
          </div>
          <p className="text-xl font-bold text-accent">{collectionRate}%</p>
          <p className="text-xs text-muted-foreground">Achievement rate</p>
        </div>
      </div>
    </div>
  );
};

export default FeeCollectionChart;