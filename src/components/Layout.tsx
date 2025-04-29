
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Calendar, FileText, HelpCircle, LayoutDashboard, Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatBot from '@/components/ChatBot';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent } from '@/components/ui/sheet';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const [chatBotOpen, setChatBotOpen] = useState(false);
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close mobile sidebar when changing routes
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  const SidebarContent = () => (
    <>
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-8">
          <svg className="h-8 w-8 text-brand-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 19V7.5L12 4L20 7.5V19M4 19H20M4 19H1V7.5M20 19H23V7.5M8 9V15M16 9V15M12 9V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h1 className="text-xl font-semibold">Career Compass</h1>
        </div>
        <nav className="space-y-1">
          <Link to="/">
            <Button
              variant={isActive('/') ? "secondary" : "ghost"}
              className={cn("w-full justify-start", isActive('/') && "bg-accent")}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link to="/opportunities">
            <Button
              variant={isActive('/opportunities') ? "secondary" : "ghost"}
              className={cn("w-full justify-start", isActive('/opportunities') && "bg-accent")}
            >
              <Search className="mr-2 h-4 w-4" />
              Opportunities
            </Button>
          </Link>
          <Link to="/book-advising">
            <Button
              variant={isActive('/book-advising') ? "secondary" : "ghost"}
              className={cn("w-full justify-start", isActive('/book-advising') && "bg-accent")}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Book Advising
            </Button>
          </Link>
          <Link to="/resources">
            <Button
              variant={isActive('/resources') ? "secondary" : "ghost"}
              className={cn("w-full justify-start", isActive('/resources') && "bg-accent")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Resource Library
            </Button>
          </Link>
        </nav>
      </div>
      <div className="mt-auto p-4 border-t border-gray-200">
        <Button 
          variant="ghost" 
          className="w-full justify-start"
          onClick={() => setChatBotOpen(true)}
        >
          <HelpCircle className="mr-2 h-4 w-4" />
          Help Assistant
        </Button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Mobile header with menu button */}
      <div className="md:hidden flex items-center p-4 border-b border-gray-200">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2" 
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center space-x-2">
          <svg className="h-6 w-6 text-brand-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 19V7.5L12 4L20 7.5V19M4 19H20M4 19H1V7.5M20 19H23V7.5M8 9V15M16 9V15M12 9V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h1 className="text-lg font-semibold">Career Compass</h1>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 flex-shrink-0 bg-sidebar border-r border-gray-200">
          <SidebarContent />
        </aside>

        {/* Mobile Sidebar (Sheet) */}
        <Sheet open={sidebarOpen && isMobile} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="p-0 w-64">
            <SidebarContent />
          </SheetContent>
        </Sheet>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
      
      {/* ChatBot */}
      <ChatBot open={chatBotOpen} onOpenChange={setChatBotOpen} />
    </div>
  );
};

export default Layout;
