
import React, { useState } from 'react';
import Header from '@/components/Header';
import { useTheme } from '@/hooks/useTheme';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileDown, Camera, Volume2, Sparkles, Moon, FileBadge, Star } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  
  // Profile settings
  const [name, setName] = useState('Alex Johnson');
  const [email, setEmail] = useState('alex@example.com');
  const [avatarUrl, setAvatarUrl] = useState('');
  
  // Preferences
  const [colorTheme, setColorTheme] = useState('pastel');
  const [soundEffects, setSoundEffects] = useState(true);
  const [animations, setAnimations] = useState(true);
  const [darkMode, setDarkMode] = useState(theme === 'dark');
  
  // Notification preferences
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState('18:00');
  
  const handleAvatarChange = () => {
    // In a real app, this would open a file picker
    toast({
      title: "Feature coming soon",
      description: "Avatar upload will be available in the next update",
    });
  };
  
  const handleExport = (format: 'pdf' | 'csv') => {
    toast({
      title: `Exporting as ${format.toUpperCase()}`,
      description: "Your data is being prepared for download",
    });
  };
  
  const handleToggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
    toggleTheme();
  };
  
  return (
    <div className="min-h-screen bg-background flex">
      <Navigation />
      
      <div className="flex-1 flex flex-col">
        <Header toggleTheme={toggleTheme} theme={theme} />
        
        <main className="flex-1 container max-w-5xl py-6 px-4 md:py-10 md:px-6">
          <h1 className="text-3xl font-bold mb-8">Settings</h1>
          
          <Tabs defaultValue="profile" className="space-y-8">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="data">Data Management</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>My Profile</CardTitle>
                  <CardDescription>Manage your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                    <div className="flex flex-col items-center gap-2">
                      <Avatar className="h-24 w-24">
                        {avatarUrl ? (
                          <AvatarImage src={avatarUrl} alt={name} />
                        ) : (
                          <AvatarFallback className="text-2xl bg-primary/20 text-primary">
                            {name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleAvatarChange}
                        className="mt-2"
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Change Photo
                      </Button>
                    </div>
                    
                    <div className="space-y-4 flex-1">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Display Name</Label>
                        <Input 
                          id="name" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto">Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Interface Preferences</CardTitle>
                  <CardDescription>Customize how MicroMood looks and feels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Color Theme</Label>
                        <p className="text-sm text-muted-foreground">
                          Choose a color palette for the app
                        </p>
                      </div>
                      <Select value={colorTheme} onValueChange={setColorTheme}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pastel">Soft Pastels</SelectItem>
                          <SelectItem value="vibrant">Vibrant Colors</SelectItem>
                          <SelectItem value="muted">Muted Tones</SelectItem>
                          <SelectItem value="ocean">Ocean Breeze</SelectItem>
                          <SelectItem value="forest">Forest Whispers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="flex items-center">
                          <Moon className="h-4 w-4 mr-2" />
                          Dark Mode
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Use a darker color theme
                        </p>
                      </div>
                      <Switch 
                        checked={darkMode}
                        onCheckedChange={handleToggleDarkMode}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="flex items-center">
                          <Volume2 className="h-4 w-4 mr-2" />
                          Sound Effects
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Play subtle sounds for actions
                        </p>
                      </div>
                      <Switch 
                        checked={soundEffects}
                        onCheckedChange={setSoundEffects}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="flex items-center">
                          <Sparkles className="h-4 w-4 mr-2" />
                          Animations
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Show animations and transitions
                        </p>
                      </div>
                      <Switch 
                        checked={animations}
                        onCheckedChange={setAnimations}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Daily Reminder</Label>
                        <p className="text-sm text-muted-foreground">
                          Get a reminder to log your mood
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={reminderEnabled}
                          onCheckedChange={setReminderEnabled}
                        />
                        {reminderEnabled && (
                          <Input 
                            type="time" 
                            value={reminderTime}
                            onChange={(e) => setReminderTime(e.target.value)}
                            className="w-24"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto">Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="data">
              <Card>
                <CardHeader>
                  <CardTitle>Data Management</CardTitle>
                  <CardDescription>Export or manage your journal data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="space-y-1.5">
                      <Label>Export Your Data</Label>
                      <p className="text-sm text-muted-foreground">
                        Download a copy of your journal entries and mood logs
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      <Button 
                        variant="outline" 
                        onClick={() => handleExport('pdf')}
                      >
                        <FileDown className="h-4 w-4 mr-2" />
                        Export as PDF
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        onClick={() => handleExport('csv')}
                      >
                        <FileBadge className="h-4 w-4 mr-2" />
                        Export as CSV
                      </Button>
                    </div>
                    
                    <div className="space-y-1.5 pt-4">
                      <Label>Data Privacy</Label>
                      <p className="text-sm text-muted-foreground">
                        Your data is stored locally on your device and never shared without your permission
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Premium Card */}
              <Card className="mt-6 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/30 animate-gradient opacity-50"></div>
                <CardHeader className="relative">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary animate-pulse-gentle" />
                    <CardTitle>Upgrade to Premium</CardTitle>
                  </div>
                  <CardDescription>Unlock advanced features and customization</CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      Unlimited journal entries and mood tracking
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      Advanced analytics and insights
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      Custom themes and personalization
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      Priority access to new features
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="relative">
                  <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                    Upgrade Now
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
