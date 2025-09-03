import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Plus, MapPin, Users, Calendar } from "lucide-react";
import TrainerProfileModal from "@/components/TrainerProfileModal";
import EditTrainerModal from "@/components/EditTrainerModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddTrainerModal from "@/components/AddTrainerModal";

const trainers = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    specialization: "Physiotherapist",
    cities: ["Mumbai", "Pune"],
    status: "Active",
    clients: 32,
    rating: 4.8,
    sessionsThisWeek: 28,
    certifications: ["DPT", "Geriatric Care"],
    joinDate: "2023-03-15",
    experience: "8 years",
  },
  {
    id: 2,
    name: "John Smith",
    specialization: "Fitness Trainer",
    cities: ["Delhi", "Gurgaon"],
    status: "Active",
    clients: 28,
    rating: 4.6,
    sessionsThisWeek: 25,
    certifications: ["ACSM", "Senior Fitness"],
    joinDate: "2023-01-20",
    experience: "6 years",
  },
  {
    id: 3,
    name: "Dr. Rajesh Kumar",
    specialization: "Nutritionist",
    cities: ["Bangalore"],
    status: "On Leave",
    clients: 24,
    rating: 4.9,
    sessionsThisWeek: 0,
    certifications: ["RD", "Clinical Nutrition"],
    joinDate: "2022-11-10",
    experience: "12 years",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    specialization: "Companion Trainer",
    cities: ["Chennai", "Coimbatore"],
    status: "Active",
    clients: 18,
    rating: 4.7,
    sessionsThisWeek: 22,
    certifications: ["Companion Care", "Dementia Support"],
    joinDate: "2023-06-05",
    experience: "4 years",
  },
];

export default function Trainers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAddTrainerModal, setShowAddTrainerModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [specializationFilter, setSpecializationFilter] = useState("all");

  const filteredTrainers = trainers.filter((trainer) => {
    const matchesSearch =
      trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      trainer.status.toLowerCase().replace(" ", "-") === statusFilter;
    const matchesSpecialization =
      specializationFilter === "all" ||
      trainer.specialization.toLowerCase().includes(specializationFilter);

    return matchesSearch && matchesStatus && matchesSpecialization;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return "default";
      case "On Leave":
        return "secondary";
      case "Blocked":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getSpecializationColor = (specialization: string) => {
    switch (specialization) {
      case "Physiotherapist":
        return "bg-blue-100 text-blue-600";
      case "Fitness Trainer":
        return "bg-green-100 text-green-600";
      case "Nutritionist":
        return "bg-orange-100 text-orange-600";
      case "Companion Trainer":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const handleViewProfile = (trainer: any) => {
    setSelectedTrainer({
      ...trainer,
      email: `${trainer.name.toLowerCase().replace(" ", ".")}@kinetic.com`,
      phone: "+91 98765 43210",
      joinDate: "2023-04-15",
      experience: "8 years of experience",
      certifications: [
        "Certified Physiotherapist",
        "Sports Medicine",
        "Senior Care Specialist",
      ],
      availability: "Full Time",
      languages: ["English", "Hindi", "Bengali"],
      activeClients: trainer.clients,
      totalSessions: trainer.sessionsThisWeek * 4,
      completedSessions: trainer.sessionsThisWeek * 3,
      specialty: trainer.specialization,
      location: trainer.cities[0],
      rating: trainer.rating,
    });
    setShowProfileModal(true);
  };

  const handleManageTrainer = (trainer: any) => {
    setSelectedTrainer({
      ...trainer,
      email: `${trainer.name.toLowerCase().replace(" ", ".")}@kinetic.com`,
      phone: "+91 98765 43210",
      experience: "8 years of experience",
      certifications: [
        "Certified Physiotherapist",
        "Sports Medicine",
        "Senior Care Specialist",
      ],
      availability: "Full Time",
      languages: ["English", "Hindi", "Bengali"],
      specialty: trainer.specialization,
      location: trainer.cities[0],
    });
    setShowEditModal(true);
  };

  const handleAddTrainer = () => {
    setShowAddTrainerModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Trainer Management
          </h1>
          <p className="text-slate-600">
            Manage physiotherapists, fitness trainers, and specialists
          </p>
        </div>
        <Button
          onClick={() => handleAddTrainer()}
          className="bg-sky-500 hover:bg-sky-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Trainer
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                size={16}
              />
              <Input
                placeholder="Search trainers by name or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="on-leave">On Leave</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={specializationFilter}
              onValueChange={setSpecializationFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specializations</SelectItem>
                <SelectItem value="physiotherapist">Physiotherapist</SelectItem>
                <SelectItem value="fitness">Fitness Trainer</SelectItem>
                <SelectItem value="nutritionist">Nutritionist</SelectItem>
                <SelectItem value="companion">Companion Trainer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Trainer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTrainers.map((trainer) => (
          <Card
            key={trainer.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-sky-100 text-sky-600">
                      {trainer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{trainer.name}</CardTitle>
                    <div
                      className={`text-xs px-2 py-1 rounded-full inline-block ${getSpecializationColor(
                        trainer.specialization
                      )}`}
                    >
                      {trainer.specialization}
                    </div>
                  </div>
                </div>
                <Badge variant={getStatusBadge(trainer.status)}>
                  {trainer.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="h-4 w-4" />
                <span>{trainer.cities.join(", ")}</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Active Clients:</span>
                  <span className="font-medium flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {trainer.clients}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Rating:</span>
                  <span className="font-medium">{trainer.rating}/5.0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">This Week:</span>
                  <span className="font-medium flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {trainer.sessionsThisWeek} sessions
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Experience:</span>
                  <span className="font-medium">{trainer.experience}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-slate-600">Certifications:</p>
                <div className="flex flex-wrap gap-1">
                  {trainer.certifications.map((cert, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleViewProfile(trainer)}
                >
                  View Profile
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-sky-500 hover:bg-sky-600"
                  onClick={() => handleManageTrainer(trainer)}
                >
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTrainers.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-slate-500">
              No trainers found matching your criteria.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setSpecializationFilter("all");
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      <AddTrainerModal
        open={showAddTrainerModal}
        onOpenChange={setShowAddTrainerModal}
      />

      <TrainerProfileModal
        open={showProfileModal}
        onOpenChange={setShowProfileModal}
        trainer={selectedTrainer}
      />

      <EditTrainerModal
        open={showEditModal}
        onOpenChange={setShowEditModal}
        trainer={selectedTrainer}
      />
    </div>
  );
}
