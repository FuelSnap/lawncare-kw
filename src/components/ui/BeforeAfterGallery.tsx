'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from './Button';
import { Card } from './Card';
import { BEFORE_AFTER_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface BeforeAfterGalleryProps {
  className?: string;
}

export function BeforeAfterGallery({ className }: BeforeAfterGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAfter, setShowAfter] = useState<boolean[]>(BEFORE_AFTER_ITEMS.map(() => false));

  const toggleImage = (index: number) => {
    setShowAfter(prev => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const nextSlide = () => {
    setActiveIndex(prev => (prev + 1) % BEFORE_AFTER_ITEMS.length);
  };

  const prevSlide = () => {
    setActiveIndex(prev => (prev - 1 + BEFORE_AFTER_ITEMS.length) % BEFORE_AFTER_ITEMS.length);
  };

  return (
    <div className={cn('', className)}>
      {/* Mobile: Carousel */}
      <div className="md:hidden">
        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {BEFORE_AFTER_ITEMS.map((item, index) => (
                <div key={item.id} className="flex-shrink-0 w-full">
                  <BeforeAfterCard 
                    item={item} 
                    showAfter={showAfter[index]} 
                    onToggle={() => toggleImage(index)} 
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 text-primary" />
          </button>
        </div>
        
        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {BEFORE_AFTER_ITEMS.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                'w-2.5 h-2.5 rounded-full transition-colors',
                index === activeIndex ? 'bg-primary' : 'bg-neutral-midgray'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop: Grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {BEFORE_AFTER_ITEMS.map((item, index) => (
          <BeforeAfterCard 
            key={item.id}
            item={item} 
            showAfter={showAfter[index]} 
            onToggle={() => toggleImage(index)} 
          />
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-8">
        <Link href="/book">
          <Button size="lg">
            Book Your First Cut
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

interface BeforeAfterCardProps {
  item: typeof BEFORE_AFTER_ITEMS[0];
  showAfter: boolean;
  onToggle: () => void;
}

function BeforeAfterCard({ item, showAfter, onToggle }: BeforeAfterCardProps) {
  return (
    <Card className="overflow-hidden" padding="none">
      {/* Image container with placeholder */}
      <div 
        className="relative aspect-[4/3] bg-gradient-to-br from-neutral-lightgray to-neutral-midgray cursor-pointer group"
        onClick={onToggle}
      >
        {/* Placeholder lawn images using CSS gradients */}
        <div className={cn(
          'absolute inset-0 transition-opacity duration-500',
          showAfter ? 'opacity-0' : 'opacity-100'
        )}>
          {/* Before: messy lawn representation */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-200 via-yellow-300 to-amber-400" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2">🌾</div>
              <p className="text-amber-800 font-semibold bg-white/80 px-3 py-1 rounded-full text-sm">Before</p>
            </div>
          </div>
        </div>
        
        <div className={cn(
          'absolute inset-0 transition-opacity duration-500',
          showAfter ? 'opacity-100' : 'opacity-0'
        )}>
          {/* After: clean lawn representation */}
          <div className="absolute inset-0 bg-gradient-to-b from-green-400 via-green-500 to-green-600" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2">✨</div>
              <p className="text-green-800 font-semibold bg-white/80 px-3 py-1 rounded-full text-sm">After</p>
            </div>
          </div>
        </div>

        {/* Toggle hint */}
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          Tap to toggle
        </div>
      </div>

      {/* Toggle buttons */}
      <div className="p-4">
        <div className="flex rounded-lg bg-neutral-lightgray p-1 mb-3">
          <button
            onClick={(e) => { e.stopPropagation(); if (showAfter) onToggle(); }}
            className={cn(
              'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all',
              !showAfter ? 'bg-white text-primary shadow-sm' : 'text-neutral-darkgray'
            )}
          >
            Before
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); if (!showAfter) onToggle(); }}
            className={cn(
              'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all',
              showAfter ? 'bg-white text-primary shadow-sm' : 'text-neutral-darkgray'
            )}
          >
            After
          </button>
        </div>
        
        <p className="text-sm font-medium text-primary text-center">{item.label}</p>
      </div>
    </Card>
  );
}
