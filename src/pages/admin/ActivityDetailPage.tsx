
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Upload, 
  Plus, 
  UserPlus, 
  UserMinus,
  Calendar,
  User,
  Info,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

// Mock activity data with more detailed information
// In a real app, this would come from an API call
const activityData = [
  {
    id: "1",
    action: "Uploaded new mood images",
    detail: "Added 5 new mood images for 'calm' and 'focused' categories",
    count: 5,
    timestamp: "2025-04-13T14:30:00Z",
    formattedDate: "Today, 2:30 PM",
    icon: Upload,
    period: "Today",
    actionType: "add",
    target: "Mood Images",
    performedBy: {
      name: "Jane Smith",
      email: "jane.admin@micromood.com",
    },
    reason: "Weekly content refresh for user engagement",
    items: [
      "calm-water.jpg", 
      "meditation-pose.jpg", 
      "focused-work.jpg", 
      "nature-calm.jpg", 
      "study-focus.jpg"
    ]
  },
  {
    id: "2",
    action: "Added new micro-habits",
    detail: "Created 3 new micro-habits for morning routines",
    count: 3,
    timestamp: "2025-04-13T11:20:00Z",
    formattedDate: "Today, 11:20 AM",
    icon: Plus,
    period: "Today",
    actionType: "add",
    target: "Micro-habits",
    performedBy: {
      name: "Jane Smith",
      email: "jane.admin@micromood.com",
    },
    reason: "Expanding morning routine options based on user feedback",
    items: [
      "5-minute meditation", 
      "Gratitude journaling", 
      "Hydration reminder"
    ]
  },
  {
    id: "3",
    action: "Added new employees",
    detail: "Onboarded 2 new content managers to the platform",
    count: 2,
    timestamp: "2025-04-12T16:15:00Z",
    formattedDate: "Yesterday, 4:15 PM",
    icon: UserPlus,
    period: "This Week",
    actionType: "add",
    target: "Employees",
    performedBy: {
      name: "Jane Smith",
      email: "jane.admin@micromood.com",
    },
    reason: "Team expansion for content management department",
    items: [
      "Sarah Johnson (content.sarah@micromood.com)", 
      "Michael Chen (content.michael@micromood.com)"
    ]
  },
  {
    id: "4",
    action: "Removed employee",
    detail: "Deactivated account for former content manager",
    count: 1,
    timestamp: "2025-04-10T15:45:00Z",
    formattedDate: "Apr 10, 2025",
    icon: UserMinus,
    period: "Earlier",
    actionType: "delete",
    target: "Employee",
    performedBy: {
      name: "Jane Smith",
      email: "jane.admin@micromood.com",
    },
    reason: "Employment termination due to policy violations",
    items: [
      "Alex White (former.employee@micromood.com)"
    ]
  }
];

const ActivityDetailPage = () => {
  const { activityId } = useParams<{ activityId: string }>();
  const navigate = useNavigate();
  
  // Find the activity by ID
  const activity = activityData.find(act => act.id === activityId);
  
  if (!activity) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <AlertTriangle size={48} className="text-yellow-500 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Activity Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The activity you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate('/admin/profile')}>
          Return to Profile
        </Button>
      </div>
    );
  }

  // Format timestamp
  const activityDate = new Date(activity.timestamp);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(activityDate);
  
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }).format(activityDate);

  // Define action color based on action type
  const getActionColor = (actionType: string) => {
    switch (actionType) {
      case 'add':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'delete':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'update':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  // Get icon component based on action
  const ActivityIcon = activity.icon;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/profile')}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-2xl font-bold">Activity Detail</h1>
      </div>
      
      <Card className={`border-l-4 ${activity.actionType === 'delete' ? 'border-l-red-500' : activity.actionType === 'add' ? 'border-l-green-500' : 'border-l-primary'}`}>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`rounded-full p-4 ${getActionColor(activity.actionType)}`}>
              <ActivityIcon size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{activity.action}</h2>
              <p className="text-muted-foreground">{activity.detail}</p>
            </div>
          </div>
          <Badge variant={activity.actionType === 'delete' ? 'destructive' : activity.actionType === 'add' ? 'default' : 'secondary'} className="capitalize">
            {activity.actionType}
          </Badge>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar size={16} />
                <span className="text-sm font-medium">Date</span>
              </div>
              <p>{formattedDate}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock size={16} />
                <span className="text-sm font-medium">Time</span>
              </div>
              <p>{formattedTime}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Info size={16} />
                <span className="text-sm font-medium">Target</span>
              </div>
              <p>{activity.target}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <User size={16} />
                <span className="text-sm font-medium">Performed By</span>
              </div>
              <div className="flex items-center space-x-3">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">
                    {activity.performedBy.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{activity.performedBy.name}</p>
                  <p className="text-xs text-muted-foreground">{activity.performedBy.email}</p>
                </div>
              </div>
            </div>
          </div>
          
          {activity.reason && (
            <div className="space-y-2 pt-2 border-t border-border">
              <h3 className="text-sm font-medium text-muted-foreground">Reason</h3>
              <p>{activity.reason}</p>
            </div>
          )}
          
          <div className="space-y-2 pt-2 border-t border-border">
            <h3 className="text-sm font-medium text-muted-foreground">Items ({activity.items.length})</h3>
            <ul className="space-y-2 pl-6 list-disc">
              {activity.items.map((item, index) => (
                <li key={index} className="text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        
        <CardFooter className="border-t border-border pt-4">
          <Button variant="outline" className="w-full" onClick={() => navigate('/admin/profile')}>
            Back to Profile
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ActivityDetailPage;
