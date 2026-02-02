import Link from 'next/link';
import { MapPin, Check } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Service Area',
  description: 'CutDay provides lawn care services in Kitchener, Waterloo, Cambridge, and Guelph.',
};

const serviceAreas = [
  {
    city: 'Kitchener',
    neighborhoods: ['Doon', 'Forest Heights', 'Stanley Park', 'Centreville', 'Victoria Hills', 'Bridgeport'],
  },
  {
    city: 'Waterloo',
    neighborhoods: ['Laurelwood', 'Beechwood', 'Columbia Forest', 'Lakeshore', 'Westmount', 'University District'],
  },
  {
    city: 'Cambridge',
    neighborhoods: ['Hespeler', 'Preston', 'Galt', 'Blair', 'Langs Farm', 'Southwood'],
  },
  {
    city: 'Guelph',
    neighborhoods: ['South End', 'West End', 'East End', 'Downtown', 'Kortright Hills', 'St. Patrick\'s Ward'],
  },
];

export default function ServiceAreaPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 bg-neutral-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-semibold text-neutral-900 tracking-tight mb-6">
              Serving the KW Region
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              Professional lawn care for Kitchener, Waterloo, Cambridge, and Guelph. 
              Local crews who know your neighborhood.
            </p>
          </div>
        </div>
      </section>

      {/* Cities Grid */}
      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {serviceAreas.map((area) => (
              <div 
                key={area.city}
                id={area.city.toLowerCase()}
                className="p-6 rounded-xl border border-neutral-200 bg-white"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary-700" />
                  </div>
                  <h2 className="text-xl font-semibold text-neutral-900">{area.city}</h2>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {area.neighborhoods.map((neighborhood) => (
                    <span 
                      key={neighborhood}
                      className="px-3 py-1 text-sm bg-neutral-100 text-neutral-700 rounded-full"
                    >
                      {neighborhood}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-center text-neutral-500 mt-8 max-w-xl mx-auto">
            Don't see your neighborhood? Enter your address during booking — we likely service your area.
          </p>
        </div>
      </section>

      {/* Check Coverage */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              Not sure if we service your address?
            </h2>
            <p className="text-neutral-600 mb-6">
              Start the booking process and we'll instantly confirm if your property is in our service area.
            </p>
            <Link href="/book" className="btn-primary">
              Check My Address
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-primary-900">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Ready to book?
          </h2>
          <p className="text-lg text-primary-200 mb-8 max-w-xl mx-auto">
            Get your instant price and schedule your first service today.
          </p>
          <Link href="/book" className="btn-secondary bg-white text-primary-900 hover:bg-neutral-100">
            Get My Price
          </Link>
        </div>
      </section>
    </>
  );
}
