
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin } from 'lucide-react';

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  requiresRSVP?: boolean;
  className?: string;
}

const EventCard = ({ title, date, time, location, requiresRSVP = false, className }: EventCardProps) => {
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-2">
          <h3 className="font-medium text-base">{title}</h3>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{date} at {time}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{location}</span>
          </div>
          {requiresRSVP && (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 w-fit">
              RSVP Required
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
