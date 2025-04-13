
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import InsightsPage from "./pages/InsightsPage";
import JournalPage from "./pages/JournalPage";
import HabitsPage from "./pages/HabitsPage";
import SavedPage from "./pages/SavedPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import EmployeeManagementPage from "./pages/admin/EmployeeManagementPage";
import HabitManagementPage from "./pages/admin/HabitManagementPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";
import MoodImageManagerPage from "./pages/admin/MoodImageManagerPage";
import AdminProfilePage from './pages/admin/AdminProfilePage';
import EditProfilePage from './pages/admin/EditProfilePage';
import ActivityDetailPage from './pages/admin/ActivityDetailPage';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth Routes - Public */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            {/* User Routes - Protected */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Index />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/journal" element={<JournalPage />} />
              <Route path="/habits" element={<HabitsPage />} />
              <Route path="/saved" element={<SavedPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
            
            {/* Admin Routes - Protected and Role-based */}
            <Route element={<ProtectedRoute requiredRole="admin" />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboardPage />} />
                <Route path="employees" element={<EmployeeManagementPage />} />
                <Route path="habits" element={<HabitManagementPage />} />
                <Route path="mood-images" element={<MoodImageManagerPage />} />
                <Route path="settings" element={<AdminSettingsPage />} />
                <Route path="profile" element={<AdminProfilePage />} />
                <Route path="profile/edit" element={<EditProfilePage />} />
                <Route path="profile/activity/:activityId" element={<ActivityDetailPage />} />
              </Route>
            </Route>
            
            {/* 404 page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
