import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    label,
    hint,
    error,
    leftIcon,
    rightIcon,
    id,
    ...props 
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-base font-medium text-neutral-charcoal mb-2"
          >
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-darkgray">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full px-5 py-4 min-h-[56px]',
              'text-lg text-neutral-charcoal',
              'bg-white border-2 border-neutral-midgray rounded-xl',
              'transition-all duration-200',
              'placeholder:text-neutral-darkgray',
              'hover:border-primary/50',
              'focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none',
              'disabled:bg-neutral-lightgray disabled:cursor-not-allowed',
!!leftIcon && 'pl-12',
!!rightIcon && 'pr-12',
!!error && 'border-error focus:border-error focus:ring-error/20',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-darkgray">
              {rightIcon}
            </div>
          )}
        </div>
        
        {hint && !error && (
          <p 
            id={`${inputId}-hint`}
            className="text-sm text-neutral-darkgray mt-2"
          >
            {hint}
          </p>
        )}
        
        {error && (
          <p 
            id={`${inputId}-error`}
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

Input.displayName = 'Input';

export default Input;
