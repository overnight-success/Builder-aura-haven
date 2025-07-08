import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Updates from "./pages/Updates";
import Playbook from "./pages/Playbook";
import PromptVault from "./pages/PromptVault";
import Templates from "./pages/Templates";
import AIToolkit from "./pages/AIToolkit";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/updates" element={<Updates />} />
          <Route path="/playbook" element={<Playbook />} />
          <Route path="/prompt-vault" element={<PromptVault />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/ai-toolkit" element={<AIToolkit />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
