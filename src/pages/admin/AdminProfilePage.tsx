
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Edit, Upload, Plus, UserPlus, UserMinus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mocked admin data - in a real app, this would come from an API
const adminData = {
  name: "Jane Smith",
  email: "jane.admin@micromood.com",
  role: "Admin",
  joinedDate: "April 10, 2024",
  profileImage: "/placeholder.svg"
};

// Mocked recent activities
const recentActivities = [
  { 
    id: 1, 
    action: "Uploaded new mood images", 
    count: 5, 
    timestamp: "Today, 2:30 PM", 
    icon: Upload,
    period: "Today"
  },
  { 
    id: 2, 
    action: "Added new micro-habits", 
    count: 3, 
    timestamp: "Today, 11:20 AM", 
    icon: Plus,
    period: "Today"
  },
  { 
    id: 3, 
    action: "Added new employees", 
    count: 2, 
    timestamp: "Yesterday, 4:15 PM", 
    icon: UserPlus,
    period: "This Week"
  },
  { 
    id: 4, 
    action: "Removed employee", 
    count: 1, 
    timestamp: "Apr 10, 2025", 
    icon: UserMinus,
    period: "Earlier"
  }
];

const AdminProfilePage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold">My Profile</h1>
      
      {/* Profile Card */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 h-24" />
        <div className="-mt-12 flex justify-between items-start px-6">
          <Avatar className="h-24 w-24 border-4 border-background">
            <AvatarImage src={adminData.profileImage} alt={adminData.name} />
            <AvatarFallback className="text-xl">{adminData.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm" className="mt-14 gap-2">
            <Edit size={16} />
            Edit Profile
          </Button>
        </div>
        
        <CardContent className="pt-6 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">{adminData.name}</h2>
            <p className="text-muted-foreground">{adminData.email}</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="px-3 py-1">
              {adminData.role}
            </Badge>
            <div className="flex items-center text-muted-foreground text-sm">
              <CalendarDays size={16} className="mr-1" />
              Joined {adminData.joinedDate}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Recent Activities</h2>
        </CardHeader>
        <CardContent>
          {/* Group activities by period */}
          {["Today", "This Week", "Earlier"].map((period) => {
            const periodActivities = recentActivities.filter(act => act.period === period);
            if (periodActivities.length === 0) return null;
            
            return (
              <div key={period} className="mb-6 last:mb-0">
                <h3 className="text-sm text-muted-foreground mb-2">{period}</h3>
                <div className="space-y-3">
                  {periodActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-2 rounded-md hover:bg-accent/40 transition-colors">
                      <div className="rounded-full bg-primary/10 p-2">
                        <activity.icon size={18} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p>
                            <span className="font-medium">{activity.action}</span>
                            <span className="ml-1">({activity.count})</span>
                          </p>
                          <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProfilePage;
