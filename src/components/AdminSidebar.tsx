import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Activity,
  Users,
  Calendar,
  Settings,
  ChartBar,
  FileText,
  Mail,
} from "lucide-react";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Activity },
  { title: "Clients", url: "/clients", icon: Users },
  { title: "Trainers", url: "/trainers", icon: Users },
  { title: "Sessions", url: "/sessions", icon: Calendar },
  { title: "Reports", url: "/reports", icon: ChartBar },
  // { title: "Incidents", url: "/incidents", icon: FileText },
  // { title: "Communications", url: "/communications", icon: Mail },
  // { title: "Settings", url: "/settings", icon: Settings },
];

export function AdminSidebar() {
  const { open } = useSidebar();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar
      className={`${
        !open ? "w-14" : "w-64"
      } border-r border-slate-200 bg-white`}
      collapsible="icon"
    >
      <SidebarContent>
        <div className="p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">KA</span>
            </div>
            {open && (
              <div>
                <h1 className="font-semibold text-slate-900">Kinetic Age</h1>
                <p className="text-xs text-slate-500">Admin Panel</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end={item.url === "/"}
                        className={({ isActive: active }) =>
                          `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                            active || isActive(item.url)
                              ? "bg-sky-50 text-sky-700 border-l-2 border-sky-500"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }`
                        }
                      >
                        <IconComponent size={18} />
                        {open && (
                          <span className="font-medium">{item.title}</span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
