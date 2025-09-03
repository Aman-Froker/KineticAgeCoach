import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Heart, 
  UserCheck,
  Clock,
  Activity
} from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  location: string;
  trainer: string;
  subscription: string;
  status: string;
  joinDate: string;
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  medicalConditions?: string;
  totalSessions?: number;
  completedSessions?: number;
  upcomingSessions?: number;
}

interface ClientProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: Client | null;
}

export default function ClientProfileModal({ open, onOpenChange, client }: ClientProfileModalProps) {
  if (!client) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Inactive': return 'secondary';
      case 'Suspended': return 'destructive';
      default: return 'secondary';
    }
  };

  const getSubscriptionBadge = (subscription: string) => {
    switch (subscription) {
      case 'Premium': return 'default';
      case 'Standard': return 'secondary';
      case 'Trial': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Client Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-sky-100 text-sky-600 text-lg">
                {client.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{client.name}</h2>
                  <p className="text-slate-600">{client.age} years old</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant={getStatusBadge(client.status)}>
                    {client.status}
                  </Badge>
                  <Badge variant={getSubscriptionBadge(client.subscription)}>
                    {client.subscription}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-600">Email</p>
                    <p className="font-medium">{client.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-600">Phone</p>
                    <p className="font-medium">{client.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-600">Location</p>
                    <p className="font-medium">{client.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-600">Join Date</p>
                    <p className="font-medium">{client.joinDate}</p>
                  </div>
                </div>
              </div>

              {client.address && (
                <div className="flex items-start gap-3 pt-2">
                  <MapPin className="h-4 w-4 text-slate-500 mt-1" />
                  <div>
                    <p className="text-sm text-slate-600">Address</p>
                    <p className="font-medium">{client.address}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          {(client.emergencyContact || client.emergencyPhone) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  Emergency Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {client.emergencyContact && (
                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-slate-500" />
                      <div>
                        <p className="text-sm text-slate-600">Contact Name</p>
                        <p className="font-medium">{client.emergencyContact}</p>
                      </div>
                    </div>
                  )}
                  
                  {client.emergencyPhone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-slate-500" />
                      <div>
                        <p className="text-sm text-slate-600">Contact Phone</p>
                        <p className="font-medium">{client.emergencyPhone}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Medical Information */}
          {client.medicalConditions && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Medical Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm text-slate-600 mb-1">Medical Conditions</p>
                  <p className="font-medium">{client.medicalConditions}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Session Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Session Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {client.totalSessions || 0}
                  </div>
                  <p className="text-sm text-slate-600">Total Sessions</p>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {client.completedSessions || 0}
                  </div>
                  <p className="text-sm text-slate-600">Completed</p>
                </div>
                
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {client.upcomingSessions || 0}
                  </div>
                  <p className="text-sm text-slate-600">Upcoming</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trainer Assignment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                Trainer Assignment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-green-100 text-green-600">
                    {client.trainer.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{client.trainer}</p>
                  <p className="text-sm text-slate-600">Assigned Trainer</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}