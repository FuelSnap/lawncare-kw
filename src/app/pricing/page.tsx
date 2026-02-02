import Link from 'next/link';
import { Metadata } from 'next';
import { 
  Check, 
  ArrowRight, 
  Calendar, 
  Scissors, 
  Leaf, 
  Sparkles,
  AlertCircle,
  Building2
} from 'lucide-react';
import { Button, Card, Alert } from '@/components/ui';
import { 
  PLANS, 
  LAWN_SIZES, 
  ADD_ONS, 
  ONE_TIME_SERVICES,
  OVERGROWN_SURCHARGE,
  EXACT_DAY_PREMIUM 
} from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import SkipTokensExplainer from '@/components/shared/SkipTokensExplainer';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent lawn care pricing. Subscription plans with discounts, one-time services, and add-ons. See exactly what you\'ll pay.',
};

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="section bg-gradient-to-br from-brand-50 via-white to-neutral-offwhite">
        <div className="container-wide text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-neutral-darkgray max-w-2xl mx-auto">
            Based on your lawn size. Save with subscriptions. No hidden fees, ever.
          </p>
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="section" id="subscriptions">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-primary mb-4">
              Subscription Plans
            </h2>
            <p className="text-lg text-neutral-darkgray max-w-2xl mx-auto">
              Set it and forget it. Pick your frequency, and we'll keep your lawn looking great all season.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            {PLANS.map((plan) => (
              <Card 
                key={plan.id}
                variant={plan.popular ? 'selected' : 'outlined'}
                className="relative"
                id={plan.frequency}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-accent text-white text-sm font-semibold rounded-full shadow-soft">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center pt-4">
                  <h3 className="font-heading text-2xl font-semibold text-primary">
                    {plan.name}
                  </h3>
                  <p className="text-neutral-darkgray mt-2 mb-4">
                    {plan.description}
                  </p>
                  
                  <div className="py-4 border-y border-neutral-midgray my-4">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 text-success rounded-full font-semibold">
                      <Sparkles className="w-4 h-4" />
                      Save {plan.discountPercent}% vs One-Time
                    </span>
                  </div>
                  
                  <p className="text-sm text-neutral-darkgray mb-6">
                    Service every {plan.intervalDays} days
                  </p>
                  
                  <Link href="/book">
                    <Button variant={plan.popular ? 'primary' : 'secondary'} fullWidth>
                      Start This Plan
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          {/* What's Included */}
          <div className="bg-brand-50 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="font-heading text-xl font-semibold text-primary mb-4 text-center">
              Every Subscription Includes:
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Full lawn mowing at proper height',
                'Clipping blow-off from hard surfaces',
                'Before & after photo proof',
                'Flexible service windows',
                'Skip tokens for when you don\'t need service',
                'Automatic rain rescheduling',
                'No contracts - cancel anytime',
                'Card-on-file billing after each cut',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="text-neutral-charcoal">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skip Tokens Explainer */}
          <div className="max-w-3xl mx-auto mt-12">
            <SkipTokensExplainer />
          </div>
        </div>
      </section>

      {/* Multi-Property Teaser */}
      <section className="section bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="container-wide max-w-4xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Building2 className="w-12 h-12 text-purple-600" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-heading text-2xl font-bold text-purple-900 mb-3">
                Manage Multiple Properties
              </h2>
              <p className="text-purple-800 mb-4">
                Landlords and property managers: add all your properties to one account. 
                Get one consolidated invoice, photo proof for every property, and volume pricing on 3+ properties.
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  Single Dashboard
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  Bulk Pricing
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  Individual Property Notes
                </span>
              </div>
            </div>
            <Link href="/contact">
              <Button variant="secondary" className="whitespace-nowrap">
                Contact for Volume Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing by Lawn Size */}
      <section className="section-alt">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-primary mb-4">
              Pricing by Lawn Size
            </h2>
            <p className="text-lg text-neutral-darkgray max-w-2xl mx-auto">
              Your price is based on lawn size, terrain, and any obstacles. Here are our base rates:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {LAWN_SIZES.map((size) => (
              <Card key={size.size} className="text-center">
                <h3 className="font-heading text-xl font-semibold text-primary mb-1">
                  {size.label}
                </h3>
                <p className="text-sm text-neutral-darkgray mb-4">
                  {size.sqftRange}
                </p>
                <p className="text-3xl font-bold text-accent mb-2">
                  {formatPrice(size.basePrice)}
                </p>
                <p className="text-sm text-neutral-darkgray">
                  starting at / cut
                </p>
                <p className="text-sm text-neutral-darkgray mt-4 pt-4 border-t border-neutral-midgray">
                  {size.description}
                </p>
              </Card>
            ))}
          </div>

          <Alert variant="info" className="max-w-3xl mx-auto mt-8">
            <strong>Price Adjustments:</strong> Sloped terrain, multiple obstacles, or gated access may add $5-15 to your base rate. 
            Your exact price is calculated during booking based on your property details.
          </Alert>
        </div>
      </section>

      {/* One-Time Services */}
      <section className="section" id="onetime">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-primary mb-4">
              One-Time Services
            </h2>
            <p className="text-lg text-neutral-darkgray max-w-2xl mx-auto">
              Not ready for a subscription? We offer flexible one-time options too.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {ONE_TIME_SERVICES.map((service) => (
              <Card key={service.id} className="flex items-start gap-4" id={service.id === 'overgrown_rescue' ? 'rescue' : undefined}>
                <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  {service.id === 'single_cut' && <Scissors className="w-6 h-6 text-primary" />}
                  {service.id === 'overgrown_rescue' && <Leaf className="w-6 h-6 text-primary" />}
                  {service.id === 'pre_listing' && <Sparkles className="w-6 h-6 text-primary" />}
                  {service.id === 'pre_party' && <Calendar className="w-6 h-6 text-primary" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-primary">
                        {service.name}
                      </h3>
                      <p className="text-neutral-darkgray mt-1">
                        {service.description}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full whitespace-nowrap">
                      {service.priceMultiplier}x base
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add-Ons */}
      <section className="section-alt">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-primary mb-4">
              Add-On Services
            </h2>
            <p className="text-lg text-neutral-darkgray max-w-2xl mx-auto">
              Customize your service with these optional extras.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {ADD_ONS.map((addon) => (
              <div 
                key={addon.id}
                className="bg-white rounded-xl p-5 border border-neutral-midgray flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold text-primary">{addon.name}</h3>
                  <p className="text-sm text-neutral-darkgray">{addon.description}</p>
                </div>
                <span className="text-lg font-bold text-accent ml-4">
                  +{formatPrice(addon.price)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Circumstances */}
      <section className="section">
        <div className="container-wide max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-primary mb-6 text-center">
            Special Circumstances
          </h2>

          <div className="space-y-4">
            <Card className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-warning flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-primary">Overgrown Lawn Surcharge</h3>
                <p className="text-neutral-darkgray">
                  Lawns with grass over 6 inches tall may incur a {formatPrice(OVERGROWN_SURCHARGE)} surcharge 
                  on your first visit. After the initial cut, regular subscription rates apply.
                </p>
              </div>
            </Card>

            <Card className="flex items-start gap-4">
              <Calendar className="w-6 h-6 text-info flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-primary">Exact Day Guarantee</h3>
                <p className="text-neutral-darkgray">
                  Want service on a specific day instead of a window? Add {formatPrice(EXACT_DAY_PREMIUM)} per visit 
                  for our Exact Day Guarantee. Subject to weather conditions.
                </p>
              </div>
            </Card>

            <Card className="flex items-start gap-4">
              <Check className="w-6 h-6 text-success flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-primary">No-Access Policy</h3>
                <p className="text-neutral-darkgray">
                  If we arrive and cannot access your property (locked gate, loose dog, etc.), we'll notify you 
                  and reschedule. No charge if we couldn't complete service due to access issues.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-primary text-white">
        <div className="container-wide text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Ready to See Your Exact Price?
          </h2>
          <p className="text-xl text-brand-200 mb-8 max-w-xl mx-auto">
            Enter your address and property details. Get an instant quote with no obligation.
          </p>
          <Link href="/book">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-brand-100"
            >
              Get Your Price Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
