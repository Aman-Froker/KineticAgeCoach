import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Users,
  UserCheck,
  Calendar,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

// Mock data
const mockClients = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    status: "Active",
    trainer: "Sarah Johnson",
    location: "Downtown Gym",
  },
  {
    id: 2,
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "+1 (555) 234-5678",
    status: "Active",
    trainer: "Mike Wilson",
    location: "Uptown Fitness",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "+1 (555) 345-6789",
    status: "Pending",
    trainer: "Sarah Johnson",
    location: "Downtown Gym",
  },
];

const mockTrainers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@fitnesscorp.com",
    phone: "+1 (555) 987-6543",
    specialty: "Strength Training",
    clients: 15,
    certification: "NASM-CPT",
  },
  {
    id: 2,
    name: "Mike Wilson",
    email: "mike@fitnesscorp.com",
    phone: "+1 (555) 876-5432",
    specialty: "Cardio & Weight Loss",
    clients: 12,
    certification: "ACSM-CPT",
  },
  {
    id: 3,
    name: "Lisa Chen",
    email: "lisa@fitnesscorp.com",
    phone: "+1 (555) 765-4321",
    specialty: "Yoga & Flexibility",
    clients: 18,
    certification: "RYT-500",
  },
];

const mockSessions = [
  {
    id: 1,
    title: "Morning Strength Training",
    client: "John Smith",
    trainer: "Sarah Johnson",
    date: "2024-01-20",
    time: "09:00 AM",
    status: "Scheduled",
    type: "Personal Training",
  },
  {
    id: 2,
    title: "Cardio Session",
    client: "Emily Davis",
    trainer: "Mike Wilson",
    date: "2024-01-20",
    time: "11:00 AM",
    status: "Completed",
    type: "Personal Training",
  },
  {
    id: 3,
    title: "Yoga Class",
    client: "Michael Brown",
    trainer: "Lisa Chen",
    date: "2024-01-21",
    time: "07:00 PM",
    status: "Scheduled",
    type: "Group Class",
  },
];

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [filteredResults, setFilteredResults] = useState({
    clients: mockClients,
    trainers: mockTrainers,
    sessions: mockSessions,
  });

  useEffect(() => {
    const query = searchParams.get("q") || "";
    setSearchQuery(query);

    if (query.trim()) {
      const filtered = {
        clients: mockClients.filter(
          (client) =>
            client.name.toLowerCase().includes(query.toLowerCase()) ||
            client.email.toLowerCase().includes(query.toLowerCase()) ||
            client.trainer.toLowerCase().includes(query.toLowerCase())
        ),
        trainers: mockTrainers.filter(
          (trainer) =>
            trainer.name.toLowerCase().includes(query.toLowerCase()) ||
            trainer.specialty.toLowerCase().includes(query.toLowerCase()) ||
            trainer.certification.toLowerCase().includes(query.toLowerCase())
        ),
        sessions: mockSessions.filter(
          (session) =>
            session.title.toLowerCase().includes(query.toLowerCase()) ||
            session.client.toLowerCase().includes(query.toLowerCase()) ||
            session.trainer.toLowerCase().includes(query.toLowerCase()) ||
            session.type.toLowerCase().includes(query.toLowerCase())
        ),
      };
      setFilteredResults(filtered);
    } else {
      setFilteredResults({ clients: [], trainers: [], sessions: [] });
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
  };

  const totalResults =
    filteredResults.clients.length +
    filteredResults.trainers.length +
    filteredResults.sessions.length;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Search Results</h1>

        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              size={16}
            />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clients, trainers, sessions..."
              className="pl-10"
            />
          </div>
          <Button type="submit">Search</Button>
        </form>

        {searchQuery && (
          <p className="text-muted-foreground">
            {totalResults} results found for "{searchQuery}"
          </p>
        )}
      </div>

      {!searchQuery ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Start your search
            </h3>
            <p className="text-muted-foreground text-center">
              Enter a search term to find clients, trainers, or sessions
            </p>
          </CardContent>
        </Card>
      ) : totalResults === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No results found
            </h3>
            <p className="text-muted-foreground text-center">
              Try adjusting your search terms or check for typos
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {/* Clients Results */}
          {filteredResults.clients.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">
                  Clients ({filteredResults.clients.length})
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredResults.clients.map((client) => (
                  <Card
                    key={client.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{client.name}</CardTitle>
                        <Badge
                          variant={
                            client.status === "Active" ? "default" : "secondary"
                          }
                        >
                          {client.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        {client.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        {client.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <UserCheck className="h-4 w-4" />
                        Trainer: {client.trainer}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {client.location}
                      </div>
                      <div className="pt-2">
                        <Link to="/clients">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Trainers Results */}
          {filteredResults.trainers.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <UserCheck className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">
                  Trainers ({filteredResults.trainers.length})
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredResults.trainers.map((trainer) => (
                  <Card
                    key={trainer.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{trainer.name}</CardTitle>
                      <Badge variant="outline">{trainer.specialty}</Badge>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        {trainer.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        {trainer.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        {trainer.clients} Active Clients
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Certification:</span>{" "}
                        {trainer.certification}
                      </div>
                      <div className="pt-2">
                        <Link to="/trainers">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            View Profile
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Sessions Results */}
          {filteredResults.sessions.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">
                  Sessions ({filteredResults.sessions.length})
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredResults.sessions.map((session) => (
                  <Card
                    key={session.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          {session.title}
                        </CardTitle>
                        <Badge
                          variant={
                            session.status === "Completed"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {session.status}
                        </Badge>
                      </div>
                      <Badge variant="outline">{session.type}</Badge>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        Client: {session.client}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <UserCheck className="h-4 w-4" />
                        Trainer: {session.trainer}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {session.date} at {session.time}
                      </div>
                      <div className="pt-2">
                        <Link to="/sessions">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            View Session
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
