
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Calendar, FileText, HelpCircle, LayoutDashboard, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0 bg-sidebar border-r border-gray-200">
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
          <Button variant="ghost" className="w-full justify-start">
            <HelpCircle className="mr-2 h-4 w-4" />
            Help Assistant
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
