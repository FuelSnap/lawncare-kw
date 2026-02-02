'use client';

import { Star, MapPin, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/constants';
import { Card } from './Card';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  testimonial: typeof TESTIMONIALS[0];
  className?: string;
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <Card className={cn('h-full', className)}>
      {/* Stars */}
      <div className="flex gap-1 mb-3">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      
      {/* Quote */}
      <div className="relative mb-4">
        <Quote className="w-8 h-8 text-brand-100 absolute -top-1 -left-1" />
        <p className="text-neutral-charcoal pl-6 leading-relaxed">
          "{testimonial.text}"
        </p>
      </div>
      
      {/* Attribution */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-midgray">
        <div>
          <p className="font-semibold text-primary">{testimonial.name}</p>
          <div className="flex items-center gap-1 text-sm text-neutral-darkgray">
            <MapPin className="w-4 h-4" />
            <span>{testimonial.neighborhood}, {testimonial.city}</span>
          </div>
        </div>
        <span className="text-xs text-neutral-darkgray">{testimonial.date}</span>
      </div>
    </Card>
  );
}

interface TestimonialsSectionProps {
  className?: string;
  title?: string;
  showNote?: boolean;
}

export function TestimonialsSection({ 
  className, 
  title = "What Our Customers Say",
  showNote = true 
}: TestimonialsSectionProps) {
  return (
    <div className={cn('', className)}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading text-2xl font-bold text-primary">{title}</h2>
          {showNote && (
            <p className="text-sm text-neutral-darkgray mt-1">
              Real feedback from KW homeowners
            </p>
          )}
        </div>
        
        {/* Google Reviews badge placeholder */}
        <div className="hidden sm:flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-neutral-midgray">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-sm font-medium text-neutral-charcoal">5.0 on Google</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}
