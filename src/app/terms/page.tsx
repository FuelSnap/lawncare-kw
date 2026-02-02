import { Metadata } from 'next';
import { COMPANY_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'CutDay lawn care terms of service and conditions.',
};

export default function TermsPage() {
  return (
    <div className="section">
      <div className="container-wide max-w-3xl">
        <h1 className="font-heading text-4xl font-bold text-primary mb-8">
          Terms of Service
        </h1>
        
        <div className="prose prose-lg max-w-none text-neutral-charcoal">
          <p className="text-neutral-darkgray">
            Last updated: {new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using {COMPANY_INFO.name}'s services, you agree to be bound by these Terms of Service. 
            If you disagree with any part of the terms, you may not access the service.
          </p>

          <h2>2. Service Description</h2>
          <p>
            {COMPANY_INFO.name} provides lawn care services including but not limited to lawn mowing, 
            edging, trimming, and related maintenance services in the Kitchener-Waterloo region.
          </p>

          <h2>3. Subscription Terms</h2>
          <ul>
            <li>Subscriptions are billed after each completed service</li>
            <li>You may cancel with 7 days written notice</li>
            <li>Skip tokens allow you to skip services without charge when used 48+ hours before your service window</li>
            <li>Pausing your subscription is available for extended absences</li>
          </ul>

          <h2>4. Payment Terms</h2>
          <ul>
            <li>Payment is processed via Stripe with card-on-file</li>
            <li>You authorize automatic charges after each completed service</li>
            <li>Prices are in Canadian Dollars (CAD)</li>
            <li>Failed payments may result in service suspension</li>
          </ul>

          <h2>5. Service Windows & Scheduling</h2>
          <ul>
            <li>Service windows are 2-3 day ranges (e.g., Monday-Wednesday)</li>
            <li>Exact arrival times within windows cannot be guaranteed</li>
            <li>Weather delays are handled automatically with notification</li>
            <li>We will attempt to reschedule within your window or the next available day</li>
          </ul>

          <h2>6. Property Access</h2>
          <ul>
            <li>You grant us access to your property for service delivery</li>
            <li>Gate codes and access instructions are stored securely</li>
            <li>Pets must be secured during service windows</li>
            <li>No charge applies if we cannot access your property due to locked gates, loose pets, or other access issues</li>
          </ul>

          <h2>7. Service Quality</h2>
          <ul>
            <li>Before and after photos are provided for every visit</li>
            <li>Quality concerns must be reported within 3 days of service</li>
            <li>We offer re-cuts or refunds for legitimate quality issues</li>
          </ul>

          <h2>8. Cancellation & Refunds</h2>
          <ul>
            <li>Cancel anytime with 7 days notice via your account or email</li>
            <li>No cancellation fees apply</li>
            <li>Refunds for quality issues are handled case-by-case</li>
            <li>No refunds for services already completed</li>
          </ul>

          <h2>9. Limitation of Liability</h2>
          <p>
            {COMPANY_INFO.name} is not liable for incidental property damage that may occur during normal 
            lawn care operations. We carry liability insurance and will address legitimate damage claims.
          </p>

          <h2>10. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will notify customers of significant 
            changes via email. Continued use of the service constitutes acceptance of modified terms.
          </p>

          <h2>11. Contact</h2>
          <p>
            Questions about these terms? Contact us at {COMPANY_INFO.email}.
          </p>
        </div>
      </div>
    </div>
  );
}
