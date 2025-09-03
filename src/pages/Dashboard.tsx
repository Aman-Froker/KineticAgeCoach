import React, { useState } from "react";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Activity, Clock } from "lucide-react";
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
} from "recharts";
import { AlertDetailsModal } from "@/components/AlertDetailsModal";

const sessionData = [
  { name: "Mon", completed: 24, scheduled: 28 },
  { name: "Tue", completed: 32, scheduled: 35 },
  { name: "Wed", completed: 28, scheduled: 30 },
  { name: "Thu", completed: 35, scheduled: 38 },
  { name: "Fri", completed: 29, scheduled: 32 },
  { name: "Sat", completed: 18, scheduled: 20 },
  { name: "Sun", completed: 15, scheduled: 18 },
];

const satisfactionData = [
  { month: "Jan", score: 4.2 },
  { month: "Feb", score: 4.3 },
  { month: "Mar", score: 4.1 },
  { month: "Apr", score: 4.4 },
  { month: "May", score: 4.5 },
  { month: "Jun", score: 4.6 },
];

const alerts = [
  {
    id: 1,
    type: "health",
    message: "Client John Doe missed 3 consecutive sessions",
    priority: "high" as const,
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "scheduling",
    message: "Double booking detected for Trainer Sarah Smith",
    priority: "medium" as const,
    time: "4 hours ago",
  },
  {
    id: 3,
    type: "complaint",
    message: "Client complaint about nutritionist consultation",
    priority: "high" as const,
    time: "6 hours ago",
  },
  {
    id: 4,
    type: "system",
    message: "Payment failure for 3 clients - auto-retry scheduled",
    priority: "low" as const,
    time: "1 day ago",
  },
];

export default function Dashboard() {
  const [selectedAlert, setSelectedAlert] = useState<(typeof alerts)[0] | null>(
    null
  );
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const handleViewAlertDetails = (alert: (typeof alerts)[0]) => {
    setSelectedAlert(alert);
    setIsAlertModalOpen(true);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-600">
            Overview of Kinetic Age platform metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Export Report
          </Button>
          <Button size="sm" className="bg-sky-500 hover:bg-sky-600">
            View Details
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Clients"
          value="1,247"
          change="+12% from last month"
          changeType="positive"
          icon={Users}
          iconColor="text-sky-500"
        />
        <MetricCard
          title="Active Trainers"
          value="89"
          change="+3 new this week"
          changeType="positive"
          icon={Users}
          iconColor="text-green-500"
        />
        <MetricCard
          title="Today's Sessions"
          value="156"
          change="23 completed, 133 scheduled"
          changeType="neutral"
          icon={Calendar}
          iconColor="text-blue-500"
        />
        <MetricCard
          title="Client Satisfaction"
          value="4.6/5"
          change="+0.1 from last month"
          changeType="positive"
          icon={Activity}
          iconColor="text-emerald-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Session Completion Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-sky-500" />
              Weekly Session Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sessionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="completed" fill="#0ea5e9" name="Completed" />
                <Bar dataKey="scheduled" fill="#e2e8f0" name="Scheduled" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Satisfaction Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-emerald-500" />
              Client Satisfaction Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={satisfactionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis domain={[3.5, 5]} stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Alerts and Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-500" />
            Recent Alerts & Issues
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Badge
                    variant={
                      alert.priority === "high"
                        ? "destructive"
                        : alert.priority === "medium"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {alert.priority.toUpperCase()}
                  </Badge>
                  <div>
                    <p className="font-medium text-slate-900">
                      {alert.message}
                    </p>
                    <p className="text-sm text-slate-500">{alert.time}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewAlertDetails(alert)}
                >
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <AlertDetailsModal
        alert={selectedAlert}
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
      />
    </div>
  );
}
