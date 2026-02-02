'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Leaf } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/constants';

const navigation = [
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Service Area', href: '/service-area' },
  { name: 'FAQ', href: '/faq' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-midgray">
      <nav className="container-wide" aria-label="Main navigation">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 text-primary hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="font-heading text-2xl font-bold">{COMPANY_INFO.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-neutral-charcoal hover:text-primary font-medium transition-colors text-base"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href={`tel:${COMPANY_INFO.phone.replace(/\D/g, '')}`}
              className="flex items-center gap-2 text-neutral-charcoal hover:text-primary transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium">{COMPANY_INFO.phone}</span>
            </a>
            <Link href="/book" className="btn-primary">
              Get Your Price
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-3 -mr-2 text-neutral-charcoal hover:text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? (
              <X className="w-7 h-7" aria-hidden="true" />
            ) : (
              <Menu className="w-7 h-7" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div 
            id="mobile-menu"
            className="lg:hidden border-t border-neutral-midgray bg-white"
          >
            <div className="py-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-lg font-medium text-neutral-charcoal hover:bg-brand-50 hover:text-primary transition-colors rounded-lg mx-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 px-4 space-y-3 border-t border-neutral-midgray mt-4">
                <a 
                  href={`tel:${COMPANY_INFO.phone.replace(/\D/g, '')}`}
                  className="flex items-center justify-center gap-2 w-full py-3 text-lg font-medium text-neutral-charcoal"
                >
                  <Phone className="w-5 h-5" />
                  {COMPANY_INFO.phone}
                </a>
                <Link 
                  href="/book" 
                  className="btn-primary w-full text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Your Price
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
