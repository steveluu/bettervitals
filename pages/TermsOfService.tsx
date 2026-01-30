
import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-scientific-blue uppercase tracking-tighter mb-4">Terms of Service</h1>
        <p className="text-slate-500 uppercase tracking-widest text-[10px] font-black">Last Updated: January 2025</p>
      </div>

      <div className="space-y-12 prose prose-slate max-w-none">
        <section>
          <h2 className="serif-heading text-2xl font-bold text-scientific-blue mb-4">1. Acceptance of Terms</h2>
          <p className="text-slate-600 leading-relaxed">
            By accessing and using BetterVitals, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.
          </p>
        </section>

        <section>
          <h2 className="serif-heading text-2xl font-bold text-scientific-blue mb-4">2. Medical Disclaimer</h2>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-4">
            <p className="text-slate-700 font-medium mb-2">Important Notice</p>
            <p className="text-slate-600">
              The content on BetterVitals is for informational and educational purposes only and should NOT be construed as medical advice, diagnosis, or treatment.
            </p>
          </div>
          <ul className="list-disc pl-6 space-y-2 text-slate-600">
            <li>Always consult with a qualified healthcare professional before making changes to your health regimen</li>
            <li>Do not disregard professional medical advice or delay seeking it based on content from this site</li>
            <li>Product recommendations are based on publicly available research and user reviews, not clinical prescriptions</li>
            <li>Individual results may vary; what works for one person may not work for another</li>
            <li>If you have a medical emergency, call your doctor or emergency services immediately</li>
          </ul>
        </section>

        <section>
          <h2 className="serif-heading text-2xl font-bold text-scientific-blue mb-4">3. Use of Site</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            You agree to use BetterVitals only for lawful purposes. You shall not:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600">
            <li>Use the site in any way that violates applicable laws or regulations</li>
            <li>Attempt to gain unauthorized access to our systems or user accounts</li>
            <li>Interfere with or disrupt the site's functionality</li>
            <li>Use automated systems to scrape or collect data without permission</li>
            <li>Misrepresent your identity or affiliation</li>
          </ul>
        </section>

        <section>
          <h2 className="serif-heading text-2xl font-bold text-scientific-blue mb-4">4. Intellectual Property</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            All content on BetterVitals, including but not limited to text, graphics, logos, assessments, and software, is the property of BetterVitals or its content suppliers and is protected by intellectual property laws.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600">
            <li>You may not reproduce, distribute, or create derivative works without express permission</li>
            <li>Limited personal, non-commercial use is permitted</li>
            <li>Product names and logos belong to their respective owners</li>
          </ul>
        </section>

        <section>
          <h2 className="serif-heading text-2xl font-bold text-scientific-blue mb-4">5. Affiliate Disclosure</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            BetterVitals is a participant in affiliate programs. This means:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600">
            <li>We may earn commissions from qualifying purchases made through our links</li>
            <li>This does not increase the price you pay for products</li>
            <li>Affiliate relationships do not influence our editorial integrity or product recommendations</li>
            <li>We only recommend products we believe provide genuine value</li>
          </ul>
          <p className="text-slate-600 leading-relaxed mt-4">
            For complete details, please review our <a href="#" className="text-primary hover:underline">Compliance page</a>.
          </p>
        </section>

        <section>
          <h2 className="serif-heading text-2xl font-bold text-scientific-blue mb-4">6. Limitation of Liability</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            To the fullest extent permitted by law:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600">
            <li>BetterVitals is provided "as is" without warranties of any kind</li>
            <li>We do not guarantee the accuracy, completeness, or usefulness of any content</li>
            <li>We are not liable for any damages arising from your use of the site</li>
            <li>We are not responsible for third-party products purchased through affiliate links</li>
            <li>Your use of any information or products is at your own risk</li>
          </ul>
        </section>

        <section>
          <h2 className="serif-heading text-2xl font-bold text-scientific-blue mb-4">7. Third-Party Links</h2>
          <p className="text-slate-600 leading-relaxed">
            BetterVitals contains links to third-party websites and products. We are not responsible for the content, privacy practices, or terms of these external sites. Clicking affiliate links will take you to external merchant sites governed by their own terms and policies.
          </p>
        </section>

        <section>
          <h2 className="serif-heading text-2xl font-bold text-scientific-blue mb-4">8. Changes to Terms</h2>
          <p className="text-slate-600 leading-relaxed">
            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the site. Your continued use of BetterVitals after changes constitutes acceptance of the modified terms.
          </p>
        </section>

        <section>
          <h2 className="serif-heading text-2xl font-bold text-scientific-blue mb-4">9. Contact</h2>
          <p className="text-slate-600 leading-relaxed">
            For questions about these Terms of Service, please contact us at:
          </p>
          <div className="bg-slate-50 p-6 mt-4 rounded-sm">
            <p className="text-slate-700 font-medium">legal@bettervitals.com</p>
          </div>
        </section>

        <section className="border-t border-slate-200 pt-8">
          <p className="text-sm text-slate-500 italic">
            By using BetterVitals, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
