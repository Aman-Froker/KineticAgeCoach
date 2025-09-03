
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Send, Users, MessageSquare, Bell, Calendar } from 'lucide-react';

const recentCommunications = [
  {
    id: 'COMM-001',
    type: 'Announcement',
    subject: 'New Yoga Classes Available',
    recipients: 'All Clients in Mumbai',
    sentAt: '2024-01-15 10:30',
    status: 'Delivered',
    openRate: '85%'
  },
  {
    id: 'COMM-002',
    type: 'Reminder',
    subject: 'Session Reminder - Tomorrow 3 PM',
    recipients: 'Individual Client',
    sentAt: '2024-01-14 18:00',
    status: 'Delivered',
    openRate: '100%'
  },
  {
    id: 'COMM-003',
    type: 'Promotional',
    subject: 'Special Discount on Annual Plans',
    recipients: 'All Active Clients',
    sentAt: '2024-01-13 09:00',
    status: 'Delivered',
    openRate: '72%'
  }
];

const templates = [
  { id: 1, name: 'Session Reminder', type: 'Reminder' },
  { id: 2, name: 'Welcome New Client', type: 'Welcome' },
  { id: 3, name: 'Monthly Newsletter', type: 'Newsletter' },
  { id: 4, name: 'Payment Reminder', type: 'Billing' },
  { id: 5, name: 'Trainer Introduction', type: 'Introduction' }
];

export default function Communications() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Communications</h1>
          <p className="text-slate-600">Manage client and trainer communications</p>
        </div>
      </div>

      <Tabs defaultValue="send" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="send">Send Communication</TabsTrigger>
          <TabsTrigger value="history">Communication History</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="send" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5 text-sky-500" />
                Send New Communication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Communication Type
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="announcement">Announcement</SelectItem>
                      <SelectItem value="reminder">Reminder</SelectItem>
                      <SelectItem value="promotional">Promotional</SelectItem>
                      <SelectItem value="notification">Notification</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Recipients
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select recipients" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-clients">All Clients</SelectItem>
                      <SelectItem value="all-trainers">All Trainers</SelectItem>
                      <SelectItem value="city-mumbai">Mumbai Clients</SelectItem>
                      <SelectItem value="city-delhi">Delhi Clients</SelectItem>
                      <SelectItem value="active-clients">Active Clients Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Subject
                </label>
                <Input placeholder="Enter communication subject" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Message
                </label>
                <Textarea 
                  placeholder="Enter your message here..."
                  className="min-h-32"
                />
              </div>
              
              <div className="flex gap-2">
                <Button className="bg-sky-500 hover:bg-sky-600">
                  <Send className="h-4 w-4 mr-2" />
                  Send Now
                </Button>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule
                </Button>
                <Button variant="outline">Save as Draft</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-sky-500" />
                Communication History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCommunications.map((comm) => (
                  <div key={comm.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium text-slate-900">{comm.subject}</h4>
                        <Badge variant="outline">{comm.type}</Badge>
                        <Badge variant="secondary">{comm.status}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span>To: {comm.recipients}</span>
                        <span>Sent: {comm.sentAt}</span>
                        <span>Open Rate: {comm.openRate}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="outline" size="sm">Resend</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-sky-500" />
                  Message Templates
                </CardTitle>
                <Button className="bg-sky-500 hover:bg-sky-600">
                  Create Template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <Card key={template.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-slate-900">{template.name}</h4>
                        <Badge variant="outline">{template.type}</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Use</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
