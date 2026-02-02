'use client';

import { useState } from 'react';
import { MapPin, CheckCircle, XCircle, ArrowRight, Loader2 } from 'lucide-react';
import { Input, Button } from '@/components/ui';
import { isValidPostalCode, isInServiceArea } from '@/lib/utils';
import Link from 'next/link';

export default function AddressChecker() {
  const [postalCode, setPostalCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'in-area' | 'out-of-area'>('idle');

  const checkAddress = () => {
    if (!postalCode.trim()) return;
    
    setStatus('checking');
    
    // Simulate a brief check
    setTimeout(() => {
      const formatted = postalCode.toUpperCase().replace(/\s/g, '');
      
      if (!isValidPostalCode(formatted)) {
        setStatus('out-of-area');
        return;
      }
      
      if (isInServiceArea(formatted)) {
        setStatus('in-area');
      } else {
        setStatus('out-of-area');
      }
    }, 500);
  };

  const reset = () => {
    setPostalCode('');
    setStatus('idle');
  };

  if (status === 'in-area') {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="font-heading text-xl font-semibold text-green-800 mb-2">
          Great News! We Service Your Area
        </h3>
        <p className="text-green-700 mb-4">
          <strong>{postalCode.toUpperCase()}</strong> is within our service zone.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/book">
            <Button size="lg">
              Get Your Price
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Button variant="ghost" onClick={reset}>
            Check Another
          </Button>
        </div>
      </div>
    );
  }

  if (status === 'out-of-area') {
    return (
      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 text-center">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <XCircle className="w-8 h-8 text-amber-600" />
        </div>
        <h3 className="font-heading text-xl font-semibold text-amber-800 mb-2">
          We're Not There Yet
        </h3>
        <p className="text-amber-700 mb-4">
          <strong>{postalCode.toUpperCase()}</strong> is outside our current service area, but we're expanding!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/contact">
            <Button variant="secondary">
              Join Waitlist
            </Button>
          </Link>
          <Button variant="ghost" onClick={reset}>
            Check Another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-neutral-midgray p-6">
      <h3 className="font-heading text-lg font-semibold text-primary mb-4 text-center">
        Check If We Service Your Address
      </h3>
      
      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            placeholder="Enter postal code (e.g., N2L 3G1)"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            leftIcon={<MapPin className="w-5 h-5" />}
            onKeyDown={(e) => e.key === 'Enter' && checkAddress()}
          />
        </div>
        <Button 
          onClick={checkAddress} 
          disabled={!postalCode.trim() || status === 'checking'}
        >
          {status === 'checking' ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            'Check'
          )}
        </Button>
      </div>
      
      <p className="text-xs text-neutral-darkgray mt-3 text-center">
        Enter your postal code to instantly verify coverage
      </p>
    </div>
  );
}
