
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import BookAdvising from "./pages/BookAdvising";
import Opportunities from "./pages/Opportunities";
import ResourceLibrary from "./pages/ResourceLibrary";
import JobDetail from "./pages/JobDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/book-advising" element={<Layout><BookAdvising /></Layout>} />
          <Route path="/opportunities" element={<Layout><Opportunities /></Layout>} />
          <Route path="/resources" element={<Layout><ResourceLibrary /></Layout>} />
          <Route path="/job/:id" element={<Layout><JobDetail /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
