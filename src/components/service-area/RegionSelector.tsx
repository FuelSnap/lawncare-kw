'use client';

import { useState } from 'react';
import { MapPin, Check, ChevronRight } from 'lucide-react';
import { SERVICE_AREAS } from '@/lib/constants';
import { cn } from '@/lib/utils';

type RegionName = typeof SERVICE_AREAS[number]['city'];

interface RegionSelectorProps {
  className?: string;
  onRegionSelect?: (region: RegionName | null) => void;
}

const regionColors: Record<string, string> = {
  'Kitchener': 'from-green-500 to-emerald-600',
  'Waterloo': 'from-blue-500 to-indigo-600',
  'Cambridge': 'from-purple-500 to-violet-600',
  'Guelph': 'from-orange-500 to-red-600',
};

const regionDescriptions: Record<string, string> = {
  'Kitchener': 'Downtown, Doon, Forest Heights, Stanley Park...',
  'Waterloo': 'Beechwood, Laurelwood, Uptown, University...',
  'Cambridge': 'Galt, Hespeler, Preston, Blair...',
  'Guelph': 'Downtown, Grange, South End, Kortright...',
};

export default function RegionSelector({ className, onRegionSelect }: RegionSelectorProps) {
  const [selectedRegion, setSelectedRegion] = useState<RegionName | null>(null);

  const handleSelect = (region: RegionName) => {
    const newValue = selectedRegion === region ? null : region;
    setSelectedRegion(newValue);
    onRegionSelect?.(newValue);
  };

  const selectedArea = SERVICE_AREAS.find(a => a.city === selectedRegion);

  return (
    <div className={cn('space-y-6', className)}>
      {/* Region Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SERVICE_AREAS.map((area) => {
          const isSelected = selectedRegion === area.city;
          const gradient = regionColors[area.city] || 'from-gray-500 to-gray-600';

          return (
            <button
              key={area.city}
              onClick={() => handleSelect(area.city)}
              className={cn(
                'relative rounded-2xl p-6 text-left transition-all overflow-hidden',
                isSelected
                  ? 'ring-4 ring-primary ring-offset-2 shadow-lg scale-[1.02]'
                  : 'hover:shadow-md hover:scale-[1.01]'
              )}
            >
              {/* Gradient Background */}
              <div className={cn(
                'absolute inset-0 bg-gradient-to-br opacity-90',
                gradient
              )} />

              {/* Content */}
              <div className="relative z-10 text-white">
                <div className="flex items-center justify-between mb-3">
                  <MapPin className="w-6 h-6" />
                  {isSelected && (
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                  )}
                </div>
                <h3 className="font-heading text-xl font-bold mb-1">{area.city}</h3>
                <p className="text-sm text-white/80">
                  {area.neighborhoods.length} neighborhoods
                </p>
              </div>

              {/* Hover/Selection Effect */}
              <div className={cn(
                'absolute inset-0 bg-black/10 transition-opacity',
                isSelected ? 'opacity-0' : 'opacity-0 hover:opacity-100'
              )} />
            </button>
          );
        })}
      </div>

      {/* Neighborhoods List */}
      {selectedArea ? (
        <div className="bg-white rounded-2xl p-6 border border-neutral-midgray animate-fadeIn">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-heading text-lg font-semibold text-primary">
              {selectedArea.city} Neighborhoods
            </h4>
            <span className="text-sm text-neutral-darkgray">
              {selectedArea.neighborhoods.length} areas
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {selectedArea.neighborhoods.map((neighborhood) => (
              <div 
                key={neighborhood}
                className="flex items-center gap-2 p-2 rounded-lg bg-brand-50 text-sm"
              >
                <Check className="w-4 h-4 text-success flex-shrink-0" />
                <span className="text-neutral-charcoal">{neighborhood}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-neutral-darkgray">
          <MapPin className="w-12 h-12 mx-auto mb-3 text-neutral-midgray" />
          <p className="text-lg font-medium">Select a region above</p>
          <p className="text-sm">to see all neighborhoods we serve</p>
        </div>
      )}

      {/* All Regions Summary */}
      <div className="bg-brand-50 rounded-2xl p-6 border border-brand-200">
        <h4 className="font-heading text-lg font-semibold text-primary mb-4">
          Plus Surrounding Communities
        </h4>
        <div className="flex flex-wrap gap-2">
          {[
            'Elmira', 'St. Jacobs', 'Baden', 'New Hamburg', 'Ayr',
            'Breslau', 'Conestogo', 'Bloomingdale', 'Maryhill',
            'West Montrose', 'Heidelberg', 'St. Clements'
          ].map((town) => (
            <span 
              key={town}
              className="px-3 py-1.5 bg-white rounded-full text-sm text-neutral-charcoal border border-neutral-midgray"
            >
              {town}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
