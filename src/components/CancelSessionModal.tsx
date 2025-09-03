import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, MapPin, AlertTriangle } from "lucide-react";

interface SessionToCancelProps {
  id: string | number;
  client: string;
  trainer: string;
  date: string;
  time: string;
  type: string;
  location: string;
  duration: number;
}

interface CancelSessionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: SessionToCancelProps | null;
  onConfirmCancel: (sessionId: string | number) => void;
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "Physiotherapy":
      return "bg-blue-100 text-blue-600";
    case "Fitness Training":
      return "bg-green-100 text-green-600";
    case "Nutrition Consultation":
      return "bg-orange-100 text-orange-600";
    case "Companion Care":
      return "bg-purple-100 text-purple-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default function CancelSessionModal({
  open,
  onOpenChange,
  session,
  onConfirmCancel,
}: CancelSessionModalProps) {
  if (!session) return null;

  const handleConfirmCancel = () => {
    onConfirmCancel(session.id);
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[700px]">
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <AlertDialogTitle className="text-left">
                Cancel Session
              </AlertDialogTitle>
              <AlertDialogDescription className="text-left">
                Are you sure you want to cancel this scheduled session? This
                action cannot be undone.
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>

        {/* Session Details */}
        <div className="my-4 rounded-lg border bg-gray-50 p-4">
          <div className="space-y-3">
            {/* Client and Session Type */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="font-medium text-gray-900">
                  {session.client}
                </span>
              </div>
              <div
                className={`text-xs px-2 py-1 rounded-full ${getTypeColor(
                  session.type
                )}`}
              >
                {session.type}
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">{session.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">
                  {session.time} ({session.duration} min)
                </span>
              </div>
            </div>

            {/* Trainer and Location */}
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">
                  <span className="font-medium">Trainer:</span>{" "}
                  {session.trainer}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">
                  <span className="font-medium">Location:</span>{" "}
                  {session.location}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Warning Message */}
        <div className="flex items-start gap-3 rounded-lg bg-amber-50 border border-amber-200 p-3">
          <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-amber-800">
            <p className="font-medium mb-1">Important:</p>
            <p>
              Please ensure to notify the client and trainer about this
              cancellation. Consider rescheduling if this is a critical session.
            </p>
          </div>
        </div>

        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel className="mt-0">Keep Session</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmCancel}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            Yes, Cancel Session
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
