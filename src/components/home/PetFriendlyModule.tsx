import { Dog, Bell, ShieldCheck, Camera } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PetFriendlyModuleProps {
  className?: string;
  variant?: 'full' | 'compact';
}

export default function PetFriendlyModule({ className, variant = 'full' }: PetFriendlyModuleProps) {
  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200', className)}>
        <Dog className="w-6 h-6 text-amber-600 flex-shrink-0" />
        <div>
          <p className="font-medium text-amber-900">Pet-Aware Crews</p>
          <p className="text-sm text-amber-700">We follow your notes & notify if access is blocked</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 md:p-8 border border-amber-200', className)}>
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0">
          <Dog className="w-8 h-8 text-amber-600" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-heading text-xl font-semibold text-amber-900 mb-3">
            Pet-Friendly Service
          </h3>
          
          <p className="text-amber-800 mb-4">
            We love your furry friends! Just let us know about your pets during signup, 
            and we'll make sure everyone stays safe.
          </p>
          
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-2">
              <Bell className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-amber-900 text-sm">Advance Notice</p>
                <p className="text-xs text-amber-700">Reminder before each visit</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-amber-900 text-sm">Custom Notes</p>
                <p className="text-xs text-amber-700">We follow your instructions</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Camera className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-amber-900 text-sm">No-Access Protocol</p>
                <p className="text-xs text-amber-700">Photo & notify, reschedule free</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
