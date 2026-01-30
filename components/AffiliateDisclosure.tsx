import React from 'react';

interface AffiliateDisclosureProps {
  compact?: boolean;
}

const AffiliateDisclosure: React.FC<AffiliateDisclosureProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <p className="text-xs text-slate-500 italic">
        Affiliate link - we may earn a commission
      </p>
    );
  }

  return (
    <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
      <p className="text-sm text-amber-800">
        <strong>Affiliate Disclosure:</strong> BetterVitals may earn a commission
        if you purchase through links on this page. This does not influence our
        recommendations — we only feature products that meet our research standards.
      </p>
    </div>
  );
};

export default AffiliateDisclosure;
