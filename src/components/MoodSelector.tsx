
import React from 'react';
import { Smile, Heart, Coffee, Battery, CloudRain, Zap, Meh } from 'lucide-react';
import { cn } from '@/lib/utils';

export type MoodType = 'happy' | 'calm' | 'sad' | 'anxious' | 'energetic' | 'love' | 'neutral';

interface MoodSelectorProps {
  selectedMood: MoodType | null;
  setSelectedMood: (mood: MoodType) => void;
}

interface MoodOption {
  type: MoodType;
  icon: React.ReactNode;
  label: string;
  color: string;
  bgColor: string;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, setSelectedMood }) => {
  const moods: MoodOption[] = [
    { type: 'happy', icon: <Smile size={24} />, label: 'Happy', color: 'text-mood-happy', bgColor: 'bg-mood-happy' },
    { type: 'calm', icon: <Coffee size={24} />, label: 'Calm', color: 'text-mood-calm', bgColor: 'bg-mood-calm' },
    { type: 'sad', icon: <CloudRain size={24} />, label: 'Sad', color: 'text-mood-sad', bgColor: 'bg-mood-sad' },
    { type: 'anxious', icon: <Battery size={24} />, label: 'Anxious', color: 'text-mood-anxious', bgColor: 'bg-mood-anxious' },
    { type: 'energetic', icon: <Zap size={24} />, label: 'Energetic', color: 'text-mood-energetic', bgColor: 'bg-mood-energetic' },
    { type: 'love', icon: <Heart size={24} />, label: 'Love', color: 'text-mood-love', bgColor: 'bg-mood-love' },
    { type: 'neutral', icon: <Meh size={24} />, label: 'Neutral', color: 'text-mood-neutral', bgColor: 'bg-mood-neutral' },
  ];

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-4">How are you feeling today?</h2>
      <div className="flex flex-wrap justify-center gap-6 mb-6">
        {moods.map((mood) => (
          <div
            key={mood.type}
            className={cn(
              "mood-bubble w-14 h-14 flex items-center justify-center",
              selectedMood === mood.type ? 
                `${mood.bgColor} text-white scale-110` : 
                "bg-white dark:bg-slate-800 text-muted-foreground"
            )}
            onClick={() => setSelectedMood(mood.type)}
          >
            {mood.icon}
            <span className="mood-label">{mood.label}</span>
          </div>
        ))}
      </div>
      {selectedMood && (
        <div className={cn(
          "text-center py-2 px-4 rounded-full mx-auto w-fit",
          `bg-mood-${selectedMood}/15 text-mood-${selectedMood}`
        )}>
          Feeling {moods.find(m => m.type === selectedMood)?.label}
        </div>
      )}
    </div>
  );
};

export default MoodSelector;
