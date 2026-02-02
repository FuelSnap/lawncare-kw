'use client';

import { CloudRain, Bell, Calendar, CheckCircle } from 'lucide-react';
import { Card } from './Card';
import { cn } from '@/lib/utils';

interface RainPolicyCardProps {
  className?: string;
  variant?: 'card' | 'inline' | 'detailed';
}

export function RainPolicyCard({ className, variant = 'card' }: RainPolicyCardProps) {
  if (variant === 'inline') {
    return (
      <div className={cn('flex items-center gap-3 text-sm', className)}>
        <CloudRain className="w-5 h-5 text-blue-500" />
        <span className="text-neutral-charcoal">
          <span className="font-semibold">Rain?</span> We auto-reschedule within your window—no action needed.
        </span>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <Card className={cn('bg-gradient-to-br from-blue-50 to-cyan-50', className)}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
            <CloudRain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold text-primary">Smart Rain Policy</h3>
            <p className="text-sm text-neutral-darkgray">We handle the weather, you relax</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-4 bg-white rounded-xl p-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <CloudRain className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-primary">We Monitor Forecasts</h4>
              <p className="text-sm text-neutral-darkgray">
                We check weather daily. If rain is predicted, we proactively adjust.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white rounded-xl p-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-primary">Auto-Reschedule</h4>
              <p className="text-sm text-neutral-darkgray">
                We shift within your selected window or to the next available day.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white rounded-xl p-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-primary">You Get Notified</h4>
              <p className="text-sm text-neutral-darkgray">
                Receive a text about any weather delays—no action needed from you.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-blue-200">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Why we don't cut wet grass:</span> It damages your lawn, clogs equipment, and leaves clumps. We prioritize quality over speed.
          </p>
        </div>
      </Card>
    );
  }

  // Default card variant
  return (
    <Card className={cn('', className)}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
          <CloudRain className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="font-heading text-lg font-semibold text-primary mb-2">
            Smart Rain Policy
          </h3>
          <p className="text-neutral-charcoal mb-3">
            If it rains, we auto-reschedule within your selected window—no action needed from you.
          </p>
          <ul className="space-y-2 text-sm text-neutral-darkgray">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              We monitor forecasts daily
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              You get a text notification
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              No charge for weather delays
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
