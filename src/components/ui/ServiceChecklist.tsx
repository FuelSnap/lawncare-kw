'use client';

import { CheckCircle, Plus } from 'lucide-react';
import { SERVICE_CHECKLIST } from '@/lib/constants';
import { Card } from './Card';
import { cn } from '@/lib/utils';

interface ServiceChecklistProps {
  className?: string;
  variant?: 'card' | 'inline' | 'grid';
  title?: string;
}

export function ServiceChecklist({ 
  className, 
  variant = 'card',
  title = 'Every Visit Includes' 
}: ServiceChecklistProps) {
  const includedItems = SERVICE_CHECKLIST.filter(item => item.included);
  const addonItems = SERVICE_CHECKLIST.filter(item => !item.included);

  if (variant === 'inline') {
    return (
      <div className={cn('space-y-2', className)}>
        {includedItems.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
            <span className="text-neutral-charcoal">{item.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <div className={cn('', className)}>
        <h3 className="font-heading text-xl font-semibold text-primary mb-4">{title}</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {includedItems.map((item) => (
            <div 
              key={item.id}
              className="flex items-center gap-3 bg-white rounded-xl p-4 border border-neutral-midgray"
            >
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
              <span className="text-sm text-neutral-charcoal">{item.label}</span>
            </div>
          ))}
          {addonItems.map((item) => (
            <div 
              key={item.id}
              className="flex items-center gap-3 bg-neutral-offwhite rounded-xl p-4 border border-dashed border-neutral-midgray"
            >
              <Plus className="w-5 h-5 text-accent flex-shrink-0" />
              <span className="text-sm text-neutral-darkgray">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default card variant
  return (
    <Card className={cn('', className)}>
      <h3 className="font-heading text-xl font-semibold text-primary mb-4">{title}</h3>
      
      <div className="space-y-3">
        {includedItems.map((item) => (
          <div 
            key={item.id}
            className="flex items-center gap-3 p-3 bg-green-50 rounded-xl"
          >
            <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
            <span className="text-neutral-charcoal">{item.label}</span>
          </div>
        ))}
        
        {addonItems.length > 0 && (
          <>
            <div className="border-t border-neutral-midgray pt-3 mt-3">
              <p className="text-sm font-medium text-neutral-darkgray mb-2">Optional Add-ons:</p>
            </div>
            {addonItems.map((item) => (
              <div 
                key={item.id}
                className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl"
              >
                <Plus className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-neutral-charcoal">{item.label}</span>
              </div>
            ))}
          </>
        )}
      </div>
    </Card>
  );
}
