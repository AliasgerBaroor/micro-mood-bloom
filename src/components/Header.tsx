
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface HeaderProps {
  toggleTheme: () => void;
  theme: string;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, theme }) => {
  const { toast } = useToast();
  
  const handleLogoClick = () => {
    toast({
      title: "Welcome to MicroMood",
      description: "Track your emotions and discover personalized micro-habits for emotional balance.",
    });
  };

  return (
    <header className="w-full py-4 px-6 flex items-center justify-between glass-effect sticky top-0 z-10">
      <Link to="/" className="flex items-center space-x-2" onClick={handleLogoClick}>
        <div className="h-8 w-8 rounded-full bg-primary animate-pulse-gentle"></div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          MicroMood
        </h1>
      </Link>
      
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme} 
          className="rounded-full"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
      </div>
    </header>
  );
};

export default Header;
