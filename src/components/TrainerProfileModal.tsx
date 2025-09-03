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
  Award,
  Users,
  Clock,
  Activity,
  Star
} from 'lucide-react';

interface Trainer {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  location: string;
  status: string;
  rating: number;
  joinDate: string;
  experience?: string;
  certifications?: string[];
  activeClients?: number;
  totalSessions?: number;
  completedSessions?: number;
  availability?: string;
  languages?: string[];
}

interface TrainerProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trainer: Trainer | null;
}

export default function TrainerProfileModal({ open, onOpenChange, trainer }: TrainerProfileModalProps) {
  if (!trainer) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return 'default';
      case 'On Leave': return 'secondary';
      case 'Inactive': return 'destructive';
      default: return 'secondary';
    }
  };

  const getSpecialtyColor = (specialty: string) => {
    switch (specialty) {
      case 'Physiotherapy': return 'bg-blue-100 text-blue-600';
      case 'Fitness Training': return 'bg-green-100 text-green-600';
      case 'Nutrition': return 'bg-orange-100 text-orange-600';
      case 'Companion Care': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Trainer Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-green-100 text-green-600 text-lg">
                {trainer.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{trainer.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${getSpecialtyColor(trainer.specialty)}`}>
                      {trainer.specialty}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex">
                      {renderStars(trainer.rating)}
                    </div>
                    <span className="text-sm text-slate-600">
                      {trainer.rating}/5 ({trainer.completedSessions || 0} sessions)
                    </span>
                  </div>
                </div>
                <Badge variant={getStatusBadge(trainer.status)}>
                  {trainer.status}
                </Badge>
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
                    <p className="font-medium">{trainer.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-600">Phone</p>
                    <p className="font-medium">{trainer.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-600">Location</p>
                    <p className="font-medium">{trainer.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  <div>
                    <p className="text-sm text-slate-600">Join Date</p>
                    <p className="font-medium">{trainer.joinDate}</p>
                  </div>
                </div>
              </div>

              {trainer.languages && trainer.languages.length > 0 && (
                <div className="flex items-start gap-3 pt-2">
                  <User className="h-4 w-4 text-slate-500 mt-1" />
                  <div>
                    <p className="text-sm text-slate-600">Languages</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {trainer.languages.map((lang, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Professional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {trainer.experience && (
                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-slate-500 mt-1" />
                  <div>
                    <p className="text-sm text-slate-600">Experience</p>
                    <p className="font-medium">{trainer.experience}</p>
                  </div>
                </div>
              )}

              {trainer.availability && (
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 text-slate-500 mt-1" />
                  <div>
                    <p className="text-sm text-slate-600">Availability</p>
                    <p className="font-medium">{trainer.availability}</p>
                  </div>
                </div>
              )}

              {trainer.certifications && trainer.certifications.length > 0 && (
                <div className="flex items-start gap-3">
                  <Award className="h-4 w-4 text-slate-500 mt-1" />
                  <div>
                    <p className="text-sm text-slate-600">Certifications</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {trainer.certifications.map((cert, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Performance Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Performance Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {trainer.activeClients || 0}
                  </div>
                  <p className="text-sm text-slate-600">Active Clients</p>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {trainer.completedSessions || 0}
                  </div>
                  <p className="text-sm text-slate-600">Completed Sessions</p>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {trainer.totalSessions || 0}
                  </div>
                  <p className="text-sm text-slate-600">Total Sessions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rating Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Rating & Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-yellow-500">
                    {trainer.rating}
                  </div>
                  <div>
                    <div className="flex">
                      {renderStars(trainer.rating)}
                    </div>
                    <p className="text-sm text-slate-600 mt-1">
                      Based on {trainer.completedSessions || 0} sessions
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}