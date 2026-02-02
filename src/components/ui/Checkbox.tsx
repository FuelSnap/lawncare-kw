'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  description?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ 
    className, 
    label,
    description,
    checked,
    disabled,
    ...props 
  }, ref) => {
    return (
      <label
        className={cn(
          'flex items-start gap-4 cursor-pointer group',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          disabled={disabled}
          {...props}
        />
        
        {/* Custom Checkbox */}
        <div 
          className={cn(
            'flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200',
            checked 
              ? 'border-primary bg-primary' 
              : 'border-neutral-midgray bg-white group-hover:border-primary/50'
          )}
        >
          {checked && (
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          )}
        </div>
        
        {/* Label */}
        <div className="flex-1 min-w-0 pt-0.5">
          <span className="font-medium text-neutral-charcoal">
            {label}
          </span>
          {description && (
            <p className="text-neutral-darkgray text-sm mt-0.5">
              {description}
            </p>
          )}
        </div>
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
