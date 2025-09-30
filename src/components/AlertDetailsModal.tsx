import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  Calendar,
  User,
  FileText,
  Clock,
  CheckCircle,
  X,
  ExternalLink,
} from "lucide-react";

interface Alert {
  id: number;
  type: string;
  message: string;
  priority: "high" | "medium" | "low";
  time: string;
}

interface AlertDetailsModalProps {
  alert: Alert | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AlertDetailsModal({
  alert,
  isOpen,
  onClose,
}: AlertDetailsModalProps) {
  if (!alert) return null;

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "health":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "scheduling":
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case "complaint":
        return <User className="h-5 w-5 text-orange-500" />;
      case "system":
        return <FileText className="h-5 w-5 text-gray-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getDetailedInfo = (alert: Alert) => {
    switch (alert.type) {
      case "health":
        return {
          description:
            "A client has missed multiple consecutive sessions, which may indicate health issues or disengagement.",
          affectedEntity: "John Doe (Client ID: #1247)",
          location: "Downtown Fitness Center",
          lastActivity: "3 days ago - Last completed session",
          recommendedAction:
            "Contact client immediately to check on their wellbeing and reschedule sessions.",
          additionalInfo:
            "Client has been active for 8 months with 95% attendance rate prior to this incident.",
        };
      case "scheduling":
        return {
          description:
            "A trainer has been double-booked for the same time slot, causing scheduling conflicts.",
          affectedEntity: "Sarah Smith (Trainer ID: #089)",
          location: "Multiple locations - Gym Floor A & Private Room 3",
          lastActivity: "Today at 2:00 PM - Conflicting appointments",
          recommendedAction:
            "Reschedule one of the sessions and notify affected clients.",
          additionalInfo:
            "Both sessions are with premium clients. Consider offering compensation for the inconvenience.",
        };
      case "complaint":
        return {
          description:
            "A client has filed a formal complaint regarding their nutritionist consultation experience.",
          affectedEntity: "Anonymous Client (Complaint #C-2024-156)",
          location: "Nutrition Consultation Room B",
          lastActivity: "6 hours ago - Complaint submitted",
          recommendedAction:
            "Schedule immediate review meeting with nutritionist and follow up with client.",
          additionalInfo:
            "This is the first complaint for this nutritionist in the past 12 months.",
        };
      case "system":
        return {
          description:
            "Multiple payment processing failures detected. Auto-retry mechanism has been activated.",
          affectedEntity: "3 Clients - Payment Processing System",
          location: "System-wide payment gateway",
          lastActivity: "1 day ago - Failed payment attempts",
          recommendedAction:
            "Monitor retry attempts and contact clients if payments continue to fail.",
          additionalInfo:
            "Payment gateway reported 99.2% uptime this month. This appears to be an isolated incident.",
        };
      default:
        return {
          description: "Alert details are being processed.",
          affectedEntity: "Unknown",
          location: "N/A",
          lastActivity: "N/A",
          recommendedAction:
            "Please review the alert and take appropriate action.",
          additionalInfo:
            "Contact system administrator if this alert persists.",
        };
    }
  };

  const details = getDetailedInfo(alert);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {getAlertIcon(alert.type)}
            Alert Details -{" "}
            {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Alert Summary */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Alert Summary</CardTitle>
                <Badge
                  variant={
                    alert.priority === "high"
                      ? "destructive"
                      : alert.priority === "medium"
                      ? "default"
                      : "secondary"
                  }
                >
                  {alert.priority.toUpperCase()} PRIORITY
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-700">{alert.message}</p>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Clock className="h-4 w-4" />
                Reported: {alert.time}
              </div>
            </CardContent>
          </Card>

          {/* Detailed Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Detailed Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">
                  Description
                </h4>
                <p className="text-slate-700">{details.description}</p>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Affected Entity
                  </h4>
                  <p className="text-slate-700">{details.affectedEntity}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Location
                  </h4>
                  <p className="text-slate-700">{details.location}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2">
                  Last Activity
                </h4>
                <p className="text-slate-700">{details.lastActivity}</p>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Recommended Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-700">{details.recommendedAction}</p>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Additional Information
                </h4>
                <p className="text-blue-800 text-sm">
                  {details.additionalInfo}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button className="flex-1">
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark as Resolved
            </Button>
            <Button variant="outline" className="flex-1">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Related Records
            </Button>
            <Button variant="outline" className="flex-1">
              <User className="h-4 w-4 mr-2" />
              Assign to Team Member
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
