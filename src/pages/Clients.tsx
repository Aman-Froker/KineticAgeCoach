import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Filter, Plus, MapPin, Calendar } from "lucide-react";
import AddClientModal from "@/components/AddClientModal";
import ClientProfileModal from "@/components/ClientProfileModal";
import EditClientModal from "@/components/EditClientModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const clients = [
  {
    id: 1,
    name: "Margaret Johnson",
    age: 68,
    city: "Whitefield",
    trainer: "Dr. Priya Sharma",
    subscription: "Premium",
    status: "Active",
    sessions: 24,
    lastSession: "2024-01-15",
    satisfaction: 4.8,
    health: "Good",
  },
  {
    id: 2,
    name: "Robert Chen",
    age: 72,
    city: "Koramangala",
    trainer: "John Smith",
    subscription: "Basic",
    status: "Active",
    sessions: 18,
    lastSession: "2024-01-14",
    satisfaction: 4.5,
    health: "Needs Attention",
  },
  {
    id: 3,
    name: "Eleanor Davis",
    age: 65,
    city: "RajajiNagar",
    trainer: "Dr. Rajesh Kumar",
    subscription: "Premium",
    status: "Inactive",
    sessions: 12,
    lastSession: "2024-01-08",
    satisfaction: 4.2,
    health: "Good",
  },
  {
    id: 4,
    name: "William Thompson",
    age: 71,
    city: "Electronic City",
    trainer: "Sarah Wilson",
    subscription: "Trial",
    status: "Active",
    sessions: 3,
    lastSession: "2024-01-16",
    satisfaction: 5.0,
    health: "Excellent",
  },
];

export default function Clients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.trainer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || client.status.toLowerCase() === statusFilter;
    const matchesCity = cityFilter === "all" || client.city === cityFilter;

    return matchesSearch && matchesStatus && matchesCity;
  });

  const getStatusBadge = (status: string) => {
    return status === "Active" ? "default" : "secondary";
  };

  const getHealthBadge = (health: string) => {
    switch (health) {
      case "Excellent":
        return "default";
      case "Good":
        return "secondary";
      case "Needs Attention":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const handleViewProfile = (client: any) => {
    setSelectedClient({
      ...client,
      email: `${client.name.toLowerCase().replace(" ", ".")}@email.com`,
      phone: "+91 98765 43210",
      joinDate: "2023-06-15",
      address: "123 Main Street, Sector 15",
      emergencyContact: "Family Member",
      emergencyPhone: "+91 98765 43211",
      medicalConditions: "Hypertension, Diabetes Type 2",
      totalSessions: client.sessions + 5,
      completedSessions: client.sessions,
      upcomingSessions: 2,
    });
    setShowProfileModal(true);
  };

  const handleManageClient = (client: any) => {
    setSelectedClient({
      ...client,
      email: `${client.name.toLowerCase().replace(" ", ".")}@email.com`,
      phone: "+91 98765 43210",
      address: "123 Main Street, Sector 15",
      emergencyContact: "Family Member",
      emergencyPhone: "+91 98765 43211",
      medicalConditions: "Hypertension, Diabetes Type 2",
    });
    setShowEditModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Client Management
          </h1>
          <p className="text-slate-600">
            Manage and monitor all registered clients
          </p>
        </div>
        <Button
          className="bg-sky-500 hover:bg-sky-600"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Client
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
                placeholder="Search clients by name or trainer..."
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
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={cityFilter} onValueChange={setCityFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Areas</SelectItem>
                <SelectItem value="Whitefield">Whitefield</SelectItem>
                <SelectItem value="Koramangala">Koramangala</SelectItem>
                <SelectItem value="RajajiNagar">RajajiNagar</SelectItem>
                <SelectItem value="Electronic City">Electronic City</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Client Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <Card
            key={client.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-sky-100 text-sky-600">
                      {client.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{client.name}</CardTitle>
                    <p className="text-sm text-slate-500">Age {client.age}</p>
                  </div>
                </div>
                <Badge variant={getStatusBadge(client.status)}>
                  {client.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="h-4 w-4" />
                <span>{client.city}</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Trainer:</span>
                  <span className="font-medium">{client.trainer}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Subscription:</span>
                  <Badge variant="outline">{client.subscription}</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Sessions:</span>
                  <span className="font-medium">{client.sessions}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Health Status:</span>
                  <Badge variant={getHealthBadge(client.health)}>
                    {client.health}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Satisfaction:</span>
                  <span className="font-medium">{client.satisfaction}/5.0</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 pt-2 border-t">
                <Calendar className="h-3 w-3" />
                <span>Last session: {client.lastSession}</span>
              </div>

              <div className="flex gap-2 pt-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleViewProfile(client)}
                >
                  View Profile
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-sky-500 hover:bg-sky-600"
                  onClick={() => handleManageClient(client)}
                >
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-slate-500">
              No clients found matching your criteria.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setCityFilter("all");
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      <AddClientModal open={showAddModal} onOpenChange={setShowAddModal} />

      <ClientProfileModal
        open={showProfileModal}
        onOpenChange={setShowProfileModal}
        client={selectedClient}
      />

      <EditClientModal
        open={showEditModal}
        onOpenChange={setShowEditModal}
        client={selectedClient}
      />
    </div>
  );
}
