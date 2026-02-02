'use client';

import { MapPin, Users, Shield, Leaf, CheckCircle, Heart } from 'lucide-react';
import { Card } from './Card';
import { cn } from '@/lib/utils';

interface TrustBadgesProps {
  className?: string;
  variant?: 'horizontal' | 'grid' | 'compact';
}

export function TrustBadges({ className, variant = 'grid' }: TrustBadgesProps) {
  const badges = [
    {
      icon: MapPin,
      title: 'Proudly Local',
      description: 'Based in KW, serving our neighbors',
    },
    {
      icon: Users,
      title: 'Consistent Crews',
      description: 'Not gig workers—real employees',
    },
    {
      icon: Shield,
      title: 'Fully Insured',
      description: 'Licensed and liability covered',
    },
    {
      icon: Leaf,
      title: 'Eco-Conscious',
      description: 'Proper disposal practices',
    },
  ];

  if (variant === 'compact') {
    return (
      <div className={cn('flex flex-wrap items-center gap-4 justify-center', className)}>
        {badges.map((badge) => (
          <div key={badge.title} className="flex items-center gap-2 text-sm">
            <badge.icon className="w-4 h-4 text-primary" />
            <span className="text-neutral-charcoal">{badge.title}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={cn('flex flex-wrap justify-center gap-6', className)}>
        {badges.map((badge) => (
          <div key={badge.title} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center">
              <badge.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-primary">{badge.title}</p>
              <p className="text-sm text-neutral-darkgray">{badge.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Grid variant
  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-4 gap-4', className)}>
      {badges.map((badge) => (
        <div 
          key={badge.title}
          className="bg-white rounded-2xl p-5 text-center border border-neutral-midgray"
        >
          <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <badge.icon className="w-6 h-6 text-primary" />
          </div>
          <p className="font-semibold text-primary">{badge.title}</p>
          <p className="text-sm text-neutral-darkgray mt-1">{badge.description}</p>
        </div>
      ))}
    </div>
  );
}

interface LocalProofProps {
  className?: string;
}

export function LocalProof({ className }: LocalProofProps) {
  const neighborhoods = [
    'Beechwood', 'Forest Heights', 'Doon', 'Laurelwood', 
    'Hespeler', 'Uptown Waterloo', 'Stanley Park', 'Preston'
  ];

  return (
    <Card className={cn('bg-gradient-to-br from-brand-50 to-green-50', className)}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
          <Heart className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-heading text-xl font-bold text-primary">
            Proudly Serving Kitchener–Waterloo
          </h3>
          <p className="text-sm text-neutral-darkgray">
            Your neighbors trust us with their lawns
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {neighborhoods.map((hood) => (
          <span 
            key={hood}
            className="bg-white px-3 py-1 rounded-full text-sm text-neutral-charcoal border border-neutral-midgray"
          >
            {hood}
          </span>
        ))}
        <span className="bg-primary/10 px-3 py-1 rounded-full text-sm text-primary font-medium">
          + 40 more
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-brand-200">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-primary">Not Gig Workers</p>
            <p className="text-sm text-neutral-darkgray">
              Consistent crews, not random contractors
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-primary">Local & Accountable</p>
            <p className="text-sm text-neutral-darkgray">
              We live here too—our reputation matters
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
