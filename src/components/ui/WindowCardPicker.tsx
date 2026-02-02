'use client';

import { Calendar, Star, Zap, Clock } from 'lucide-react';
import { SERVICE_WINDOWS, WINDOW_BENEFITS, EXACT_DAY_PREMIUM } from '@/lib/constants';
import { formatPrice, cn } from '@/lib/utils';
import { ServiceWindowType } from '@/types';

interface WindowCardPickerProps {
  selectedWindow: ServiceWindowType | null;
  onSelectWindow: (window: ServiceWindowType) => void;
  exactDaySelected: boolean;
  onToggleExactDay: (selected: boolean) => void;
  className?: string;
}

export function WindowCardPicker({
  selectedWindow,
  onSelectWindow,
  exactDaySelected,
  onToggleExactDay,
  className,
}: WindowCardPickerProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {/* Window options */}
      <div className="space-y-3">
        {SERVICE_WINDOWS.map((window) => {
          const benefit = WINDOW_BENEFITS[window.type];
          const isSelected = selectedWindow === window.type;
          
          return (
            <button
              key={window.type}
              onClick={() => onSelectWindow(window.type)}
              className={cn(
                'w-full p-5 rounded-2xl border-2 text-left transition-all',
                isSelected 
                  ? 'border-primary bg-brand-50' 
                  : 'border-neutral-midgray bg-white hover:border-primary/50'
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
                  isSelected ? 'bg-primary' : 'bg-neutral-lightgray'
                )}>
                  <Calendar className={cn(
                    'w-6 h-6',
                    isSelected ? 'text-white' : 'text-primary'
                  )} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-heading text-lg font-semibold text-primary">
                      {window.label}
                    </span>
                    {benefit?.badge && (
                      <span className={cn(
                        'text-xs font-medium px-2 py-0.5 rounded-full',
                        benefit.color
                      )}>
                        {benefit.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-neutral-darkgray">{benefit?.label || window.description}</p>
                </div>

                {/* Radio indicator */}
                <div className={cn(
                  'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1',
                  isSelected ? 'border-primary bg-primary' : 'border-neutral-midgray'
                )}>
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Exact Day Upsell */}
      <div className={cn(
        'p-5 rounded-2xl border-2 transition-all cursor-pointer',
        exactDaySelected 
          ? 'border-accent bg-orange-50' 
          : 'border-dashed border-accent/50 bg-orange-50/50 hover:border-accent hover:bg-orange-50'
      )}
      onClick={() => onToggleExactDay(!exactDaySelected)}
      >
        <div className="flex items-start gap-4">
          <div className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
            exactDaySelected ? 'bg-accent' : 'bg-orange-100'
          )}>
            <Star className={cn(
              'w-6 h-6',
              exactDaySelected ? 'text-white' : 'text-accent'
            )} />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-heading text-lg font-semibold text-accent">
                Exact Day Guarantee
              </span>
              <span className="text-xs font-bold bg-accent text-white px-2 py-0.5 rounded-full">
                +{formatPrice(EXACT_DAY_PREMIUM)}
              </span>
            </div>
            <p className="text-sm text-neutral-darkgray">
              Want a specific day instead of a window? Get guaranteed service on your chosen day.
            </p>
          </div>

          {/* Checkbox indicator */}
          <div className={cn(
            'w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-1',
            exactDaySelected ? 'border-accent bg-accent' : 'border-accent/50'
          )}>
            {exactDaySelected && (
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Helpful tips */}
      <div className="bg-blue-50 rounded-xl p-4 flex items-start gap-3">
        <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="font-medium mb-1">How windows work:</p>
          <ul className="space-y-1 text-blue-700">
            <li>• We arrive within your 2-3 day window based on weather & routing</li>
            <li>• You'll get a notification when we're on the way</li>
            <li>• No need to be home—just make sure we have access</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
