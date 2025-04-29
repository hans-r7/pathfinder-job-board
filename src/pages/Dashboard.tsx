
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, FileText, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import CareerProgressTracker from '@/components/CareerProgressTracker';
import EventCard from '@/components/EventCard';
import JobCard from '@/components/JobCard';

const Dashboard = () => {
  const progressSteps = [
    { id: '1', label: 'Profile Setup', completed: true, current: false },
    { id: '2', label: 'Upload Resume', completed: true, current: false },
    { id: '3', label: 'Attend Workshop', completed: false, current: true },
    { id: '4', label: 'Apply to 3 Jobs', completed: false, current: false },
    { id: '5', label: 'Mock Interview', completed: false, current: false },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Welcome back, Alex!</h1>
        <Button variant="ghost" size="icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Button>
      </div>

      <Card className="mb-6 animate-fade-in">
        <CardContent className="p-6">
          <h2 className="text-lg font-medium mb-4">Here's your career journey progress.</h2>
          <CareerProgressTracker steps={progressSteps} progress={40} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link to="/opportunities" className="block">
          <Card className="h-full hover:shadow-md transition-all hover:-translate-y-1">
            <CardContent className="p-5 flex flex-col items-center justify-center h-full">
              <div className="p-3 rounded-full bg-blue-100 text-brand-blue mb-3">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-1">Find Opportunities</h3>
              <p className="text-gray-500 text-center">Explore jobs & internships</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/book-advising" className="block">
          <Card className="h-full bg-brand-blue hover:shadow-md transition-all hover:-translate-y-1">
            <CardContent className="p-5 flex flex-col items-center justify-center h-full">
              <div className="p-3 rounded-full bg-white text-brand-blue mb-3">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-1 text-white">Book Advising</h3>
              <p className="text-blue-100 text-center">Schedule your session</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/resources" className="block">
          <Card className="h-full hover:shadow-md transition-all hover:-translate-y-1">
            <CardContent className="p-5 flex flex-col items-center justify-center h-full">
              <div className="p-3 rounded-full bg-blue-100 text-brand-blue mb-3">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-1">Resource Library</h3>
              <p className="text-gray-500 text-center">Get career-ready</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">Upcoming Events</h2>
            <Link to="/opportunities?tab=events">
              <Button variant="ghost" size="sm">View All Events</Button>
            </Link>
          </div>
          <div className="space-y-4">
            <EventCard 
              title="Resume Workshop: Stand Out!" 
              date="Tue, May 6" 
              time="2:05 AM" 
              location="Career Center - Room A1"
              requiresRSVP={true}
            />
            <EventCard 
              title="LinkedIn Profile Building Session" 
              date="Fri, May 9" 
              time="2:05 AM" 
              location="Library - Tech Hub"
              requiresRSVP={true}
            />
            <EventCard 
              title="Interview Skills Seminar (Online)" 
              date="Tue, May 13" 
              time="2:05 AM" 
              location="Online via Zoom"
              requiresRSVP={true}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">Saved Jobs</h2>
            <Link to="/opportunities?filter=saved">
              <Button variant="ghost" size="sm">View All Saved</Button>
            </Link>
          </div>
          <div className="space-y-4">
            <JobCard 
              id="1"
              title="Software Engineer Intern" 
              company="Google" 
              location="Mountain View, CA" 
              description="Exciting internship opportunity at Google. Work on core Google products."
              jobType="Internship"
              isSaved={true}
            />
            <JobCard 
              id="2"
              title="Data Analyst" 
              company="Microsoft" 
              location="Redmond, WA" 
              description="Analyze data and provide insights to drive business decisions."
              jobType="Full-time"
              isSaved={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
