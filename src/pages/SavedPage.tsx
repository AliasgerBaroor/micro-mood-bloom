
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { useTheme } from '@/hooks/useTheme';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from 'date-fns';
import { Eye, Calendar, Star, BookText } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Types for stored entries
interface BaseEntry {
  id: string;
  timestamp: string;
  type: 'mood' | 'journal';
}

interface MoodEntry extends BaseEntry {
  type: 'mood';
  mood: string;
  context: string;
  suggestion?: string;
}

interface JournalEntry extends BaseEntry {
  type: 'journal';
  title: string;
  content: string;
  tags: string[];
}

type SavedEntry = MoodEntry | JournalEntry;

const SavedPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [savedEntries, setSavedEntries] = useState<SavedEntry[]>([]);
  const [filterMood, setFilterMood] = useState<string>('all');
  
  useEffect(() => {
    // Mock data for saved entries
    const mockEntries: SavedEntry[] = [
      {
        id: '1',
        type: 'mood',
        mood: 'happy',
        context: 'Had a great conversation with a friend after a long time.',
        timestamp: '2025-04-10T14:30:00Z',
        suggestion: 'Take a moment to write down what made this conversation special to you.'
      },
      {
        id: '2',
        type: 'journal',
        title: 'Finding balance in chaos',
        content: 'Today was particularly overwhelming with work deadlines piling up. I noticed my anxiety building throughout the morning, but took a 15-minute walk outside during lunch which helped clear my mind. I&apos;m learning that small breaks make a big difference in my mental state.',
        tags: ['anxious', 'calm'],
        timestamp: '2025-04-09T18:45:00Z'
      },
      {
        id: '3',
        type: 'mood',
        mood: 'anxious',
        context: 'Big presentation tomorrow, feeling the pressure.',
        timestamp: '2025-04-08T20:15:00Z',
        suggestion: 'Try the 5-4-3-2-1 grounding technique to calm your nerves.'
      },
      {
        id: '4',
        type: 'journal',
        title: 'Unexpected moments of joy',
        content: 'Had a surprise video call with my college friends today. We haven&apos;t all been together in one call for months, and hearing everyone&apos;s laughter made me realize how much I&apos;ve missed them. These connections are so precious.',
        tags: ['happy', 'love'],
        timestamp: '2025-04-07T16:20:00Z'
      },
      {
        id: '5',
        type: 'mood',
        mood: 'calm',
        context: 'Morning meditation session really centered me for the day.',
        timestamp: '2025-04-06T08:45:00Z',
        suggestion: 'Consider making this a daily ritual to maintain your sense of calm.'
      }
    ];
    
    setSavedEntries(mockEntries);
  }, []);
  
  const getMoodColor = (mood: string) => {
    const colors = {
      happy: 'bg-mood-happy text-white',
      calm: 'bg-mood-calm text-white',
      sad: 'bg-mood-sad text-white',
      anxious: 'bg-mood-anxious text-white',
      energetic: 'bg-mood-energetic text-white',
      love: 'bg-mood-love text-white',
      neutral: 'bg-mood-neutral text-white'
    };
    return colors[mood as keyof typeof colors] || 'bg-muted text-muted-foreground';
  };
  
  const filtered = savedEntries.filter(entry => {
    if (filterMood === 'all') return true;
    if (entry.type === 'mood') return entry.mood === filterMood;
    if (entry.type === 'journal') return entry.tags.includes(filterMood);
    return true;
  });
  
  const moodEntries = filtered.filter(entry => entry.type === 'mood');
  const journalEntries = filtered.filter(entry => entry.type === 'journal');
  
  return (
    <div className="min-h-screen bg-background flex">
      <Navigation />
      
      <div className="flex-1 flex flex-col">
        <Header toggleTheme={toggleTheme} theme={theme} />
        
        <main className="flex-1 container max-w-5xl py-6 px-4 md:py-10 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Saved Moments</h1>
            
            <div className="flex gap-2 items-center">
              <span className="text-sm text-muted-foreground">Filter by mood:</span>
              <Select value={filterMood} onValueChange={setFilterMood}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by mood" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All moods</SelectItem>
                  <SelectItem value="happy">Happy</SelectItem>
                  <SelectItem value="calm">Calm</SelectItem>
                  <SelectItem value="sad">Sad</SelectItem>
                  <SelectItem value="anxious">Anxious</SelectItem>
                  <SelectItem value="energetic">Energetic</SelectItem>
                  <SelectItem value="love">Love</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Entries</TabsTrigger>
              <TabsTrigger value="moods">Mood Logs</TabsTrigger>
              <TabsTrigger value="journals">Journal Entries</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              {filtered.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2">
                  {filtered.map(entry => 
                    entry.type === 'mood' ? 
                      <MoodCard key={entry.id} entry={entry} moodColor={getMoodColor(entry.mood)} /> :
                      <JournalCard key={entry.id} entry={entry} getMoodColor={getMoodColor} />
                  )}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">No saved entries matching your filters.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="moods">
              {moodEntries.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2">
                  {moodEntries.map(entry => (
                    <MoodCard 
                      key={entry.id} 
                      entry={entry} 
                      moodColor={getMoodColor(entry.mood)} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">No saved mood entries matching your filters.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="journals">
              {journalEntries.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2">
                  {journalEntries.map(entry => (
                    <JournalCard 
                      key={entry.id} 
                      entry={entry} 
                      getMoodColor={getMoodColor} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">No saved journal entries matching your filters.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

interface MoodCardProps {
  entry: MoodEntry;
  moodColor: string;
}

const MoodCard = ({ entry, moodColor }: MoodCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-all">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${moodColor}`}></div>
            <CardTitle className="text-lg capitalize">{entry.mood}</CardTitle>
          </div>
          <CardDescription>
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {format(parseISO(entry.timestamp), 'MMM d, yyyy')}
            </div>
          </CardDescription>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <p className="text-sm mb-4">{entry.context}</p>
        {entry.suggestion && (
          <div className="bg-primary/10 p-3 rounded-lg">
            <p className="text-xs font-medium mb-1">Suggested micro-habit:</p>
            <p className="text-sm">{entry.suggestion}</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-0">
        <div className="flex items-center justify-between w-full">
          <Badge variant="outline" className="gap-1">
            <Star className="h-3 w-3" />
            Mood Log
          </Badge>
          
          <Button variant="ghost" size="sm" className="text-xs">
            <Eye className="h-3 w-3 mr-1" />
            View Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

interface JournalCardProps {
  entry: JournalEntry;
  getMoodColor: (mood: string) => string;
}

const JournalCard = ({ entry, getMoodColor }: JournalCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-all">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="text-lg line-clamp-1">{entry.title}</CardTitle>
          <CardDescription>
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {format(parseISO(entry.timestamp), 'MMM d, yyyy')}
            </div>
          </CardDescription>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <p className="text-sm line-clamp-3">{entry.content}</p>
        <div className="flex flex-wrap gap-1 mt-3">
          {entry.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="capitalize">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <div className="flex items-center justify-between w-full">
          <Badge variant="outline" className="gap-1">
            <BookText className="h-3 w-3" />
            Journal
          </Badge>
          
          <Button variant="ghost" size="sm" className="text-xs">
            <Eye className="h-3 w-3 mr-1" />
            View Full Entry
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SavedPage;
