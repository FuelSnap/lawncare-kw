'use client';

import { useState, useMemo } from 'react';
import { Calculator, Info, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from './Button';
import { Select } from './Select';
import { Input } from './Input';
import { Card } from './Card';
import { LAWN_SIZES, PLANS, SUPPORTED_POSTAL_PREFIXES } from '@/lib/constants';
import { formatPrice, cn } from '@/lib/utils';

interface PricePreviewProps {
  className?: string;
  variant?: 'full' | 'compact';
  showAddressInput?: boolean;
}

export function PricePreview({ 
  className, 
  variant = 'full',
  showAddressInput = true 
}: PricePreviewProps) {
  const [postalCode, setPostalCode] = useState('');
  const [lawnSize, setLawnSize] = useState<string>('');
  const [showEstimate, setShowEstimate] = useState(false);

  const isValidArea = useMemo(() => {
    if (postalCode.length < 3) return true;
    const fsa = postalCode.substring(0, 3).toUpperCase();
    return SUPPORTED_POSTAL_PREFIXES.includes(fsa);
  }, [postalCode]);

  const selectedSize = useMemo(() => 
    LAWN_SIZES.find(s => s.size === lawnSize),
    [lawnSize]
  );

  const prices = useMemo(() => {
    if (!selectedSize) return null;
    
    const basePrice = selectedSize.basePrice;
    const oneTimePrice = basePrice * 1.25; // Single cut multiplier
    
    return {
      oneTime: oneTimePrice,
      weekly: basePrice * (1 - 0.15), // 15% discount
      biweekly: basePrice * (1 - 0.10), // 10% discount
      every10days: basePrice * (1 - 0.12), // 12% discount
    };
  }, [selectedSize]);

  const canShowEstimate = lawnSize && (showAddressInput ? (postalCode.length >= 3 && isValidArea) : true);

  const handleShowEstimate = () => {
    if (canShowEstimate) {
      setShowEstimate(true);
    }
  };

  if (variant === 'compact') {
    return (
      <div className={cn('bg-white rounded-xl border border-neutral-midgray p-4', className)}>
        <div className="flex items-center gap-2 mb-3">
          <Calculator className="w-5 h-5 text-primary" />
          <span className="font-semibold text-primary">Quick Estimate</span>
        </div>
        <Select
          label=""
          placeholder="Select lawn size"
          value={lawnSize}
          onChange={(e) => setLawnSize(e.target.value)}
          options={LAWN_SIZES.map(s => ({ value: s.size, label: `${s.label} (${s.sqftRange})` }))}
        />
        {lawnSize && prices && (
          <div className="mt-3 text-center">
            <p className="text-sm text-neutral-darkgray">Starting from</p>
            <p className="text-2xl font-bold text-accent">{formatPrice(prices.biweekly)}/cut</p>
            <p className="text-xs text-neutral-darkgray">with bi-weekly subscription</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <Card className={cn('', className)} variant="elevated" padding="lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center">
          <Calculator className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-heading text-xl font-bold text-primary">Get Instant Estimate</h3>
          <p className="text-sm text-neutral-darkgray">No email required</p>
        </div>
      </div>

      <div className="space-y-4">
        {showAddressInput && (
          <Input
            label="Postal Code"
            placeholder="N2L 3G1"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value.toUpperCase())}
            error={postalCode.length >= 3 && !isValidArea ? 'Outside our service area' : undefined}
          />
        )}

        <Select
          label="Lawn Size"
          placeholder="Select your lawn size"
          value={lawnSize}
          onChange={(e) => setLawnSize(e.target.value)}
          options={LAWN_SIZES.map(s => ({ 
            value: s.size, 
            label: `${s.label} — ${s.sqftRange}` 
          }))}
          hint={selectedSize?.description}
        />

        {!showEstimate && (
          <Button 
            fullWidth 
            size="lg"
            disabled={!canShowEstimate}
            onClick={handleShowEstimate}
          >
            Show My Estimate
          </Button>
        )}
      </div>

      {showEstimate && prices && (
        <div className="mt-6 space-y-4">
          <div className="border-t border-neutral-midgray pt-4">
            <h4 className="font-semibold text-primary mb-3">Your Estimated Prices</h4>
            
            {/* One-time option */}
            <div className="bg-gray-50 rounded-xl p-4 mb-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-neutral-charcoal">One-Time Cut</p>
                  <p className="text-sm text-neutral-darkgray">No commitment</p>
                </div>
                <p className="text-xl font-bold text-neutral-charcoal">{formatPrice(prices.oneTime)}</p>
              </div>
            </div>

            {/* Subscription options */}
            <div className="space-y-2">
              <div className="bg-brand-50 rounded-xl p-4 border-2 border-primary">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-primary">Bi-Weekly</p>
                      <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">BEST VALUE</span>
                    </div>
                    <p className="text-sm text-neutral-darkgray">Save 10%</p>
                  </div>
                  <p className="text-2xl font-bold text-accent">{formatPrice(prices.biweekly)}<span className="text-sm font-normal">/cut</span></p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-neutral-charcoal">Weekly</p>
                    <p className="text-sm text-neutral-darkgray">Save 15%</p>
                  </div>
                  <p className="text-xl font-bold text-neutral-charcoal">{formatPrice(prices.weekly)}<span className="text-sm font-normal">/cut</span></p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-neutral-charcoal">Every 10 Days</p>
                    <p className="text-sm text-neutral-darkgray">Save 12%</p>
                  </div>
                  <p className="text-xl font-bold text-neutral-charcoal">{formatPrice(prices.every10days)}<span className="text-sm font-normal">/cut</span></p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 text-sm text-neutral-darkgray bg-blue-50 rounded-lg p-3">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-600" />
            <p>
              <span className="font-medium text-blue-800">Estimate only.</span> Final price may vary based on terrain, obstacles, and lawn condition.
            </p>
          </div>

          <Link href="/book">
            <Button fullWidth size="lg">
              Continue to Book
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      )}
    </Card>
  );
}
