
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { Download, Calendar, Filter } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for reports
const campaignPerformanceData = [
  { name: 'Q4 Security', sent: 230, opened: 150, clicked: 85, submitted: 42 },
  { name: 'Fin Update', sent: 180, opened: 120, clicked: 73, submitted: 35 },
  { name: 'HR Docs', sent: 280, opened: 180, clicked: 95, submitted: 56 },
  { name: 'IT Support', sent: 210, opened: 130, clicked: 65, submitted: 29 },
  { name: 'Benefits', sent: 250, opened: 170, clicked: 78, submitted: 39 },
];

const departmentPerformanceData = [
  { name: 'Executive', clicked: 12, submitted: 5 },
  { name: 'IT', clicked: 8, submitted: 3 },
  { name: 'HR', clicked: 25, submitted: 10 },
  { name: 'Finance', clicked: 31, submitted: 18 },
  { name: 'Marketing', clicked: 22, submitted: 9 },
  { name: 'Sales', clicked: 29, submitted: 15 },
];

const timeSeriesData = [
  { day: '2023-04-01', clicks: 12, submissions: 5 },
  { day: '2023-04-02', clicks: 19, submissions: 8 },
  { day: '2023-04-03', clicks: 15, submissions: 7 },
  { day: '2023-04-04', clicks: 21, submissions: 10 },
  { day: '2023-04-05', clicks: 25, submissions: 12 },
  { day: '2023-04-06', clicks: 18, submissions: 8 },
  { day: '2023-04-07', clicks: 14, submissions: 6 },
];

const vulnerabilityData = [
  { name: 'Clicked', value: 35 },
  { name: 'Submitted', value: 15 },
  { name: 'Ignored', value: 50 },
];

const COLORS = ['#4e46e5', '#ea384c', '#64748b'];

const ReportsPage: React.FC = () => {
  return (
    <div>
      <PageHeader 
        title="Reports" 
        description="Analyze campaign performance and user vulnerability metrics."
        actions={
          <div className="flex space-x-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Date Range
            </Button>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="card-gradient">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-sm text-muted-foreground mt-1">Last 30 days</p>
          </CardContent>
        </Card>
        
        <Card className="card-gradient">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Phish-prone Percentage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-cyber-danger">24.7%</div>
            <p className="text-sm text-muted-foreground mt-1">5.2% decrease from previous period</p>
          </CardContent>
        </Card>
        
        <Card className="card-gradient">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Avg. Time to Click</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">27m 14s</div>
            <p className="text-sm text-muted-foreground mt-1">Industry avg: 1h 12m</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="campaigns" className="mb-6">
        <TabsList className="grid grid-cols-4 max-w-xl mb-6">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        
        <TabsContent value="campaigns" className="space-y-6">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={campaignPerformanceData} barGap={4} barSize={12}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#1a1f2c", 
                      border: "1px solid #334155",
                      color: "#f8fafc"
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="opened" name="Opened" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="clicked" name="Clicked" fill="#f97316" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="submitted" name="Submitted" fill="#ea384c" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Open Rate Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={vulnerabilityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {vulnerabilityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "#1a1f2c", 
                        border: "1px solid #334155",
                        color: "#f8fafc"
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-4">
                  {[
                    { label: 'Total Emails Sent', value: '1,150' },
                    { label: 'Open Rate', value: '67.8%' },
                    { label: 'Click Rate', value: '35.2%' },
                    { label: 'Submission Rate', value: '15.9%' },
                    { label: 'Most Successful Template', value: 'HR Docs' },
                    { label: 'Average Time to Click', value: '27m 14s' }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-border pb-2">
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="departments" className="space-y-6">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={departmentPerformanceData}
                  layout="vertical"
                  barGap={4}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                  <XAxis type="number" stroke="#64748b" />
                  <YAxis dataKey="name" type="category" stroke="#64748b" width={80} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#1a1f2c", 
                      border: "1px solid #334155",
                      color: "#f8fafc"
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="clicked" name="Clicked %" fill="#f97316" radius={[0, 4, 4, 0]} barSize={15} />
                  <Bar dataKey="submitted" name="Submitted %" fill="#ea384c" radius={[0, 4, 4, 0]} barSize={15} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="timeline" className="space-y-6">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Click & Submission Timeline</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={timeSeriesData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="day" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#1a1f2c", 
                      border: "1px solid #334155",
                      color: "#f8fafc"
                    }} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="clicks" 
                    name="Clicks" 
                    stroke="#f97316" 
                    strokeWidth={2}
                    dot={{ r: 4 }} 
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="submissions" 
                    name="Submissions" 
                    stroke="#ea384c" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-6">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle>Top Vulnerable Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="grid grid-cols-3 font-medium text-sm text-muted-foreground pb-2 border-b border-border">
                  <div>Email</div>
                  <div className="text-center">Department</div>
                  <div className="text-right">Fall Rate</div>
                </div>
                {[
                  { email: 'rob.johnson@company.com', department: 'Finance', rate: '75%' },
                  { email: 'mary.williams@company.com', department: 'HR', rate: '67%' },
                  { email: 'steve.davis@company.com', department: 'Marketing', rate: '60%' },
                  { email: 'lisa.brown@company.com', department: 'Finance', rate: '50%' },
                  { email: 'david.miller@company.com', department: 'Sales', rate: '50%' },
                ].map((user, i) => (
                  <div key={i} className="grid grid-cols-3 py-3 border-b border-border/40 text-sm">
                    <div className="truncate">{user.email}</div>
                    <div className="text-center">{user.department}</div>
                    <div className="text-right font-medium text-cyber-danger">{user.rate}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;
