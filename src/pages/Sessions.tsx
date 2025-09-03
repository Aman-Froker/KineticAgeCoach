import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Calendar,
  Clock,
  Users,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ScheduleSessionModal, {
  SessionData,
} from "@/components/ScheduleSessionModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import CancelSessionModal from "@/components/CancelSessionModal";

const sessions = [
  {
    id: 1,
    time: "09:00",
    duration: 60,
    client: "Margaret Johnson",
    trainer: "Dr. Priya Sharma",
    type: "Physiotherapy",
    status: "Scheduled",
    location: "Mumbai",
  },
  {
    id: 2,
    time: "10:30",
    duration: 45,
    client: "Robert Chen",
    trainer: "John Smith",
    type: "Fitness Training",
    status: "Completed",
    location: "Delhi",
  },
  {
    id: 3,
    time: "11:00",
    duration: 30,
    client: "Eleanor Davis",
    trainer: "Dr. Rajesh Kumar",
    type: "Nutrition Consultation",
    status: "No Show",
    location: "Bangalore",
  },
  {
    id: 4,
    time: "14:00",
    duration: 60,
    client: "William Thompson",
    trainer: "Sarah Wilson",
    type: "Companion Care",
    status: "Scheduled",
    location: "Chennai",
  },
  {
    id: 5,
    time: "15:30",
    duration: 45,
    client: "Alice Kumar",
    trainer: "Dr. Priya Sharma",
    type: "Physiotherapy",
    status: "In Progress",
    location: "Mumbai",
  },
];

const clients = [
  { id: "1", name: "Margaret Johnson" },
  { id: "2", name: "Robert Chen" },
  { id: "3", name: "Eleanor Davis" },
  { id: "4", name: "William Thompson" },
  { id: "5", name: "Alice Kumar" },
];

const trainers = [
  { id: "1", name: "Dr. Priya Sharma", type: "Physiotherapy" },
  { id: "2", name: "John Smith", type: "Fitness Training" },
  { id: "3", name: "Dr. Rajesh Kumar", type: "Nutrition Consultation" },
  { id: "4", name: "Sarah Wilson", type: "Companion Care" },
];

const timeSlots = Array.from({ length: 12 }, (_, i) => {
  const hour = 9 + i;
  return `${hour.toString().padStart(2, "0")}:00`;
});

export default function Sessions() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewType, setViewType] = useState("day");
  const [cityFilter, setCityFilter] = useState("all");
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [existingSession, setExistingSession] = useState<SessionData | null>(
    null
  );
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [sessionToCancel, setSessionToCancel] = useState(null);
  const { toast } = useToast(); // If not already declared

  const handleCancelSession = (sessionId: string | number) => {
    // Here you would typically make an API call to cancel the session
    console.log("Cancelling session:", sessionId);

    // Update the session status in your state/API
    // For now, just show a success toast
    const session = sessions.find((s) => s.id === sessionId);
    toast({
      title: "Session Cancelled",
      description: `Session for ${session?.client} has been cancelled successfully.`,
      variant: "destructive",
    });

    // You might want to refresh your sessions data here
    // or update the local state to reflect the cancellation
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return "default";
      case "Scheduled":
        return "secondary";
      case "In Progress":
        return "default";
      case "No Show":
        return "destructive";
      case "Cancelled":
        return "secondary";
      default:
        return "secondary";
    }
  };

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

  const convertSessionToEditFormat = (session: any): SessionData => {
    // Find the corresponding IDs from the mock data in the modal
    const clientId = clients.find((c) => c.name === session.client)?.id || "1";
    const trainerId =
      trainers.find((t) => t.name === session.trainer)?.id || "1";

    return {
      id: session.id.toString(),
      clientId,
      trainerId,
      date: new Date(), // Use selectedDate or current date
      time: session.time,
      sessionType: session.type,
      duration: session.duration.toString(),
      location: session.location,
      notes: "", // Add notes field if available in your session data
    };
  };

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + (direction === "next" ? 1 : -1));
    setSelectedDate(newDate);
  };

  const filteredSessions = sessions.filter(
    (session) => cityFilter === "all" || session.location === cityFilter
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Session Scheduling
          </h1>
          <p className="text-slate-600">
            Manage appointments and track session status
          </p>
        </div>
        <Button
          className="bg-sky-500 hover:bg-sky-600"
          onClick={() => setShowScheduleModal(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Schedule Session
        </Button>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateDate("prev")}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-lg font-semibold min-w-[240px] text-center">
                  {formatDate(selectedDate)}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateDate("next")}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedDate(new Date())}
              >
                Today
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <Select value={cityFilter} onValueChange={setCityFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                  <SelectItem value="Bangalore">Bangalore</SelectItem>
                  <SelectItem value="Chennai">Chennai</SelectItem>
                </SelectContent>
              </Select>

              <Select value={viewType} onValueChange={setViewType}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Day View</SelectItem>
                  <SelectItem value="week">Week View</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Session Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Time Slots */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-slate-600">
                Time Slots
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {timeSlots.map((time) => (
                <div
                  key={time}
                  className="flex items-center justify-between p-2 text-sm text-slate-600 hover:bg-slate-50 rounded"
                >
                  <span>{time}</span>
                  <Clock className="h-3 w-3" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sessions */}
        <div className="lg:col-span-3">
          <div className="space-y-4">
            {filteredSessions.map((session) => (
              <Card
                key={session.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-slate-900">
                          {session.time}
                        </div>
                        <div className="text-xs text-slate-500">
                          {session.duration}min
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-sky-100 text-sky-600">
                            {session.client
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-slate-900">
                            {session.client}
                          </div>
                          <div className="text-sm text-slate-600">
                            {session.trainer}
                          </div>
                          <div className="text-xs text-slate-500">
                            {session.location}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div
                        className={`text-xs px-2 py-1 rounded-full ${getTypeColor(
                          session.type
                        )}`}
                      >
                        {session.type}
                      </div>
                      <Badge variant={getStatusBadge(session.status)}>
                        {session.status}
                      </Badge>
                      <div className="flex gap-1">
                        <Button
                          onClick={() => {
                            const editSession =
                              convertSessionToEditFormat(session);
                            setExistingSession(editSession);
                            setIsEditModalOpen(true);
                          }}
                          size="sm"
                          variant="outline"
                        >
                          Edit
                        </Button>
                        {session.status === "Scheduled" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSessionToCancel({
                                id: session.id,
                                client: session.client,
                                trainer: session.trainer,
                                date: formatDate(selectedDate),
                                time: session.time,
                                type: session.type,
                                location: session.location,
                                duration: session.duration,
                              });
                              setShowCancelModal(true);
                            }}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Session Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-slate-900">12</div>
            <div className="text-sm text-slate-600">Total Sessions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">8</div>
            <div className="text-sm text-slate-600">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">3</div>
            <div className="text-sm text-slate-600">Scheduled</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">1</div>
            <div className="text-sm text-slate-600">No Show</div>
          </CardContent>
        </Card>
      </div>

      <CancelSessionModal
        open={showCancelModal}
        onOpenChange={setShowCancelModal}
        session={sessionToCancel}
        onConfirmCancel={handleCancelSession}
      />
      <ScheduleSessionModal
        open={showScheduleModal || isEditModalOpen}
        onOpenChange={(open) => {
          if (isEditModalOpen) {
            setIsEditModalOpen(open);
            if (!open) setExistingSession(null);
          } else {
            setShowScheduleModal(open);
          }
        }}
        mode={isEditModalOpen ? "edit" : "create"}
        sessionToEdit={isEditModalOpen ? existingSession : null}
      />
    </div>
  );
}
