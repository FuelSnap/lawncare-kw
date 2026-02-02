'use client';

import { Ticket, Clock, Smartphone, RefreshCw } from 'lucide-react';
import { Card } from './Card';
import { cn } from '@/lib/utils';

interface SkipTokensExplainerProps {
  className?: string;
  variant?: 'card' | 'inline' | 'detailed';
}

export function SkipTokensExplainer({ className, variant = 'card' }: SkipTokensExplainerProps) {
  if (variant === 'inline') {
    return (
      <div className={cn('flex items-center gap-3 text-sm', className)}>
        <Ticket className="w-5 h-5 text-primary" />
        <span className="text-neutral-charcoal">
          <span className="font-semibold">Skip tokens:</span> Skip services anytime, 48+ hours notice
        </span>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <Card className={cn('bg-gradient-to-br from-brand-50 to-green-50', className)}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
            <Ticket className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold text-primary">Skip Tokens</h3>
            <p className="text-sm text-neutral-darkgray">Flexibility built in</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4">
            <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center mb-3">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-semibold text-primary mb-1">48+ Hours Notice</h4>
            <p className="text-sm text-neutral-darkgray">
              Use your skip at least 48 hours before your service window starts.
            </p>
          </div>

          <div className="bg-white rounded-xl p-4">
            <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center mb-3">
              <Smartphone className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-semibold text-primary mb-1">Tap to Skip</h4>
            <p className="text-sm text-neutral-darkgray">
              No awkward phone calls. Just tap skip in your account. Done.
            </p>
          </div>

          <div className="bg-white rounded-xl p-4">
            <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center mb-3">
              <RefreshCw className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-semibold text-primary mb-1">Tokens Refresh</h4>
            <p className="text-sm text-neutral-darkgray">
              Your skip tokens refresh periodically based on your plan.
            </p>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-xl p-4 border border-brand-200">
          <p className="text-sm text-neutral-charcoal">
            <span className="font-semibold text-primary">Going on vacation?</span> You can also pause your subscription entirely. 
            No fees, no hassle. Just let us know.
          </p>
        </div>
      </Card>
    );
  }

  // Default card variant
  return (
    <Card className={cn('', className)}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-brand-100 rounded-2xl flex items-center justify-center flex-shrink-0">
          <Ticket className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-heading text-lg font-semibold text-primary mb-2">
            Skip Tokens Included
          </h3>
          <ul className="space-y-2 text-sm text-neutral-charcoal">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Skip services without charge
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              Use 48+ hours before your window
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              No awkward texts—just tap skip
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
