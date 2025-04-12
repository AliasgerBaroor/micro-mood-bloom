
import React, { useState } from 'react';
import Header from '@/components/Header';
import MoodSelector, { type MoodType } from '@/components/MoodSelector';
import JournalEntry from '@/components/JournalEntry';
import MoodInsights from '@/components/MoodInsights';
import { useTheme } from '@/hooks/useTheme';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

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
    
    toast({
      title: "Insight Generated",
      description: `Based on your entry, we've suggested some micro-habits to balance your ${selectedMood} mood.`,
    });
  };

  const currentDate = format(new Date(), 'EEEE, MMMM d, yyyy');
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header toggleTheme={toggleTheme} theme={theme} />
      
      <main className="flex-1 container max-w-5xl py-6 px-4 md:py-10 md:px-6">
        <div className="space-y-10">
          {/* Date Display */}
          <div className="text-center">
            <p className="text-muted-foreground">{currentDate}</p>
            <h1 className="text-2xl md:text-3xl font-bold mt-2">Your Emotional Wellness Journal</h1>
          </div>
          
          {/* Mood Selection */}
          <section className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
            <MoodSelector selectedMood={selectedMood} setSelectedMood={setSelectedMood} />
          </section>
          
          {/* Journal Entry */}
          <section>
            <JournalEntry selectedMood={selectedMood} onSaveEntry={handleSaveEntry} />
          </section>
          
          <Separator className="my-8" />
          
          {/* Insights and Suggestions Section */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold">Insights & Micro-Habits</h2>
            <MoodInsights selectedMood={selectedMood} />
          </section>
        </div>
      </main>
      
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>MicroMood - Nurturing emotional balance through mindful reflection</p>
      </footer>
    </div>
  );
};

export default Index;
