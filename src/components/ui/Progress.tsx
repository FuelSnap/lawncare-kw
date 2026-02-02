import { cn } from '@/lib/utils';

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Progress({ 
  value, 
  max = 100,
  className,
  showLabel = false,
  size = 'md',
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const sizes = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };
  
  return (
    <div className={cn('w-full', className)}>
      <div 
        className={cn(
          'bg-neutral-midgray rounded-full overflow-hidden',
          sizes[size]
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={`Progress: ${Math.round(percentage)}%`}
      >
        <div 
          className={cn(
            'bg-primary rounded-full transition-all duration-500 ease-out',
            sizes[size]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {showLabel && (
        <p className="text-sm text-neutral-darkgray mt-2 text-center">
          {Math.round(percentage)}% complete
        </p>
      )}
    </div>
  );
}
