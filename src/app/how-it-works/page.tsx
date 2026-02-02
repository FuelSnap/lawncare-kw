import Link from 'next/link';
import { Ruler, Calendar, CreditCard, Check } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How It Works',
  description: 'Book lawn care in 4 simple steps. Select your yard size, pick a plan, choose a date, and we handle the rest.',
};

const steps = [
  {
    number: '01',
    title: 'Select your yard size',
    description: 'Enter your address and tell us about your property. We use this to calculate your exact price.',
    icon: Ruler,
  },
  {
    number: '02',
    title: 'Pick a plan',
    description: 'Choose weekly, bi-weekly, or a one-time cut. See your price instantly — no hidden fees.',
    icon: CreditCard,
  },
  {
    number: '03',
    title: 'Choose a date',
    description: 'Pick a service window that works for your schedule. See real-time availability.',
    icon: Calendar,
  },
  {
    number: '04',
    title: 'Confirm — we handle the rest',
description: "Secure checkout, then sit back. You'll get a notification and photo proof after every visit.",
    icon: Check,
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 bg-neutral-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-semibold text-neutral-900 tracking-tight mb-6">
              How it works
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              Book your lawn care in under 60 seconds. No phone calls, no waiting for quotes.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12 md:space-y-16">
              {steps.map((step, index) => (
                <div 
                  key={step.number}
                  className="grid md:grid-cols-[100px_1fr] gap-6 md:gap-12 items-start"
                >
                  {/* Step Number */}
                  <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-0">
                    <span className="text-5xl md:text-6xl font-semibold text-neutral-200">
                      {step.number}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                        <step.icon className="w-6 h-6 text-primary-700" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
                          {step.title}
                        </h2>
                        <p className="text-lg text-neutral-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Connector line (except last) */}
                    {index < steps.length - 1 && (
                      <div className="hidden md:block ml-6 mt-8 h-12 w-px bg-neutral-200" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold text-neutral-900 text-center mb-12">
              Every visit includes
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Professional mowing at the right height for the season',
                'Trimming around edges, fences, and obstacles',
                'Hard surface blow-off (driveway, sidewalks)',
                'Gate secured after every visit',
                'Before & after photo proof',
                'Notification when we arrive and finish',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-neutral-50">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-neutral-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-primary-900">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg text-primary-200 mb-8 max-w-xl mx-auto">
            See your exact price in seconds. No commitments until you're ready.
          </p>
          <Link href="/book" className="btn-secondary bg-white text-primary-900 hover:bg-neutral-100">
            Get My Price
          </Link>
        </div>
      </section>
    </>
  );
}
