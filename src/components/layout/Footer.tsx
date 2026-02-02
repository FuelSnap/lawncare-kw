import Link from 'next/link';

const footerNavigation = {
  company: [
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Service Area', href: '/service-area' },
    { name: 'FAQ', href: '/faq' },
  ],
  legal: [
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
};

const serviceAreas = ['Kitchener', 'Waterloo', 'Cambridge', 'Guelph'];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-xl font-semibold tracking-tight">
              CutDay
            </Link>
            <p className="mt-4 text-neutral-400 text-sm leading-relaxed">
              Premium lawn care for the Kitchener-Waterloo region. Instant pricing. Zero phone calls.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-sm text-neutral-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
              Service Areas
            </h4>
            <ul className="space-y-3">
              {serviceAreas.map((area) => (
                <li key={area}>
                  <Link 
                    href={`/service-area#${area.toLowerCase()}`}
                    className="text-sm text-neutral-300 hover:text-white transition-colors"
                  >
                    {area}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerNavigation.legal.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-sm text-neutral-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <p className="text-neutral-500 text-sm">
            © {currentYear} CutDay. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
