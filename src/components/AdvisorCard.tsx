
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdvisorCardProps {
  id: string;
  name: string;
  rating: number;
  image: string;
  specialties: string[];
  selected?: boolean;
  onClick?: (id: string) => void;
}

const AdvisorCard = ({ 
  id, 
  name, 
  rating, 
  image, 
  specialties, 
  selected = false,
  onClick
}: AdvisorCardProps) => {
  return (
    <Card 
      className={cn(
        "p-4 cursor-pointer relative advisor-card border-2",
        selected ? "border-brand-blue" : "border-transparent"
      )}
      onClick={() => onClick && onClick(id)}
    >
      {selected && (
        <div className="absolute top-2 right-2 bg-brand-blue text-white rounded-full p-1">
          <Check className="h-4 w-4" />
        </div>
      )}
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <h3 className="text-lg font-medium">{name}</h3>
        <div className="flex items-center mt-1 mb-2">
          <span className="text-yellow-500 mr-1">★</span>
          <span>{rating.toFixed(1)}</span>
        </div>
        <div className="flex flex-wrap gap-1 justify-center">
          {specialties.map((specialty, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {specialty}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default AdvisorCard;
