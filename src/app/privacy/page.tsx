import { Metadata } from 'next';
import { COMPANY_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'CutDay lawn care privacy policy and data handling practices.',
};

export default function PrivacyPage() {
  return (
    <div className="section">
      <div className="container-wide max-w-3xl">
        <h1 className="font-heading text-4xl font-bold text-primary mb-8">
          Privacy Policy
        </h1>
        
        <div className="prose prose-lg max-w-none text-neutral-charcoal">
          <p className="text-neutral-darkgray">
            Last updated: {new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <h2>1. Information We Collect</h2>
          <p>We collect information you provide directly:</p>
          <ul>
            <li><strong>Contact Information:</strong> Name, email, phone number</li>
            <li><strong>Property Information:</strong> Address, lawn size, terrain, obstacles</li>
            <li><strong>Access Information:</strong> Gate codes, pet information, special instructions</li>
            <li><strong>Payment Information:</strong> Processed securely via Stripe (we don't store card numbers)</li>
            <li><strong>Service Records:</strong> Before/after photos, service dates, notes</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>Provide and improve our lawn care services</li>
            <li>Process payments and send receipts</li>
            <li>Send service notifications (arrival, completion, delays)</li>
            <li>Communicate about your account and services</li>
            <li>Optimize routing and scheduling</li>
            <li>Respond to your requests and support inquiries</li>
          </ul>

          <h2>3. Information Sharing</h2>
          <p>We share your information only with:</p>
          <ul>
            <li><strong>Our Crew:</strong> Property access details needed for service delivery</li>
            <li><strong>Payment Processor:</strong> Stripe processes payments securely</li>
            <li><strong>Service Providers:</strong> Email/SMS providers for notifications</li>
          </ul>
          <p>We never sell your personal information to third parties.</p>

          <h2>4. Data Security</h2>
          <ul>
            <li>All data is encrypted in transit (HTTPS) and at rest</li>
            <li>Gate codes and sensitive information are stored securely</li>
            <li>Payment processing is handled by Stripe (PCI compliant)</li>
            <li>Access to customer data is limited to authorized personnel</li>
          </ul>

          <h2>5. Photo Policy</h2>
          <ul>
            <li>Before/after photos are taken for quality assurance</li>
            <li>Photos are stored securely and linked to your account</li>
            <li>Photos are not shared publicly without your consent</li>
            <li>You can request deletion of photos at any time</li>
          </ul>

          <h2>6. Data Retention</h2>
          <ul>
            <li>Account data is retained while your account is active</li>
            <li>Service history is retained for 3 years</li>
            <li>You can request data deletion by contacting us</li>
            <li>Some data may be retained for legal/tax purposes</li>
          </ul>

          <h2>7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your data</li>
            <li>Opt out of marketing communications</li>
            <li>Export your data in a portable format</li>
          </ul>

          <h2>8. Cookies & Analytics</h2>
          <ul>
            <li>We use essential cookies for site functionality</li>
            <li>Analytics help us improve the website experience</li>
            <li>You can disable cookies in your browser settings</li>
          </ul>

          <h2>9. Children's Privacy</h2>
          <p>
            Our services are not directed to individuals under 18. We do not knowingly 
            collect personal information from children.
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this policy periodically. We will notify you of significant changes 
            via email or website notice.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            For privacy-related questions or requests, contact us at:
          </p>
          <ul>
            <li>Email: {COMPANY_INFO.email}</li>
            <li>Phone: {COMPANY_INFO.phone}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
