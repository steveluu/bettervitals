import React, { useState } from 'react';
import { ProductEvidence, Study, ExpertEndorsement, PodcastMention, ThirdPartyTest } from '../types';

interface ResearchSectionProps {
  evidence: ProductEvidence;
}

const TierBadge: React.FC<{ tier: Study['tier'] }> = ({ tier }) => {
  const colors = {
    'S': 'bg-amber-100 text-amber-700 border-amber-200',
    'A': 'bg-purple-100 text-purple-700 border-purple-200',
    'B': 'bg-blue-100 text-blue-700 border-blue-200',
    'C': 'bg-slate-100 text-slate-700 border-slate-200',
  };

  const labels = {
    'S': 'Meta-Analysis',
    'A': 'Peer-Reviewed',
    'B': 'Brand Study',
    'C': 'Third-Party',
  };

  return (
    <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${colors[tier]}`}>
      {labels[tier]}
    </span>
  );
};

const ExpertQuoteCard: React.FC<{ endorsement: ExpertEndorsement; featured?: boolean }> = ({
  endorsement,
  featured = false
}) => {
  return (
    <div className={`${featured ? 'bg-slate-50 border-2 border-slate-200' : 'bg-white border border-slate-200'} p-6 rounded-lg`}>
      <p className={`${featured ? 'text-lg' : 'text-sm'} italic mb-4 text-slate-700`}>
        "{endorsement.quote}"
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-slate-400 text-lg">person</span>
        </div>
        <div>
          <p className="font-bold text-sm">{endorsement.expertName}</p>
          <p className="text-xs text-slate-500">{endorsement.expertCredentials}</p>
          <p className="text-[10px] text-slate-400 mt-0.5">
            {endorsement.source}
            {endorsement.episodeNumber && ` #${endorsement.episodeNumber}`}
            {endorsement.timestamp && ` @ ${endorsement.timestamp}`}
          </p>
        </div>
      </div>
      {endorsement.disclosureNote && (
        <p className="text-xs text-amber-700 bg-amber-50 p-2 rounded mt-4 border border-amber-100">
          <span className="font-bold">Disclosure:</span> {endorsement.disclosureNote}
        </p>
      )}
    </div>
  );
};

const StudyCard: React.FC<{ study: Study }> = ({ study }) => {
  return (
    <div className="border-l-4 border-purple-400 pl-4 py-3 bg-white">
      <div className="flex items-center gap-2 mb-2">
        <TierBadge tier={study.tier} />
        <span className="text-[10px] text-slate-400">{study.year}</span>
      </div>
      <p className="font-medium text-sm">{study.title}</p>
      {study.journal && (
        <p className="text-xs text-slate-500 italic mt-1">{study.journal}</p>
      )}
      <p className="text-sm text-slate-600 mt-2">{study.keyFinding}</p>
      {study.pubmedUrl && (
        <a
          href={study.pubmedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-xs mt-2 inline-flex items-center gap-1 hover:underline"
        >
          View on PubMed
          <span className="material-symbols-outlined text-xs">open_in_new</span>
        </a>
      )}
    </div>
  );
};

const PodcastCard: React.FC<{ mention: PodcastMention }> = ({ mention }) => {
  return (
    <div className="flex items-start gap-3 p-4 bg-white border border-slate-200 rounded-lg">
      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <span className="material-symbols-outlined text-purple-600">podcasts</span>
      </div>
      <div>
        <p className="font-bold text-sm">{mention.podcastName}</p>
        <p className="text-xs text-slate-500">{mention.episodeTitle}</p>
        <p className="text-[10px] text-slate-400 mt-1">
          Episode #{mention.episodeNumber} @ {mention.timestamp}
        </p>
        {mention.clipUrl && (
          <a
            href={mention.clipUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 text-xs mt-2 inline-flex items-center gap-1 hover:underline"
          >
            Listen to clip
            <span className="material-symbols-outlined text-xs">play_circle</span>
          </a>
        )}
      </div>
    </div>
  );
};

const ThirdPartyTestCard: React.FC<{ test: ThirdPartyTest }> = ({ test }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg">
      <div>
        <p className="font-bold text-sm">{test.source}</p>
        <p className="text-xs text-slate-500 mt-1">{test.summary}</p>
      </div>
      <div className="text-right flex-shrink-0 ml-4">
        {test.rating && (
          <p className="font-black text-lg text-slate-800">{test.rating}</p>
        )}
        <a
          href={test.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-[10px] hover:underline"
        >
          Read review
        </a>
      </div>
    </div>
  );
};

const CollapsibleSection: React.FC<{
  title: string;
  count: number;
  children: React.ReactNode;
  defaultOpen?: boolean;
}> = ({ title, count, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (count === 0) return null;

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
      >
        <span className="font-bold text-sm">{title} ({count})</span>
        <span className={`material-symbols-outlined text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>
      {isOpen && (
        <div className="p-4 space-y-4 bg-slate-50/50">
          {children}
        </div>
      )}
    </div>
  );
};

const ResearchSection: React.FC<ResearchSectionProps> = ({ evidence }) => {
  const featuredEndorsement = evidence.expertEndorsements[0];

  return (
    <div className="space-y-6">
      {/* Featured Expert Quote */}
      {featuredEndorsement && (
        <div>
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
            Featured Expert
          </h3>
          <ExpertQuoteCard endorsement={featuredEndorsement} featured />
        </div>
      )}

      {/* Collapsible Sections */}
      <div className="space-y-3">
        {/* Additional Expert Endorsements */}
        {evidence.expertEndorsements.length > 1 && (
          <CollapsibleSection
            title="More Expert Endorsements"
            count={evidence.expertEndorsements.length - 1}
          >
            {evidence.expertEndorsements.slice(1).map((endorsement, idx) => (
              <ExpertQuoteCard key={idx} endorsement={endorsement} />
            ))}
          </CollapsibleSection>
        )}

        {/* Clinical Studies */}
        <CollapsibleSection
          title="Clinical Studies"
          count={evidence.studies.length}
          defaultOpen={evidence.studies.length > 0}
        >
          {evidence.studies.map((study, idx) => (
            <StudyCard key={idx} study={study} />
          ))}
        </CollapsibleSection>

        {/* Podcast Mentions */}
        <CollapsibleSection
          title="Podcast Mentions"
          count={evidence.podcastMentions.length}
        >
          {evidence.podcastMentions.map((mention, idx) => (
            <PodcastCard key={idx} mention={mention} />
          ))}
        </CollapsibleSection>

        {/* Third Party Tests */}
        <CollapsibleSection
          title="Third-Party Reviews"
          count={evidence.thirdPartyTests.length}
        >
          {evidence.thirdPartyTests.map((test, idx) => (
            <ThirdPartyTestCard key={idx} test={test} />
          ))}
        </CollapsibleSection>
      </div>
    </div>
  );
};

export default ResearchSection;
