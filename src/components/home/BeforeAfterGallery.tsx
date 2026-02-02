'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { BEFORE_AFTER_GALLERY } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function BeforeAfterGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);

  const currentItem = BEFORE_AFTER_GALLERY[currentIndex];

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % BEFORE_AFTER_GALLERY.length);
    setSliderPosition(50);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + BEFORE_AFTER_GALLERY.length) % BEFORE_AFTER_GALLERY.length);
    setSliderPosition(50);
  };

  return (
    <section className="section-alt">
      <div className="container-wide">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl font-bold text-primary mb-4">
            See the CutDay Difference
          </h2>
          <p className="text-lg text-neutral-darkgray max-w-2xl mx-auto">
            Real results from real KW lawns. Drag the slider to compare.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Before/After Slider */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg bg-neutral-lightgray">
            {/* Image Container */}
            <div className="relative aspect-[16/10] w-full">
              {/* "After" Image (Background) */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-brand-600 to-brand-400"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect fill='%2322c55e' width='100' height='100'/%3E%3Ctext x='50' y='55' font-family='sans-serif' font-size='14' fill='white' text-anchor='middle'%3EAFTER%3C/text%3E%3C/svg%3E")`,
                }}
              >
                {/* Placeholder for after image */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-24 h-24 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-4xl">✨</span>
                    </div>
                    <p className="text-2xl font-bold">AFTER</p>
                    <p className="text-sm opacity-80">Clean, professional cut</p>
                  </div>
                </div>
              </div>

              {/* "Before" Image (Overlay with clip) */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center"
                style={{
                  clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                }}
              >
                <div className="text-center text-white">
                  <div className="w-24 h-24 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-4xl">🌿</span>
                  </div>
                  <p className="text-2xl font-bold">BEFORE</p>
                  <p className="text-sm opacity-80">Overgrown, neglected</p>
                </div>
              </div>

              {/* Slider Control */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-lg"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <ChevronLeft className="w-4 h-4 text-primary" />
                  <ChevronRight className="w-4 h-4 text-primary" />
                </div>
              </div>

              {/* Invisible range input for slider */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
              />

              {/* Labels */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 text-white text-sm rounded-full">
                Before
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 text-white text-sm rounded-full">
                After
              </div>
            </div>

            {/* Caption */}
            <div className="p-4 bg-white flex items-center justify-between">
              <div>
                <p className="font-semibold text-primary">
                  {currentItem.planType} • {currentItem.lawnSize} • {currentItem.city}
                </p>
                <p className="text-sm text-neutral-darkgray">{currentItem.caption}</p>
              </div>
              
              {/* Navigation */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-neutral-midgray flex items-center justify-center hover:bg-neutral-lightgray transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm text-neutral-darkgray px-2">
                  {currentIndex + 1} / {BEFORE_AFTER_GALLERY.length}
                </span>
                <button 
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-neutral-midgray flex items-center justify-center hover:bg-neutral-lightgray transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-4">
            {BEFORE_AFTER_GALLERY.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setSliderPosition(50);
                }}
                className={cn(
                  'w-3 h-3 rounded-full transition-all',
                  idx === currentIndex ? 'bg-primary w-8' : 'bg-neutral-midgray'
                )}
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
      </div>
    </section>
  );
}
