
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import ResourceCard from '@/components/ResourceCard';

// Mock data for resources
const resources = [
  {
    id: '1',
    title: 'Effective Resume Writing Guide',
    description: 'Learn the key elements of a standout resume.',
    category: 'Resume',
    type: 'pdf',
    fileSize: 'PDF, 1.5MB',
    duration: '10 min read',
    isCompleted: true
  },
  {
    id: '2',
    title: 'STAR Method for Interviews',
    description: 'Master the STAR method to answer behavioral questions.',
    category: 'Interview',
    type: 'video',
    duration: '8 min watch',
    isCompleted: false
  },
  {
    id: '3',
    title: 'Networking Email Templates',
    description: 'Ready-to-use templates for reaching out to contacts.',
    category: 'Networking',
    type: 'doc',
    fileSize: 'DOCX, 50KB',
    isCompleted: false
  },
  {
    id: '4',
    title: 'LinkedIn Profile Checklist',
    description: 'Optimize your LinkedIn profile for job searching.',
    category: 'LinkedIn',
    type: 'pdf',
    fileSize: 'PDF, 500KB',
    duration: '7 min read',
    isCompleted: false
  },
  {
    id: '5',
    title: 'Job Search Strategies Webinar',
    description: 'Recording of the latest webinar on effective job searching.',
    category: 'Job Search',
    type: 'video',
    duration: '45 min watch',
    isCompleted: false
  },
  {
    id: '6',
    title: 'Top 10 Interview Questions',
    description: 'Common questions and tips on how to answer them.',
    category: 'Interview',
    type: 'pdf',
    fileSize: 'PDF, 300KB',
    duration: '5 min read',
    isCompleted: false
  },
  {
    id: '7',
    title: 'CSULB Career Center Website',
    description: 'Direct link to the main Career Center portal.',
    category: 'Job Search',
    type: 'link',
    isCompleted: false
  }
];

const ResourceLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [resourceType, setResourceType] = useState('all');
  
  const filteredResources = resources.filter(resource => {
    const matchesSearch = searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = category === 'all' || resource.category === category;
    const matchesType = resourceType === 'all' || resource.type === resourceType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleResourceClick = (id: string) => {
    console.log(`Opening resource: ${id}`);
    // In a real app, this would open the resource
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Resource Library</h1>
        <p className="text-gray-500">Find guides, templates, videos, and links to help you succeed.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Input 
            placeholder="Search resources by title or description..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Resume">Resume</SelectItem>
              <SelectItem value="Interview">Interview</SelectItem>
              <SelectItem value="Networking">Networking</SelectItem>
              <SelectItem value="LinkedIn">LinkedIn</SelectItem>
              <SelectItem value="Job Search">Job Search</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={resourceType} onValueChange={setResourceType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="pdf">PDF Documents</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
              <SelectItem value="doc">Word Documents</SelectItem>
              <SelectItem value="link">Links</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Recently Accessed Section */}
      {resources.find(r => r.isCompleted) && (
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Clock className="h-5 w-5 text-blue-500 mr-2" />
              <h2 className="text-lg font-medium">Continue Where You Left Off</h2>
            </div>
            
            {resources.filter(r => r.isCompleted).map(resource => (
              <ResourceCard
                key={resource.id}
                title={resource.title}
                description={resource.description}
                category={resource.category}
                type={resource.type as any}
                fileSize={resource.fileSize}
                duration={resource.duration}
                isCompleted={resource.isCompleted}
                onClick={() => handleResourceClick(resource.id)}
              />
            ))}
          </CardContent>
        </Card>
      )}

      {/* All Resources */}
      <div className="space-y-4">
        {filteredResources.length > 0 ? (
          filteredResources.map(resource => (
            <ResourceCard
              key={resource.id}
              title={resource.title}
              description={resource.description}
              category={resource.category}
              type={resource.type as any}
              fileSize={resource.fileSize}
              duration={resource.duration}
              isCompleted={resource.isCompleted}
              onClick={() => handleResourceClick(resource.id)}
            />
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No resources found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceLibrary;
