import { forwardRef, SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    className, 
    label,
    hint,
    error,
    options,
    placeholder,
    id,
    ...props 
  }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={selectId}
            className="block text-base font-medium text-neutral-charcoal mb-2"
          >
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'w-full px-5 py-4 min-h-[56px]',
              'text-lg text-neutral-charcoal',
              'bg-white border-2 border-neutral-midgray rounded-xl',
              'transition-all duration-200',
              'appearance-none cursor-pointer',
              'hover:border-primary/50',
              'focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none',
              'disabled:bg-neutral-lightgray disabled:cursor-not-allowed',
              error && 'border-error focus:border-error focus:ring-error/20',
              !props.value && 'text-neutral-darkgray',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-darkgray">
            <ChevronDown className="w-6 h-6" />
          </div>
        </div>
        
        {hint && !error && (
          <p 
            id={`${selectId}-hint`}
            className="text-sm text-neutral-darkgray mt-2"
          >
            {hint}
          </p>
        )}
        
        {error && (
          <p 
            id={`${selectId}-error`}
            className="text-sm text-error mt-2 flex items-center gap-1"
            role="alert"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
