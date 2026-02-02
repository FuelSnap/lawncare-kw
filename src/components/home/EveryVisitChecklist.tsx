import { Check } from 'lucide-react';
import { EVERY_VISIT_INCLUDES } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface EveryVisitChecklistProps {
  className?: string;
  variant?: 'card' | 'inline';
}

export default function EveryVisitChecklist({ className, variant = 'card' }: EveryVisitChecklistProps) {
  if (variant === 'inline') {
    return (
      <ul className={cn('space-y-2', className)}>
        {EVERY_VISIT_INCLUDES.map((item) => (
          <li key={item.id} className="flex items-center gap-3">
            <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="w-4 h-4 text-white" />
            </div>
            <span className="text-neutral-charcoal">{item.label}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={cn('bg-white rounded-2xl p-6 md:p-8 border border-neutral-midgray', className)}>
      <h3 className="font-heading text-xl font-semibold text-primary mb-6">
        Every Visit Includes
      </h3>
      
      <ul className="space-y-4">
        {EVERY_VISIT_INCLUDES.map((item) => (
          <li key={item.id} className="flex items-center gap-4">
            <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center flex-shrink-0">
              <Check className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg text-neutral-charcoal">{item.label}</span>
          </li>
        ))}
      </ul>
      
      <p className="mt-6 text-sm text-neutral-darkgray border-t border-neutral-midgray pt-4">
        Add-ons like edging, trimming, and weed control available at booking.
      </p>
    </div>
  );
}
