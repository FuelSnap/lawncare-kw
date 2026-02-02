'use client';

import { Dog, Bell, Camera, Heart, CheckCircle } from 'lucide-react';
import { Card } from './Card';
import { cn } from '@/lib/utils';

interface PetFriendlyModuleProps {
  className?: string;
  variant?: 'card' | 'inline' | 'detailed';
}

export function PetFriendlyModule({ className, variant = 'card' }: PetFriendlyModuleProps) {
  if (variant === 'inline') {
    return (
      <div className={cn('flex items-center gap-3 text-sm', className)}>
        <Dog className="w-5 h-5 text-primary" />
        <span className="text-neutral-charcoal">
          <span className="font-semibold">Pet-aware crews:</span> We follow your notes and notify if access is blocked.
        </span>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <Card className={cn('bg-gradient-to-br from-amber-50 to-orange-50', className)}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center">
            <Dog className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold text-primary">Pet-Friendly Service</h3>
            <p className="text-sm text-neutral-darkgray">We love your furry family members</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-4 bg-white rounded-xl p-4">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Bell className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-semibold text-primary">Pre-Visit Reminders</h4>
              <p className="text-sm text-neutral-darkgray">
                We'll send you a reminder before each visit to secure your pets.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white rounded-xl p-4">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-semibold text-primary">Your Notes, Our Guide</h4>
              <p className="text-sm text-neutral-darkgray">
                Add pet info during signup—we'll follow your specific instructions.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white rounded-xl p-4">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Camera className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-semibold text-primary">No Charge for Access Issues</h4>
              <p className="text-sm text-neutral-darkgray">
                If we arrive and can't safely access your yard, we'll take a photo, notify you, and reschedule—no charge.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-amber-200">
          <p className="text-sm text-amber-800">
            <span className="font-semibold">Safety first:</span> For everyone's protection, we ask that dogs be kept inside or in a separate area during service.
          </p>
        </div>
      </Card>
    );
  }

  // Default card variant
  return (
    <Card className={cn('', className)}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0">
          <Dog className="w-6 h-6 text-amber-600" />
        </div>
        <div>
          <h3 className="font-heading text-lg font-semibold text-primary mb-2">
            Pet-Aware Crews
          </h3>
          <p className="text-neutral-charcoal mb-3">
            We love pets and take their safety seriously.
          </p>
          <ul className="space-y-2 text-sm text-neutral-darkgray">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              We'll follow your notes
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              Pre-visit reminders sent
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" />
              We notify if access is blocked
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
