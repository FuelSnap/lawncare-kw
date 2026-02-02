import Link from 'next/link';
import { Metadata } from 'next';
import { 
  MapPin, 
  Calendar, 
  CreditCard, 
  Bell, 
  Camera, 
  CheckCircle,
  ArrowRight,
  Cloud,
  Shield,
  Clock,
  Smartphone
} from 'lucide-react';
import { Button, Card } from '@/components/ui';
import SkipTokensExplainer from '@/components/shared/SkipTokensExplainer';
import EveryVisitChecklist from '@/components/home/EveryVisitChecklist';
import RainPolicyCard from '@/components/home/RainPolicyCard';
import PetFriendlyModule from '@/components/home/PetFriendlyModule';

export const metadata: Metadata = {
  title: 'How It Works',
  description: 'Learn how CutDay\'s zero-contact lawn care service works. Book online, pick your window, get photo proof every visit.',
};

const steps = [
  {
    number: 1,
    title: 'Enter Your Address',
    description: 'We instantly verify your location is in our KW service area and use satellite imagery to estimate your lawn size.',
    icon: MapPin,
    details: [
      'Automatic service area validation',
      'Satellite-based lawn size estimation',
      'Identify terrain and obstacles',
    ],
  },
  {
    number: 2,
    title: 'Pick Your Plan',
    description: 'Choose a subscription frequency that works for your lawn. Weekly, bi-weekly, or every 10 days. Or book a one-time service.',
    icon: Calendar,
    details: [
      'Subscription discounts up to 15%',
      'One-time options available',
      'Add services like edging or trimming',
    ],
  },
  {
    number: 3,
    title: 'Select Your Window',
    description: 'Pick a 2-3 day service window. We arrive within that window based on weather and optimal routing.',
    icon: Clock,
    details: [
      'Predictable 2-3 day windows',
      'Optional exact day guarantee',
      'Automatic rain rescheduling',
    ],
  },
  {
    number: 4,
    title: 'Secure Payment',
    description: 'Add your card securely via Stripe. You\'re only charged after each service is completed.',
    icon: CreditCard,
    details: [
      'Secure card-on-file with Stripe',
      'Charged after service, not before',
      'Easy receipt and invoice access',
    ],
  },
  {
    number: 5,
    title: 'We Handle the Rest',
    description: 'We arrive within your window, mow your lawn to the proper height, blow off clippings, and upload photo proof.',
    icon: CheckCircle,
    details: [
      'Professional equipment',
      'Consistent cutting height',
      'Clean up included',
    ],
  },
  {
    number: 6,
    title: 'Get Photo Proof',
    description: 'Within minutes of completion, before and after photos are uploaded to your account. See exactly what was done.',
    icon: Camera,
    details: [
      'Before & after photos every visit',
      'Timestamped for verification',
      'Access anytime in your account',
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="section bg-gradient-to-br from-brand-50 via-white to-neutral-offwhite">
        <div className="container-wide text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
            How CutDay Works
          </h1>
          <p className="text-xl text-neutral-darkgray max-w-2xl mx-auto">
            Zero-contact lawn care designed for busy homeowners. 
            No phone calls, no waiting, no surprises.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="section">
        <div className="container-wide max-w-4xl">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-6 top-20 bottom-0 w-0.5 bg-brand-200 hidden md:block" />
                )}
                
                <div className="flex gap-6 md:gap-10">
                  {/* Step Number */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-primary text-white rounded-2xl flex items-center justify-center text-xl md:text-2xl font-bold shadow-soft relative z-10">
                      {step.number}
                    </div>
                  </div>
                  
                  {/* Step Content */}
                  <div className="flex-1 pb-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <step.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="font-heading text-2xl font-semibold text-primary">
                          {step.title}
                        </h2>
                        <p className="text-lg text-neutral-darkgray mt-2">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="ml-0 md:ml-16 mt-4">
                      <ul className="space-y-2">
                        {step.details.map((detail) => (
                          <li key={detail} className="flex items-center gap-3 text-neutral-charcoal">
                            <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Every Visit Checklist */}
      <section className="section-alt">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
            <EveryVisitChecklist />
            <div className="space-y-6">
              <RainPolicyCard />
              <PetFriendlyModule variant="compact" />
            </div>
          </div>
        </div>
      </section>

      {/* Skip Tokens Explainer */}
      <section className="section">
        <div className="container-wide max-w-3xl">
          <SkipTokensExplainer />
        </div>
      </section>

      {/* Special Features */}
      <section className="section-alt">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-primary mb-4">
              Built-In Flexibility
            </h2>
            <p className="text-lg text-neutral-darkgray max-w-2xl mx-auto">
              Life happens. We've built features to handle it.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="text-center">
              <div className="w-14 h-14 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Cloud className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-primary mb-2">
                Smart Rain Handling
              </h3>
              <p className="text-neutral-darkgray">
                We monitor forecasts and automatically reschedule if rain is expected. 
                You get a notification—no action needed.
              </p>
            </Card>

            <Card className="text-center">
              <div className="w-14 h-14 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-primary mb-2">
                Skip Tokens
              </h3>
              <p className="text-neutral-darkgray">
                Going on vacation? Lawn doesn't need it? Use a skip token to skip 
                your next service. No phone call, no explanation needed.
              </p>
            </Card>

            <Card className="text-center">
              <div className="w-14 h-14 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-primary mb-2">
                Real-Time Updates
              </h3>
              <p className="text-neutral-darkgray">
                Get notified when we're on our way, when service is complete, 
                and when photos are ready. Always know what's happening.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Need From You */}
      <section className="section">
        <div className="container-wide max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold text-primary mb-4">
              What We Need From You
            </h2>
            <p className="text-lg text-neutral-darkgray">
              To provide the best service, we ask for a few things:
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 border border-neutral-midgray flex items-start gap-4">
              <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-primary">Clear Access</h3>
                <p className="text-neutral-darkgray">
                  Make sure we can access your lawn. If you have a gate, provide the code during signup. 
                  We'll save it securely and use it each visit.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-neutral-midgray flex items-start gap-4">
              <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-primary">Secure Pets</h3>
                <p className="text-neutral-darkgray">
                  For everyone's safety, please keep dogs inside or in a separate area during your 
                  service window. We'll send a reminder before each visit.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-neutral-midgray flex items-start gap-4">
              <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-primary">48-Hour Notice for Skips</h3>
                <p className="text-neutral-darkgray">
                  If you want to skip a service, let us know at least 48 hours before your window starts. 
                  This helps us optimize routes and serve other customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-primary text-white">
        <div className="container-wide text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-brand-200 mb-8 max-w-xl mx-auto">
            Book in 60 seconds. Get your instant quote with no obligation.
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
