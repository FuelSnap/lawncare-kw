'use client';

import { useState } from 'react';
import { MapPin, Calculator, ArrowRight, Check } from 'lucide-react';
import { Input, Button, Card } from '@/components/ui';
import { LAWN_SIZES, PLANS } from '@/lib/constants';
import { formatPrice, isValidPostalCode, isInServiceArea, cn } from '@/lib/utils';
import Link from 'next/link';

interface InstantEstimateProps {
  className?: string;
  variant?: 'full' | 'compact';
}

export default function InstantEstimate({ className, variant = 'full' }: InstantEstimateProps) {
  const [postalCode, setPostalCode] = useState('');
  const [lawnSize, setLawnSize] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState('');

  const selectedSize = LAWN_SIZES.find(s => s.size === lawnSize);
  const basePrice = selectedSize?.basePrice || 0;

  const calculatePlanPrice = (discountPercent: number) => {
    return basePrice * (1 - discountPercent / 100);
  };

  const handleEstimate = () => {
    if (!postalCode.trim()) {
      setError('Please enter your postal code');
      return;
    }
    
    const formatted = postalCode.toUpperCase().replace(/\s/g, '');
    if (!isValidPostalCode(formatted)) {
      setError('Please enter a valid postal code');
      return;
    }
    
    if (!isInServiceArea(formatted)) {
      setError('Sorry, this area is outside our service zone');
      return;
    }

    if (!lawnSize) {
      setError('Please select your lawn size');
      return;
    }

    setError('');
    setShowResults(true);
  };

  const reset = () => {
    setShowResults(false);
  };

  if (showResults && selectedSize) {
    return (
      <Card className={cn('bg-gradient-to-br from-brand-50 to-white', className)}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />
            <h3 className="font-heading text-xl font-semibold text-primary">Your Estimate</h3>
          </div>
          <button 
            onClick={reset}
            className="text-sm text-neutral-darkgray hover:text-primary underline"
          >
            Edit
          </button>
        </div>

        <div className="mb-4 pb-4 border-b border-neutral-midgray">
          <p className="text-sm text-neutral-darkgray">
            {selectedSize.label} lawn • {postalCode.toUpperCase()}
          </p>
        </div>

        {/* One-Time Price */}
        <div className="mb-6 p-4 bg-white rounded-xl border border-neutral-midgray">
          <p className="text-sm text-neutral-darkgray mb-1">One-time cut</p>
          <p className="text-2xl font-bold text-neutral-charcoal">
            {formatPrice(basePrice * 1.25)}
          </p>
        </div>

        {/* Subscription Prices */}
        <p className="text-sm font-medium text-neutral-charcoal mb-3">
          Or subscribe & save:
        </p>
        <div className="space-y-3 mb-6">
          {PLANS.map((plan) => (
            <div 
              key={plan.id}
              className={cn(
                'flex items-center justify-between p-4 rounded-xl border-2',
                plan.popular 
                  ? 'border-accent bg-accent/5' 
                  : 'border-neutral-midgray bg-white'
              )}
            >
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-semibold text-primary">{plan.name}</p>
                  <p className="text-sm text-neutral-darkgray">{plan.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-accent">
                  {formatPrice(calculatePlanPrice(plan.discountPercent))}
                </p>
                <p className="text-xs text-success font-medium">
                  Save {plan.discountPercent}%
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-neutral-darkgray mb-4">
          * Estimate only. Final price may vary for overgrown lawns, obstacles, or terrain.
        </p>

        <Link href="/book">
          <Button fullWidth size="lg">
            Book Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </Card>
    );
  }

  return (
    <Card className={cn('', className)}>
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-5 h-5 text-primary" />
        <h3 className="font-heading text-xl font-semibold text-primary">
          Get Your Instant Estimate
        </h3>
      </div>

      <p className="text-neutral-darkgray mb-6">
        No email required. See your price in seconds.
      </p>

      <div className="space-y-4">
        {/* Postal Code */}
        <div>
          <label className="block text-sm font-medium text-neutral-charcoal mb-2">
            Your postal code
          </label>
          <Input
            placeholder="N2L 3G1"
            value={postalCode}
            onChange={(e) => {
              setPostalCode(e.target.value);
              setError('');
            }}
            leftIcon={<MapPin className="w-5 h-5" />}
          />
        </div>

        {/* Lawn Size */}
        <div>
          <label className="block text-sm font-medium text-neutral-charcoal mb-2">
            Lawn size
          </label>
          <div className={cn(
            'grid gap-2',
            variant === 'compact' ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'
          )}>
            {LAWN_SIZES.map((size) => (
              <button
                key={size.size}
                onClick={() => {
                  setLawnSize(size.size);
                  setError('');
                }}
                className={cn(
                  'p-3 rounded-xl border-2 text-left transition-all',
                  lawnSize === size.size
                    ? 'border-primary bg-brand-50'
                    : 'border-neutral-midgray bg-white hover:border-primary/50'
                )}
              >
                <p className="font-semibold text-primary text-sm">{size.label}</p>
                <p className="text-xs text-neutral-darkgray">{size.sqftRange}</p>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="text-sm text-error">{error}</p>
        )}

        <Button fullWidth size="lg" onClick={handleEstimate}>
          See My Price
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>

        <p className="text-xs text-neutral-darkgray text-center">
          Estimate only • Final price confirmed after property review
        </p>
      </div>
    </Card>
  );
}
