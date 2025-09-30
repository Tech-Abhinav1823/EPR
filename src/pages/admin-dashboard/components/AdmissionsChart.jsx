import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

import Button from '../../../components/ui/Button';

const AdmissionsChart = () => {
  const [chartType, setChartType] = useState('bar');

  const admissionsData = [
    { month: 'Jan', applications: 245, approved: 198, pending: 32, rejected: 15 },
    { month: 'Feb', applications: 312, approved: 267, pending: 28, rejected: 17 },
    { month: 'Mar', applications: 428, approved: 356, pending: 45, rejected: 27 },
    { month: 'Apr', applications: 389, approved: 321, pending: 41, rejected: 27 },
    { month: 'May', applications: 467, approved: 398, pending: 38, rejected: 31 },
    { month: 'Jun', applications: 523, approved: 445, pending: 52, rejected: 26 }
  ];

  const pieData = [
    { name: 'Approved', value: 1985, color: '#10B981' },
    { name: 'Pending', value: 236, color: '#F59E0B' },
    { name: 'Rejected', value: 143, color: '#EF4444' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated">
          <p className="font-medium text-popover-foreground mb-2">{`Month: ${label}`}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.dataKey}: ${entry?.value}`}
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
          <h3 className="text-lg font-semibold text-card-foreground">Admissions Analytics</h3>
          <p className="text-sm text-muted-foreground">Application trends and approval rates</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={chartType === 'bar' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('bar')}
            iconName="BarChart3"
            iconPosition="left"
            iconSize={16}
          >
            Bar Chart
          </Button>
          <Button
            variant={chartType === 'pie' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('pie')}
            iconName="PieChart"
            iconPosition="left"
            iconSize={16}
          >
            Pie Chart
          </Button>
        </div>
      </div>
      <div className="h-80">
        {chartType === 'bar' ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={admissionsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="applications" fill="#1E40AF" name="Applications" radius={[2, 2, 0, 0]} />
              <Bar dataKey="approved" fill="#10B981" name="Approved" radius={[2, 2, 0, 0]} />
              <Bar dataKey="pending" fill="#F59E0B" name="Pending" radius={[2, 2, 0, 0]} />
              <Bar dataKey="rejected" fill="#EF4444" name="Rejected" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [`${value} applications`, name]}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-1">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-sm font-medium text-card-foreground">Approved</span>
          </div>
          <p className="text-lg font-bold text-success">1,985</p>
          <p className="text-xs text-muted-foreground">84.2% approval rate</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-1">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-sm font-medium text-card-foreground">Pending</span>
          </div>
          <p className="text-lg font-bold text-warning">236</p>
          <p className="text-xs text-muted-foreground">10.0% pending</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-1">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span className="text-sm font-medium text-card-foreground">Rejected</span>
          </div>
          <p className="text-lg font-bold text-error">143</p>
          <p className="text-xs text-muted-foreground">6.1% rejection rate</p>
        </div>
      </div>
    </div>
  );
};

export default AdmissionsChart;