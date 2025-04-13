
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useTheme } from '@/hooks/useTheme';
import { Sun, Moon } from 'lucide-react';

const AdminSettingsPage = () => {
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();
  const [autoSuggestHabits, setAutoSuggestHabits] = useState(true);
  const [defaultMood, setDefaultMood] = useState('neutral');
  const [showAnalytics, setShowAnalytics] = useState(true);

  const handleSaveSettings = () => {
    toast({
      title: "Settings updated",
      description: "Your changes have been saved successfully",
    });
  };

  const moods = [
    'neutral', 'calm', 'hopeful', 'curious', 'happy'
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Settings</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Platform Configuration</CardTitle>
            <CardDescription>
              Manage general platform settings for all users
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-suggest">Auto-suggest Micro-habits</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically suggest micro-habits to users based on their mood
                </p>
              </div>
              <Switch 
                id="auto-suggest" 
                checked={autoSuggestHabits} 
                onCheckedChange={setAutoSuggestHabits} 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="default-mood">Default Landing Mood</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Set the default mood shown when users first visit
              </p>
              <Select value={defaultMood} onValueChange={setDefaultMood}>
                <SelectTrigger id="default-mood" className="w-full">
                  <SelectValue placeholder="Select a default mood" />
                </SelectTrigger>
                <SelectContent>
                  {moods.map(mood => (
                    <SelectItem key={mood} value={mood}>
                      {mood.charAt(0).toUpperCase() + mood.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Admin Interface Settings</CardTitle>
            <CardDescription>
              Customize your admin experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Enable dark mode for the admin interface
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-muted-foreground" />
                <Switch 
                  id="dark-mode" 
                  checked={theme === 'dark'} 
                  onCheckedChange={() => toggleTheme()} 
                />
                <Moon className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="show-analytics">Show Analytics</Label>
                <p className="text-sm text-muted-foreground">
                  Display analytics data on the dashboard
                </p>
              </div>
              <Switch 
                id="show-analytics" 
                checked={showAnalytics} 
                onCheckedChange={setShowAnalytics} 
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Analytics</CardTitle>
            <CardDescription>
              View key metrics about platform usage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium">Total Moods Logged</h3>
                <p className="text-3xl font-bold">1,892</p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Active Users</h3>
                <p className="text-3xl font-bold">245</p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Micro-habits Created</h3>
                <p className="text-3xl font-bold">54</p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Avg. Moods per User</h3>
                <p className="text-3xl font-bold">7.8</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">
                More detailed analytics would be displayed here with charts and visualizations.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSaveSettings}>Save Settings</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
