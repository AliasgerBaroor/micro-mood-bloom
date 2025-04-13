
export interface MoodImage {
  id: string;
  path: string;
  tags: string[];
  caption: string;
  createdAt: string;
}

// Sample data (simulating a database)
export const initialMoodImages: MoodImage[] = [
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
  },
  {
    id: '3',
    path: '/mood-images/cozy-cabin.jpg',
    tags: ['anxious', 'fearful'],
    caption: 'You are safe here',
    createdAt: '2025-04-12T10:15:00Z'
  },
  {
    id: '4',
    path: '/mood-images/mountain-view.jpg',
    tags: ['motivated', 'hopeful'],
    caption: 'New heights await you',
    createdAt: '2025-04-12T11:45:00Z'
  },
  {
    id: '5',
    path: '/mood-images/forest-path.jpg',
    tags: ['calm', 'content'],
    caption: 'The journey is just as important as the destination',
    createdAt: '2025-04-12T13:30:00Z'
  }
];

// Function to save mood images (would normally write to a file or database)
export const saveMoodImages = (images: MoodImage[]): void => {
  // In a real application, this would save to a file or database
  console.log('Saving mood images:', images);
  // localStorage.setItem('mood-images', JSON.stringify(images));
};

// Function to load mood images (would normally read from a file or database)
export const loadMoodImages = (): MoodImage[] => {
  // In a real application, this would read from a file or database
  // const savedImages = localStorage.getItem('mood-images');
  // return savedImages ? JSON.parse(savedImages) : initialMoodImages;
  return initialMoodImages;
};

// Function to find mood images by tags
export const findImagesByMood = (mood: string): MoodImage[] => {
  return loadMoodImages().filter(image => 
    image.tags.includes(mood.toLowerCase())
  );
};
