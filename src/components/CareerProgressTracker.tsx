
import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface ProgressStep {
  id: string;
  label: string;
  completed: boolean;
  current: boolean;
}

interface CareerProgressTrackerProps {
  steps: ProgressStep[];
  progress: number;
}

const CareerProgressTracker = ({ steps, progress }: CareerProgressTrackerProps) => {
  return (
    <div className="w-full space-y-2">
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-brand-blue h-2.5 rounded-full transition-all duration-500" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-4">
        {steps.map((step) => (
          <div 
            key={step.id} 
            className={cn(
              "flex flex-col items-center space-y-1 career-progress-step",
              step.completed ? "completed" : "",
              step.current ? "current" : ""
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center border-2",
              step.completed ? "bg-green-100 border-green-600" : 
              step.current ? "bg-blue-100 border-blue-600" : 
              "bg-gray-100 border-gray-300"
            )}>
              {step.completed ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <span className={cn(
                  step.current ? "text-blue-600" : "text-gray-500"
                )}>
                  {steps.indexOf(step) + 1}
                </span>
              )}
            </div>
            <span className="text-xs text-center max-w-[80px]">{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerProgressTracker;
