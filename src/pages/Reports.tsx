import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChartBar, Calendar, Users, Activity } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const monthlyData = [
  { month: 'Jan', clients: 1150, sessions: 4200, revenue: 850000 },
  { month: 'Feb', clients: 1180, sessions: 4350, revenue: 875000 },
  { month: 'Mar', clients: 1200, sessions: 4100, revenue: 820000 },
  { month: 'Apr', clients: 1250, sessions: 4500, revenue: 920000 },
  { month: 'May', clients: 1220, sessions: 4200, revenue: 880000 },
  { month: 'Jun', clients: 1280, sessions: 4600, revenue: 950000 },
];

const cityData = [
  { name: 'Mumbai', value: 35, color: '#0ea5e9' },
  { name: 'Delhi', value: 28, color: '#10b981' },
  { name: 'Bangalore', value: 22, color: '#f59e0b' },
  { name: 'Chennai', value: 15, color: '#ef4444' },
];

const serviceData = [
  { service: 'Physiotherapy', count: 145, percentage: 42 },
  { service: 'Fitness Training', count: 98, percentage: 28 },
  { service: 'Nutrition', count: 67, percentage: 19 },
  { service: 'Companion Care', count: 38, percentage: 11 },
];

const churnData = [
  { cohort: 'Jan 2024', retained: 85, churned: 15 },
  { cohort: 'Feb 2024', retained: 88, churned: 12 },
  { cohort: 'Mar 2024', retained: 82, churned: 18 },
  { cohort: 'Apr 2024', retained: 90, churned: 10 },
  { cohort: 'May 2024', retained: 87, churned: 13 },
  { cohort: 'Jun 2024', retained: 92, churned: 8 },
];

export default function Reports() {
  const [timeRange, setTimeRange] = useState('6months');
  const [reportType, setReportType] = useState('overview');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports & Analytics</h1>
          <p className="text-slate-600">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export CSV</Button>
          <Button variant="outline">Export PDF</Button>
          <Button className="bg-sky-500 hover:bg-sky-600">Schedule Report</Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">Overview</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="operational">Operational</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Session Completion Rate</CardTitle>
            <Calendar className="h-5 w-5 text-sky-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">94.2%</div>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="secondary" className="text-green-600 bg-green-50">+2.3%</Badge>
              <span className="text-xs text-slate-500">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Monthly Churn Rate</CardTitle>
            <Users className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">8.1%</div>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="secondary" className="text-green-600 bg-green-50">-1.2%</Badge>
              <span className="text-xs text-slate-500">improvement</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Average Revenue per Client</CardTitle>
            <ChartBar className="h-5 w-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">₹742</div>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="secondary" className="text-green-600 bg-green-50">+5.8%</Badge>
              <span className="text-xs text-slate-500">monthly growth</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Referral Rate</CardTitle>
            <Activity className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">23.4%</div>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="secondary" className="text-green-600 bg-green-50">+4.1%</Badge>
              <span className="text-xs text-slate-500">increase</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="clients" 
                  stroke="#0ea5e9" 
                  strokeWidth={2}
                  name="Active Clients"
                />
                <Line 
                  type="monotone" 
                  dataKey="sessions" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Sessions"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* City Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Client Distribution by City</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={cityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {cityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {cityData.map((city) => (
                <div key={city.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: city.color }}
                  />
                  <span className="text-sm text-slate-600">{city.name}</span>
                  <span className="text-sm font-medium ml-auto">{city.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Service Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Service Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {serviceData.map((service) => (
                <div key={service.service} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">{service.service}</span>
                    <span className="font-medium">{service.count} sessions ({service.percentage}%)</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-sky-500 h-2 rounded-full" 
                      style={{ width: `${service.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Retention Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Client Retention by Cohort</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={churnData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="cohort" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="retained" fill="#10b981" name="Retained %" />
                <Bar dataKey="churned" fill="#ef4444" name="Churned %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
