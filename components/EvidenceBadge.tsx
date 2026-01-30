import React from 'react';
import { ProductEvidence } from '../types';

interface EvidenceBadgeProps {
  evidence: ProductEvidence;
  size?: 'sm' | 'md';
}

const EvidenceBadge: React.FC<EvidenceBadgeProps> = ({ evidence, size = 'sm' }) => {
  const textSize = size === 'sm' ? 'text-[8px]' : 'text-[10px]';
  const padding = size === 'sm' ? 'px-2 py-0.5' : 'px-2.5 py-1';

  return (
    <div className="flex gap-2">
      {evidence.studyCount > 0 && (
        <span className={`${textSize} font-black ${padding} rounded-full bg-purple-50 text-purple-600 border border-purple-100`}>
          {evidence.studyCount} {evidence.studyCount === 1 ? 'Study' : 'Studies'}
        </span>
      )}
      {evidence.expertCount > 0 && (
        <span className={`${textSize} font-black ${padding} rounded-full bg-blue-50 text-blue-600 border border-blue-100`}>
          {evidence.expertCount} {evidence.expertCount === 1 ? 'Expert' : 'Experts'}
        </span>
      )}
    </div>
  );
};

export default EvidenceBadge;
