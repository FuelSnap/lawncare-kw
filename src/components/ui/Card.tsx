import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'selected';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant = 'default',
    padding = 'md',
    interactive = false,
    children,
    ...props 
  }, ref) => {
    const variants = {
      default: 'bg-white border border-neutral-midgray/50 shadow-soft hover:shadow-medium',
      elevated: 'bg-white shadow-medium hover:shadow-strong',
      outlined: 'bg-white border-2 border-neutral-midgray hover:border-primary/50',
      selected: 'bg-white border-2 border-primary shadow-medium ring-4 ring-primary/10',
    };

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6 md:p-8',
      lg: 'p-8 md:p-10',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl transition-all duration-200',
          variants[variant],
          paddings[padding],
          interactive && 'cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
