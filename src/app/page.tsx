'use client';

import Link from 'next/link';
import { 
  Camera, 
  Calendar, 
  CreditCard, 
  Cloud, 
  Shield, 
  Clock,
  CheckCircle,
  MapPin,
  Star,
  ArrowRight,
  Leaf,
  Users
} from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { SERVICE_AREAS, PLANS } from '@/lib/constants';

// Import new feature modules
import AvailabilityModule from '@/components/home/AvailabilityModule';
import InstantEstimate from '@/components/home/InstantEstimate';
import BeforeAfterGallery from '@/components/home/BeforeAfterGallery';
import { TestimonialsSection, LocalProofSection } from '@/components/home/TrustModules';
import EveryVisitChecklist from '@/components/home/EveryVisitChecklist';
import RainPolicyCard from '@/components/home/RainPolicyCard';
import PetFriendlyModule from '@/components/home/PetFriendlyModule';
import FirstCutBanner from '@/components/home/FirstCutBanner';

export default function HomePage() {
  return (
    <>
      {/* First Cut Incentive Banner */}
      <FirstCutBanner variant="top" dismissible />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-neutral-offwhite">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-pattern-grid opacity-50" />
        
        <div className="container-wide relative py-16 md:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-soft border border-brand-200 mb-6">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Fully Insured • KW Local
                </span>
              </div>
              
              {/* Headline */}
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6 text-balance">
                Book in 60 Seconds.<br />
                <span className="text-accent">No Calls.</span><br />
                Photo Proof Every Cut.
              </h1>
              
              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-neutral-darkgray mb-8 max-w-lg mx-auto lg:mx-0">
                Zero-contact lawn care for Kitchener, Waterloo, Cambridge & Guelph. 
                Pick your window, we handle the rest.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/book">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Your Price in 30 Seconds
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    See How It Works
                  </Button>
                </Link>
              </div>
              
              {/* Quick Stats */}
              <div className="flex items-center justify-center lg:justify-start gap-8 mt-10 pt-8 border-t border-neutral-midgray">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">500+</p>
                  <p className="text-sm text-neutral-darkgray">Happy Customers</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">4.9</p>
                  <p className="text-sm text-neutral-darkgray flex items-center gap-1">
                    <Star className="w-4 h-4 text-accent fill-accent" /> Rating
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">2hr</p>
                  <p className="text-sm text-neutral-darkgray">Avg Response</p>
                </div>
              </div>
            </div>
            
            {/* Hero Visual */}
            <div className="relative">
              <div className="relative bg-primary rounded-3xl overflow-hidden shadow-strong aspect-[4/3]">
                {/* Placeholder for hero image */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                  <Leaf className="w-32 h-32 text-brand-300 opacity-50" />
                </div>
                
                {/* Photo Proof Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl p-4 shadow-strong">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-success rounded-xl flex items-center justify-center">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-primary">Service Complete</p>
                      <p className="text-sm text-neutral-darkgray">Before & after photos uploaded</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Card - Window Selection */}
              <div className="absolute -left-4 top-1/4 bg-white rounded-2xl p-4 shadow-strong hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary">Your Window</p>
                    <p className="text-xs text-neutral-darkgray">Mon – Wed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Availability + Instant Estimate Section */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-8">
            <AvailabilityModule showInput={true} />
            <InstantEstimate variant="full" />
          </div>
        </div>
      </section>

      {/* How It Works - 3 Steps */}
      <section className="section-alt">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
              Three Steps to a Perfect Lawn
            </h2>
            <p className="text-xl text-neutral-darkgray max-w-2xl mx-auto">
              No phone calls. No waiting for quotes. No surprises.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-soft">
                1
              </div>
              <h3 className="font-heading text-xl font-semibold text-primary mb-3">
                Enter Your Address
              </h3>
              <p className="text-neutral-darkgray">
                We instantly verify your location is in our service area and estimate your lawn size.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-soft">
                2
              </div>
              <h3 className="font-heading text-xl font-semibold text-primary mb-3">
                Pick Your Plan & Window
              </h3>
              <p className="text-neutral-darkgray">
                Choose weekly, bi-weekly, or every 10 days. Select a 2-3 day service window that works for you.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-soft">
                3
              </div>
              <h3 className="font-heading text-xl font-semibold text-primary mb-3">
                We Handle the Rest
              </h3>
              <p className="text-neutral-darkgray">
                We arrive within your window, cut your lawn, upload photo proof, and you&apos;re done. That&apos;s it.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/book">
              <Button size="lg">
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Before/After Gallery + Every Visit Checklist */}
      <section className="section">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
              See the CutDay Difference
            </h2>
            <p className="text-xl text-neutral-darkgray max-w-2xl mx-auto">
              Real results from real KW lawns. Swipe to see the transformation.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <BeforeAfterGallery />
            </div>
            <div>
              <EveryVisitChecklist />
            </div>
          </div>
        </div>
      </section>

      {/* Key Differentiators */}
      <section className="section-alt">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
              Why Choose CutDay?
            </h2>
            <p className="text-xl text-neutral-darkgray max-w-2xl mx-auto">
              We built the lawn care service we wished existed.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="elevated" padding="lg">
              <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-primary mb-2">
                Predictable Windows
              </h3>
              <p className="text-neutral-darkgray">
                Pick your 2-3 day window. We arrive within it. No more waiting around wondering if anyone will show up.
              </p>
            </Card>
            
            <Card variant="elevated" padding="lg">
              <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mb-4">
                <Camera className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-primary mb-2">
                Photo Proof Every Time
              </h3>
              <p className="text-neutral-darkgray">
                Before and after photos uploaded within minutes of completion. Know exactly what was done without being home.
              </p>
            </Card>
            
            <Card variant="elevated" padding="lg">
              <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-primary mb-2">
                Skip Tokens Included
              </h3>
              <p className="text-neutral-darkgray">
                Going on vacation? Skip a service with 48hr notice — no charge, no awkward texts. Tokens refresh periodically.
              </p>
            </Card>
            
            <Card variant="elevated" padding="lg">
              <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mb-4">
                <Cloud className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-primary mb-2">
                Smart Rain Logic
              </h3>
              <p className="text-neutral-darkgray">
                We monitor forecasts. If rain is coming, we auto-reschedule within your window. You get a text — no action needed.
              </p>
            </Card>
            
            <Card variant="elevated" padding="lg">
              <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-primary mb-2">
                Card-on-File, Charged After
              </h3>
              <p className="text-neutral-darkgray">
                Your card is charged only after service is complete. No prepayment, no surprises. See photo proof before you&apos;re billed.
              </p>
            </Card>
            
            <Card variant="elevated" padding="lg">
              <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-primary mb-2">
                Consistent Crews
              </h3>
              <p className="text-neutral-darkgray">
                Not gig workers. Our trained crews know KW neighborhoods and your property. Same quality, every visit.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Rain + Pet Modules */}
      <section className="section">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-6">
            <RainPolicyCard />
            <PetFriendlyModule />
          </div>
        </div>
      </section>

      {/* Objection Handling */}
      <section className="section-alt">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Will you show up? */}
            <div className="bg-white rounded-2xl p-8 shadow-soft">
              <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-primary mb-3">
                &quot;Will you actually show up?&quot;
              </h3>
              <p className="text-neutral-darkgray mb-4">
                Yes. You pick a 2-3 day window. We arrive within it. You get a notification when we&apos;re on the way and photo proof when we&apos;re done.
              </p>
              <p className="text-neutral-darkgray">
                If weather delays us, we notify you and reschedule automatically. No ghosting, no excuses.
              </p>
            </div>
            
            {/* Is this expensive? */}
            <div className="bg-white rounded-2xl p-8 shadow-soft">
              <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-primary mb-3">
                &quot;Is this expensive?&quot;
              </h3>
              <p className="text-neutral-darkgray mb-4">
                Subscription customers save 10-15% compared to one-time rates. Most standard lawns start around $45-55 per cut on a bi-weekly plan.
              </p>
              <p className="text-neutral-darkgray">
                No contracts. No hidden fees. Cancel anytime with 7 days notice.
              </p>
            </div>
            
            {/* What if it rains? */}
            <div className="bg-white rounded-2xl p-8 shadow-soft">
              <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mb-4">
                <Cloud className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-primary mb-3">
                &quot;What if it rains?&quot;
              </h3>
              <p className="text-neutral-darkgray mb-4">
                We monitor forecasts daily. If significant rain is expected, we automatically reschedule within your window or to the next available day.
              </p>
              <p className="text-neutral-darkgray">
                You get a text notification—no action needed from you. No charge if we can&apos;t complete service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container-wide">
          <TestimonialsSection />
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="section-alt">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-neutral-darkgray max-w-2xl mx-auto">
              Based on your lawn size. Discounts for subscriptions. No surprises.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {PLANS.map((plan) => (
              <Card 
                key={plan.id}
                variant={plan.popular ? 'selected' : 'default'}
                className="relative text-center"
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-sm font-semibold rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="font-heading text-2xl font-semibold text-primary mb-2 mt-2">
                  {plan.name}
                </h3>
                <p className="text-neutral-darkgray mb-4">
                  {plan.description}
                </p>
                <div className="mb-4">
                  <span className="text-accent font-semibold">
                    Save {plan.discountPercent}%
                  </span>
                </div>
                <Link href="/book">
                  <Button variant={plan.popular ? 'primary' : 'secondary'} fullWidth>
                    Get Your Price
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link href="/pricing" className="text-primary font-medium hover:text-accent transition-colors inline-flex items-center gap-2">
              View full pricing details
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Local Proof + Service Areas */}
      <section className="section">
        <div className="container-wide">
          <LocalProofSection />
          
          <div className="mt-12">
            <div className="text-center mb-8">
              <h3 className="font-heading text-2xl font-bold text-primary mb-2">
                Proudly Serving the KW Region
              </h3>
              <p className="text-neutral-darkgray">Local service for local lawns.</p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {SERVICE_AREAS.map((area) => (
                <div 
                  key={area.city}
                  className="bg-white rounded-xl p-6 text-center shadow-soft hover:shadow-medium transition-shadow"
                >
                  <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-heading text-lg font-semibold text-primary">
                    {area.city}
                  </h3>
                  <p className="text-sm text-neutral-darkgray mt-1">
                    {area.neighborhoods.length}+ neighborhoods
                  </p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link href="/service-area" className="text-primary font-medium hover:text-accent transition-colors inline-flex items-center gap-2">
                Check your address
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section bg-primary text-white">
        <div className="container-wide text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Ready to Never Think About Your Lawn Again?
          </h2>
          <p className="text-xl text-brand-200 mb-8 max-w-2xl mx-auto">
            Get your instant quote in 30 seconds. No phone calls, no waiting.
          </p>
          <Link href="/book">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-brand-100 hover:text-primary"
            >
              Get Your Price Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <p className="text-brand-300 mt-6 text-sm">
            No commitment required. See your price before you decide.
          </p>
        </div>
      </section>
    </>
  );
}
