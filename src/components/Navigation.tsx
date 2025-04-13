
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart2, BookText, Sparkles, Bookmark, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/components/ui/use-toast";

const Navigation: React.FC = () => {
  const location = useLocation();
  const { toast } = useToast();

  const { logout } = useAuth()
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/insights', icon: BarChart2, label: 'Insights' },
    { path: '/journal', icon: BookText, label: 'Journal' },
    { path: '/habits', icon: Sparkles, label: 'Habits' },
    { path: '/saved', icon: Bookmark, label: 'Saved' },
    { path: '/settings', icon: Settings, label: 'Settings' },
    { path: '/login', icon: LogOut, label: 'Logout' },
  ];
  
  const handleSidebarItemClick = (itemName: string) => {
    try {
    if(itemName !== "Logout") return;

    logout()
      
    toast({
      title: "Logout successful",
      description: "Come back soon!",
    });
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Logout failed",
      description: error instanceof Error ? error.message : "Unable to Logout",
    });
  }
}

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 flex justify-around items-center py-3 px-2 bg-white dark:bg-slate-800 border-t border-border sm:relative sm:border-t-0 sm:border-r sm:flex-col sm:h-screen sm:w-16 sm:justify-start sm:py-6 sm:gap-8">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          onClick={() => handleSidebarItemClick(item.label)}
          className={cn(
            "flex flex-col items-center justify-center p-2 rounded-lg transition-colors",
            "hover:text-primary hover:bg-accent/50",
            location.pathname === item.path 
              ? "text-primary" 
              : "text-muted-foreground"
          )}
        >
          <item.icon size={20} />
          <span className="text-xs mt-1 sm:hidden">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
