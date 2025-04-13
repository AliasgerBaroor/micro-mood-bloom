
import React, { useState, useEffect } from 'react';
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger 
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Image, Plus, Pencil, Trash2, X } from 'lucide-react';

// Define the mood image type
interface MoodImage {
  id: string;
  path: string;
  tags: string[];
  caption: string;
  createdAt: string;
}

// Available moods for tagging
const availableMoods = [
  'happy', 'sad', 'anxious', 'calm', 'stressed', 
  'motivated', 'tired', 'excited', 'angry', 'content',
  'hopeful', 'fearful', 'lonely', 'loved', 'grateful'
];

// Sample mood images data (would normally be loaded from a file/DB)
const initialMoodImages: MoodImage[] = [
  {
    id: '1',
    path: '/mood-images/calm-lake.jpg',
    tags: ['sad', 'angry'],
    caption: 'Peace is closer than you think',
    createdAt: '2025-04-12T08:00:00Z'
  },
  {
    id: '2',
    path: '/mood-images/sunflowers.jpg',
    tags: ['happy', 'excited'],
    caption: 'Let the light in',
    createdAt: '2025-04-12T09:30:00Z'
  }
];

const MoodImageManagerPage = () => {
  const { toast } = useToast();
  const [moodImages, setMoodImages] = useState<MoodImage[]>(initialMoodImages);
  const [newImage, setNewImage] = useState<Partial<MoodImage>>({
    tags: [],
    caption: ''
  });
  const [editingImage, setEditingImage] = useState<MoodImage | null>(null);
  const [selectedMood, setSelectedMood] = useState<string>('');
  
  // Function to handle image upload (simulated)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real implementation, this would upload the file to a server
    // For now, we'll simulate by using the file name
    const file = e.target.files?.[0];
    if (file) {
      setNewImage({
        ...newImage,
        path: `/mood-images/${file.name}`
      });
      
      toast({
        title: "Image selected",
        description: `Selected file: ${file.name}`,
      });
    }
  };
  
  // Function to add a mood tag to the new image
  const addMoodTag = () => {
    if (selectedMood && !newImage.tags?.includes(selectedMood)) {
      setNewImage({
        ...newImage,
        tags: [...(newImage.tags || []), selectedMood]
      });
      setSelectedMood('');
    }
  };
  
  // Function to remove a mood tag from the new image
  const removeMoodTag = (tag: string) => {
    setNewImage({
      ...newImage,
      tags: newImage.tags?.filter(t => t !== tag)
    });
  };
  
  // Function to save a new mood image
  const saveNewImage = () => {
    if (!newImage.path) {
      toast({
        variant: "destructive",
        title: "Missing image",
        description: "Please select an image to upload",
      });
      return;
    }
    
    if (!newImage.tags?.length) {
      toast({
        variant: "destructive",
        title: "Missing tags",
        description: "Please add at least one mood tag",
      });
      return;
    }
    
    const newMoodImage: MoodImage = {
      id: Date.now().toString(),
      path: newImage.path,
      tags: newImage.tags || [],
      caption: newImage.caption || '',
      createdAt: new Date().toISOString()
    };
    
    setMoodImages([...moodImages, newMoodImage]);
    
    // Reset the form
    setNewImage({
      tags: [],
      caption: ''
    });
    
    toast({
      title: "Image added successfully",
      description: "The new mood image has been added to the library",
    });
    
    // In a real implementation, we would save to a file or database here
    // saveMoodImagesToFile(updatedMoodImages);
  };
  
  // Function to update an existing mood image
  const updateImage = () => {
    if (!editingImage) return;
    
    const updatedImages = moodImages.map(img => 
      img.id === editingImage.id ? editingImage : img
    );
    
    setMoodImages(updatedImages);
    setEditingImage(null);
    
    toast({
      title: "Image updated",
      description: "The mood image has been updated successfully",
    });
    
    // In a real implementation, we would save to a file or database here
    // saveMoodImagesToFile(updatedImages);
  };
  
  // Function to delete a mood image
  const deleteImage = (id: string) => {
    const updatedImages = moodImages.filter(img => img.id !== id);
    setMoodImages(updatedImages);
    
    toast({
      title: "Image deleted",
      description: "The mood image has been removed from the library",
    });
    
    // In a real implementation, we would save to a file or database here
    // saveMoodImagesToFile(updatedImages);
  };
  
  // Function to start editing an image
  const startEditingImage = (image: MoodImage) => {
    setEditingImage(image);
  };
  
  // Function to add a mood tag to the editing image
  const addEditingMoodTag = () => {
    if (selectedMood && editingImage && !editingImage.tags.includes(selectedMood)) {
      setEditingImage({
        ...editingImage,
        tags: [...editingImage.tags, selectedMood]
      });
      setSelectedMood('');
    }
  };
  
  // Function to remove a mood tag from the editing image
  const removeEditingMoodTag = (tag: string) => {
    if (editingImage) {
      setEditingImage({
        ...editingImage,
        tags: editingImage.tags.filter(t => t !== tag)
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Mood Images</h1>
          <p className="text-muted-foreground">Manage images shown to users based on their mood</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New Image
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Mood Image</DialogTitle>
              <DialogDescription>
                Upload a new image and associate it with specific moods.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="image">Upload Image</Label>
                <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} />
              </div>
              
              <div>
                <Label>Add Mood Tags</Label>
                <div className="flex gap-2">
                  <select
                    className="flex-1 px-3 py-2 rounded-md border border-input bg-background"
                    value={selectedMood}
                    onChange={(e) => setSelectedMood(e.target.value)}
                  >
                    <option value="">Select a mood...</option>
                    {availableMoods.map(mood => (
                      <option key={mood} value={mood}>{mood}</option>
                    ))}
                  </select>
                  <Button type="button" onClick={addMoodTag}>Add</Button>
                </div>
              </div>
              
              {newImage.tags && newImage.tags.length > 0 && (
                <div>
                  <Label>Selected Moods:</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newImage.tags.map(tag => (
                      <Badge key={tag} className="flex items-center gap-1">
                        {tag}
                        <button 
                          onClick={() => removeMoodTag(tag)} 
                          className="rounded-full hover:bg-accent ml-1"
                        >
                          <X size={12} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <Label htmlFor="caption">Image Caption</Label>
                <Textarea 
                  id="caption" 
                  placeholder="Enter a soothing or encouraging caption..." 
                  value={newImage.caption || ''}
                  onChange={(e) => setNewImage({...newImage, caption: e.target.value})}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button onClick={saveNewImage}>Save Image</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Image List */}
      <Card>
        <CardHeader>
          <CardTitle>Mood Image Library</CardTitle>
          <CardDescription>Images available to show to users based on their mood</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Mood Tags</TableHead>
                <TableHead>Caption</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {moodImages.map((image) => (
                <TableRow key={image.id}>
                  <TableCell>
                    <div className="h-12 w-12 bg-muted rounded flex items-center justify-center">
                      <Image size={24} className="text-muted-foreground" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {image.tags.map(tag => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{image.caption}</TableCell>
                  <TableCell>{new Date(image.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => startEditingImage(image)}>
                            <Pencil size={16} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Edit Mood Image</DialogTitle>
                            <DialogDescription>
                              Update the mood tags and caption for this image.
                            </DialogDescription>
                          </DialogHeader>
                          
                          {editingImage && (
                            <div className="grid gap-4 py-4">
                              <div>
                                <Label>Image Path</Label>
                                <Input value={editingImage.path} disabled />
                              </div>
                              
                              <div>
                                <Label>Add Mood Tags</Label>
                                <div className="flex gap-2">
                                  <select
                                    className="flex-1 px-3 py-2 rounded-md border border-input bg-background"
                                    value={selectedMood}
                                    onChange={(e) => setSelectedMood(e.target.value)}
                                  >
                                    <option value="">Select a mood...</option>
                                    {availableMoods.map(mood => (
                                      <option key={mood} value={mood}>{mood}</option>
                                    ))}
                                  </select>
                                  <Button type="button" onClick={addEditingMoodTag}>Add</Button>
                                </div>
                              </div>
                              
                              <div>
                                <Label>Selected Moods:</Label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {editingImage.tags.map(tag => (
                                    <Badge key={tag} className="flex items-center gap-1">
                                      {tag}
                                      <button 
                                        onClick={() => removeEditingMoodTag(tag)} 
                                        className="rounded-full hover:bg-accent ml-1"
                                      >
                                        <X size={12} />
                                      </button>
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <Label htmlFor="edit-caption">Image Caption</Label>
                                <Textarea 
                                  id="edit-caption" 
                                  placeholder="Enter a soothing or encouraging caption..." 
                                  value={editingImage.caption}
                                  onChange={(e) => setEditingImage({...editingImage, caption: e.target.value})}
                                />
                              </div>
                            </div>
                          )}
                          
                          <DialogFooter>
                            <Button onClick={updateImage}>Update Image</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 size={16} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete this image?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete this mood image
                              from the library.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteImage(image.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodImageManagerPage;
