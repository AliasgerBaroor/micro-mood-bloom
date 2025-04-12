
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { type MoodType } from './MoodSelector';

// Mock data for the emotion chart
const emotionData = [
  { date: 'Mon', happy: 7, calm: 5, sad: 2, anxious: 3, energetic: 6, love: 4, neutral: 3 },
  { date: 'Tue', happy: 5, calm: 6, sad: 3, anxious: 4, energetic: 5, love: 5, neutral: 2 },
  { date: 'Wed', happy: 4, calm: 7, sad: 4, anxious: 2, energetic: 4, love: 6, neutral: 3 },
  { date: 'Thu', happy: 6, calm: 5, sad: 2, anxious: 1, energetic: 7, love: 5, neutral: 4 },
  { date: 'Fri', happy: 7, calm: 4, sad: 1, anxious: 2, energetic: 8, love: 6, neutral: 2 },
  { date: 'Sat', happy: 8, calm: 6, sad: 0, anxious: 1, energetic: 7, love: 7, neutral: 1 },
  { date: 'Sun', happy: 6, calm: 7, sad: 1, anxious: 2, energetic: 6, love: 5, neutral: 3 },
];

// This would typically come from your emotion tracking data
const dominantMood: MoodType = 'calm';

// This would be generated based on the user's mood patterns
const habitSuggestions = {
  'happy': [
    { title: 'Express Gratitude', description: 'Write down three things you're grateful for to sustain positive feelings.' },
    { title: 'Share Joy', description: 'Reach out to someone you care about to share your positive energy.' }
  ],
  'calm': [
    { title: 'Deep Breathing', description: 'Take 5 minutes for deep breathing exercises to maintain your peaceful state.' },
    { title: 'Nature Walk', description: 'Spend time outdoors to reinforce your sense of calm and groundedness.' }
  ],
  'sad': [
    { title: 'Gentle Movement', description: 'Try some light stretching or a short walk to shift your energy.' },
    { title: 'Connect with Someone', description: 'Reach out to a supportive friend or family member.' }
  ],
  'anxious': [
    { title: '5-4-3-2-1 Grounding', description: 'Notice 5 things you see, 4 things you feel, 3 things you hear, 2 things you smell, and 1 thing you taste.' },
    { title: 'Limit Stimulation', description: 'Reduce screen time and create a calm environment for the next hour.' }
  ],
  'energetic': [
    { title: 'Channel Your Energy', description: 'Tackle a creative project or exercise to use your energy productively.' },
    { title: 'Plan and Organize', description: 'Use this energy to plan your week or organize a space.' }
  ],
  'love': [
    { title: 'Express Affection', description: 'Send a thoughtful message to someone you care about.' },
    { title: 'Self-Care Ritual', description: 'Do something nurturing for yourself that makes you feel loved.' }
  ],
  'neutral': [
    { title: 'Try Something New', description: 'This is a good state for exploring a new activity or interest.' },
    { title: 'Mindful Observation', description: 'Take a few minutes to simply observe your surroundings without judgment.' }
  ]
};

interface MoodInsightsProps {
  selectedMood: MoodType | null;
}

const MoodInsights: React.FC<MoodInsightsProps> = ({ selectedMood }) => {
  // Select habits based on dominant mood or currently selected mood
  const moodForHabits = selectedMood || dominantMood;
  const suggestedHabits = habitSuggestions[moodForHabits];
  
  const moodColors = {
    happy: '#FFD166',
    calm: '#118AB2',
    sad: '#073B4C',
    anxious: '#EF476F',
    energetic: '#06D6A0',
    love: '#F2BAC9',
    neutral: '#8A898C'
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-5">
          <h2 className="text-lg font-semibold mb-4">Your Emotional Journey</h2>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={emotionData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <defs>
                  {Object.entries(moodColors).map(([mood, color]) => (
                    <linearGradient key={mood} id={`color${mood}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                      <stop offset="95%" stopColor={color} stopOpacity={0.2} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="date" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="happy" 
                  stroke={moodColors.happy} 
                  fillOpacity={1} 
                  fill="url(#colorhappy)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="calm" 
                  stroke={moodColors.calm} 
                  fillOpacity={1} 
                  fill="url(#colorcalm)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="sad" 
                  stroke={moodColors.sad} 
                  fillOpacity={1} 
                  fill="url(#colorsad)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="anxious" 
                  stroke={moodColors.anxious} 
                  fillOpacity={1} 
                  fill="url(#coloranxious)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="energetic" 
                  stroke={moodColors.energetic} 
                  fillOpacity={1} 
                  fill="url(#colorenergetic)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="love" 
                  stroke={moodColors.love} 
                  fillOpacity={1} 
                  fill="url(#colorlove)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="neutral" 
                  stroke={moodColors.neutral} 
                  fillOpacity={1} 
                  fill="url(#colorneutral)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Suggested Micro-Habits</h2>
        <p className="text-sm text-muted-foreground">
          Based on your {selectedMood ? 'current' : 'dominant'} mood: <span className="font-medium">{moodForHabits}</span>
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestedHabits.map((habit, index) => (
            <div 
              key={index} 
              className={`habit-card border-mood-${moodForHabits} animate-float`}
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              <h3 className="text-base font-medium mb-1">{habit.title}</h3>
              <p className="text-sm text-muted-foreground">{habit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodInsights;
