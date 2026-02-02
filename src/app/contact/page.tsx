import { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Button, Input, Card } from '@/components/ui';
import { COMPANY_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with CutDay lawn care. We respond within a few hours.',
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="section bg-gradient-to-br from-brand-50 via-white to-neutral-offwhite">
        <div className="container-wide text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-neutral-darkgray max-w-2xl mx-auto">
            Questions? We're here to help. Most inquiries are answered within a few hours.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="section">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-6">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Phone</h3>
                    <a 
                      href={`tel:${COMPANY_INFO.phone.replace(/\D/g, '')}`}
                      className="text-lg text-neutral-charcoal hover:text-accent transition-colors"
                    >
                      {COMPANY_INFO.phone}
                    </a>
                    <p className="text-sm text-neutral-darkgray mt-1">
                      For urgent matters only
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Email</h3>
                    <a 
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-lg text-neutral-charcoal hover:text-accent transition-colors"
                    >
                      {COMPANY_INFO.email}
                    </a>
                    <p className="text-sm text-neutral-darkgray mt-1">
                      We respond within a few hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Service Area</h3>
                    <p className="text-lg text-neutral-charcoal">
                      Kitchener-Waterloo Region
                    </p>
                    <p className="text-sm text-neutral-darkgray mt-1">
                      Kitchener, Waterloo, Cambridge, Guelph & surrounding areas
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Hours</h3>
                    <p className="text-lg text-neutral-charcoal">
                      {COMPANY_INFO.hours}
                    </p>
                    <p className="text-sm text-neutral-darkgray mt-1">
                      Messages received after hours answered next business day
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card variant="elevated">
              <h2 className="font-heading text-2xl font-bold text-primary mb-6">
                Send Us a Message
              </h2>
              
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    placeholder="John"
                    required
                  />
                  <Input
                    label="Last Name"
                    placeholder="Smith"
                    required
                  />
                </div>

                <Input
                  label="Email"
                  type="email"
                  placeholder="john@example.com"
                  required
                />

                <Input
                  label="Phone (Optional)"
                  type="tel"
                  placeholder="(519) 555-1234"
                />

                <div>
                  <label className="block text-base font-medium text-neutral-charcoal mb-2">
                    How can we help? <span className="text-error">*</span>
                  </label>
                  <select className="input-field" required>
                    <option value="">Select a topic</option>
                    <option value="quote">Get a quote</option>
                    <option value="service">Question about service</option>
                    <option value="billing">Billing inquiry</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-base font-medium text-neutral-charcoal mb-2">
                    Message <span className="text-error">*</span>
                  </label>
                  <textarea 
                    className="input-field min-h-[150px] resize-y"
                    placeholder="Tell us how we can help..."
                    required
                  />
                </div>

                <Button type="submit" fullWidth size="lg">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Send Message
                </Button>

                <p className="text-sm text-neutral-darkgray text-center">
                  We typically respond within 2-4 hours during business hours.
                </p>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
