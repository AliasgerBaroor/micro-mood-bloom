
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { type MoodType } from './MoodSelector';
import { useToast } from '@/hooks/use-toast';
import { Send, Save } from 'lucide-react';

interface JournalEntryProps {
  selectedMood: MoodType | null;
  onSaveEntry: (entry: string) => void;
}

const getPromptForMood = (mood: MoodType): string => {
  const prompts = {
    happy: 'What made you happy today? How can you create more moments like this?',
    calm: 'Describe the peaceful moments in your day. What contributed to your sense of calm?',
    sad: 'What's weighing on your mind today? Remember that all emotions are valid.',
    anxious: 'What's causing you to feel anxious? Try naming specific thoughts or concerns.',
    energetic: 'What's giving you energy today? How might you channel this positively?',
    love: 'What or who are you feeling connected to today? How does this affect you?',
    neutral: 'How would you describe your neutral state today? Is it peaceful, empty, or balanced?'
  };
  
  return prompts[mood];
};

const JournalEntry: React.FC<JournalEntryProps> = ({ selectedMood, onSaveEntry }) => {
  const [entry, setEntry] = useState<string>('');
  const { toast } = useToast();
  
  const handleSave = () => {
    if (!entry.trim()) {
      toast({
        title: "Entry cannot be empty",
        description: "Please write something before saving",
        variant: "destructive"
      });
      return;
    }
    
    onSaveEntry(entry);
    setEntry('');
    
    toast({
      title: "Journal entry saved",
      description: "Your reflection has been recorded",
    });
  };

  return (
    <div className="journal-card">
      <h2 className="text-lg font-semibold mb-3">Journal your thoughts</h2>
      
      {selectedMood ? (
        <>
          <p className="text-sm text-muted-foreground mb-4">
            {getPromptForMood(selectedMood)}
          </p>
          
          <Textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Write your thoughts here..."
            className="min-h-[120px] mb-4"
          />
          
          <div className="flex justify-end">
            <Button 
              onClick={handleSave} 
              className="group"
              disabled={!entry.trim()}
            >
              <Save size={16} className="mr-2 group-hover:animate-pulse" />
              Save Entry
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center text-muted-foreground py-8">
          Select a mood above to begin journaling
        </div>
      )}
    </div>
  );
};

export default JournalEntry;
