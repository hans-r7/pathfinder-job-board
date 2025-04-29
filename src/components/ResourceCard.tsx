
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Download, FileText, Video } from 'lucide-react';

type ResourceType = 'pdf' | 'video' | 'doc' | 'link';

interface ResourceCardProps {
  title: string;
  description: string;
  category: string;
  type: ResourceType;
  fileSize?: string;
  duration?: string;
  isCompleted?: boolean;
  onClick: () => void;
}

const ResourceCard = ({
  title,
  description,
  category,
  type,
  fileSize,
  duration,
  isCompleted = false,
  onClick,
}: ResourceCardProps) => {
  const renderIcon = () => {
    switch (type) {
      case 'pdf':
      case 'doc':
        return <FileText className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'link':
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getActionText = () => {
    switch (type) {
      case 'pdf':
      case 'doc':
        return 'View Resource';
      case 'video':
        return 'Watch Video';
      case 'link':
        return 'Visit Link';
      default:
        return 'Open';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex space-x-3">
            <div className={`p-2 rounded-md ${isCompleted ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
              {renderIcon()}
            </div>
            <div>
              <h3 className="font-medium text-base">{title}</h3>
              <p className="text-gray-500 text-sm line-clamp-2 mt-1">{description}</p>
            </div>
          </div>
          {isCompleted && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Completed
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-3">
            <Badge variant="secondary">{category}</Badge>
            {duration && (
              <div className="flex items-center text-gray-500 text-xs">
                <Clock className="h-3 w-3 mr-1" />
                {duration}
              </div>
            )}
            {fileSize && (
              <div className="text-gray-500 text-xs">
                {fileSize}
              </div>
            )}
          </div>

          <Button variant="ghost" size="sm" onClick={onClick} className="flex items-center">
            {type === 'pdf' || type === 'doc' ? <Download className="h-3 w-3 mr-1" /> : null}
            {getActionText()}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
