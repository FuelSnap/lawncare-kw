'use client';

import { Star, MapPin, Users, ShieldCheck, Quote } from 'lucide-react';
import { Card } from '@/components/ui';
import { TESTIMONIALS } from '@/lib/constants';
import { cn } from '@/lib/utils';

// Individual Testimonial Card
function TestimonialCard({ testimonial }: { testimonial: typeof TESTIMONIALS[0] }) {
  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center gap-1 mb-3">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      
      <div className="flex-1">
        <Quote className="w-8 h-8 text-brand-200 mb-2" />
        <p className="text-neutral-charcoal leading-relaxed">
          "{testimonial.text}"
        </p>
      </div>
      
      <div className="mt-4 pt-4 border-t border-neutral-midgray flex items-center justify-between">
        <div>
          <p className="font-semibold text-primary">{testimonial.name}</p>
          <p className="text-sm text-neutral-darkgray flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {testimonial.neighborhood}, {testimonial.city}
          </p>
        </div>
        <p className="text-xs text-neutral-darkgray">{testimonial.date}</p>
      </div>
    </Card>
  );
}

// Testimonials Section
export function TestimonialsSection() {
  return (
    <section className="section">
      <div className="container-wide">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full mb-4">
            <Star className="w-5 h-5 fill-yellow-500" />
            <span className="font-medium">4.9/5 from 50+ reviews</span>
          </div>
          <h2 className="font-heading text-3xl font-bold text-primary mb-4">
            What KW Homeowners Say
          </h2>
          <p className="text-lg text-neutral-darkgray">
            Don't just take our word for it — hear from your neighbors
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        <p className="text-center text-sm text-neutral-darkgray mt-6">
          More reviews on <span className="text-primary font-medium">Google</span> • Real customers, real results
        </p>
      </div>
    </section>
  );
}

// Local Proof Section
export function LocalProofSection() {
  const neighborhoods = [
    'Beechwood', 'Laurelwood', 'Doon', 'Forest Heights', 
    'Stanley Park', 'Hespeler', 'Galt', 'University District'
  ];

  return (
    <section className="section-alt">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-soft">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Icon & Badge */}
              <div className="flex-shrink-0 text-center">
                <div className="w-24 h-24 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-12 h-12 text-primary" />
                </div>
                <span className="inline-block bg-primary text-white text-sm font-medium px-4 py-1 rounded-full">
                  Local to KW
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-heading text-2xl font-bold text-primary mb-3">
                  Proudly Serving Kitchener–Waterloo
                </h3>
                <p className="text-neutral-darkgray mb-4">
                  We're not a marketplace connecting you with random contractors. 
                  We're a local operation with consistent crews who know your neighborhood.
                </p>
                
                {/* Neighborhood Tags */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {neighborhoods.map((hood) => (
                    <span 
                      key={hood}
                      className="px-3 py-1 bg-brand-50 text-primary text-sm rounded-full border border-brand-200"
                    >
                      {hood}
                    </span>
                  ))}
                  <span className="px-3 py-1 bg-neutral-lightgray text-neutral-darkgray text-sm rounded-full">
                    + 40 more
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Consistent Crews Module
export function ConsistentCrewsModule() {
  return (
    <div className="bg-brand-50 rounded-2xl p-6 border border-brand-200">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div>
          <h4 className="font-heading text-lg font-semibold text-primary mb-2">
            Not Gig Workers — Consistent Crews
          </h4>
          <p className="text-neutral-darkgray text-sm">
            The same trained crew services your neighborhood every time. 
            They know your property, your gate code, and your preferences. 
            No strangers, no surprises.
          </p>
        </div>
      </div>
    </div>
  );
}

// Trust Badges Module
export function TrustBadgesModule() {
  const badges = [
    { icon: ShieldCheck, label: 'Insured & Bonded' },
    { icon: Star, label: '4.9★ Rating' },
    { icon: Users, label: 'Consistent Crews' },
    { icon: MapPin, label: 'Local to KW' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {badges.map((badge) => (
        <div 
          key={badge.label}
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-neutral-midgray"
        >
          <badge.icon className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-neutral-charcoal">{badge.label}</span>
        </div>
      ))}
    </div>
  );
}
