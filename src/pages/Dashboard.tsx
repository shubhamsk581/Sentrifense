
import React from 'react';
import { 
  Send, 
  Mail, 
  MousePointerClick, 
  FileText, 
  Users, 
  AlertTriangle, 
  ShieldCheck
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/ui/StatCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// Mock data for charts
const campaignPerformanceData = [
  { name: 'Q4 Security', sent: 230, opened: 150, clicked: 85, submitted: 42 },
  { name: 'Fin Update', sent: 180, opened: 120, clicked: 73, submitted: 35 },
  { name: 'HR Docs', sent: 280, opened: 180, clicked: 95, submitted: 56 },
  { name: 'IT Support', sent: 210, opened: 130, clicked: 65, submitted: 29 },
];

const vulnerabilityData = [
  { name: 'Clicked', value: 35 },
  { name: 'Submitted', value: 15 },
  { name: 'Ignored', value: 50 },
];

const COLORS = ['#4e46e5', '#ea384c', '#64748b'];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleNewCampaign = () => {
    navigate('/campaigns/new');
  };

  return (
    <div>
      <PageHeader 
        title="Dashboard" 
        description="Key metrics and campaign performance."
        actions={
          <Button variant="default" onClick={handleNewCampaign}>
            <Send className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        }
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Active Campaigns" 
          value="3" 
          icon={Send}
          trend={{ value: 20, isPositive: true }}
        />
        <StatCard 
          title="Total Emails Sent" 
          value="12,845" 
          icon={Mail}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard 
          title="Email Open Rate" 
          value="68%" 
          icon={MousePointerClick}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard 
          title="Submission Rate" 
          value="21%" 
          icon={FileText}
          trend={{ value: 3, isPositive: false }}
        />
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Campaign Performance Chart */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>Detailed metrics across recent campaigns</CardDescription>
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
                <Bar dataKey="sent" fill="#4e46e5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="opened" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                <Bar dataKey="clicked" fill="#f97316" radius={[4, 4, 0, 0]} />
                <Bar dataKey="submitted" fill="#ea384c" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Vulnerability Metrics */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>Vulnerability Metrics</CardTitle>
            <CardDescription>User response to phishing attempts</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row items-center justify-center h-80">
            <div className="h-64 w-64">
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
            </div>
            <div className="mt-6 md:mt-0 md:ml-8">
              <div className="space-y-3">
                {vulnerabilityData.map((item, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[i] }}></div>
                    <span className="text-sm">{item.name}: <strong>{item.value}%</strong></span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Alerts and Security Recommendations */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="card-gradient">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-cyber-warning" />
          </CardHeader>
          <CardContent>
            <ul className="mt-2 space-y-4">
              <li className="bg-cyber-warning/10 p-3 rounded-md">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-cyber-warning" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">High Click Rate Detected</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      The "IT Support" campaign has an unusually high click rate (31%). Consider analyzing this template for training purposes.
                    </p>
                  </div>
                </div>
              </li>
              <li className="bg-cyber-danger/10 p-3 rounded-md">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-cyber-danger" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">Campaign Delivery Issues</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      The "Q4 Security" campaign has a 5% email bounce rate. Check your email lists for validity.
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="card-gradient">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Security Recommendations</CardTitle>
            <ShieldCheck className="h-4 w-4 text-cyber-success" />
          </CardHeader>
          <CardContent>
            <ul className="mt-2 space-y-4">
              <li className="bg-cyber-info/10 p-3 rounded-md">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ShieldCheck className="h-5 w-5 text-cyber-info" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">Security Training Recommended</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Finance department shows a 28% credential submission rate. Consider targeted security awareness training.
                    </p>
                  </div>
                </div>
              </li>
              <li className="bg-cyber-success/10 p-3 rounded-md">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ShieldCheck className="h-5 w-5 text-cyber-success" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">IT Department Improvement</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      IT department reduced click rates by 15% since last campaign. Continue reinforcement training.
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
