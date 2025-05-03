
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/campaigns" element={<MainLayout><CampaignsList /></MainLayout>} />
          <Route path="/templates" element={<MainLayout><TemplatesList /></MainLayout>} />
          <Route path="/groups" element={<MainLayout><GroupsList /></MainLayout>} />
          <Route path="/smtp-profiles" element={<MainLayout><SMTPProfilesList /></MainLayout>} />
          <Route path="/users" element={<MainLayout><UsersList /></MainLayout>} />
          <Route path="/reports" element={<MainLayout><ReportsPage /></MainLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
