import { Calendar, Clock, Smartphone, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SkipTokensExplainerProps {
  className?: string;
  variant?: 'full' | 'compact' | 'inline';
}

export default function SkipTokensExplainer({ className, variant = 'full' }: SkipTokensExplainerProps) {
  if (variant === 'inline') {
    return (
      <div className={cn('flex items-center gap-2 text-sm', className)}>
        <Calendar className="w-4 h-4 text-primary" />
        <span className="text-neutral-darkgray">
          <strong className="text-primary">Skip tokens included</strong> — pause service anytime, no calls needed
        </span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn('bg-purple-50 rounded-xl p-4 border border-purple-200', className)}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Calendar className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="font-medium text-purple-900">Skip Tokens</p>
            <p className="text-sm text-purple-700">1/month • Use 48+ hrs before • No awkward calls</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 md:p-8 border border-purple-200', className)}>
      <div className="flex items-start gap-4 mb-6">
        <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0">
          <Calendar className="w-8 h-8 text-purple-600" />
        </div>
        
        <div>
          <h3 className="font-heading text-xl font-semibold text-purple-900 mb-2">
            Skip Tokens — Flexibility Built In
          </h3>
          <p className="text-purple-800">
            Life happens. That's why every subscription includes skip tokens so you 
            can pause service without hassle.
          </p>
        </div>
      </div>
      
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-purple-600">1</span>
            </div>
            <span className="font-medium text-purple-900">Per Month</span>
          </div>
          <p className="text-sm text-purple-700">
            Skip tokens refresh monthly based on your plan
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-purple-600" />
            </div>
            <span className="font-medium text-purple-900">48hr Notice</span>
          </div>
          <p className="text-sm text-purple-700">
            Use at least 48 hours before your service window
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-purple-600" />
            </div>
            <span className="font-medium text-purple-900">One Tap</span>
          </div>
          <p className="text-sm text-purple-700">
            No awkward texts or calls — just tap skip in your account
          </p>
        </div>
      </div>
    </div>
  );
}
