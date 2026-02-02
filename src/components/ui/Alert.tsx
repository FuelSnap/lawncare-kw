import { HTMLAttributes } from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const icons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
};

const variants = {
  info: 'bg-blue-50 border-blue-200 text-blue-800',
  success: 'bg-green-50 border-green-200 text-green-800',
  warning: 'bg-amber-50 border-amber-200 text-amber-800',
  error: 'bg-red-50 border-red-200 text-red-800',
};

const iconColors = {
  info: 'text-blue-500',
  success: 'text-green-500',
  warning: 'text-amber-500',
  error: 'text-red-500',
};

export default function Alert({ 
  className, 
  variant = 'info',
  title,
  dismissible = false,
  onDismiss,
  children,
  ...props 
}: AlertProps) {
  const Icon = icons[variant];
  
  return (
    <div
      className={cn(
        'p-5 rounded-xl border-2 flex items-start gap-4',
        variants[variant],
        className
      )}
      role="alert"
      {...props}
    >
      <Icon className={cn('w-6 h-6 flex-shrink-0 mt-0.5', iconColors[variant])} />
      
      <div className="flex-1 min-w-0">
        {title && (
          <p className="font-semibold mb-1">{title}</p>
        )}
        <div className="text-base">{children}</div>
      </div>
      
      {dismissible && onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="flex-shrink-0 p-1 rounded-lg hover:bg-black/10 transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
