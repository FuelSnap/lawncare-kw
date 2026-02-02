'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  title: string;
  items: FAQItem[];
}

const faqSections: FAQSection[] = [
  {
    title: 'Pricing',
    items: [
      {
        question: 'How is pricing determined?',
        answer: 'Your price is based on lawn size, terrain complexity, and any obstacles. You see your exact price before booking — no hidden fees or surprise charges.',
      },
      {
        question: 'Are there any additional fees?',
        answer: 'The price you see is the price you pay. Optional add-ons like leaf cleanup are available at additional cost, but you choose whether to include them.',
      },
      {
        question: 'Do subscription prices change?',
        answer: 'Your subscription rate is locked for the season. We only adjust pricing if you change your plan or property details significantly.',
      },
    ],
  },
  {
    title: 'Scheduling',
    items: [
      {
        question: 'How does the service window work?',
        answer: 'You pick a 2-3 day window (like Monday–Wednesday). We arrive within that window based on weather and route efficiency. You get a notification when we\'re on the way.',
      },
      {
        question: 'Can I skip a scheduled service?',
        answer: 'Yes! You have skip tokens included with your plan. Use them at least 48 hours before your window starts — just tap skip in your account. No phone calls needed.',
      },
      {
        question: 'What if I need a specific day?',
        answer: 'We offer exact-day scheduling for a small premium. Select this option during booking if you need us on a particular day.',
      },
    ],
  },
  {
    title: 'Weather',
    items: [
      {
        question: 'What happens if it rains?',
        answer: 'We monitor weather forecasts daily. If rain is expected, we\'ll automatically reschedule within your window or to the next available day. You\'ll get a text notification.',
      },
      {
        question: 'Do you service in extreme heat?',
        answer: 'For the health of your lawn, we may adjust timing during extreme heat. We\'ll always communicate any changes in advance.',
      },
    ],
  },
  {
    title: 'Service Details',
    items: [
      {
        question: 'What\'s included in a standard visit?',
        answer: 'Every visit includes mowing at the right height, trimming around edges and obstacles, blowing off hard surfaces, and photo proof of completed work.',
      },
      {
        question: 'Do you have the same crew each time?',
        answer: 'We assign consistent crews to neighborhoods whenever possible. While we can\'t guarantee the same person every visit, your property notes travel with you.',
      },
      {
        question: 'What if I have pets?',
        answer: 'We love pets! Add your pet info during signup and we\'ll send a reminder before each visit. If a pet is loose, we\'ll take a photo, notify you, and reschedule — no charge.',
      },
      {
        question: 'What about locked gates?',
        answer: 'Save your gate code during signup. If we can\'t access your property, we\'ll photo-document, notify you, and reschedule at no charge.',
      },
    ],
  },
  {
    title: 'Billing',
    items: [
      {
        question: 'How do payments work?',
        answer: 'We use secure card-on-file billing through Stripe. Subscriptions are charged after each service is completed. Receipts are emailed automatically.',
      },
      {
        question: 'Can I cancel anytime?',
        answer: 'Yes. Cancel with 7 days notice through your account — no phone calls, no cancellation fees. We hope you won\'t, but we make it easy if you need to.',
      },
      {
        question: 'What\'s your satisfaction guarantee?',
        answer: 'Not happy with a service? Let us know within 3 days and we\'ll send a crew back to make it right, or refund that visit.',
      },
    ],
  },
];

function AccordionItem({ item, isOpen, onToggle }: { 
  item: FAQItem; 
  isOpen: boolean; 
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-neutral-200 last:border-0">
      <button
        onClick={onToggle}
        className="w-full py-5 text-left flex items-center justify-between gap-4"
      >
        <span className="text-base font-medium text-neutral-900">{item.question}</span>
        <ChevronDown 
          className={`w-5 h-5 text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="pb-5 text-neutral-600 leading-relaxed">
          {item.answer}
        </div>
      )}
    </div>
  );
}

function FAQAccordion({ section }: { section: FAQSection }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mb-12 last:mb-0">
      <h2 className="text-xl font-semibold text-neutral-900 mb-4">{section.title}</h2>
      <div className="bg-white rounded-xl border border-neutral-200 px-6">
        {section.items.map((item, index) => (
          <AccordionItem
            key={index}
            item={item}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-20 bg-neutral-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-semibold text-neutral-900 tracking-tight mb-6">
              Frequently asked questions
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              Everything you need to know about CutDay lawn care service.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {faqSections.map((section) => (
              <FAQAccordion key={section.title} section={section} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              Still have questions?
            </h2>
            <p className="text-neutral-600 mb-6">
              We're here to help. Reach out and we'll get back to you within a few hours.
            </p>
            <Link href="/contact" className="btn-secondary">
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-primary-900">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg text-primary-200 mb-8 max-w-xl mx-auto">
            See your price in seconds and book your first service today.
          </p>
          <Link href="/book" className="btn-secondary bg-white text-primary-900 hover:bg-neutral-100">
            Get My Price
          </Link>
        </div>
      </section>
    </>
  );
}
