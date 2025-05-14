
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SidebarProps {
  open: boolean;
}

export function Sidebar({ open }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Combined state for the actual sidebar width (considers both prop and internal state)
  const isOpen = open && !collapsed;

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-background border-r transition-all duration-300 z-30",
        isOpen ? "w-60" : "w-16"
      )}
    >
      <div className="flex flex-col h-full py-4">
        <div className="px-3 py-2">
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={toggleSidebar}
          >
            {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </Button>
        </div>
        <nav className="space-y-1 px-3 py-2">
          <NavItem to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" isOpen={isOpen} />
          <NavItem to="/inventory" icon={<Package size={20} />} label="Inventory" isOpen={isOpen} />
          <NavItem to="/orders" icon={<ShoppingCart size={20} />} label="Orders" isOpen={isOpen} />
          <NavItem to="/reports" icon={<BarChart3 size={20} />} label="Reports" isOpen={isOpen} />
          <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" isOpen={isOpen} />
        </nav>
      </div>
    </aside>
  );
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
}

function NavItem({ to, icon, label, isOpen }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )
      }
    >
      <span className="flex-shrink-0">{icon}</span>
      {isOpen && <span>{label}</span>}
    </NavLink>
  );
}
