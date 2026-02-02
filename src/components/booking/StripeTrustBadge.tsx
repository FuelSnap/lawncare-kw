'use client';

import { Shield, Lock, CreditCard, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StripeTrustBadgeProps {
  className?: string;
  variant?: 'full' | 'compact' | 'inline';
}

export default function StripeTrustBadge({ className, variant = 'full' }: StripeTrustBadgeProps) {
  if (variant === 'inline') {
    return (
      <div className={cn('flex items-center gap-2 text-sm text-neutral-darkgray', className)}>
        <Lock className="w-4 h-4" />
        <span>Secured by Stripe</span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn('flex flex-wrap items-center justify-center gap-4 text-sm text-neutral-darkgray', className)}>
        <span className="flex items-center gap-1.5">
          <Lock className="w-4 h-4 text-green-600" />
          Secure payment
        </span>
        <span className="flex items-center gap-1.5">
          <X className="w-4 h-4 text-green-600" />
          No contracts
        </span>
        <span className="flex items-center gap-1.5">
          <Check className="w-4 h-4 text-green-600" />
          Cancel anytime
        </span>
      </div>
    );
  }

  return (
    <div className={cn('bg-neutral-cream rounded-xl p-6 border border-neutral-lightgray', className)}>
      {/* Stripe Badge */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="w-10 h-10 bg-[#635BFF] rounded-lg flex items-center justify-center">
          <CreditCard className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-semibold text-neutral-charcoal">Powered by Stripe</p>
          <p className="text-xs text-neutral-darkgray">256-bit SSL encryption</p>
        </div>
      </div>

      {/* Trust Points */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-lightgray">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-2">
            <Shield className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-xs font-medium text-neutral-charcoal">Secure</p>
          <p className="text-xs text-neutral-darkgray">payments</p>
        </div>
        
        <div className="text-center">
          <div className="w-10 h-10 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-2">
            <X className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-xs font-medium text-neutral-charcoal">No</p>
          <p className="text-xs text-neutral-darkgray">contracts</p>
        </div>
        
        <div className="text-center">
          <div className="w-10 h-10 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-2">
            <Check className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-xs font-medium text-neutral-charcoal">Cancel</p>
          <p className="text-xs text-neutral-darkgray">anytime</p>
        </div>
      </div>

      {/* Additional Assurance */}
      <p className="text-xs text-center text-neutral-darkgray mt-4">
        Your card is charged only after each completed service. We never store your full card details.
      </p>
    </div>
  );
}
