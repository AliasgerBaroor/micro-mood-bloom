
import React, { useState } from 'react';
import Header from '@/components/Header';
import { useTheme } from '@/hooks/useTheme';
import Navigation from '@/components/Navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { format, subDays, eachDayOfInterval } from 'date-fns';

// Mock data for visualizations
const generateMockMoodData = () => {
  const today = new Date();
  const data = eachDayOfInterval({
    start: subDays(today, 30),
    end: today
  }).map(date => {
    const dayNum = date.getDay();
    // Create patterns in the data
    let moodValue;
    if (dayNum === 1) { // Mondays tend to be lower
      moodValue = Math.random() * 40 + 10;
    } else if (dayNum === 5) { // Fridays tend to be higher
      moodValue = Math.random() * 40 + 50;
    } else {
      moodValue = Math.random() * 100;
    }
    
    // Determine the mood type based on the value
    let mood;
    if (moodValue > 80) mood = 'happy';
    else if (moodValue > 65) mood = 'energetic';
    else if (moodValue > 50) mood = 'calm';
    else if (moodValue > 35) mood = 'neutral';
    else if (moodValue > 20) mood = 'anxious';
    else mood = 'sad';
    
    return {
      date: format(date, 'MMM dd'),
      fullDate: date,
      value: moodValue,
      mood
    };
  });
  
  return data;
};

const getMoodColor = (mood: string) => {
  const colors = {
    happy: '#FFD166',
    calm: '#118AB2',
    sad: '#073B4C',
    anxious: '#EF476F',
    energetic: '#06D6A0',
    love: '#F2BAC9',
    neutral: '#8A898C'
  };
  return colors[mood as keyof typeof colors] || colors.neutral;
};

const InsightsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [timeRange, setTimeRange] = useState('month');
  const moodData = generateMockMoodData();
  
  // Calculate mood distribution
  const moodDistribution = moodData.reduce((acc, item) => {
    if (!acc[item.mood]) acc[item.mood] = 0;
    acc[item.mood]++;
    return acc;
  }, {} as Record<string, number>);
  
  const moodPercentages = Object.entries(moodDistribution).map(([mood, count]) => ({
    mood,
    percentage: Math.round((count / moodData.length) * 100)
  }));
  
  // Find predominant mood
  const predominantMood = moodPercentages.reduce((max, item) => 
    item.percentage > max.percentage ? item : max, { mood: '', percentage: 0 }
  ).mood;
  
  // Calculate daily average
  const dailyAverages = moodData.reduce((acc, item) => {
    const dayOfWeek = format(item.fullDate, 'EEEE');
    if (!acc[dayOfWeek]) {
      acc[dayOfWeek] = { total: 0, count: 0 };
    }
    acc[dayOfWeek].total += item.value;
    acc[dayOfWeek].count++;
    return acc;
  }, {} as Record<string, { total: number, count: number }>);
  
  const weekdayData = Object.entries(dailyAverages).map(([day, data]) => ({
    day,
    average: data.total / data.count
  }));
  
  // Find day with lowest average
  const lowestDay = weekdayData.reduce((min, item) => 
    item.average < min.average ? item : min, { day: '', average: 100 }
  ).day;
  
  return (
    <div className="min-h-screen bg-background flex">
      <Navigation />
      
      <div className="flex-1 flex flex-col">
        <Header toggleTheme={toggleTheme} theme={theme} />
        
        <main className="flex-1 container max-w-5xl py-6 px-4 md:py-10 md:px-6">
          <h1 className="text-3xl font-bold mb-6">Mood Insights</h1>
          
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-medium">Your emotional journey</h2>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Past week</SelectItem>
                <SelectItem value="month">Past month</SelectItem>
                <SelectItem value="year">Past year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-8">
            {/* Key Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
                <CardDescription>Summary of your emotional patterns</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="p-4 rounded-lg bg-accent/20 dark:bg-accent/10">
                  <h3 className="text-sm font-medium mb-1">Predominant Mood</h3>
                  <p className="text-2xl font-bold capitalize">{predominantMood}</p>
                  <p className="text-sm text-muted-foreground">over the past month</p>
                </div>
                
                <div className="p-4 rounded-lg bg-accent/20 dark:bg-accent/10">
                  <h3 className="text-sm font-medium mb-1">You've been calm</h3>
                  <p className="text-2xl font-bold">{moodPercentages.find(m => m.mood === 'calm')?.percentage || 0}%</p>
                  <p className="text-sm text-muted-foreground">of the time this month</p>
                </div>
                
                <div className="p-4 rounded-lg bg-accent/20 dark:bg-accent/10">
                  <h3 className="text-sm font-medium mb-1">Mood Dip</h3>
                  <p className="text-2xl font-bold">{lowestDay}s</p>
                  <p className="text-sm text-muted-foreground">tend to have a slightly lower mood</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Charts */}
            <Tabs defaultValue="line">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="line">Line Chart</TabsTrigger>
                <TabsTrigger value="bar">Bar Chart</TabsTrigger>
                <TabsTrigger value="distribution">Mood Distribution</TabsTrigger>
              </TabsList>
              
              <TabsContent value="line" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Mood Over Time</CardTitle>
                    <CardDescription>Your emotional journey throughout the {timeRange}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={moodData}
                          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis dataKey="date" />
                          <YAxis hide />
                          <Tooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="flex flex-col">
                                        <span className="text-sm font-medium text-muted-foreground">
                                          Date
                                        </span>
                                        <span className="font-medium">
                                          {data.date}
                                        </span>
                                      </div>
                                      <div className="flex flex-col">
                                        <span className="text-sm font-medium text-muted-foreground">
                                          Mood
                                        </span>
                                        <span className="font-medium capitalize">
                                          {data.mood}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#9b87f5"
                            strokeWidth={2}
                            dot={({ cx, cy, payload }) => (
                              <circle
                                cx={cx}
                                cy={cy}
                                r={4}
                                fill={getMoodColor(payload.mood)}
                                stroke="none"
                              />
                            )}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="bar" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Daily Mood Averages</CardTitle>
                    <CardDescription>How your mood varies by day of the week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={weekdayData}
                          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis dataKey="day" />
                          <YAxis hide />
                          <Tooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="flex flex-col">
                                        <span className="text-sm font-medium text-muted-foreground">
                                          Day
                                        </span>
                                        <span className="font-medium">
                                          {data.day}
                                        </span>
                                      </div>
                                      <div className="flex flex-col">
                                        <span className="text-sm font-medium text-muted-foreground">
                                          Average
                                        </span>
                                        <span className="font-medium">
                                          {Math.round(data.average)}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Bar dataKey="average" radius={[4, 4, 0, 0]}>
                            {weekdayData.map((entry, index) => {
                              let color = '#9b87f5';
                              if (entry.day === lowestDay) color = '#EF476F';
                              return <Cell key={`cell-${index}`} fill={color} />;
                            })}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="distribution" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Mood Distribution</CardTitle>
                    <CardDescription>Breakdown of your emotional states this {timeRange}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={moodPercentages}
                          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                          layout="vertical"
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} horizontal={false} />
                          <XAxis type="number" hide />
                          <YAxis type="category" dataKey="mood" width={80} />
                          <Tooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="flex flex-col">
                                        <span className="text-sm font-medium text-muted-foreground">
                                          Mood
                                        </span>
                                        <span className="font-medium capitalize">
                                          {data.mood}
                                        </span>
                                      </div>
                                      <div className="flex flex-col">
                                        <span className="text-sm font-medium text-muted-foreground">
                                          Percentage
                                        </span>
                                        <span className="font-medium">
                                          {data.percentage}%
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Bar dataKey="percentage" radius={[0, 4, 4, 0]}>
                            {moodPercentages.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={getMoodColor(entry.mood)} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InsightsPage;
