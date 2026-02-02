'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RadioCardProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  description?: string;
  price?: string;
  badge?: string;
  icon?: React.ReactNode;
}

const RadioCard = forwardRef<HTMLInputElement, RadioCardProps>(
  ({ 
    className, 
    label,
    description,
    price,
    badge,
    icon,
    checked,
    disabled,
    ...props 
  }, ref) => {
    return (
      <label
        className={cn(
          'relative flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200',
          checked 
            ? 'border-primary bg-brand-50 ring-4 ring-primary/10' 
            : 'border-neutral-midgray bg-white hover:border-primary/50',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        <input
          ref={ref}
          type="radio"
          className="sr-only"
          checked={checked}
          disabled={disabled}
          {...props}
        />
        
        {/* Custom Radio Indicator */}
        <div 
          className={cn(
            'flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200',
            checked 
              ? 'border-primary bg-primary' 
              : 'border-neutral-midgray bg-white'
          )}
        >
          {checked && (
            <div className="w-2.5 h-2.5 rounded-full bg-white" />
          )}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="text-primary">{icon}</div>
              )}
              <span className={cn(
                'font-semibold text-lg',
                checked ? 'text-primary' : 'text-neutral-charcoal'
              )}>
                {label}
              </span>
            </div>
            
            {badge && (
              <span className="flex-shrink-0 px-3 py-1 bg-accent text-white text-sm font-semibold rounded-full">
                {badge}
              </span>
            )}
          </div>
          
          {description && (
            <p className="text-neutral-darkgray mt-1">
              {description}
            </p>
          )}
          
          {price && (
            <p className={cn(
              'text-lg font-semibold mt-2',
              checked ? 'text-primary' : 'text-neutral-charcoal'
            )}>
              {price}
            </p>
          )}
        </div>
      </label>
    );
  }
);

RadioCard.displayName = 'RadioCard';

export default RadioCard;
