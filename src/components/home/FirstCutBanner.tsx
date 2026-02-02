'use client';

import { useState } from 'react';
import { Sparkles, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface FirstCutBannerProps {
  className?: string;
  variant?: 'top' | 'inline' | 'floating';
  dismissible?: boolean;
}

export default function FirstCutBanner({ 
  className, 
  variant = 'inline',
  dismissible = true 
}: FirstCutBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  if (variant === 'top') {
    return (
      <div className={cn(
        'bg-gradient-to-r from-accent to-orange-500 text-white py-2 px-4',
        className
      )}>
        <div className="container-wide flex items-center justify-center gap-3 text-sm">
          <Sparkles className="w-4 h-4" />
          <span>
            <strong>Limited Time:</strong> $10 off your first cut — Use code <code className="bg-white/20 px-2 py-0.5 rounded font-mono">FIRST10</code>
          </span>
          <Link href="/book" className="underline hover:no-underline ml-2">
            Book now →
          </Link>
          {dismissible && (
            <button 
              onClick={() => setDismissed(true)}
              className="ml-4 p-1 hover:bg-white/20 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'floating') {
    return (
      <div className={cn(
        'fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-40',
        'bg-white rounded-2xl shadow-xl border border-neutral-midgray p-4',
        className
      )}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-accent" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-primary">First Cut Special</p>
            <p className="text-sm text-neutral-darkgray mb-3">
              Get $10 off your first lawn cut. Limited time offer!
            </p>
            <Link href="/book">
              <span className="inline-flex items-center gap-1 text-accent font-medium text-sm hover:underline">
                Claim offer <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
          {dismissible && (
            <button 
              onClick={() => setDismissed(true)}
              className="p-1 hover:bg-neutral-lightgray rounded text-neutral-darkgray"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // Default inline variant
  return (
    <div className={cn(
      'bg-gradient-to-r from-accent/10 to-orange-100 rounded-2xl p-6 border-2 border-accent/30',
      'flex flex-col sm:flex-row sm:items-center gap-4',
      className
    )}>
      <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center flex-shrink-0">
        <Sparkles className="w-7 h-7 text-white" />
      </div>
      
      <div className="flex-1">
        <p className="font-heading text-xl font-semibold text-primary">
          $10 Off Your First Cut
        </p>
        <p className="text-neutral-darkgray">
          New customers get $10 off. No code needed — applied automatically at checkout.
        </p>
      </div>
      
      <Link href="/book">
        <span className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors whitespace-nowrap">
          Claim Offer
          <ArrowRight className="w-5 h-5" />
        </span>
      </Link>
    </div>
  );
}
