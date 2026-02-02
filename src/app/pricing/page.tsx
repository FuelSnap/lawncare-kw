'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';

type PlanType = 'subscription' | 'onetime';

interface PricingTier {
  name: string;
  price: string;
  priceNote: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const subscriptionPlans: PricingTier[] = [
  {
    name: 'Weekly',
    price: '$35–55',
    priceNote: 'per visit',
    description: 'For pristine lawns that need frequent attention',
    features: [
      'Service every 7 days',
      'Consistent crew assignment',
      'Photo proof every visit',
      'Skip up to 2 visits/month',
      'Priority scheduling',
    ],
  },
  {
    name: 'Bi-Weekly',
    price: '$40–65',
    priceNote: 'per visit',
    description: 'Our most popular option for KW homeowners',
    features: [
      'Service every 14 days',
      'Consistent crew assignment',
      'Photo proof every visit',
      'Skip 1 visit/month included',
      'Seasonal adjustments',
    ],
    popular: true,
  },
  {
    name: 'Every 10 Days',
    price: '$38–60',
    priceNote: 'per visit',
    description: 'Perfect balance between weekly and bi-weekly',
    features: [
      'Service every 10 days',
      'Consistent crew assignment',
      'Photo proof every visit',
      'Flexible scheduling',
      'Weather-adjusted timing',
    ],
  },
];

const onetimePlans: PricingTier[] = [
  {
    name: 'Standard Cut',
    price: '$55–85',
    priceNote: 'one-time',
    description: 'Regular lawn in good condition',
    features: [
      'Professional mowing',
      'Edge trimming',
      'Surface blow-off',
      'Photo proof',
      'Same-week availability',
    ],
  },
  {
    name: 'Overgrown Rescue',
    price: '$95–150',
    priceNote: 'one-time',
    description: 'Lawns that have gotten out of hand',
    features: [
      'Multi-pass mowing',
      'Tall grass handling',
      'Edge reclaiming',
      'Debris cleanup',
      'Photo proof',
    ],
    popular: true,
  },
  {
    name: 'Real Estate Ready',
    price: '$120–180',
    priceNote: 'one-time',
    description: 'Preparing a property for listing or showing',
    features: [
      'Complete lawn refresh',
      'Detailed edging',
      'Curb appeal focus',
      'Rush availability',
      'Photo documentation',
    ],
  },
];

function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <div className={`relative flex flex-col p-6 rounded-xl ${
      tier.popular 
        ? 'border-2 border-primary-900 bg-white shadow-lg' 
        : 'border border-neutral-200 bg-white'
    }`}>
      {tier.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-primary-900 text-white text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-neutral-900 mb-1">{tier.name}</h3>
        <p className="text-sm text-neutral-600">{tier.description}</p>
      </div>
      
      <div className="mb-6">
        <span className="text-3xl font-semibold text-neutral-900">{tier.price}</span>
        <span className="text-neutral-500 ml-2">{tier.priceNote}</span>
      </div>
      
      <ul className="space-y-3 mb-8 flex-1">
        {tier.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-neutral-700">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Link 
        href="/book" 
        className={tier.popular ? 'btn-primary justify-center' : 'btn-secondary justify-center'}
      >
        Get My Price
      </Link>
    </div>
  );
}

export default function PricingPage() {
  const [planType, setPlanType] = useState<PlanType>('subscription');
  const plans = planType === 'subscription' ? subscriptionPlans : onetimePlans;

  return (
    <>
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-20 bg-neutral-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-semibold text-neutral-900 tracking-tight mb-6">
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed mb-10">
              Know exactly what you'll pay before you book. Price based on lawn size — no surprises.
            </p>
            
            {/* Toggle */}
            <div className="inline-flex items-center bg-neutral-200 p-1 rounded-lg">
              <button
                onClick={() => setPlanType('subscription')}
                className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
                  planType === 'subscription'
                    ? 'bg-white text-neutral-900 shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Subscription
              </button>
              <button
                onClick={() => setPlanType('onetime')}
                className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
                  planType === 'onetime'
                    ? 'bg-white text-neutral-900 shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                One-Time
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((tier) => (
              <PricingCard key={tier.name} tier={tier} />
            ))}
          </div>
          
          <p className="text-center text-sm text-neutral-500 mt-8">
            Final price calculated based on your lawn size during booking. Add-ons available.
          </p>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              Questions about pricing?
            </h2>
            <p className="text-neutral-600 mb-6">
              We've answered the most common questions about how our pricing works.
            </p>
            <Link href="/faq" className="btn-secondary">
              View FAQ
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-primary-900">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Get your exact price now
          </h2>
          <p className="text-lg text-primary-200 mb-8 max-w-xl mx-auto">
            Enter your address and see your personalized quote in under 60 seconds.
          </p>
          <Link href="/book" className="btn-secondary bg-white text-primary-900 hover:bg-neutral-100">
            Get My Price
          </Link>
        </div>
      </section>
    </>
  );
}
