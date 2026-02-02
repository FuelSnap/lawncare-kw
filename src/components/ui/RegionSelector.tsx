'use client';

import { useState } from 'react';
import { MapPin, CheckCircle, Search } from 'lucide-react';
import { Input } from './Input';
import { Card } from './Card';
import { SERVICE_AREAS, SUPPORTED_POSTAL_PREFIXES } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface RegionSelectorProps {
  className?: string;
}

type CityName = 'Kitchener' | 'Waterloo' | 'Cambridge' | 'Guelph';

const CITY_COLORS: Record<CityName, { bg: string; border: string; text: string; icon: string }> = {
  'Kitchener': { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-700', icon: 'bg-green-500' },
  'Waterloo': { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-700', icon: 'bg-blue-500' },
  'Cambridge': { bg: 'bg-purple-50', border: 'border-purple-500', text: 'text-purple-700', icon: 'bg-purple-500' },
  'Guelph': { bg: 'bg-orange-50', border: 'border-orange-500', text: 'text-orange-700', icon: 'bg-orange-500' },
};

export function RegionSelector({ className }: RegionSelectorProps) {
  const [selectedCity, setSelectedCity] = useState<CityName | null>(null);
  const [postalCode, setPostalCode] = useState('');
  const [validationResult, setValidationResult] = useState<'valid' | 'invalid' | null>(null);

  const handlePostalCheck = () => {
    if (postalCode.length >= 3) {
      const fsa = postalCode.substring(0, 3).toUpperCase();
      setValidationResult(SUPPORTED_POSTAL_PREFIXES.includes(fsa) ? 'valid' : 'invalid');
    }
  };

  const filteredAreas = selectedCity 
    ? SERVICE_AREAS.filter(area => area.city === selectedCity)
    : SERVICE_AREAS;

  return (
    <div className={cn('space-y-8', className)}>
      {/* Address Check */}
      <Card className="bg-brand-50 border-brand-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <Search className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold text-primary">Check Your Address</h3>
            <p className="text-sm text-neutral-darkgray">Enter your postal code to confirm coverage</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <div className="flex-1">
            <Input
              label=""
              placeholder="Enter postal code (e.g., N2L 3G1)"
              value={postalCode}
              onChange={(e) => {
                setPostalCode(e.target.value.toUpperCase());
                setValidationResult(null);
              }}
              className="mb-0"
            />
          </div>
          <button
            onClick={handlePostalCheck}
            className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-light transition-colors"
          >
            Check
          </button>
        </div>

        {validationResult === 'valid' && (
          <div className="mt-4 flex items-center gap-2 text-success bg-green-50 rounded-lg px-4 py-3">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Great news! We service your area.</span>
          </div>
        )}
        
        {validationResult === 'invalid' && (
          <div className="mt-4 flex items-center gap-2 text-error bg-red-50 rounded-lg px-4 py-3">
            <MapPin className="w-5 h-5" />
            <span className="font-medium">Sorry, we don't service this area yet. We're expanding soon!</span>
          </div>
        )}
      </Card>

      {/* City Selection */}
      <div>
        <h3 className="font-heading text-xl font-semibold text-primary mb-4">Select a Region</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SERVICE_AREAS.map((area) => {
            const cityKey = area.city as CityName;
            const colors = CITY_COLORS[cityKey];
            const isSelected = selectedCity === area.city;
            
            return (
              <button
                key={area.city}
                onClick={() => setSelectedCity(isSelected ? null : cityKey)}
                className={cn(
                  'relative p-6 rounded-2xl border-2 transition-all text-left group',
                  isSelected 
                    ? `${colors.bg} ${colors.border}` 
                    : 'bg-white border-neutral-midgray hover:border-primary/50'
                )}
              >
                <div className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors',
                  isSelected ? colors.icon : 'bg-neutral-lightgray group-hover:bg-brand-100'
                )}>
                  <MapPin className={cn(
                    'w-5 h-5',
                    isSelected ? 'text-white' : 'text-primary'
                  )} />
                </div>
                <p className={cn(
                  'font-heading text-lg font-semibold',
                  isSelected ? colors.text : 'text-primary'
                )}>
                  {area.city}
                </p>
                <p className="text-sm text-neutral-darkgray mt-1">
                  {area.neighborhoods.length} neighborhoods
                </p>
                
                {isSelected && (
                  <div className="absolute top-3 right-3">
                    <CheckCircle className={cn('w-6 h-6', colors.text)} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
        
        {selectedCity && (
          <button 
            onClick={() => setSelectedCity(null)}
            className="mt-4 text-sm text-primary underline hover:no-underline"
          >
            Show all regions
          </button>
        )}
      </div>

      {/* Neighborhoods List */}
      <div>
        <h3 className="font-heading text-xl font-semibold text-primary mb-4">
          {selectedCity ? `Neighborhoods in ${selectedCity}` : 'All Service Neighborhoods'}
        </h3>
        
        <div className="space-y-6">
          {filteredAreas.map((area) => {
            const cityKey = area.city as CityName;
            const colors = CITY_COLORS[cityKey];
            
            return (
              <Card key={area.city} className={selectedCity ? colors.bg : ''}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', colors.icon)}>
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="font-heading text-lg font-semibold text-primary">{area.city}</h4>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {area.neighborhoods.map((neighborhood) => (
                    <div 
                      key={neighborhood}
                      className="flex items-center gap-2 text-neutral-charcoal py-1"
                    >
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span className="text-sm">{neighborhood}</span>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
