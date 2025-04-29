
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import JobCard from '@/components/JobCard';
import EventCard from '@/components/EventCard';
import { Search, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useLocation, useNavigate } from 'react-router-dom';

// Mock data
const jobs = [
  {
    id: '1',
    title: 'Software Engineer Intern',
    company: 'Google',
    location: 'Mountain View, CA',
    description: 'Exciting internship opportunity at Google. Work on core Google products.',
    jobType: 'Internship' as const,
    matchPercentage: 92
  },
  {
    id: '2',
    title: 'Resume Workshop: Stand Out!',
    company: 'Career Center',
    location: 'Career Center - Room A1',
    description: 'Learn how to create a compelling resume that gets noticed.',
    jobType: 'Internship' as const,
    isEvent: true,
    matchPercentage: 85
  },
  {
    id: '3',
    title: 'Backend Engineer (Node.js)',
    company: 'Tech Solutions Inc.',
    location: 'Austin, TX',
    description: 'Build and maintain scalable backend systems using Node.js.',
    jobType: 'Full-time' as const,
    matchPercentage: 78
  },
  {
    id: '4',
    title: 'Frontend Developer Intern',
    company: 'Meta',
    location: 'Menlo Park, CA',
    description: 'Develop user interfaces for Facebook applications using React.',
    jobType: 'Internship' as const,
    matchPercentage: 75
  }
];

const events = [
  {
    id: '1',
    title: 'Resume Workshop: Stand Out!',
    date: 'Tue, May 6',
    time: '2:05 AM',
    location: 'Career Center - Room A1',
    requiresRSVP: true,
    matchPercentage: 85
  },
  {
    id: '2',
    title: 'LinkedIn Profile Building Session',
    date: 'Fri, May 9',
    time: '2:05 AM',
    location: 'Library - Tech Hub',
    requiresRSVP: true,
    matchPercentage: 82
  },
  {
    id: '3',
    title: 'Interview Skills Seminar (Online)',
    date: 'Tue, May 13',
    time: '2:05 AM',
    location: 'Online via Zoom',
    requiresRSVP: true,
    matchPercentage: 79
  },
  {
    id: '4',
    title: 'Career Fair - Spring 2025',
    date: 'Wed, May 21',
    time: '10:00 AM',
    location: 'University Student Center',
    requiresRSVP: true,
    matchPercentage: 90
  }
];

const Opportunities = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialTab = searchParams.get('tab') || 'recommended';
  
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [savedJobs, setSavedJobs] = useState<string[]>(['1', '2']);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  
  // Filter states
  const [location_, setLocation] = useState<string>('');
  const [jobTypes, setJobTypes] = useState<{ [key: string]: boolean }>({
    fullTime: false,
    partTime: false,
    internship: false
  });
  const [sponsorship, setSponsorship] = useState<boolean>(false);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/opportunities?tab=${value}`);
  };

  const handleSaveJob = (id: string) => {
    if (savedJobs.includes(id)) {
      setSavedJobs(savedJobs.filter(jobId => jobId !== id));
    } else {
      setSavedJobs([...savedJobs, id]);
    }
  };

  const handleApplyFilters = () => {
    setShowFilters(false);
    // Here you would typically filter your results based on the filter criteria
  };

  const handleClearFilters = () => {
    setLocation('');
    setJobTypes({
      fullTime: false,
      partTime: false,
      internship: false
    });
    setSponsorship(false);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-semibold">Opportunities</h1>
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search jobs, internships, companies..." 
              className="pl-9" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
          </div>
          <Button 
            variant="outline" 
            className="flex-shrink-0"
            onClick={() => setShowFilters(true)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="animate-fade-in">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="jobs">Jobs & Internships</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recommended" className="space-y-6">
          <h2 className="text-xl font-medium mb-4">Recommended For You</h2>
          <div className="space-y-4">
            {jobs.map((job) => (
              <JobCard 
                key={job.id}
                id={job.id}
                title={job.title}
                company={job.company}
                location={job.location}
                description={job.description}
                jobType={job.jobType}
                matchPercentage={job.matchPercentage}
                isSaved={savedJobs.includes(job.id)}
                onSave={handleSaveJob}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="jobs" className="space-y-6">
          <div className="space-y-4">
            {jobs.filter(job => !job.isEvent).map((job) => (
              <JobCard 
                key={job.id}
                id={job.id}
                title={job.title}
                company={job.company}
                location={job.location}
                description={job.description}
                jobType={job.jobType}
                matchPercentage={job.matchPercentage}
                isSaved={savedJobs.includes(job.id)}
                onSave={handleSaveJob}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="events" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((event) => (
              <EventCard 
                key={event.id}
                title={event.title}
                date={event.date}
                time={event.time}
                location={event.location}
                requiresRSVP={event.requiresRSVP}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Filter Dialog */}
      <Dialog open={showFilters} onOpenChange={setShowFilters}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Filter Opportunities</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-6">
              <div>
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location"
                  placeholder="e.g., Los Angeles, CA or Remote" 
                  className="mt-2" 
                  value={location_}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              
              <div>
                <Label className="mb-2 block">Job Type</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Button 
                    variant={jobTypes.fullTime ? "default" : "outline"} 
                    className="justify-start"
                    onClick={() => setJobTypes({...jobTypes, fullTime: !jobTypes.fullTime})}
                  >
                    <Checkbox 
                      checked={jobTypes.fullTime} 
                      className="mr-2 data-[state=checked]:bg-white data-[state=checked]:text-primary" 
                    />
                    Full-time
                  </Button>
                  
                  <Button 
                    variant={jobTypes.internship ? "default" : "outline"} 
                    className="justify-start"
                    onClick={() => setJobTypes({...jobTypes, internship: !jobTypes.internship})}
                  >
                    <Checkbox 
                      checked={jobTypes.internship} 
                      className="mr-2 data-[state=checked]:bg-white data-[state=checked]:text-primary" 
                    />
                    Internship
                  </Button>
                  
                  <Button 
                    variant={jobTypes.partTime ? "default" : "outline"} 
                    className="justify-start"
                    onClick={() => setJobTypes({...jobTypes, partTime: !jobTypes.partTime})}
                  >
                    <Checkbox 
                      checked={jobTypes.partTime} 
                      className="mr-2 data-[state=checked]:bg-white data-[state=checked]:text-primary" 
                    />
                    Part-time
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="sponsorship" 
                  checked={sponsorship}
                  onCheckedChange={(checked) => setSponsorship(checked as boolean)}
                />
                <Label htmlFor="sponsorship">H1B Sponsorship Available</Label>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="ghost" onClick={handleClearFilters}>Clear All Filters</Button>
            <Button onClick={handleApplyFilters}>Apply Filters</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Opportunities;
