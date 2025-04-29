
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar, CalendarIcon } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import AdvisorCard from '@/components/AdvisorCard';
import TimeSlotPicker from '@/components/TimeSlotPicker';
import { Monitor, User } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// Mock data
const advisors = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    rating: 4.8,
    image: '/lovable-uploads/e73f2f9c-aa8f-4e83-a916-0f37547dc875.png',
    specialties: ['Resume Review', 'Interview Prep']
  },
  {
    id: '2',
    name: 'Mr. David Lee',
    rating: 4.5,
    image: '/lovable-uploads/7fea6903-5098-4813-a704-ce5f62cef508.png',
    specialties: ['Internship Search', 'Networking']
  },
  {
    id: '3',
    name: 'Ms. Emily White',
    rating: 4.9,
    image: '/lovable-uploads/cb3eb444-4c7e-47e5-9f91-ae9ab9a9aaa7.png',
    specialties: ['Career Exploration', 'Grad School Apps']
  }
];

const timeSlots = [
  { id: 's1', time: '09:00 AM', available: true },
  { id: 's2', time: '10:00 AM', available: true },
  { id: 's3', time: '11:00 AM', available: true },
  { id: 's4', time: '01:00 PM', available: true },
  { id: 's5', time: '02:00 PM', available: true },
  { id: 's6', time: '03:00 PM', available: true },
];

const BookAdvising = () => {
  const [reason, setReason] = useState<string>('');
  const [selectedAdvisor, setSelectedAdvisor] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [meetingFormat, setMeetingFormat] = useState<'in-person' | 'zoom'>('in-person');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!reason) {
      toast.error("Please select a reason for advising");
      return;
    }
    
    if (!selectedAdvisor) {
      toast.error("Please choose an advisor");
      return;
    }
    
    if (!date) {
      toast.error("Please select a date");
      return;
    }
    
    if (!selectedTimeSlot) {
      toast.error("Please select a time slot");
      return;
    }

    toast.success("Appointment confirmed!", {
      description: "You'll receive a confirmation email shortly."
    });
    
    navigate("/");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Book an Advising Session</h1>
        <p className="text-gray-500">Select your reason, preferred advisor, date, and time.</p>
      </div>

      <Card className="mb-6 animate-fade-in">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="reason" className="text-base font-medium block mb-2">Reason for Advising</Label>
              <Select value={reason} onValueChange={setReason}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="resume">Resume Review</SelectItem>
                  <SelectItem value="interview">Interview Preparation</SelectItem>
                  <SelectItem value="internship">Internship Search</SelectItem>
                  <SelectItem value="career">Career Exploration</SelectItem>
                  <SelectItem value="grad">Graduate School Applications</SelectItem>
                  <SelectItem value="networking">Networking Strategies</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6 animate-fade-in">
        <CardContent className="p-6">
          <Label className="text-base font-medium block mb-4">Choose an Advisor</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {advisors.map((advisor) => (
              <AdvisorCard 
                key={advisor.id}
                id={advisor.id}
                name={advisor.name}
                rating={advisor.rating}
                image={advisor.image}
                specialties={advisor.specialties}
                selected={selectedAdvisor === advisor.id}
                onClick={setSelectedAdvisor}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6 animate-fade-in">
        <CardContent className="p-6">
          <Label className="text-base font-medium block mb-4">Select a Date</Label>
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {date && (
        <Card className="mb-6 animate-fade-in">
          <CardContent className="p-6">
            <Label className="text-base font-medium block mb-4">
              Available Times for {format(date, "MMM d, yyyy")}
            </Label>
            <TimeSlotPicker 
              slots={timeSlots} 
              selectedSlot={selectedTimeSlot || undefined} 
              onSelectSlot={setSelectedTimeSlot} 
            />
          </CardContent>
        </Card>
      )}

      {selectedTimeSlot && (
        <Card className="mb-6 animate-fade-in">
          <CardContent className="p-6">
            <Label className="text-base font-medium block mb-4">Meeting Format</Label>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant={meetingFormat === 'in-person' ? 'default' : 'outline'}
                className={`flex items-center justify-center gap-2 h-auto py-3 px-6 ${
                  meetingFormat === 'in-person' ? 'bg-brand-blue' : ''
                }`}
                onClick={() => setMeetingFormat('in-person')}
              >
                <User className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">In-Person</div>
                  <div className="text-xs opacity-75">Meet at the Career Center</div>
                </div>
              </Button>
              
              <Button
                variant={meetingFormat === 'zoom' ? 'default' : 'outline'}
                className={`flex items-center justify-center gap-2 h-auto py-3 px-6 ${
                  meetingFormat === 'zoom' ? 'bg-brand-blue' : ''
                }`}
                onClick={() => setMeetingFormat('zoom')}
              >
                <Monitor className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Zoom Meeting</div>
                  <div className="text-xs opacity-75">Virtual appointment</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end">
        <Button 
          className="px-8" 
          size="lg" 
          disabled={!reason || !selectedAdvisor || !date || !selectedTimeSlot}
          onClick={handleSubmit}
        >
          Confirm Appointment
        </Button>
      </div>
    </div>
  );
};

export default BookAdvising;
