import { Cloud, CloudRain, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RainPolicyCardProps {
  className?: string;
  variant?: 'full' | 'compact';
}

export default function RainPolicyCard({ className, variant = 'full' }: RainPolicyCardProps) {
  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200', className)}>
        <CloudRain className="w-6 h-6 text-blue-600 flex-shrink-0" />
        <div>
          <p className="font-medium text-blue-900">Rain? We've got you.</p>
          <p className="text-sm text-blue-700">Auto-reschedule within your window — no action needed</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl p-6 md:p-8 border border-blue-200', className)}>
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
          <CloudRain className="w-8 h-8 text-blue-600" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-heading text-xl font-semibold text-blue-900 mb-3">
            Smart Rain Handling
          </h3>
          
          <p className="text-blue-800 mb-4">
            We monitor forecasts so you don't have to. If significant rain is expected, 
            we automatically reschedule within your selected window.
          </p>
          
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-blue-700">
              <Check className="w-5 h-5 text-blue-600" />
              <span>You get a text notification</span>
            </li>
            <li className="flex items-center gap-2 text-blue-700">
              <Check className="w-5 h-5 text-blue-600" />
              <span>No action required from you</span>
            </li>
            <li className="flex items-center gap-2 text-blue-700">
              <Check className="w-5 h-5 text-blue-600" />
              <span>Never cut wet grass (protects your lawn)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
