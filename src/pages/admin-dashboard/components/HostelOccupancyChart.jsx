import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HostelOccupancyChart = () => {
  const [viewMode, setViewMode] = useState('overview');

  const occupancyData = [
    { name: 'Boys Hostel A', occupied: 180, capacity: 200, rate: 90 },
    { name: 'Boys Hostel B', occupied: 165, capacity: 180, rate: 91.7 },
    { name: 'Girls Hostel A', occupied: 145, capacity: 160, rate: 90.6 },
    { name: 'Girls Hostel B', occupied: 132, capacity: 150, rate: 88 },
    { name: 'PG Block', occupied: 85, capacity: 100, rate: 85 }
  ];

  const overviewData = [
    { name: 'Occupied', value: 707, color: '#10B981' },
    { name: 'Available', value: 83, color: '#64748B' }
  ];

  const totalCapacity = occupancyData?.reduce((sum, hostel) => sum + hostel?.capacity, 0);
  const totalOccupied = occupancyData?.reduce((sum, hostel) => sum + hostel?.occupied, 0);
  const overallRate = ((totalOccupied / totalCapacity) * 100)?.toFixed(1);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated">
          <p className="font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {viewMode === 'overview' 
                ? `${entry?.name}: ${entry?.value} rooms`
                : `${entry?.dataKey}: ${entry?.value}${entry?.dataKey === 'rate' ? '%' : ' students'}`
              }
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Hostel Occupancy</h3>
          <p className="text-sm text-muted-foreground">Live accommodation tracking</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'overview' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('overview')}
            iconName="PieChart"
            iconPosition="left"
            iconSize={16}
          >
            Overview
          </Button>
          <Button
            variant={viewMode === 'detailed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('detailed')}
            iconName="BarChart3"
            iconPosition="left"
            iconSize={16}
          >
            Detailed
          </Button>
        </div>
      </div>
      <div className="h-80 mb-6">
        {viewMode === 'overview' ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={overviewData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={140}
                paddingAngle={5}
                dataKey="value"
              >
                {overviewData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={occupancyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="name" stroke="#64748B" fontSize={10} angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="occupied" fill="#10B981" name="Occupied" radius={[2, 2, 0, 0]} />
              <Bar dataKey="capacity" fill="#E2E8F0" name="Capacity" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      {viewMode === 'overview' && (
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-primary/10 mb-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">{overallRate}%</p>
              <p className="text-sm text-muted-foreground">Occupied</p>
            </div>
          </div>
          <p className="text-lg font-semibold text-card-foreground">{totalOccupied} / {totalCapacity} Rooms</p>
          <p className="text-sm text-muted-foreground">Total hostel capacity utilization</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-6 border-t border-border">
        {occupancyData?.map((hostel, index) => (
          <div key={index} className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Icon name="Building" size={16} className="text-primary" />
              <span className="text-xs font-medium text-card-foreground truncate">{hostel?.name}</span>
            </div>
            <p className="text-lg font-bold text-primary">{hostel?.rate}%</p>
            <p className="text-xs text-muted-foreground">{hostel?.occupied}/{hostel?.capacity}</p>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300" 
                style={{ width: `${hostel?.rate}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-sm text-muted-foreground">Occupied</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-muted rounded-full"></div>
            <span className="text-sm text-muted-foreground">Available</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="RefreshCw" size={14} />
          <span>Last updated: 2 mins ago</span>
        </div>
      </div>
    </div>
  );
};

export default HostelOccupancyChart;