
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import CampaignsList from "./pages/campaigns/CampaignsList";
import TemplatesList from "./pages/templates/TemplatesList";
import GroupsList from "./pages/groups/GroupsList";
import SMTPProfilesList from "./pages/smtp/SMTPProfilesList";
import UsersList from "./pages/users/UsersList";
import ReportsPage from "./pages/reports/ReportsPage";
import SettingsPage from "./pages/settings/SettingsPage";
import LoginPage from "./pages/auth/LoginPage";
import AuthCheck from "./components/auth/AuthCheck";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<AuthCheck><MainLayout><Dashboard /></MainLayout></AuthCheck>} />
          <Route path="/campaigns" element={<AuthCheck><MainLayout><CampaignsList /></MainLayout></AuthCheck>} />
          <Route path="/templates" element={<AuthCheck><MainLayout><TemplatesList /></MainLayout></AuthCheck>} />
          <Route path="/groups" element={<AuthCheck><MainLayout><GroupsList /></MainLayout></AuthCheck>} />
          <Route path="/smtp-profiles" element={<AuthCheck><MainLayout><SMTPProfilesList /></MainLayout></AuthCheck>} />
          <Route path="/users" element={<AuthCheck><MainLayout><UsersList /></MainLayout></AuthCheck>} />
          <Route path="/reports" element={<AuthCheck><MainLayout><ReportsPage /></MainLayout></AuthCheck>} />
          <Route path="/settings" element={<AuthCheck><MainLayout><SettingsPage /></MainLayout></AuthCheck>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
