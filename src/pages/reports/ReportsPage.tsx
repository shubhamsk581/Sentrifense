
import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Users,
  Zap,
  Lock,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { DateRange } from 'react-day-picker';
import ReportsFilters from './ReportsFilters';
import { toast } from 'sonner';

const campaignData = [
  {
    name: 'Security Training',
    sent: 2000,
    opened: 1500,
    clicked: 800,
    submitted: 400,
  },
  {
    name: 'Finance Update',
    sent: 1500,
    opened: 1000,
    clicked: 600,
    submitted: 300,
  },
  {
    name: 'HR Reminder',
    sent: 1200,
    opened: 800,
    clicked: 400,
    submitted: 150,
  },
  {
    name: 'IT Support',
    sent: 1800,
    opened: 1300,
    clicked: 700,
    submitted: 350,
  },
  {
    name: 'System Upgrade',
    sent: 1600,
    opened: 1100,
    clicked: 550,
    submitted: 250,
  },
];

const ReportsPage: React.FC = () => {
  const [filterState, setFilterState] = useState({
    dateRange: undefined as DateRange | undefined,
    campaign: 'all',
    status: 'all'
  });

  const handleFilter = (filters: { 
    dateRange: DateRange | undefined; 
    campaign: string; 
    status: string; 
  }) => {
    setFilterState(filters);
    toast.success('Filters applied');
  };

  return (
    <div>
      <PageHeader 
        title="Reports" 
        description="View campaign results and analytics."
      />
      
      <ReportsFilters onFilter={handleFilter} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Target Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">5,280</div>
                <p className="text-xs text-muted-foreground">Total Targets</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Vulnerability Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Zap className="h-5 w-5 mr-2 text-orange-500" />
              <div>
                <div className="text-2xl font-bold">32.5%</div>
                <p className="text-xs text-muted-foreground">Click Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Credential Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Lock className="h-5 w-5 mr-2 text-red-500" />
              <div>
                <div className="text-2xl font-bold">18.2%</div>
                <p className="text-xs text-muted-foreground">Submission Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={campaignData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 70,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end"
                    tick={{ fontSize: 12 }}
                    height={70}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sent" stackId="a" name="Emails Sent" fill="#4e46e5" />
                  <Bar dataKey="opened" stackId="a" name="Emails Opened" fill="#0ea5e9" />
                  <Bar dataKey="clicked" stackId="a" name="Links Clicked" fill="#f97316" />
                  <Bar dataKey="submitted" stackId="a" name="Credentials Submitted" fill="#ea384c" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;
