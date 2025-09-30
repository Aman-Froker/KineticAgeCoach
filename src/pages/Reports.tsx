import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChartBar,
  Calendar,
  Users,
  Activity,
  DollarSign,
  TrendingUp,
  UserCheck,
  Clock,
  Target,
  Zap,
} from "lucide-react";
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
  Cell,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const monthlyData = [
  { month: "Jan", clients: 1150, sessions: 4200, revenue: 850000 },
  { month: "Feb", clients: 1180, sessions: 4350, revenue: 875000 },
  { month: "Mar", clients: 1200, sessions: 4100, revenue: 820000 },
  { month: "Apr", clients: 1250, sessions: 4500, revenue: 920000 },
  { month: "May", clients: 1220, sessions: 4200, revenue: 880000 },
  { month: "Jun", clients: 1280, sessions: 4600, revenue: 950000 },
];

const cityData = [
  { name: "Mumbai", value: 35, color: "#0ea5e9" },
  { name: "Delhi", value: 28, color: "#10b981" },
  { name: "Bangalore", value: 22, color: "#f59e0b" },
  { name: "Chennai", value: 15, color: "#ef4444" },
];

const serviceData = [
  { service: "Physiotherapy", count: 145, percentage: 42 },
  { service: "Fitness Training", count: 98, percentage: 28 },
  { service: "Nutrition", count: 67, percentage: 19 },
  { service: "Companion Care", count: 38, percentage: 11 },
];

const churnData = [
  { cohort: "Jan 2024", retained: 85, churned: 15 },
  { cohort: "Feb 2024", retained: 88, churned: 12 },
  { cohort: "Mar 2024", retained: 82, churned: 18 },
  { cohort: "Apr 2024", retained: 90, churned: 10 },
  { cohort: "May 2024", retained: 87, churned: 13 },
  { cohort: "Jun 2024", retained: 92, churned: 8 },
];

// Financial Data
const revenueData = [
  { month: "Jan", revenue: 850000, profit: 255000, expenses: 595000 },
  { month: "Feb", revenue: 875000, profit: 262500, expenses: 612500 },
  { month: "Mar", revenue: 820000, profit: 246000, expenses: 574000 },
  { month: "Apr", revenue: 920000, profit: 276000, expenses: 644000 },
  { month: "May", revenue: 880000, profit: 264000, expenses: 616000 },
  { month: "Jun", revenue: 950000, profit: 285000, expenses: 665000 },
];

const expenseBreakdown = [
  { category: "Staff Salaries", amount: 45, color: "hsl(var(--primary))" },
  { category: "Equipment", amount: 20, color: "hsl(var(--secondary))" },
  { category: "Rent & Utilities", amount: 18, color: "hsl(var(--accent))" },
  { category: "Marketing", amount: 12, color: "hsl(var(--muted))" },
  { category: "Other", amount: 5, color: "hsl(var(--border))" },
];

// Operational Data
const operationalMetrics = [
  { month: "Jan", utilization: 78, efficiency: 85, downtime: 12 },
  { month: "Feb", utilization: 82, efficiency: 87, downtime: 8 },
  { month: "Mar", utilization: 76, efficiency: 83, downtime: 15 },
  { month: "Apr", utilization: 85, efficiency: 90, downtime: 6 },
  { month: "May", utilization: 80, efficiency: 88, downtime: 10 },
  { month: "Jun", utilization: 88, efficiency: 92, downtime: 4 },
];

const servicePerformance = [
  {
    service: "Physiotherapy",
    avgDuration: 45,
    satisfaction: 4.8,
    bookings: 145,
  },
  {
    service: "Fitness Training",
    avgDuration: 60,
    satisfaction: 4.6,
    bookings: 98,
  },
  { service: "Nutrition", avgDuration: 30, satisfaction: 4.7, bookings: 67 },
  {
    service: "Companion Care",
    avgDuration: 120,
    satisfaction: 4.9,
    bookings: 38,
  },
];

