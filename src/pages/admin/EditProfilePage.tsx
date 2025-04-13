
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User, Upload, ArrowLeft, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';

// Mock admin data - would come from API in a real app
const adminData = {
  id: '1',
  name: "Jane Smith",
  email: "jane.admin@micromood.com",
  role: "Admin",
  joinedDate: "April 10, 2025",
  profileImage: "/placeholder.svg"
};

// Form schema for validation
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
  confirmPassword: z.string().optional(),
}).refine(data => {
  // If any password field is filled, all must be filled
  const { currentPassword, newPassword, confirmPassword } = data;
  if (currentPassword || newPassword || confirmPassword) {
    return currentPassword && newPassword && confirmPassword;
  }
  return true;
}, {
  message: "All password fields must be filled to change password",
  path: ["currentPassword"],
}).refine(data => {
  // New password and confirm password must match
  if (data.newPassword && data.confirmPassword) {
    return data.newPassword === data.confirmPassword;
  }
  return true;
}, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const EditProfilePage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Initialize form with existing user data
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: adminData.name,
      email: adminData.email,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Handle form submission
  const onSubmit = (values: FormValues) => {
    // In a real app, this would make an API call to update the user profile
    console.log("Form submitted:", values);
    
    // Show success toast
    toast({
      title: "Profile updated successfully",
      description: "Your profile information has been updated.",
    });
    
    // Navigate back to profile
    navigate('/admin/profile');
  };

  // Handle profile picture upload (mock implementation)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, this would upload the file to a server
      console.log("Image selected:", file.name);
      toast({
        title: "Image selected",
        description: `File "${file.name}" would be uploaded in a real implementation.`
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin/profile')}>
            <ArrowLeft size={18} />
          </Button>
          <h1 className="text-3xl font-bold">Edit Profile</h1>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Profile Picture Section */}
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={adminData.profileImage} alt={adminData.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xl">
                    {adminData.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex items-center space-x-2">
                  <label htmlFor="profile-upload" className="cursor-pointer">
                    <div className="flex items-center space-x-2 px-3 py-1.5 bg-secondary/60 hover:bg-secondary rounded-md text-sm transition-colors">
                      <Upload size={16} />
                      <span>Upload new image</span>
                      <input 
                        id="profile-upload" 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        className="hidden" 
                      />
                    </div>
                  </label>
                </div>
              </div>

              {/* Profile Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Profile Information</h2>
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly disabled />
                      </FormControl>
                      <FormDescription>
                        Email cannot be changed. Contact system administrator if needed.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex items-center space-x-2 py-2">
                  <User size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Role: {adminData.role}</span>
                </div>
              </div>
              
              <Separator />
              
              {/* Password Change Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Change Password</h2>
                
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex justify-end space-x-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/admin/profile')}
                >
                  Cancel
                </Button>
                <Button type="submit" className="gap-2">
                  <Save size={16} />
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProfilePage;
