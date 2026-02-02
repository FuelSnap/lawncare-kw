import Link from 'next/link';
import { Metadata } from 'next';
import { MapPin, CheckCircle, ArrowRight, Search } from 'lucide-react';
import { Button, Card, Input } from '@/components/ui';
import { SERVICE_AREAS } from '@/lib/constants';
import RegionSelector from '@/components/service-area/RegionSelector';
import AddressChecker from '@/components/service-area/AddressChecker';

export const metadata: Metadata = {
  title: 'Service Area',
  description: 'CutDay serves Kitchener, Waterloo, Cambridge, Guelph and surrounding areas. Check if your address is in our lawn care service area.',
};

export default function ServiceAreaPage() {
  return (
    <>
      {/* Hero */}
      <section className="section bg-gradient-to-br from-brand-50 via-white to-neutral-offwhite">
        <div className="container-wide text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
            Our Service Area
          </h1>
          <p className="text-xl text-neutral-darkgray max-w-2xl mx-auto mb-8">
            Proudly serving the Kitchener-Waterloo region and surrounding communities.
          </p>
          
          {/* Quick Address Check */}
          <div className="max-w-xl mx-auto">
            <AddressChecker />
          </div>
        </div>
      </section>

      {/* Interactive Region Selector */}
      <section className="section">
        <div className="container-wide">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold text-primary mb-4">
              Select Your Region
            </h2>
            <p className="text-lg text-neutral-darkgray max-w-2xl mx-auto">
              Click a region to see all the neighborhoods we serve.
            </p>
          </div>

          <RegionSelector />
        </div>
      </section>

      {/* Additional Areas */}
      <section className="section-alt">
        <div className="container-wide">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold text-primary mb-4">
              Plus Surrounding Communities
            </h2>
            <p className="text-lg text-neutral-darkgray max-w-2xl mx-auto">
              We also serve these nearby towns and villages:
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {[
              'Elmira',
              'St. Jacobs',
              'Baden',
              'New Hamburg',
              'Ayr',
              'Breslau',
              'Conestogo',
              'Bloomingdale',
              'Maryhill',
              'West Montrose',
              'Heidelberg',
              'St. Clements',
            ].map((town) => (
              <span 
                key={town}
                className="px-4 py-2 bg-white rounded-full text-neutral-charcoal border border-neutral-midgray"
              >
                {town}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Not in Service Area */}
      <section className="section">
        <div className="container-wide max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-bold text-primary mb-4">
            Don't See Your Area?
          </h2>
          <p className="text-lg text-neutral-darkgray mb-6">
            We're expanding! If you're just outside our current service area, 
            let us know. We may be able to accommodate you or add your area soon.
          </p>
          <Link href="/contact">
            <Button variant="secondary">
              Contact Us About Coverage
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-primary text-white">
        <div className="container-wide text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            In Our Service Area?
          </h2>
          <p className="text-xl text-brand-200 mb-8 max-w-xl mx-auto">
            Get your instant quote in 30 seconds. Enter your address to start.
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
