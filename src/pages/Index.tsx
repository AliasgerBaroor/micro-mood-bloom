
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import MoodSelector, { type MoodType } from '@/components/MoodSelector';
import JournalEntry from '@/components/JournalEntry';
import MoodInsights from '@/components/MoodInsights';
import { useTheme } from '@/hooks/useTheme';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import Navigation from '@/components/Navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface JournalEntryData {
  id: string;
  mood: MoodType;
  content: string;
  timestamp: Date;
}

const Index = () => {
  const { theme, toggleTheme } = useTheme();
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [journalEntries, setJournalEntries] = useState<JournalEntryData[]>([]);
  const [contextNote, setContextNote] = useState('');
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const { toast } = useToast();

  const handleSaveEntry = (content: string) => {
    if (!selectedMood) return;
    
    const newEntry = {
      id: Date.now().toString(),
      mood: selectedMood,
      content,
      timestamp: new Date()
    };
    
    setJournalEntries(prev => [newEntry, ...prev]);
    // This would be where you'd save to a database in a real app
    console.log('Saved entry:', newEntry);
  };

  const handleLogMood = () => {
    if (!selectedMood) {
      toast({
        title: "Please select a mood",
        description: "Choose how you're feeling before logging",
        variant: "destructive",
      });
      return;
    }
    
    // Save the mood entry
    const newEntry = {
      id: Date.now().toString(),
      mood: selectedMood,
      content: contextNote,
      timestamp: new Date()
    };
    
    setJournalEntries(prev => [newEntry, ...prev]);
    
    // Show suggestion and animation
    setShowSuggestion(true);
    setShowSparkles(true);
    
    // Reset the animation after a delay
    setTimeout(() => {
      setShowSparkles(false);
    }, 3000);
    
    // Feedback toast
    toast({
      title: "Mood Logged",
      description: "We've suggested a micro-habit based on your mood",
    });
  };

  const currentDate = format(new Date(), 'EEEE, MMMM d, yyyy');
  
  // Generate suggestions based on mood
  const getMicroHabitSuggestion = () => {
    if (!selectedMood) return null;
    
    const suggestions = {
      happy: [
        "Journal about what made you happy for 5 minutes",
        "Share your positive energy with someone else today",
        "Take a moment to express gratitude for three things"
      ],
      calm: [
        "Practice deep breathing for 2 minutes to maintain this calm",
        "Listen to soothing music while doing a small task",
        "Take a short mindful walk outside"
      ],
      sad: [
        "Write down your feelings for 5 minutes without judgment",
        "Listen to a comforting song that validates your emotions",
        "Take a warm shower or bath to soothe yourself"
      ],
      anxious: [
        "Try the 5-4-3-2-1 grounding technique (notice 5 things you see, 4 things you feel, etc.)",
        "Take 10 slow, deep breaths while counting",
        "Step outside for 5 minutes of fresh air"
      ],
      energetic: [
        "Channel your energy into a 10-minute exercise session",
        "Tackle a small task you've been putting off",
        "Dance to your favorite upbeat song"
      ],
      love: [
        "Write a short note to someone you care about",
        "Do a small act of kindness for yourself or others",
        "Call or message someone important to you"
      ],
      neutral: [
        "Try a 5-minute meditation to check in with yourself",
        "Journal about what you'd like to feel more of today",
        "Take a brief walk to stimulate your senses"
      ]
    };
    
    const moodSuggestions = suggestions[selectedMood];
    const randomIndex = Math.floor(Math.random() * moodSuggestions.length);
    return moodSuggestions[randomIndex];
  };
  
  return (
    <div className="min-h-screen bg-background flex">
      <Navigation />
      
      <div className="flex-1 flex flex-col">
        <Header toggleTheme={toggleTheme} theme={theme} />
        
        <main className="flex-1 container max-w-5xl py-6 px-4 md:py-10 md:px-6 relative">
          <div className="space-y-10">
            {/* Date Display */}
            <div className="text-center">
              <p className="text-muted-foreground">{currentDate}</p>
              <h1 className="text-2xl md:text-3xl font-bold mt-2">How are you feeling right now?</h1>
            </div>
            
            {/* Mood Selection */}
            <section className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
              <MoodSelector selectedMood={selectedMood} setSelectedMood={setSelectedMood} />
            </section>
            
            {/* Context Question */}
            <section className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
              <h2 className="text-lg font-semibold mb-4">What's happening?</h2>
              <div className="space-y-4">
                <Input
                  placeholder="Share some context about how you're feeling..."
                  value={contextNote}
                  onChange={(e) => setContextNote(e.target.value)}
                  className="w-full"
                />
                <div className="flex justify-end">
                  <Button 
                    onClick={handleLogMood}
                    className="group"
                    disabled={!selectedMood}
                  >
                    Log Mood
                  </Button>
                </div>
              </div>
            </section>
            
            {/* Suggestion Section */}
            {showSuggestion && (
              <section className="bg-gradient-to-br from-background to-accent/10 rounded-xl p-6 shadow-md relative overflow-hidden">
                <h2 className="text-lg font-semibold mb-4">Your Personalized Micro-Habit</h2>
                <div className="text-center py-4 px-2">
                  <p className="text-xl font-medium">{getMicroHabitSuggestion()}</p>
                </div>
                
                {showSparkles && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 animate-float">
                      <Sparkles className="text-accent/60" size={24} />
                    </div>
                    <div className="absolute top-3/4 left-1/2 animate-float" style={{animationDelay: '0.5s'}}>
                      <Sparkles className="text-primary/60" size={20} />
                    </div>
                    <div className="absolute top-1/3 right-1/4 animate-float" style={{animationDelay: '1s'}}>
                      <Sparkles className="text-accent/60" size={16} />
                    </div>
                    <div className="absolute bottom-1/4 right-1/3 animate-float" style={{animationDelay: '1.5s'}}>
                      <Sparkles className="text-primary/60" size={18} />
                    </div>
                  </div>
                )}
              </section>
            )}
            
            <Separator className="my-8" />
            
            {/* Quick Journal Section */}
            <section className="space-y-6">
              <h2 className="text-xl font-semibold">Want to journal more?</h2>
              <JournalEntry selectedMood={selectedMood} onSaveEntry={handleSaveEntry} />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
