
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface TimeSlotPickerProps {
  slots: TimeSlot[];
  selectedSlot?: string;
  onSelectSlot: (slotId: string) => void;
}

const TimeSlotPicker = ({ slots, selectedSlot, onSelectSlot }: TimeSlotPickerProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {slots.map((slot) => (
        <Button
          key={slot.id}
          variant={selectedSlot === slot.id ? "default" : "outline"}
          disabled={!slot.available}
          className={cn(
            "time-slot h-12",
            selectedSlot === slot.id ? "bg-brand-blue" : "",
            !slot.available && "opacity-50 cursor-not-allowed"
          )}
          onClick={() => slot.available && onSelectSlot(slot.id)}
        >
          {slot.time}
        </Button>
      ))}
    </div>
  );
};

export default TimeSlotPicker;
