'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, 
  ChevronRight,
  Shield,
  MapPin,
  Clock,
  Camera
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════
// CALENDAR DATA (Mock - replace with real API)
// ═══════════════════════════════════════════════════════════════════════════

type DayStatus = 'available' | 'limited' | 'booked' | 'past';

interface CalendarDay {
  date: number;
  status: DayStatus;
  slotsAvailable?: number;
  slotsBooked?: number;
}

const generateCalendarDays = (month: number, year: number): CalendarDay[] => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const days: CalendarDay[] = [];
  
  for (let i = 1; i <= daysInMonth; i++) {
    const currentDate = new Date(year, month, i);
    const isPast = currentDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    if (isPast) {
      days.push({ date: i, status: 'past' });
    } else {
      // Mock availability
      const rand = Math.random();
      if (rand > 0.7) {
        days.push({ date: i, status: 'booked', slotsAvailable: 0, slotsBooked: 15 });
      } else if (rand > 0.4) {
        days.push({ date: i, status: 'limited', slotsAvailable: 3, slotsBooked: 12 });
      } else {
        days.push({ date: i, status: 'available', slotsAvailable: 8, slotsBooked: 7 });
      }
    }
  }
  return days;
};

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 
                'July', 'August', 'September', 'October', 'November', 'December'];

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

function CalendarPreview() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);
  
  const days = generateCalendarDays(currentMonth, currentYear);
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const getStatusStyles = (status: DayStatus) => {
    switch (status) {
      case 'available':
        return 'bg-green-50 text-green-700 hover:bg-green-100';
      case 'limited':
        return 'bg-amber-50 text-amber-700 hover:bg-amber-100';
      case 'booked':
        return 'bg-neutral-100 text-neutral-400 cursor-not-allowed';
      case 'past':
        return 'text-neutral-300 cursor-not-allowed';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-neutral-900">
          {MONTHS[currentMonth]} {currentYear}
        </h3>
        <div className="flex items-center gap-1">
          <button 
            onClick={prevMonth}
            className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-neutral-600" />
          </button>
          <button 
            onClick={nextMonth}
            className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-neutral-600" />
          </button>
        </div>
      </div>
      
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS.map(day => (
          <div key={day} className="text-center text-xs font-medium text-neutral-500 py-2">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before month starts */}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}
        
        {/* Day cells */}
        {days.map((day) => (
          <button
            key={day.date}
            disabled={day.status === 'past' || day.status === 'booked'}
            onClick={() => setSelectedDay(day)}
            className={`
              aspect-square rounded-lg text-sm font-medium
              flex items-center justify-center
              transition-all duration-150
              ${getStatusStyles(day.status)}
              ${selectedDay?.date === day.date ? 'ring-2 ring-primary-900 ring-offset-1' : ''}
            `}
          >
            {day.date}
          </button>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-neutral-100">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-xs text-neutral-600">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <span className="text-xs text-neutral-600">Limited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-neutral-300" />
          <span className="text-xs text-neutral-600">Booked</span>
        </div>
      </div>
      
      {/* Selected Day Info */}
      {selectedDay && selectedDay.status !== 'past' && selectedDay.status !== 'booked' && (
        <div className="mt-4 p-4 bg-neutral-50 rounded-lg">
          <p className="text-sm text-neutral-600 mb-3">
            {MONTHS[currentMonth]} {selectedDay.date}: {selectedDay.slotsBooked} slots booked • {selectedDay.slotsAvailable} available
          </p>
          <Link 
            href="/book"
            className="btn-primary w-full justify-center text-sm"
          >
            Reserve this date
          </Link>
        </div>
      )}
    </div>
  );
}

function WhyChooseCard({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-xl border border-neutral-200 bg-white">
      <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-primary-700" />
      </div>
      <h3 className="text-lg font-semibold text-neutral-900 mb-2">{title}</h3>
      <p className="text-neutral-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 bg-neutral-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Content */}
            <div className="max-w-xl">
              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 leading-[1.1] tracking-tight mb-6">
                Your lawn, handled.
              </h1>
              
              {/* Subheadline */}
              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                Instant pricing. No calls. Photo proof every cut.
              </p>
              
              {/* CTA */}
              <Link href="/book" className="btn-primary">
                Get My Price
              </Link>
              
              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-10 pt-8 border-t border-neutral-200">
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Insured & vetted</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span>KW local</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <Camera className="w-4 h-4 text-green-600" />
                  <span>Photo proof every visit</span>
                </div>
              </div>
            </div>
            
            {/* Right: Calendar Preview */}
            <div>
              <CalendarPreview />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SOCIAL PROOF
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 border-b border-neutral-200">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-neutral-600">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-semibold text-neutral-900">3,200+</span>
              <span className="text-sm">yards serviced</span>
            </div>
            <div className="w-px h-8 bg-neutral-200 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-semibold text-neutral-900">4.9</span>
              <span className="text-sm">★ average rating</span>
            </div>
            <div className="w-px h-8 bg-neutral-200 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-semibold text-neutral-900">Same-week</span>
              <span className="text-sm">availability</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          WHY CHOOSE US
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-4">
              Why CutDay
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              A modern approach to lawn care. No phone tag, no surprises, no hassle.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <WhyChooseCard 
              icon={Clock}
              title="Transparent Pricing"
              description="See your exact price before booking. No hidden fees, no estimates that balloon."
            />
            <WhyChooseCard 
              icon={MapPin}
              title="Local Experts"
              description="Our crews know KW lawns. Consistent teams, familiar faces in your neighborhood."
            />
            <WhyChooseCard 
              icon={Shield}
              title="Satisfaction Guarantee"
              description="Not happy? We'll make it right within 3 days or refund your service."
            />
            <WhyChooseCard 
              icon={Camera}
              title="Real-Time Availability"
              description="Book instantly. See exactly when we can come. Skip visits with one tap."
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TESTIMONIALS
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-4">
              Trusted by homeowners
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                quote: "Finally, a lawn service that actually shows up when they say they will. The photo proof gives me peace of mind.",
                name: "Sarah M.",
                location: "Waterloo"
              },
              {
                quote: "As a landlord with 3 properties, CutDay made my life easier. One subscription, photo proof for each property.",
                name: "David K.",
                location: "Kitchener"
              },
              {
                quote: "I'm 72 and can't mow anymore. These folks are reliable, respectful, and the booking was so simple.",
                name: "Margaret T.",
                location: "Cambridge"
              }
            ].map((testimonial, i) => (
              <div key={i} className="p-6 rounded-xl border border-neutral-200 bg-neutral-50">
                <p className="text-neutral-700 mb-4 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-neutral-900">{testimonial.name}</span>
                  <span className="text-neutral-400">•</span>
                  <span className="text-neutral-600">{testimonial.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FINAL CTA
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="section bg-primary-900">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Ready for a better lawn experience?
          </h2>
          <p className="text-lg text-primary-200 mb-8 max-w-xl mx-auto">
            Get your instant price in under 60 seconds. No phone calls, no commitments.
          </p>
          <Link href="/book" className="btn-secondary bg-white text-primary-900 hover:bg-neutral-100">
            Get My Price
          </Link>
        </div>
      </section>
    </>
  );
}
