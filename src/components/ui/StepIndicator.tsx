import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: string;
  name: string;
  description?: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: string;
  completedSteps: string[];
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export default function StepIndicator({
  steps,
  currentStep,
  completedSteps,
  className,
  orientation = 'horizontal',
}: StepIndicatorProps) {
  const currentIndex = steps.findIndex(s => s.id === currentStep);
  
  if (orientation === 'vertical') {
    return (
      <nav className={cn('flex flex-col', className)} aria-label="Progress">
        <ol className="space-y-4">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id);
            const isCurrent = step.id === currentStep;
            const isPast = index < currentIndex;
            
            return (
              <li key={step.id} className="flex items-start gap-4">
                {/* Step Circle */}
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold transition-all duration-200',
                      isCompleted && 'bg-success border-success text-white',
                      isCurrent && !isCompleted && 'bg-primary border-primary text-white',
                      !isCompleted && !isCurrent && 'bg-white border-neutral-midgray text-neutral-darkgray'
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  
                  {/* Vertical Line */}
                  {index < steps.length - 1 && (
                    <div 
                      className={cn(
                        'w-0.5 h-full min-h-[2rem] mt-2',
                        isPast || isCompleted ? 'bg-success' : 'bg-neutral-midgray'
                      )}
                    />
                  )}
                </div>
                
                {/* Step Content */}
                <div className="pt-1.5">
                  <p 
                    className={cn(
                      'font-medium',
                      isCurrent ? 'text-primary' : isCompleted ? 'text-success' : 'text-neutral-darkgray'
                    )}
                  >
                    {step.name}
                  </p>
                  {step.description && (
                    <p className="text-sm text-neutral-darkgray mt-0.5">
                      {step.description}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
  
  // Horizontal orientation
  return (
    <nav className={cn('w-full', className)} aria-label="Progress">
      <ol className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = step.id === currentStep;
          const isPast = index < currentIndex;
          
          return (
            <li 
              key={step.id} 
              className={cn(
                'flex items-center',
                index < steps.length - 1 && 'flex-1'
              )}
            >
              <div className="flex flex-col items-center">
                {/* Step Circle */}
                <div
                  className={cn(
                    'flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold transition-all duration-200',
                    isCompleted && 'bg-success border-success text-white',
                    isCurrent && !isCompleted && 'bg-primary border-primary text-white shadow-soft',
                    !isCompleted && !isCurrent && 'bg-white border-neutral-midgray text-neutral-darkgray'
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                
                {/* Step Label */}
                <span 
                  className={cn(
                    'mt-2 text-sm font-medium text-center hidden sm:block',
                    isCurrent ? 'text-primary' : isCompleted ? 'text-success' : 'text-neutral-darkgray'
                  )}
                >
                  {step.name}
                </span>
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div 
                  className={cn(
                    'flex-1 h-0.5 mx-4 rounded-full transition-colors duration-200',
                    isPast || isCompleted ? 'bg-success' : 'bg-neutral-midgray'
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
