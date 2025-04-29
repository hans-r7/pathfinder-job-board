
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Bookmark, Building, Calendar, Clock, MapPin, Share2 } from 'lucide-react';

const mockJobs = [
  {
    id: '1',
    title: 'Software Engineer Intern',
    company: 'Google',
    location: 'Mountain View, CA',
    description: 'Exciting internship opportunity at Google. Work on core Google products, develop scalable solutions, and learn from experienced engineers.',
    jobType: 'Internship',
    deadline: '06/15/2025',
    postedDate: '04/20/2025',
    requirements: [
      'Currently pursuing a Bachelor\'s or Master\'s degree in Computer Science or related field',
      'Experience with one or more general purpose programming languages',
      'Strong problem-solving skills',
      'Ability to work in a team environment'
    ],
    responsibilities: [
      'Design, develop, test, deploy, maintain and improve software',
      'Manage individual project priorities, deadlines and deliverables',
      'Collaborate with cross-functional teams'
    ]
  },
  {
    id: '2',
    title: 'Data Analyst',
    company: 'Microsoft',
    location: 'Redmond, WA',
    description: 'Analyze data and provide insights to drive business decisions.',
    jobType: 'Full-time',
    deadline: '05/30/2025',
    postedDate: '04/15/2025',
    requirements: [
      'Bachelor\'s degree in Statistics, Mathematics, Computer Science, or related field',
      'Experience with SQL and data visualization tools',
      'Strong analytical skills',
      'Excellent communication skills'
    ],
    responsibilities: [
      'Analyze data sets to identify trends and insights',
      'Create dashboards and reports',
      'Work with stakeholders to understand business requirements',
      'Make recommendations based on data analysis'
    ]
  },
  {
    id: '3',
    title: 'Backend Engineer (Node.js)',
    company: 'Tech Solutions Inc.',
    location: 'Austin, TX',
    description: 'Build and maintain scalable backend systems using Node.js.',
    jobType: 'Full-time',
    deadline: '06/10/2025',
    postedDate: '04/10/2025',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '3+ years of experience with Node.js',
      'Experience with RESTful APIs',
      'Knowledge of database systems'
    ],
    responsibilities: [
      'Design and implement backend services',
      'Optimize applications for performance',
      'Write clean, maintainable code',
      'Collaborate with frontend developers'
    ]
  }
];

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const job = mockJobs.find(job => job.id === id);

  if (!job) {
    return (
      <div className="p-6 text-center">
        <h1>Job not found</h1>
        <Button onClick={() => navigate('/opportunities')} className="mt-4">
          Back to Opportunities
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Button variant="ghost" onClick={() => navigate('/opportunities')} className="mb-6 -ml-2">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Opportunities
      </Button>

      <div className="bg-white rounded-lg overflow-hidden animate-fade-in">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div>
              <Badge className="mb-2 bg-brand-lightblue text-brand-blue border-none">
                {job.jobType}
              </Badge>
              <h1 className="text-2xl font-semibold mb-1">{job.title}</h1>
              <div className="flex items-center text-gray-600">
                <Building className="h-4 w-4 mr-1" />
                {job.company}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="icon">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button>Apply Now</Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {job.location}
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Posted: {job.postedDate}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Deadline: {job.deadline}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="col-span-3 md:col-span-2">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Job Description</h2>
                <p className="text-gray-700 mb-6">{job.description}</p>

                <h3 className="text-md font-semibold mb-2">Responsibilities</h3>
                <ul className="list-disc pl-5 mb-6 text-gray-700">
                  {job.responsibilities.map((resp, idx) => (
                    <li key={idx} className="mb-1">{resp}</li>
                  ))}
                </ul>

                <h3 className="text-md font-semibold mb-2">Requirements</h3>
                <ul className="list-disc pl-5 text-gray-700">
                  {job.requirements.map((req, idx) => (
                    <li key={idx} className="mb-1">{req}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="col-span-3 md:col-span-1">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Job Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Job Type</p>
                    <p className="font-medium">{job.jobType}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{job.location}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Company</p>
                    <p className="font-medium">{job.company}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Application Deadline</p>
                    <p className="font-medium">{job.deadline}</p>
                  </div>
                </div>

                <Button className="w-full mt-6">Apply Now</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
