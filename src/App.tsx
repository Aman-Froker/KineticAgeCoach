import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Trainers from "./pages/Trainers";
import Sessions from "./pages/Sessions";
import Reports from "./pages/Reports";
import Incidents from "./pages/Incidents";
import Communications from "./pages/Communications";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="clients" element={<Clients />} />
            <Route path="trainers" element={<Trainers />} />
            <Route path="sessions" element={<Sessions />} />
            <Route path="reports" element={<Reports />} />
            <Route path="profile" element={<Profile />} />a
            {/* <Route path="incidents" element={<Incidents />} />
            <Route path="communications" element={<Communications />} />*/}
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
