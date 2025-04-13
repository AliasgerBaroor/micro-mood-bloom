
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { type MoodType } from './MoodSelector';
import { useToast } from '@/hooks/use-toast';
import { Send, Save, Download, ImageIcon } from 'lucide-react';

interface JournalEntryProps {
  selectedMood: MoodType | null;
  onSaveEntry: (entry: string) => void;
}

const getPromptForMood = (mood: MoodType): string => {
  const prompts = {
    happy: 'What made you happy today? How can you create more moments like this?',
    calm: 'Describe the peaceful moments in your day. What contributed to your sense of calm?',
    sad: "What's weighing on your mind today? Remember that all emotions are valid.",
    anxious: "What's causing you to feel anxious? Try naming specific thoughts or concerns.",
    energetic: "What's giving you energy today? How might you channel this positively?",
    love: 'What or who are you feeling connected to today? How does this affect you?',
    neutral: 'How would you describe your neutral state today? Is it peaceful, empty, or balanced?'
  };
  
  return prompts[mood];
};

// Function to generate image prompt based on mood
const getImagePromptForMood = (mood: MoodType): string => {
  const imagePrompts = {
    happy: 'A field of sunflowers under a bright sky',
    calm: 'A peaceful glowing forest with golden sunlight',
    sad: 'A safe cozy cabin during a gentle snowfall',
    anxious: 'A calm lake at sunrise with fog lifting',
    energetic: 'A mountain peak with sunrise and soaring birds',
    love: 'A warm hug between two people, painted in pastels',
    neutral: 'A quiet garden path with soft colors and gentle light'
  };
  
  return imagePrompts[mood];
};

// Function to check if mood is positive or negative
const isPositiveMood = (mood: MoodType): boolean => {
  const positiveMoods = ['happy', 'calm', 'energetic', 'love'];
  return positiveMoods.includes(mood);
};

const JournalEntry: React.FC<JournalEntryProps> = ({ selectedMood, onSaveEntry }) => {
  const [entry, setEntry] = useState<string>('');
  const [showMoodScape, setShowMoodScape] = useState<boolean>(false);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
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
    
    // Generate MoodScape image after saving entry
    setLoadingImage(true);
    // Simulate API call to generate image
    setTimeout(() => {
      setShowMoodScape(true);
      setLoadingImage(false);
    }, 1500);
    
    toast({
      title: "Journal entry saved",
      description: "Your reflection has been recorded",
    });
  };
  
  const handleDownloadImage = () => {
    toast({
      title: "Image downloaded",
      description: "MoodScape saved to your device",
    });
  };
  
  const handleSaveToGallery = () => {
    toast({
      title: "Added to gallery",
      description: "MoodScape saved to your Mood Gallery",
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
          
          {/* MoodScape Image Section */}
          {loadingImage && (
            <div className="mt-8 p-6 border rounded-lg bg-accent/10 animate-pulse flex flex-col items-center justify-center min-h-[300px]">
              <ImageIcon size={48} className="text-muted-foreground animate-pulse mb-4" />
              <p className="text-muted-foreground">Creating your MoodScape...</p>
            </div>
          )}
          
          {showMoodScape && !loadingImage && selectedMood && (
            <div className="mt-8 animate-fade-in">
              <div className="p-4 border rounded-lg bg-accent/10">
                <h3 className="text-lg font-medium mb-2">Your MoodScape</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Here's a visual to match your feeling. Take a moment to breathe.
                </p>
                
                <div className="relative rounded-lg overflow-hidden animate-scale-in">
                  {/* Placeholder image based on mood */}
                  <div 
                    className={`w-full h-64 md:h-80 bg-gradient-to-br ${
                      isPositiveMood(selectedMood) 
                        ? 'from-mood-' + selectedMood + '/20 to-mood-' + selectedMood + '/60' 
                        : 'from-blue-50 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30'
                    } flex items-center justify-center`}
                  >
                    <p className="text-center p-4 font-medium">
                      {getImagePromptForMood(selectedMood)}
                    </p>
                  </div>
                  
                  <div className="absolute inset-0 shadow-inner"></div>
                </div>
                
                <p className="text-xs italic text-center mt-2">
                  {isPositiveMood(selectedMood) 
                    ? "Celebrate this positive energy" 
                    : "Find peace in this calming scene"}
                </p>
                
                <div className="flex justify-between mt-4">
                  <Button variant="outline" size="sm" onClick={handleDownloadImage}>
                    <Download size={16} className="mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleSaveToGallery}>
                    <ImageIcon size={16} className="mr-2" />
                    Save to Gallery
                  </Button>
                </div>
              </div>
            </div>
          )}
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
