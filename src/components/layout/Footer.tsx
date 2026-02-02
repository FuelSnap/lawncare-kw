import Link from 'next/link';
import { Leaf, Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import { COMPANY_INFO, SERVICE_AREAS } from '@/lib/constants';

const footerNavigation = {
  services: [
    { name: 'Weekly Mowing', href: '/pricing#weekly' },
    { name: 'Bi-Weekly Mowing', href: '/pricing#biweekly' },
    { name: 'One-Time Cut', href: '/pricing#onetime' },
    { name: 'Overgrown Rescue', href: '/pricing#rescue' },
  ],
  company: [
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Service Area', href: '/service-area' },
    { name: 'FAQ', href: '/faq' },
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Cancellation Policy', href: '/faq#cancellation' },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <span className="font-heading text-2xl font-bold">{COMPANY_INFO.name}</span>
            </Link>
            <p className="text-brand-200 text-lg mb-6 max-w-sm">
              {COMPANY_INFO.tagline} Zero-contact lawn care for the Kitchener-Waterloo region.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a 
                href={`tel:${COMPANY_INFO.phone.replace(/\D/g, '')}`}
                className="flex items-center gap-3 text-brand-200 hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>{COMPANY_INFO.phone}</span>
              </a>
              <a 
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-3 text-brand-200 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>{COMPANY_INFO.email}</span>
              </a>
              <div className="flex items-center gap-3 text-brand-200">
                <MapPin className="w-5 h-5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              <a 
                href={`https://instagram.com/${COMPANY_INFO.socialMedia.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href={`https://facebook.com/${COMPANY_INFO.socialMedia.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              {footerNavigation.services.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-brand-200 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-brand-200 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              {footerNavigation.support.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-brand-200 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Service Areas */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <h3 className="font-heading font-semibold text-lg mb-4">Service Areas</h3>
          <div className="flex flex-wrap gap-3">
            {SERVICE_AREAS.map((area) => (
              <Link
                key={area.city}
                href={`/service-area#${area.city.toLowerCase()}`}
                className="px-4 py-2 bg-white/10 rounded-full text-sm text-brand-200 hover:bg-white/20 hover:text-white transition-colors"
              >
                {area.city}
              </Link>
            ))}
            <span className="px-4 py-2 text-sm text-brand-300">+ surrounding areas</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="container-wide py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-brand-300 text-sm">
            © {currentYear} {COMPANY_INFO.name}. All rights reserved.
          </p>
          <p className="text-brand-300 text-sm">
            Proudly serving Kitchener, Waterloo, Cambridge & Guelph
          </p>
        </div>
      </div>
    </footer>
  );
}
