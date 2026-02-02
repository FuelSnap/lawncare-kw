import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    loading = false,
    fullWidth = false,
    disabled,
    children, 
    ...props 
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 ease-out focus-visible:ring-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0';
    
    const variants = {
      primary: 'bg-accent text-white shadow-medium hover:bg-accent-hover hover:shadow-strong hover:-translate-y-0.5 active:translate-y-0 active:shadow-soft focus-visible:ring-accent/50',
      secondary: 'bg-white text-primary border-2 border-primary shadow-soft hover:bg-primary hover:text-white hover:shadow-medium focus-visible:ring-primary/30',
      ghost: 'text-primary hover:bg-brand-100 focus-visible:ring-primary/30',
      danger: 'bg-error text-white shadow-medium hover:bg-red-600 hover:shadow-strong hover:-translate-y-0.5 focus-visible:ring-error/50',
    };

    const sizes = {
      sm: 'px-4 py-2 min-h-[40px] text-base',
      md: 'px-6 py-3 min-h-[48px] text-lg',
      lg: 'px-8 py-4 min-h-[56px] text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg 
              className="animate-spin -ml-1 mr-3 h-5 w-5" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
