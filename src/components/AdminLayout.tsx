
import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Users, Sparkles, Settings, LayoutDashboard, LogOut, Moon, Sun, Image, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the admin panel",
    });
  };

  const navigateToProfile = () => {
    navigate('/admin/profile');
  };
  
  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/employees', icon: Users, label: 'Employees' },
    { path: '/admin/habits', icon: Sparkles, label: 'Micro-Habits' },
    { path: '/admin/mood-images', icon: Image, label: 'Mood Images' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Admin Sidebar */}
      <div className="hidden md:flex flex-col w-64 border-r border-border">
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground font-bold py-1 px-2 rounded text-xs">ADMIN</div>
            <h1 className="font-semibold">MicroMood Admin</h1>
          </div>
        </div>
        
        <div className="flex flex-col flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) => cn(
                "flex items-center space-x-2 px-3 py-2 rounded-md transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              )}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          ))}
          <NavLink
            to="/admin/profile"
            className={({ isActive }) => cn(
              "flex items-center space-x-2 px-3 py-2 rounded-md transition-colors mt-4 border-t border-border pt-4",
              "hover:bg-accent hover:text-accent-foreground",
              isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
            )}
          >
            <UserCircle size={18} />
            <span>My Profile</span>
          </NavLink>

          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleTheme} 
            className="flex justify-start px-3 mt-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            {theme === 'dark' ? <Sun size={18} className="mr-2" /> : <Moon size={18} className="mr-2" />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </Button>
        </div>
        
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={navigateToProfile}
            >
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {user?.name?.charAt(0) || 'A'}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Sidebar with Sheet component */}
      <div className="md:hidden">
        {/* Mobile navigation would go here */}
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-border flex items-center justify-between px-6">
          <h1 className="font-semibold md:hidden">MicroMood Admin</h1>
          <div className="flex items-center space-x-2 md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              className="mr-2"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>
        </header>
        
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
