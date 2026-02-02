'use client';

import { Shield, Lock, CreditCard, X, RefreshCw, FileText, CheckCircle } from 'lucide-react';
import { Card } from './Card';
import { cn } from '@/lib/utils';

interface StripeTrustBadgeProps {
  className?: string;
  variant?: 'full' | 'compact' | 'inline';
}

export function StripeTrustBadge({ className, variant = 'full' }: StripeTrustBadgeProps) {
  if (variant === 'inline') {
    return (
      <div className={cn('flex items-center gap-2 text-sm text-neutral-darkgray', className)}>
        <Shield className="w-4 h-4 text-success" />
        <span>Secure payments by Stripe</span>
        <span className="text-neutral-midgray">•</span>
        <span>No contracts</span>
        <span className="text-neutral-midgray">•</span>
        <span>Cancel anytime</span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn('flex flex-wrap items-center justify-center gap-4 text-sm', className)}>
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-success" />
          <span className="text-neutral-charcoal">Secure payments</span>
        </div>
        <div className="flex items-center gap-2">
          <X className="w-4 h-4 text-success" />
          <span className="text-neutral-charcoal">No contracts</span>
        </div>
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-success" />
          <span className="text-neutral-charcoal">Cancel anytime</span>
        </div>
      </div>
    );
  }

  // Full variant
  return (
    <Card className={cn('bg-gradient-to-br from-gray-50 to-slate-50', className)}>
      {/* Stripe badge */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-neutral-midgray">
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-semibold text-primary">Secure Payments</p>
          <p className="text-sm text-neutral-darkgray">Powered by Stripe</p>
        </div>
      </div>

      {/* Trust points */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
          <div>
            <p className="font-medium text-primary">Card-on-file billing</p>
            <p className="text-sm text-neutral-darkgray">Charged only after service is completed</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
          <div>
            <p className="font-medium text-primary">No contracts</p>
            <p className="text-sm text-neutral-darkgray">Month-to-month, cancel with 7 days notice</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
          <div>
            <p className="font-medium text-primary">Cancel anytime</p>
            <p className="text-sm text-neutral-darkgray">No cancellation fees, no hassle</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
          <div>
            <p className="font-medium text-primary">Receipts & history</p>
            <p className="text-sm text-neutral-darkgray">All invoices available in your account</p>
          </div>
        </div>
      </div>

      {/* Security badges */}
      <div className="mt-4 pt-4 border-t border-neutral-midgray flex items-center justify-center gap-4 text-xs text-neutral-darkgray">
        <div className="flex items-center gap-1">
          <Lock className="w-3 h-3" />
          <span>256-bit SSL</span>
        </div>
        <div className="flex items-center gap-1">
          <Shield className="w-3 h-3" />
          <span>PCI Compliant</span>
        </div>
        <div className="flex items-center gap-1">
          <CreditCard className="w-3 h-3" />
          <span>Visa, MC, Amex</span>
        </div>
      </div>
    </Card>
  );
}

interface MultiPropertyTeaserProps {
  className?: string;
}

export function MultiPropertyTeaser({ className }: MultiPropertyTeaserProps) {
  return (
    <Card className={cn('bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200', className)}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-heading text-lg font-semibold text-primary mb-2">
            Manage Multiple Properties
          </h3>
          <p className="text-neutral-charcoal mb-3">
            Landlords and property managers—we've got you covered.
          </p>
          <ul className="space-y-2 text-sm text-neutral-darkgray">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              Add multiple properties to one account
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              Separate schedules and notes for each
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              One consolidated invoice
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              Photo proof for every property
            </li>
          </ul>
          <p className="mt-4 text-sm text-purple-700 font-medium">
            Volume pricing available for 3+ properties. Contact us!
          </p>
        </div>
      </div>
    </Card>
  );
}
