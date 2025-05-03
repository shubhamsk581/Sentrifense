
import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Calendar,
  Check,
  Download,
  Filter,
  Users,
  Zap,
  Lock,
  Globe,
  AlertCircle,
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
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });
  const [filterOpen, setFilterOpen] = useState(false);

  const handleExport = () => {
    toast.success('Report exported successfully');
  };

  return (
    <div>
      <PageHeader 
        title="Reports" 
        description="View campaign results and analytics."
        actions={
          <div className="flex space-x-2">
            <Popover open={filterOpen} onOpenChange={setFilterOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="space-y-4">
                  <h4 className="font-medium">Filter Reports</h4>
                  <div className="space-y-2">
                    <Label htmlFor="campaign-select">Campaign</Label>
                    <select 
                      id="campaign-select" 
                      className="w-full p-2 rounded-md border border-input bg-background"
                    >
                      <option value="">All Campaigns</option>
                      <option value="Security Training">Security Training</option>
                      <option value="Finance Update">Finance Update</option>
                      <option value="HR Reminder">HR Reminder</option>
                      <option value="IT Support">IT Support</option>
                      <option value="System Upgrade">System Upgrade</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Date Range</Label>
                    <div className="grid gap-2">
                      <div
                        className="flex items-center p-2 rounded-md border border-input"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>
                          {date?.from ? (
                            date.to ? (
                              <>
                                {format(date.from, 'LLL dd, y')} -{' '}
                                {format(date.to, 'LLL dd, y')}
                              </>
                            ) : (
                              format(date.from, 'LLL dd, y')
                            )
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </span>
                      </div>
                      <CalendarComponent
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-group">User Group</Label>
                    <select 
                      id="user-group" 
                      className="w-full p-2 rounded-md border border-input bg-background"
                    >
                      <option value="">All Groups</option>
                      <option value="Executives">Executives</option>
                      <option value="IT Department">IT Department</option>
                      <option value="Finance">Finance</option>
                      <option value="HR">HR</option>
                    </select>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setDate({
                          from: addDays(new Date(), -30),
                          to: new Date(),
                        });
                        setFilterOpen(false);
                      }}
                    >
                      Reset
                    </Button>
                    <Button 
                      onClick={() => {
                        toast.success("Filters applied");
                        setFilterOpen(false);
                      }}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Button onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        }
      />
      
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
