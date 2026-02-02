'use client';

import { Clock, Calendar, Star, Zap, PartyPopper, Check } from 'lucide-react';
import { SERVICE_WINDOWS, WINDOW_BENEFITS, EXACT_DAY_PREMIUM } from '@/lib/constants';
import { formatPrice, cn } from '@/lib/utils';
import { ServiceWindowType } from '@/types';

interface WindowPickerCardsProps {
  selectedWindow: ServiceWindowType | null;
  onSelectWindow: (window: ServiceWindowType) => void;
  exactDaySelected: boolean;
  onToggleExactDay: (selected: boolean) => void;
  className?: string;
}

const windowIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'mon_wed': Calendar,
  'tue_thu': Zap,
  'wed_fri': Clock,
  'thu_sat': PartyPopper,
};

export default function WindowPickerCards({
  selectedWindow,
  onSelectWindow,
  exactDaySelected,
  onToggleExactDay,
  className,
}: WindowPickerCardsProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {/* Window Options */}
      <div className="grid sm:grid-cols-2 gap-4">
        {SERVICE_WINDOWS.map((window) => {
          const benefit = WINDOW_BENEFITS[window.type];
          const Icon = windowIcons[window.type] || Calendar;
          const isSelected = selectedWindow === window.type;

          return (
            <button
              key={window.type}
              type="button"
              onClick={() => onSelectWindow(window.type)}
              className={cn(
                'relative flex flex-col p-5 rounded-2xl border-2 text-left transition-all',
                isSelected
                  ? 'border-primary bg-brand-50 shadow-md'
                  : 'border-neutral-midgray bg-white hover:border-primary/50 hover:shadow-sm'
              )}
            >
              {/* Benefit Badge */}
              {benefit && (
                <span className={cn(
                  'absolute -top-2 -right-2 px-3 py-1 text-xs font-semibold rounded-full',
                  benefit.color
                )}>
                  {benefit.label}
                </span>
              )}

              <div className="flex items-start gap-3">
                {/* Selection Indicator */}
                <div className={cn(
                  'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1',
                  isSelected ? 'border-primary bg-primary' : 'border-neutral-midgray'
                )}>
                  {isSelected && <Check className="w-4 h-4 text-white" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="font-heading text-lg font-semibold text-primary">
                      {window.label}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-darkgray">
                    {window.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Exact Day Upsell */}
      <div
        onClick={() => onToggleExactDay(!exactDaySelected)}
        className={cn(
          'relative cursor-pointer rounded-2xl border-2 p-5 transition-all',
          exactDaySelected
            ? 'border-accent bg-gradient-to-r from-accent/10 to-orange-50'
            : 'border-dashed border-accent/50 bg-accent/5 hover:border-accent hover:bg-accent/10'
        )}
      >
        <div className="flex items-start gap-4">
          {/* Checkbox */}
          <div className={cn(
            'w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-1',
            exactDaySelected ? 'border-accent bg-accent' : 'border-accent/50'
          )}>
            {exactDaySelected && <Check className="w-4 h-4 text-white" />}
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-accent" />
                <span className="font-heading text-lg font-semibold text-accent">
                  Exact Day Guarantee
                </span>
              </div>
              <span className="font-bold text-accent">
                +{formatPrice(EXACT_DAY_PREMIUM)}/visit
              </span>
            </div>
            <p className="text-sm text-neutral-darkgray">
              Want a specific day instead of a window? Add this option and pick your 
              preferred day. We'll always come on that exact day (weather permitting).
            </p>
          </div>
        </div>

        {/* Highlight Border Effect */}
        {!exactDaySelected && (
          <div className="absolute inset-0 rounded-2xl pointer-events-none">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
              UPGRADE
            </div>
          </div>
        )}
      </div>

      {/* Help Text */}
      <p className="text-sm text-neutral-darkgray text-center">
        We arrive within your window based on weather and route optimization. 
        You'll get a notification when we're on our way.
      </p>
    </div>
  );
}
