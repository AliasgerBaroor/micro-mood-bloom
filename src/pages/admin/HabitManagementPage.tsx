
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Habit {
  id: string;
  title: string;
  description: string;
  moodTag: string;
}

const moodTypes = [
  'happy', 'sad', 'anxious', 'calm', 'angry', 'excited',
  'bored', 'hopeful', 'overwhelmed', 'curious'
];

const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  moodTag: z.string().min(1, { message: 'Please select a mood tag' }),
});

type FormValues = z.infer<typeof formSchema>;

const HabitManagementPage = () => {
  const { toast } = useToast();
  const [habits, setHabits] = useState<Habit[]>([
    { id: '1', title: 'Deep Breathing', description: 'Take 5 deep breaths, holding for 4 counts', moodTag: 'anxious' },
    { id: '2', title: 'Gratitude Journaling', description: 'Write down 3 things you are grateful for', moodTag: 'sad' },
    { id: '3', title: 'Quick Walk', description: 'Take a 10-minute walk outside', moodTag: 'overwhelmed' },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentHabit, setCurrentHabit] = useState<Habit | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterMood, setFilterMood] = useState<string>('all');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      moodTag: '',
    },
  });

  const onOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      form.reset();
      setIsEditing(false);
      setCurrentHabit(null);
    }
  };

  const onSubmit = (values: FormValues) => {
    if (isEditing && currentHabit) {
      // Update existing habit
      setHabits(habits.map(habit => 
        habit.id === currentHabit.id 
          ? { ...habit, title: values.title, description: values.description, moodTag: values.moodTag } 
          : habit
      ));
      toast({
        title: "Habit updated",
        description: `"${values.title}" has been updated`,
      });
    } else {
      // Add new habit
      const newHabit = {
        id: `${habits.length + 1}`,
        title: values.title,
        description: values.description,
        moodTag: values.moodTag,
      };
      setHabits([...habits, newHabit]);
      toast({
        title: "Habit added",
        description: `"${values.title}" has been added to the library`,
      });
    }
    setDialogOpen(false);
    form.reset();
  };

  const handleEdit = (habit: Habit) => {
    setIsEditing(true);
    setCurrentHabit(habit);
    form.reset({
      title: habit.title,
      description: habit.description,
      moodTag: habit.moodTag,
    });
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setHabits(habits.filter(habit => habit.id !== id));
    toast({
      title: "Habit removed",
      description: "The habit has been removed from the library",
    });
  };

  const filteredHabits = filterMood === 'all' 
    ? habits 
    : habits.filter(habit => habit.moodTag === filterMood);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Micro-Habit Management</h1>
        <Dialog open={dialogOpen} onOpenChange={onOpenChange}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Habit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {isEditing ? 'Edit Habit' : 'Add New Habit'}
              </DialogTitle>
              <DialogDescription>
                {isEditing 
                  ? 'Update the habit\'s information.' 
                  : 'Create a new micro-habit for users.'}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Habit title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Short description of the habit" 
                          rows={3}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="moodTag"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Related Mood</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a mood" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {moodTypes.map((mood) => (
                            <SelectItem key={mood} value={mood}>
                              {mood.charAt(0).toUpperCase() + mood.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">
                    {isEditing ? 'Update' : 'Add'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Filter by mood:</p>
          <Select value={filterMood} onValueChange={setFilterMood}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by mood" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Moods</SelectItem>
              {moodTypes.map((mood) => (
                <SelectItem key={mood} value={mood}>
                  {mood.charAt(0).toUpperCase() + mood.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredHabits.map((habit) => (
          <Card key={habit.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{habit.title}</CardTitle>
                  <CardDescription>
                    <span className="inline-flex items-center px-2 py-1 mt-2 rounded-full text-xs bg-primary/10 text-primary">
                      {habit.moodTag.charAt(0).toUpperCase() + habit.moodTag.slice(1)}
                    </span>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{habit.description}</p>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handleEdit(habit)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handleDelete(habit.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HabitManagementPage;
