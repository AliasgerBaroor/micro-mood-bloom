
import React, { useState } from 'react';
import Header from '@/components/Header';
import { useTheme } from '@/hooks/useTheme';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parseISO } from 'date-fns';
import { Edit, Plus, Bookmark, Hash, Bold, Italic, List, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { type MoodType } from '@/components/MoodSelector';

interface JournalEntryType {
  id: string;
  title: string;
  content: string;
  date: string;
  tags: MoodType[];
  isSaved: boolean;
}

// Mock journal entries data
const mockJournalEntries: JournalEntryType[] = [
  {
    id: '1',
    title: 'Finding balance in chaos',
    content: 'Today was particularly overwhelming with work deadlines piling up. I noticed my anxiety building throughout the morning, but took a 15-minute walk outside during lunch which helped clear my mind. I'm learning that small breaks make a big difference in my mental state.',
    date: '2025-04-10T14:30:00Z',
    tags: ['anxious', 'calm'],
    isSaved: true,
  },
  {
    id: '2',
    title: 'Unexpected moments of joy',
    content: 'Had a surprise video call with my college friends today. We haven't all been together in one call for months, and hearing everyone's laughter made me realize how much I've missed them. These connections are so precious.',
    date: '2025-04-08T20:15:00Z',
    tags: ['happy', 'love'],
    isSaved: false,
  },
  {
    id: '3',
    title: 'Reflections on change',
    content: 'Change has always been difficult for me. As I prepare for the upcoming move to a new city, I'm feeling a mix of excitement and apprehension. Today I packed my first box of books - it made everything feel suddenly real.',
    date: '2025-04-05T18:45:00Z',
    tags: ['anxious', 'neutral'],
    isSaved: false,
  },
];

const JournalPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [entries, setEntries] = useState<JournalEntryType[]>(mockJournalEntries);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntryType | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    tags: [] as MoodType[],
  });
  const [tagInput, setTagInput] = useState('');
  const { toast } = useToast();
  
  const handleNewEntry = () => {
    setIsCreating(true);
    setSelectedEntry(null);
    setNewEntry({
      title: '',
      content: '',
      tags: [],
    });
  };
  
  const handleSaveEntry = () => {
    if (!newEntry.title.trim() || !newEntry.content.trim()) {
      toast({
        title: "Cannot save empty entry",
        description: "Please add a title and content for your journal entry",
        variant: "destructive",
      });
      return;
    }
    
    const entryToSave: JournalEntryType = {
      id: isCreating ? Date.now().toString() : (selectedEntry?.id || Date.now().toString()),
      title: newEntry.title,
      content: newEntry.content,
      date: isCreating ? new Date().toISOString() : (selectedEntry?.date || new Date().toISOString()),
      tags: newEntry.tags,
      isSaved: selectedEntry?.isSaved || false,
    };
    
    if (isCreating) {
      setEntries([entryToSave, ...entries]);
    } else {
      setEntries(entries.map(entry => entry.id === entryToSave.id ? entryToSave : entry));
    }
    
    toast({
      title: "Journal entry saved",
      description: isCreating ? "New entry created successfully" : "Entry updated successfully",
    });
    
    setIsCreating(false);
    setSelectedEntry(null);
  };
  
  const handleCancel = () => {
    setIsCreating(false);
    setSelectedEntry(null);
  };
  
  const handleSelectEntry = (entry: JournalEntryType) => {
    setSelectedEntry(entry);
    setIsCreating(false);
    setNewEntry({
      title: entry.title,
      content: entry.content,
      tags: [...entry.tags],
    });
  };
  
  const handleToggleSave = (id: string) => {
    setEntries(entries.map(entry => 
      entry.id === id ? { ...entry, isSaved: !entry.isSaved } : entry
    ));
    
    const entry = entries.find(e => e.id === id);
    if (entry) {
      toast({
        title: entry.isSaved ? "Removed from saved" : "Added to saved",
        description: entry.isSaved 
          ? "Entry removed from your saved collection" 
          : "Entry added to your saved collection",
      });
    }
  };
  
  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      const tag = tagInput.toLowerCase().trim() as MoodType;
      const validMoods: MoodType[] = ['happy', 'calm', 'sad', 'anxious', 'energetic', 'love', 'neutral'];
      
      if (validMoods.includes(tag) && !newEntry.tags.includes(tag)) {
        setNewEntry({
          ...newEntry,
          tags: [...newEntry.tags, tag],
        });
      }
      
      setTagInput('');
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setNewEntry({
      ...newEntry,
      tags: newEntry.tags.filter(tag => tag !== tagToRemove),
    });
  };
  
  const formatStyle = (styleType: 'bold' | 'italic') => {
    const textarea = document.getElementById('journal-content') as HTMLTextAreaElement;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const marker = styleType === 'bold' ? '**' : '*';
    
    const newText = textarea.value.substring(0, start) +
      marker + selectedText + marker +
      textarea.value.substring(end);
    
    setNewEntry({
      ...newEntry,
      content: newText,
    });
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + marker.length, end + marker.length);
    }, 0);
  };
  
  const addListItem = () => {
    const textarea = document.getElementById('journal-content') as HTMLTextAreaElement;
    if (!textarea) return;
    
    const cursorPos = textarea.selectionStart;
    const textBeforeCursor = textarea.value.substring(0, cursorPos);
    const textAfterCursor = textarea.value.substring(cursorPos);
    
    // Find the start of the current line
    const lastNewLine = textBeforeCursor.lastIndexOf('\n');
    const startOfLine = lastNewLine === -1 ? 0 : lastNewLine + 1;
    
    // Insert list marker at the start of the line
    const newText = textBeforeCursor.substring(0, startOfLine) +
      '- ' + 
      textBeforeCursor.substring(startOfLine) +
      textAfterCursor;
    
    setNewEntry({
      ...newEntry,
      content: newText,
    });
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(cursorPos + 2, cursorPos + 2);
    }, 0);
  };
  
  const focusMode = isCreating || selectedEntry;

  return (
    <div className="min-h-screen bg-background flex">
      <Navigation />
      
      <div className="flex-1 flex flex-col">
        <Header toggleTheme={toggleTheme} theme={theme} />
        
        <main className={`flex-1 container max-w-5xl py-6 px-4 md:py-10 md:px-6 transition-all ${focusMode ? 'bg-gradient-to-b from-background to-primary/5' : ''}`}>
          {!focusMode ? (
            <>
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Journal</h1>
                <Button onClick={handleNewEntry}>
                  <Plus className="w-4 h-4 mr-2" />
                  New Entry
                </Button>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                {entries.map(entry => (
                  <Card key={entry.id} className="group hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="line-clamp-1">{entry.title}</CardTitle>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleToggleSave(entry.id)}
                        >
                          <Bookmark className={`w-4 h-4 ${entry.isSaved ? 'fill-primary' : ''}`} />
                        </Button>
                      </div>
                      <CardDescription>
                        {format(parseISO(entry.date), 'MMM d, yyyy • h:mm a')}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pb-2">
                      <p className="line-clamp-3 text-sm text-muted-foreground">
                        {entry.content}
                      </p>
                    </CardContent>
                    
                    <CardFooter className="flex flex-col items-start gap-3 pt-0">
                      <div className="flex flex-wrap gap-1">
                        {entry.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="capitalize">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button variant="outline" size="sm" onClick={() => handleSelectEntry(entry)}>
                        <Edit className="w-4 h-4 mr-2" />
                        View Full Entry
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="max-w-3xl mx-auto bg-card p-6 rounded-xl shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <Button variant="ghost" onClick={handleCancel}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <div className="space-x-2">
                  <Button variant="outline" size="icon" onClick={() => formatStyle('bold')}>
                    <Bold className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => formatStyle('italic')}>
                    <Italic className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={addListItem}>
                    <List className="w-4 h-4" />
                  </Button>
                </div>
                <Button onClick={handleSaveEntry}>
                  Save Entry
                </Button>
              </div>
              
              <div className="space-y-4 py-4">
                <Input
                  placeholder="Entry title..."
                  value={newEntry.title}
                  onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
                  className="text-2xl font-bold border-none shadow-none focus-visible:ring-0 px-0 text-foreground"
                />
                
                <div className="flex flex-wrap gap-1 my-4">
                  {newEntry.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="capitalize gap-1">
                      {tag}
                      <button onClick={() => handleRemoveTag(tag)}>
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                  <div className="flex items-center border rounded-full px-2 py-1 text-sm">
                    <Hash className="w-3 h-3 mr-1 text-muted-foreground" />
                    <Input
                      placeholder="Add tag..."
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleAddTag}
                      className="border-none shadow-none focus-visible:ring-0 h-6 p-0 text-sm w-20"
                    />
                  </div>
                </div>
                
                <Textarea
                  id="journal-content"
                  placeholder="Write your thoughts here..."
                  value={newEntry.content}
                  onChange={(e) => setNewEntry({...newEntry, content: e.target.value})}
                  className="min-h-[300px] border-none shadow-none resize-none focus-visible:ring-0 px-0 font-serif text-foreground"
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default JournalPage;
