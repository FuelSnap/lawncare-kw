import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button, Accordion } from '@/components/ui';
import { FAQ_ITEMS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about CutDay lawn care service. Learn about skips, rain delays, pets, gates, pricing, and more.',
};

// Convert FAQ items to accordion format
const faqAccordionItems = FAQ_ITEMS.map((item, index) => ({
  id: `faq-${index}`,
  question: item.question,
  answer: item.answer,
}));

// Group FAQs by category - indices match FAQ_ITEMS order
const faqCategories = [
  {
    title: 'Service & Scheduling',
    items: faqAccordionItems.filter((_, i) => [0, 1, 2, 7].includes(i)), // Window, Rain, Skip tokens, Crew consistency
  },
  {
    title: 'Access & Property',
    items: faqAccordionItems.filter((_, i) => [3, 4, 5].includes(i)), // Gate, Pets, Overgrown
  },
  {
    title: 'Quality & Proof',
    items: faqAccordionItems.filter((_, i) => [6, 11].includes(i)), // Good job, Standard cut
  },
  {
    title: 'Billing & Cancellation',
    items: faqAccordionItems.filter((_, i) => [8, 9].includes(i)), // Payments, Cancel
  },
  {
    title: 'Service Area & Multi-Property',
    items: faqAccordionItems.filter((_, i) => [10, 12].includes(i)), // Area, Multi-property
  },
];

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="section bg-gradient-to-br from-brand-50 via-white to-neutral-offwhite">
        <div className="container-wide text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-neutral-darkgray max-w-2xl mx-auto">
            Everything you need to know about CutDay lawn care service.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="section">
        <div className="container-wide max-w-3xl">
          <div className="space-y-12">
            {faqCategories.map((category) => (
              <div key={category.title} id={category.title.toLowerCase().replace(/\s+/g, '-')}>
                <h2 className="font-heading text-2xl font-semibold text-primary mb-6 pb-3 border-b border-neutral-midgray">
                  {category.title}
                </h2>
                <Accordion items={category.items} allowMultiple />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="section-alt">
        <div className="container-wide max-w-2xl text-center">
          <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-primary mb-4">
            Still Have Questions?
          </h2>
          <p className="text-lg text-neutral-darkgray mb-6">
            We're here to help. Reach out and we'll get back to you within a few hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="secondary">
                Contact Us
              </Button>
            </Link>
            <Link href="/book">
              <Button>
                Get Your Price
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
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
            Book in 60 seconds. Get photo proof every cut.
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
