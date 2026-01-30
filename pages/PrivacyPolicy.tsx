
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-scientific-blue uppercase tracking-tighter mb-4">Privacy Policy</h1>
        <p className="text-slate-500 uppercase tracking-widest text-[10px] font-black">Last Updated: January 2025</p>
      </div>

      <div className="space-y-12 prose prose-slate max-w-none">
        <section>
          <h2 className="serif-heading text-2xl font-bold text-scientific-blue mb-4">1. Information We Collect</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            BetterVitals collects information to provide you with personalized health optimization recommendations. We collect:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600">
            <li><strong>Assessment Data:</strong> Information you provide through our health assessments, including health goals, lifestyle preferences, and wellness priorities.</li>
            <li><strong>Usage Data:</strong> Browsing behavior, pages visited, and interactions with our content to improve our recommendations.</li>
            <li><strong>Device Information:</strong> Browser type, operating system, and device identifiers for analytics purposes.</li>
          </ul>
        </section>

        <section>
          <h2 className="serif-heading text-2xl font-bold text-scientific-blue mb-4">2. How We Use Your Information</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            We use collected information to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600">
            <li>Generate personalized product recommendations based on your health goals</li>
            <li>Improve our assessment algorithms and content quality</li>
            <li>Analyze site usage to enhance user experience</li>
            <li>Communicate updates about products you've shown interest in</li>
          </ul>
        </section>

        <section>
          <h2 className="serif-heading text-2xl font-bold text-scientific-blue mb-4">3. Third-Party Services</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            We use the following third-party services:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600">
            <li><strong>Google Gemini AI:</strong> Powers our personalized assessment recommendations. Assessment inputs are processed by Google's AI services to generate tailored suggestions.</li>
            <li><strong>Analytics Services:</strong> We use analytics tools to understand site usage and improve our content.</li>
            <li><strong>Affiliate Networks:</strong> When you click product links, affiliate partners may place cookies to track conversions.</li>
          </ul>
        </section>

        <section>
          <h2 className="serif-heading text-2xl font-bold text-scientific-blue mb-4">4. Affiliate Links & Tracking</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            BetterVitals participates in affiliate programs. When you click on product links:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600">
            <li>Affiliate tracking cookies may be placed on your device</li>
            <li>We may earn a commission if you make a purchase</li>
            <li>This does not affect the price you pay</li>
            <li>Our editorial recommendations remain independent of affiliate relationships</li>
          </ul>
          <p className="text-slate-600 leading-relaxed mt-4">
            For more information about our affiliate relationships, please see our <a href="#" className="text-primary hover:underline">Compliance page</a>.
          </p>
        </section>

        <section>
          <h2 className="serif-heading text-2xl font-bold text-scientific-blue mb-4">5. Your Rights</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            You have the following rights regarding your data:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600">
            <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
            <li><strong>Deletion:</strong> Request deletion of your personal data</li>
            <li><strong>Correction:</strong> Request correction of inaccurate data</li>
            <li><strong>Opt-out:</strong> Opt out of marketing communications at any time</li>
          </ul>
          <p className="text-slate-600 leading-relaxed mt-4">
            Assessment data is processed in real-time and is not stored persistently on our servers.
          </p>
        </section>

        <section>
          <h2 className="serif-heading text-2xl font-bold text-scientific-blue mb-4">6. Data Security</h2>
          <p className="text-slate-600 leading-relaxed">
            We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="serif-heading text-2xl font-bold text-scientific-blue mb-4">7. Contact Us</h2>
          <p className="text-slate-600 leading-relaxed">
            For privacy-related inquiries, data access requests, or to exercise your rights, please contact us at:
          </p>
          <div className="bg-slate-50 p-6 mt-4 rounded-sm">
            <p className="text-slate-700 font-medium">privacy@bettervitals.com</p>
          </div>
        </section>

        <section className="border-t border-slate-200 pt-8">
          <p className="text-sm text-slate-500 italic">
            This privacy policy may be updated periodically. We will notify users of material changes by updating the "Last Updated" date at the top of this page.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
