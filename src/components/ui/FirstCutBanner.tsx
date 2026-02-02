'use client';

import { Gift, Sparkles, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FirstCutBannerProps {
  className?: string;
  variant?: 'banner' | 'badge' | 'card';
  dismissible?: boolean;
}

export function FirstCutBanner({ 
  className, 
  variant = 'banner',
  dismissible = false 
}: FirstCutBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  if (variant === 'badge') {
    return (
      <span className={cn(
        'inline-flex items-center gap-1.5 bg-gradient-to-r from-accent to-orange-400 text-white px-3 py-1 rounded-full text-sm font-medium',
        className
      )}>
        <Gift className="w-4 h-4" />
        $10 off first cut
      </span>
    );
  }

  if (variant === 'card') {
    return (
      <div className={cn(
        'bg-gradient-to-r from-accent to-orange-400 rounded-2xl p-6 text-white relative overflow-hidden',
        className
      )}>
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Gift className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold mb-1">
              $10 Off Your First Cut
            </h3>
            <p className="text-white/90">
              New customers save on their first service. No code needed—automatically applied at checkout.
            </p>
          </div>
        </div>

        {dismissible && (
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-3 right-3 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }

  // Banner variant (default)
  return (
    <div className={cn(
      'bg-gradient-to-r from-accent to-orange-400 px-4 py-3 flex items-center justify-center gap-3 text-white relative',
      className
    )}>
      <Sparkles className="w-5 h-5 flex-shrink-0 animate-pulse" />
      <p className="font-medium text-center">
        <span className="font-bold">$10 off your first cut!</span>
        <span className="hidden sm:inline"> — New customers only, automatically applied</span>
      </p>
      <Sparkles className="w-5 h-5 flex-shrink-0 animate-pulse" />

      {dismissible && (
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
