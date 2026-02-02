'use client';

import { useState, useEffect } from 'react';
import { MapPin, Clock, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui';
import { AVAILABILITY_BY_FSA, SUPPORTED_POSTAL_PREFIXES } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface AvailabilityModuleProps {
  className?: string;
  showInput?: boolean;
}

export default function AvailabilityModule({ className, showInput = true }: AvailabilityModuleProps) {
  const [postalCode, setPostalCode] = useState('');
  const [availability, setAvailability] = useState(AVAILABILITY_BY_FSA['default']);
  const [areaName, setAreaName] = useState('KW Region');

  useEffect(() => {
    const fsa = postalCode.replace(/\s/g, '').toUpperCase().substring(0, 3);
    if (fsa.length === 3 && SUPPORTED_POSTAL_PREFIXES.includes(fsa)) {
      setAvailability(AVAILABILITY_BY_FSA[fsa] || AVAILABILITY_BY_FSA['default']);
      // Map FSA to area name
      if (fsa.startsWith('N2L') || fsa.startsWith('N2J') || fsa.startsWith('N2K')) {
        setAreaName('Waterloo');
      } else if (fsa.startsWith('N2E') || fsa.startsWith('N2G') || fsa.startsWith('N2H')) {
        setAreaName('Kitchener');
      } else if (fsa.startsWith('N1')) {
        setAreaName('Guelph');
      } else if (fsa.startsWith('N3')) {
        setAreaName('Cambridge');
      } else {
        setAreaName('your area');
      }
    } else {
      setAvailability(AVAILABILITY_BY_FSA['default']);
      setAreaName('KW Region');
    }
  }, [postalCode]);

  return (
    <div className={cn('bg-white rounded-2xl border-2 border-brand-200 p-6', className)}>
      {showInput && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-neutral-charcoal mb-2">
            Check availability in your area
          </label>
          <Input
            placeholder="Enter postal code (e.g., N2L 3G1)"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            leftIcon={<MapPin className="w-5 h-5" />}
          />
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Next Available Window */}
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-neutral-darkgray">Next window in {areaName}</p>
            <p className="text-lg font-semibold text-primary">{availability.window}</p>
          </div>
        </div>

        {/* Spots Left */}
        <div className="flex items-center gap-3">
          <div className={cn(
            'px-4 py-2 rounded-full font-semibold text-sm',
            availability.spotsLeft <= 3 
              ? 'bg-red-100 text-red-700' 
              : availability.spotsLeft <= 5 
                ? 'bg-amber-100 text-amber-700'
                : 'bg-green-100 text-green-700'
          )}>
            {availability.spotsLeft} spots left this week
          </div>
        </div>
      </div>

      {/* Urgency Banner */}
      {availability.spotsLeft <= 5 && (
        <div className="mt-4 flex items-center gap-2 text-sm text-amber-700 bg-amber-50 rounded-lg px-4 py-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>Limited weekly slots in {areaName} — book soon to secure your window</span>
        </div>
      )}
    </div>
  );
}
