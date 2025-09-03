
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Plus, Clock, User, AlertTriangle } from 'lucide-react';

const incidents = [
  {
    id: 'INC-001',
    title: 'Client reported trainer was late',
    type: 'Service Issue',
    priority: 'Medium',
    status: 'Open',
    reporter: 'John Smith (Client)',
    assignedTo: 'Support Team A',
    createdAt: '2024-01-15 09:30',
    description: 'Client John Smith reported that trainer Sarah was 15 minutes late for the scheduled session.'
  },
  {
    id: 'INC-002',
    title: 'Equipment malfunction during physio session',
    type: 'Equipment',
    priority: 'High',
    status: 'In Progress',
    reporter: 'Dr. Kumar (Physiotherapist)',
    assignedTo: 'Technical Team',
    createdAt: '2024-01-14 14:20',
    description: 'Resistance band equipment broke during client session, causing minor disruption.'
  },
  {
    id: 'INC-003',
    title: 'Billing discrepancy',
    type: 'Billing',
    priority: 'Low',
    status: 'Resolved',
    reporter: 'Mary Johnson (Client)',
    assignedTo: 'Finance Team',
    createdAt: '2024-01-13 11:15',
    description: 'Client was charged twice for the same session. Issue resolved with refund processed.'
  },
  {
    id: 'INC-004',
    title: 'Trainer no-show without notice',
    type: 'Service Issue',
    priority: 'High',
    status: 'Open',
    reporter: 'System Alert',
    assignedTo: 'Operations Team',
    createdAt: '2024-01-12 16:45',
    description: 'Trainer Mike failed to show up for scheduled session without prior notice.'
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'High': return 'destructive';
    case 'Medium': return 'default';
    case 'Low': return 'secondary';
    default: return 'secondary';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Open': return 'destructive';
    case 'In Progress': return 'default';
    case 'Resolved': return 'secondary';
    default: return 'secondary';
  }
};

export default function Incidents() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Incident Management</h1>
          <p className="text-slate-600">Track and resolve platform incidents</p>
        </div>
        <Button className="bg-sky-500 hover:bg-sky-600">
          <Plus className="h-4 w-4 mr-2" />
          New Incident
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
              <Input
                placeholder="Search incidents..."
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="service">Service Issue</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
                <SelectItem value="billing">Billing</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Incidents List */}
      <div className="space-y-4">
        {incidents.map((incident) => (
          <Card key={incident.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-slate-900">{incident.id}</h3>
                    <Badge variant={getPriorityColor(incident.priority)}>
                      {incident.priority}
                    </Badge>
                    <Badge variant={getStatusColor(incident.status)}>
                      {incident.status}
                    </Badge>
                    <Badge variant="outline">{incident.type}</Badge>
                  </div>
                  <h4 className="text-lg font-medium text-slate-800 mb-2">{incident.title}</h4>
                  <p className="text-slate-600 mb-4">{incident.description}</p>
                  <div className="flex items-center gap-6 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>Reporter: {incident.reporter}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4" />
                      <span>Assigned: {incident.assignedTo}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{incident.createdAt}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm" className="bg-sky-500 hover:bg-sky-600">
                    Update
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
