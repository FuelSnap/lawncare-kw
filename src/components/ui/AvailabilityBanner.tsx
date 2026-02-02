'use client';

import { useState, useEffect } from 'react';
import { Clock, AlertCircle, MapPin } from 'lucide-react';
import { Input } from './Input';
import { MOCK_AVAILABILITY, SUPPORTED_POSTAL_PREFIXES } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface AvailabilityBannerProps {
  className?: string;
  showPostalInput?: boolean;
  variant?: 'default' | 'compact' | 'hero';
}

export function AvailabilityBanner({ 
  className, 
  showPostalInput = true,
  variant = 'default' 
}: AvailabilityBannerProps) {
  const [postalCode, setPostalCode] = useState('');
  const [availability, setAvailability] = useState(MOCK_AVAILABILITY['default']);
  const [isValidArea, setIsValidArea] = useState(true);

  useEffect(() => {
    if (postalCode.length >= 3) {
      const fsa = postalCode.substring(0, 3).toUpperCase();
      const isSupported = SUPPORTED_POSTAL_PREFIXES.includes(fsa);
      setIsValidArea(isSupported);
      
      if (isSupported && MOCK_AVAILABILITY[fsa]) {
        setAvailability(MOCK_AVAILABILITY[fsa]);
      } else if (isSupported) {
        setAvailability(MOCK_AVAILABILITY['default']);
      }
    } else {
      setAvailability(MOCK_AVAILABILITY['default']);
      setIsValidArea(true);
    }
  }, [postalCode]);

  if (variant === 'compact') {
    return (
      <div className={cn(
        'flex items-center gap-2 text-sm',
        className
      )}>
        <Clock className="w-4 h-4 text-primary" />
        <span className="text-neutral-darkgray">
          Next window: <span className="font-semibold text-primary">{availability.window}</span>
        </span>
        <span className="text-neutral-midgray">•</span>
        <span className={cn(
          'font-semibold',
          availability.spotsLeft <= 3 ? 'text-accent' : 'text-success'
        )}>
          {availability.spotsLeft} spots left
        </span>
      </div>
    );
  }

  return (
    <div className={cn(
      'bg-white rounded-2xl border border-neutral-midgray p-6',
      className
    )}>
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-primary" />
        <h3 className="font-heading text-lg font-semibold text-primary">
          Check Availability in Your Area
        </h3>
      </div>

      {showPostalInput && (
        <div className="mb-4">
          <Input
            label=""
            placeholder="Enter postal code (e.g., N2L 3G1)"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value.toUpperCase())}
            leftIcon={<MapPin className="w-5 h-5" />}
            className="mb-0"
          />
          {postalCode.length >= 3 && !isValidArea && (
            <p className="text-sm text-error mt-2 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              Sorry, we don't service this area yet.
            </p>
          )}
        </div>
      )}

      {isValidArea && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-brand-50 rounded-xl p-4 text-center">
            <p className="text-sm text-neutral-darkgray mb-1">Next available window</p>
            <p className="text-xl font-bold text-primary">{availability.window}</p>
          </div>
          <div className={cn(
            'rounded-xl p-4 text-center',
            availability.spotsLeft <= 3 ? 'bg-orange-50' : 'bg-green-50'
          )}>
            <p className="text-sm text-neutral-darkgray mb-1">Spots left this week</p>
            <p className={cn(
              'text-xl font-bold',
              availability.spotsLeft <= 3 ? 'text-accent' : 'text-success'
            )}>
              {availability.spotsLeft} remaining
            </p>
          </div>
        </div>
      )}

      {availability.spotsLeft <= 3 && isValidArea && (
        <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg px-4 py-3 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-accent flex-shrink-0" />
          <p className="text-sm text-orange-800">
            <span className="font-semibold">Limited availability!</span> Only {availability.spotsLeft} spots left for {availability.window} window.
          </p>
        </div>
      )}
    </div>
  );
}
