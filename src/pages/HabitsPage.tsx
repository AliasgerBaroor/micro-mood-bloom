
import React, { useState } from 'react';
import Header from '@/components/Header';
import { useTheme } from '@/hooks/useTheme';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { Search } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

interface MicroHabit {
  id: string;
  title: string;
  description: string;
  category: 'overwhelmed' | 'stuck' | 'excited' | 'sad' | 'anxious' | 'happy';
  duration: string;
  isFavorite: boolean;
  isRecommended?: boolean;
}

const HabitsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [habits, setHabits] = useState<MicroHabit[]>([
    {
      id: '1',
      title: '5-4-3-2-1 Grounding',
      description: 'Notice 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.',
      category: 'overwhelmed',
      duration: '2 min',
      isFavorite: false,
      isRecommended: true,
    },
    {
      id: '2',
      title: 'Box Breathing',
      description: 'Breathe in for 4 counts, hold for 4, breathe out for 4, hold for 4. Repeat 4 times.',
      category: 'anxious',
      duration: '1 min',
      isFavorite: true,
    },
    {
      id: '3',
      title: 'Joy List',
      description: 'Write down 5 things, no matter how small, that brought you joy today.',
      category: 'sad',
      duration: '3 min',
      isFavorite: false,
    },
    {
      id: '4',
      title: 'Mindful Walking',
      description: 'Take a short walk focusing only on the sensations in your feet and the rhythm of your breath.',
      category: 'stuck',
      duration: '5 min',
      isFavorite: false,
      isRecommended: true,
    },
    {
      id: '5',
      title: 'Quick Gratitude',
      description: 'Write down three specific things you&apos;re grateful for right now.',
      category: 'anxious',
      duration: '2 min',
      isFavorite: false,
    },
    {
      id: '6',
      title: 'Celebration Dance',
      description: 'Put on your favorite upbeat song and dance for the duration to channel your positive energy.',
      category: 'excited',
      duration: '3 min',
      isFavorite: true,
    },
    {
      id: '7',
      title: 'Water Your Plants',
      description: 'Take a moment to care for your plants, noticing their growth and needs.',
      category: 'happy',
      duration: '4 min',
      isFavorite: false,
    },
    {
      id: '8',
      title: 'Single-Task Focus',
      description: 'Choose one small task and complete it with total mindful attention.',
      category: 'overwhelmed',
      duration: '5 min',
      isFavorite: false,
    },
    {
      id: '9',
      title: 'Sky Gazing',
      description: 'Find a window or go outside and simply watch the clouds or stars for a few minutes.',
      category: 'stuck',
      duration: '5 min',
      isFavorite: false,
    },
    {
      id: '10',
      title: 'Progressive Muscle Relaxation',
      description: 'Starting with your toes and moving upward, tense and then relax each muscle group in your body.',
      category: 'anxious',
      duration: '5 min',
      isFavorite: false,
      isRecommended: true,
    },
    {
      id: '11',
      title: 'Visualization',
      description: 'Close your eyes and visualize a place where you feel completely safe, calm and happy.',
      category: 'sad',
      duration: '3 min',
      isFavorite: false,
    },
    {
      id: '12',
      title: 'Three Good Things',
      description: 'Write down three things that went well today and reflect on your role in making them happen.',
      category: 'happy',
      duration: '5 min',
      isFavorite: false,
    },
  ]);
  
  const toggleFavorite = (id: string) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, isFavorite: !habit.isFavorite } : habit
    ));
    
    const habit = habits.find(h => h.id === id);
    if (habit) {
      toast({
        title: habit.isFavorite ? "Removed from favorites" : "Added to favorites",
        description: habit.isFavorite 
          ? `"${habit.title}" removed from your favorites` 
          : `"${habit.title}" added to your favorites`,
      });
    }
  };
  
  const filteredHabits = searchQuery
    ? habits.filter(habit => 
        habit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        habit.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : habits;
  
  const recommendedHabits = habits.filter(habit => habit.isRecommended);
  const favoriteHabits = habits.filter(habit => habit.isFavorite);
  
  const habitsMap: Record<string, MicroHabit[]> = {
    'overwhelmed': habits.filter(h => h.category === 'overwhelmed'),
    'stuck': habits.filter(h => h.category === 'stuck'),
    'excited': habits.filter(h => h.category === 'excited'),
    'sad': habits.filter(h => h.category === 'sad'),
    'anxious': habits.filter(h => h.category === 'anxious'),
    'happy': habits.filter(h => h.category === 'happy'),
  };
  
  const groupLabels = {
    'overwhelmed': 'When you feel overwhelmed',
    'stuck': 'When you\'re stuck',
    'excited': 'When you\'re excited',
    'sad': 'When you feel sad',
    'anxious': 'When you feel anxious',
    'happy': 'When you\'re happy',
  };
  
  return (
    <div className="min-h-screen bg-background flex">
      <Navigation />
      
      <div className="flex-1 flex flex-col">
        <Header toggleTheme={toggleTheme} theme={theme} />
        
        <main className="flex-1 container max-w-5xl py-6 px-4 md:py-10 md:px-6">
          <h1 className="text-3xl font-bold mb-6">Micro-Habits Library</h1>
          
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search for micro-habits..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Habits</TabsTrigger>
              <TabsTrigger value="recommended">Suggested for You</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="by-mood">By Mood</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredHabits.map(habit => (
                  <HabitCard 
                    key={habit.id}
                    habit={habit}
                    toggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="recommended">
              {recommendedHabits.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {recommendedHabits.map(habit => (
                    <HabitCard 
                      key={habit.id}
                      habit={habit}
                      toggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">
                    No recommended habits yet. Continue using MicroMood to get personalized suggestions.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="favorites">
              {favoriteHabits.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {favoriteHabits.map(habit => (
                    <HabitCard 
                      key={habit.id}
                      habit={habit}
                      toggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">
                    No favorites yet. Click the heart icon on any habit to add it to your favorites.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="by-mood">
              {Object.entries(habitsMap).map(([category, habits]) => (
                habits.length > 0 && (
                  <div key={category} className="mb-10">
                    <h2 className="text-xl font-semibold mb-4">{groupLabels[category as keyof typeof groupLabels]}</h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {habits.map(habit => (
                        <HabitCard 
                          key={habit.id}
                          habit={habit}
                          toggleFavorite={toggleFavorite}
                        />
                      ))}
                    </div>
                  </div>
                )
              ))}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

interface HabitCardProps {
  habit: MicroHabit;
  toggleFavorite: (id: string) => void;
}

const HabitCard = ({ habit, toggleFavorite }: HabitCardProps) => {
  let borderColor;
  switch (habit.category) {
    case 'overwhelmed': borderColor = 'border-mood-anxious'; break;
    case 'stuck': borderColor = 'border-mood-neutral'; break;
    case 'excited': borderColor = 'border-mood-energetic'; break;
    case 'sad': borderColor = 'border-mood-sad'; break;
    case 'anxious': borderColor = 'border-mood-anxious'; break;
    case 'happy': borderColor = 'border-mood-happy'; break;
    default: borderColor = 'border-primary';
  }
  
  return (
    <Card className={`hover:shadow-md transition-all ${borderColor} border-l-4`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{habit.title}</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 rounded-full"
            onClick={() => toggleFavorite(habit.id)}
          >
            <Heart 
              className={`h-4 w-4 ${habit.isFavorite ? 'fill-primary text-primary' : 'text-muted-foreground'}`} 
            />
          </Button>
        </div>
        <CardDescription className="flex items-center gap-1">
          <Badge variant="outline" className="text-xs font-normal">
            {habit.duration}
          </Badge>
          {habit.isRecommended && (
            <Badge variant="secondary" className="text-xs">
              Recommended
            </Badge>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{habit.description}</p>
      </CardContent>
    </Card>
  );
};

export default HabitsPage;