// Customer Data
const customerSegments = [
  { segment: "Premium", count: 320, revenue: 45, color: "hsl(var(--primary))" },
  {
    segment: "Standard",
    count: 580,
    revenue: 35,
    color: "hsl(var(--secondary))",
  },
  { segment: "Basic", count: 380, revenue: 20, color: "hsl(var(--accent))" },
];

const satisfactionTrends = [
  { month: "Jan", satisfaction: 4.2, nps: 68 },
  { month: "Feb", satisfaction: 4.3, nps: 72 },
  { month: "Mar", satisfaction: 4.1, nps: 65 },
  { month: "Apr", satisfaction: 4.5, nps: 78 },
  { month: "May", satisfaction: 4.4, nps: 75 },
  { month: "Jun", satisfaction: 4.6, nps: 82 },
];

export default function Reports() {
  const [timeRange, setTimeRange] = useState("6months");
  const [reportType, setReportType] = useState("overview");

  const renderFinancialReports = () => (
    <>
      {/* Financial Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹52.95L</div>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="secondary" className="text-green-600 bg-green-50">
                +8.4%
              </Badge>
              <span className="text-xs text-muted-foreground">
                vs last period
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Profit Margin
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">30.2%</div>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="secondary" className="text-green-600 bg-green-50">
                +2.1%
              </Badge>
              <span className="text-xs text-muted-foreground">improvement</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Operating Expenses
            </CardTitle>
            <ChartBar className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹37.06L</div>
            <div className="flex items-center gap-1 mt-1">
              <Badge
                variant="secondary"
                className="text-orange-600 bg-orange-50"
              >
                +5.2%
              </Badge>
              <span className="text-xs text-muted-foreground">increase</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Cash Flow
            </CardTitle>
            <Activity className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹15.89L</div>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="secondary" className="text-green-600 bg-green-50">
                +12.3%
              </Badge>
              <span className="text-xs text-muted-foreground">
                positive flow
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue & Profit Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Profit Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  name="Revenue"
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={2}
                  name="Profit"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Expense Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="amount"
                >
                  {expenseBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-1 gap-2 mt-4">
              {expenseBreakdown.map((expense) => (
                <div key={expense.category} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: expense.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {expense.category}
                  </span>
                  <span className="text-sm font-medium ml-auto">
                    {expense.amount}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );

  const renderOperationalReports = () => (
    <>
      {/* Operational Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Resource Utilization
            </CardTitle>
            <Target className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">81.5%</div>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="secondary" className="text-green-600 bg-green-50">
                +5.2%
              </Badge>
              <span className="text-xs text-muted-foreground">
                efficiency gain
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Session Duration
            </CardTitle>
            <Clock className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">52 min</div>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="secondary" className="text-green-600 bg-green-50">
                -3 min
              </Badge>
              <span className="text-xs text-muted-foreground">optimized</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Equipment Uptime
            </CardTitle>
            <Zap className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96.8%</div>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="secondary" className="text-green-600 bg-green-50">
                +1.5%
              </Badge>
              <span className="text-xs text-muted-foreground">uptime</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Staff Productivity
            </CardTitle>
            <Users className="h-5 w-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.3%</div>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="secondary" className="text-green-600 bg-green-50">
                +4.1%
              </Badge>
              <span className="text-xs text-muted-foreground">
                productivity
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Operational Efficiency */}
        <Card>
          <CardHeader>
            <CardTitle>Operational Efficiency Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={operationalMetrics}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="utilization"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  name="Utilization %"
                />
                <Line
                  type="monotone"
                  dataKey="efficiency"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={2}
                  name="Efficiency %"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Service Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Service Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {servicePerformance.map((service) => (
                <div key={service.service} className="p-4 rounded-lg border">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{service.service}</h4>
                    <span className="text-sm text-muted-foreground">
                      {service.bookings} sessions
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">
                        Avg Duration:
                      </span>
                      <span className="ml-2 font-medium">
                        {service.avgDuration} min
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Satisfaction:
                      </span>
                      <span className="ml-2 font-medium">
                        {service.satisfaction}/5
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );

  const renderCustomerReports = () => (
    <>
      {/* Customer Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Customer Satisfaction
            </CardTitle>
            <UserCheck className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.4/5</div>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="secondary" className="text-green-600 bg-green-50">
                +0.3
              </Badge>
              <span className="text-xs text-muted-foreground">improvement</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Net Promoter Score
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75</div>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="secondary" className="text-green-600 bg-green-50">
                +8
              </Badge>
              <span className="text-xs text-muted-foreground">points</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Customer Lifetime Value
            </CardTitle>
            <DollarSign className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹18,450</div>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="secondary" className="text-green-600 bg-green-50">
                +12.8%
              </Badge>
              <span className="text-xs text-muted-foreground">growth</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Repeat Rate
            </CardTitle>
            <Activity className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68.2%</div>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="secondary" className="text-green-600 bg-green-50">
                +5.4%
              </Badge>
              <span className="text-xs text-muted-foreground">retention</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Segments */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Segments</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={customerSegments}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {customerSegments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-1 gap-2 mt-4">
              {customerSegments.map((segment) => (
                <div
                  key={segment.segment}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: segment.color }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {segment.segment}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">{segment.count}</span>
                    <span className="text-muted-foreground ml-2">
                      ({segment.revenue}% revenue)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Satisfaction Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Satisfaction & NPS Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={satisfactionTrends}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="satisfaction"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  name="Satisfaction"
                />
                <Line
                  type="monotone"
                  dataKey="nps"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={2}
                  name="NPS Score"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Reports & Analytics
          </h1>
          <p className="text-slate-600">
            Comprehensive insights and performance metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export CSV</Button>
          <Button variant="outline">Export PDF</Button>
          <Button>Schedule Report</Button>
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

      {/* Render content based on report type */}
      {reportType === "overview" && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Session Completion Rate
                </CardTitle>
                <Calendar className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.2%</div>
                <div className="flex items-center gap-1 mt-1">
                  <Badge
                    variant="secondary"
                    className="text-green-600 bg-green-50"
                  >
                    +2.3%
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    vs last period
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Monthly Churn Rate
                </CardTitle>
                <Users className="h-5 w-5 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.1%</div>
                <div className="flex items-center gap-1 mt-1">
                  <Badge
                    variant="secondary"
                    className="text-green-600 bg-green-50"
                  >
                    -1.2%
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    improvement
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Average Revenue per Client
                </CardTitle>
                <ChartBar className="h-5 w-5 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹742</div>
                <div className="flex items-center gap-1 mt-1">
                  <Badge
                    variant="secondary"
                    className="text-green-600 bg-green-50"
                  >
                    +5.8%
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    monthly growth
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Referral Rate
                </CardTitle>
                <Activity className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23.4%</div>
                <div className="flex items-center gap-1 mt-1">
                  <Badge
                    variant="secondary"
                    className="text-green-600 bg-green-50"
                  >
                    +4.1%
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    increase
                  </span>
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
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                    />
                    <XAxis dataKey="month" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="clients"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      name="Active Clients"
                    />
                    <Line
                      type="monotone"
                      dataKey="sessions"
                      stroke="hsl(var(--secondary))"
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
                      <span className="text-sm text-muted-foreground">
                        {city.name}
                      </span>
                      <span className="text-sm font-medium ml-auto">
                        {city.value}%
                      </span>
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
                        <span className="text-muted-foreground">
                          {service.service}
                        </span>
                        <span className="font-medium">
                          {service.count} sessions ({service.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
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
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                    />
                    <XAxis dataKey="cohort" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar
                      dataKey="retained"
                      fill="hsl(var(--primary))"
                      name="Retained %"
                    />
                    <Bar
                      dataKey="churned"
                      fill="hsl(var(--destructive))"
                      name="Churned %"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {reportType === "financial" && renderFinancialReports()}
      {reportType === "operational" && renderOperationalReports()}
      {reportType === "customer" && renderCustomerReports()}
    </div>
  );
}
