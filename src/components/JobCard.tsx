
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bookmark, ExternalLink, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  jobType: 'Full-time' | 'Internship' | 'Part-time';
  matchPercentage?: number;
  isSaved?: boolean;
  onSave?: (id: string) => void;
  className?: string;
}

const JobCard = ({
  id,
  title,
  company,
  location,
  description,
  jobType,
  matchPercentage,
  isSaved = false,
  onSave,
  className,
}: JobCardProps) => {
  return (
    <Card className={cn('hover:shadow-md transition-shadow', className)}>
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="font-medium text-lg">{title}</h3>
            <div className="text-gray-600">{company}</div>
            <div className="flex items-center text-gray-500 text-sm">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              {location}
            </div>
          </div>
          
          {matchPercentage && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Match: {matchPercentage}%
            </Badge>
          )}
        </div>
        
        <p className="text-gray-600 text-sm my-3 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between mt-4">
          <Badge variant="secondary" className="bg-brand-lightblue text-brand-blue border-none">
            {jobType}
          </Badge>
          
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-full",
                isSaved ? "text-brand-blue bg-blue-50" : "text-gray-500"
              )}
              onClick={() => onSave && onSave(id)}
            >
              <Bookmark className="h-4 w-4" fill={isSaved ? "currentColor" : "none"} />
            </Button>
            
            <Link to={`/job/${id}`}>
              <Button variant="default">
                View Details
                <ExternalLink className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
