import { Product, DiagnosticTool, Review } from './types';

export const FEATURED_TOOLS: DiagnosticTool[] = [
  {
    id: 'bio-age',
    title: 'Biological Age Estimator',
    description: 'Our most comprehensive free assessment based on the latest epigenetic research and blood marker analysis.',
    time: '8 MIN',
    icon: 'dna',
    category: 'Labs'
  },
  {
    id: 'hot-sleeper',
    title: 'Hot Sleeper Score',
    description: 'Get a custom cooling plan + gear shortlist based on your thermal environment.',
    time: '2 MIN',
    icon: 'bedtime',
    category: 'Sleep'
  },
  {
    id: 'cgm-worthiness',
    title: 'CGM Worthiness Quiz',
    description: 'Determine if a Continuous Glucose Monitor is actually useful for your metabolism.',
    time: '5 MIN',
    icon: 'glucose',
    category: 'Metabolic'
  },
  {
    id: 'supplement-audit',
    title: 'Supplement Audit',
    description: "Receive a clinical-grade audit of your current stack's efficacy.",
    time: '4 MIN',
    icon: 'pill',
    category: 'Recovery'
  },
  {
    id: 'hrv-index',
    title: 'HRV Recovery Index',
    description: 'Calibrate your wearable data against subjective recovery markers.',
    time: '3 MIN',
    icon: 'monitoring',
    category: 'Wearables'
  }
];

export const VERIFIED_SELECTIONS: Product[] = [
  // ============================================
  // SLEEP (6 products)
  // ============================================
  {
    id: 'eight-sleep-pod-4',
    slug: 'eight-sleep-pod-4',
    name: 'Eight Sleep Pod 4',
    category: 'Sleep',
    tag: 'HOT SLEEPERS',
    description: 'Dynamic thermal regulation',
    priceLevel: '$$$$',
    image: 'ac_unit',
    pros: ['Dual-zone cooling with clinical-grade sensors', '99% sleep tracking accuracy claims'],
    cons: ['High upfront cost plus subscription'],
    score: 9.8,
    affiliateUrl: 'https://www.eightsleep.com/',
    actualPrice: 2695,
    verdict: 'Best for hot sleepers willing to invest in clinical-grade temperature control for optimized deep sleep.',
    evidence: {
      studyCount: 2,
      expertCount: 2,
      studies: [
        {
          title: 'Effects of thermal environment on sleep and circadian rhythm',
          journal: 'Journal of Physiological Anthropology',
          year: 2012,
          type: 'meta-analysis',
          tier: 'S',
          keyFinding: 'Ambient temperature significantly affects sleep quality, with cooler temperatures (60-67°F) promoting better sleep onset and deep sleep duration.',
          pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/22738673/'
        },
        {
          title: 'Eight Sleep Pod Temperature Regulation Study',
          year: 2023,
          type: 'brand-study',
          tier: 'B',
          keyFinding: 'Users experienced 32% increase in deep sleep and 19% improvement in HRV when using dynamic cooling.',
        }
      ],
      expertEndorsements: [
        {
          expertName: 'Dr. Andrew Huberman',
          expertTitle: 'PhD, Neuroscientist',
          expertCredentials: 'Stanford Professor, Host of Huberman Lab',
          quote: 'Temperature is the most powerful lever for sleep. The Eight Sleep Pod is the most sophisticated tool I\'ve found for controlling sleep temperature dynamically throughout the night.',
          source: 'Huberman Lab Podcast',
          episodeNumber: '31',
          timestamp: '1:45:30',
          disclosureNote: 'Dr. Huberman has a sponsorship relationship with Eight Sleep'
        },
        {
          expertName: 'Dr. Matthew Walker',
          expertTitle: 'PhD, Sleep Scientist',
          expertCredentials: 'UC Berkeley Professor, Author of Why We Sleep',
          quote: 'Cooling the body is one of the most effective ways to trigger and maintain deep sleep.',
          source: 'Masterclass',
        }
      ],
      podcastMentions: [
        {
          podcastName: 'Huberman Lab',
          podcastHost: 'Dr. Andrew Huberman',
          episodeTitle: 'Master Your Sleep & Be More Alert When Awake',
          episodeNumber: '2',
          timestamp: '1:12:00'
        }
      ],
      thirdPartyTests: [
        {
          source: 'CNET',
          rating: '8.8/10',
          summary: 'Best smart mattress for temperature control with impressive cooling range',
          sourceUrl: 'https://www.cnet.com/health/sleep/eight-sleep-pod-review/'
        }
      ]
    }
  },
  {
    id: 'chilipad-cube',
    slug: 'chilipad-cube',
    name: 'ChiliPad Cube',
    category: 'Sleep',
    tag: 'BUDGET COOLING',
    description: 'Water-based thermal control',
    priceLevel: '$$$',
    image: 'water_drop',
    pros: ['55-115°F temperature range', 'Works with any existing mattress'],
    cons: ['No smart features or sleep tracking'],
    score: 8.4,
    affiliateUrl: 'https://sleep.me/',
    actualPrice: 699
  },
  {
    id: 'withings-sleep-mat',
    slug: 'withings-sleep-mat',
    name: 'Withings Sleep Mat',
    category: 'Sleep',
    tag: 'DATA PURIST',
    description: 'Under-mattress tracking',
    priceLevel: '$$',
    image: 'sensors',
    pros: ['2021 clinical study validated accuracy', 'No wearable required'],
    cons: ['Cannot track if you change beds'],
    score: 8.7,
    affiliateUrl: 'https://www.withings.com/',
    actualPrice: 129
  },
  {
    id: 'manta-sleep-mask',
    slug: 'manta-sleep-mask',
    name: 'Manta Sleep Mask Pro',
    category: 'Sleep',
    tag: 'LIGHT HYGIENE',
    description: '100% blackout design',
    priceLevel: '$',
    image: 'visibility_off',
    pros: ['Adjustable eye cups, zero pressure', 'Complete light elimination'],
    cons: ['Takes time to adjust fit properly'],
    score: 9.0,
    affiliateUrl: 'https://mantasleep.com/',
    actualPrice: 49
  },
  {
    id: 'eight-sleep-pod-5',
    slug: 'eight-sleep-pod-5',
    name: 'Eight Sleep Pod 5',
    category: 'Sleep',
    tag: 'LATEST TECH',
    description: 'Next-gen AI sleep system',
    priceLevel: '$$$$$',
    image: 'auto_awesome',
    pros: ['Enhanced AI temperature algorithms', 'Improved biometric sensors'],
    cons: ['Premium price for incremental upgrades'],
    score: 9.5,
    affiliateUrl: 'https://www.eightsleep.com/',
    actualPrice: 3295
  },
  {
    id: 'sleep-number-climate',
    slug: 'sleep-number-climate',
    name: 'Sleep Number Climate Cool',
    category: 'Sleep',
    tag: 'MAINSTREAM',
    description: 'Ceramic gel cooling mattress',
    priceLevel: '$$$$',
    image: 'thermostat',
    pros: ['15° faster cooling than competitors', 'Adjustable firmness per side'],
    cons: ['Requires Sleep Number base system'],
    score: 8.6,
    affiliateUrl: 'https://www.sleepnumber.com/',
    actualPrice: 2299
  },

  // ============================================
  // LABS (5 products)
  // ============================================
  {
    id: 'insidetracker-ultimate',
    slug: 'insidetracker-ultimate',
    name: 'InsideTracker Ultimate',
    category: 'Labs',
    tag: 'GOLD STANDARD',
    description: '48 biomarkers analyzed',
    priceLevel: '$$$$',
    image: 'science',
    pros: ['Harvard/MIT advisory board', 'Used by Dr. Huberman and top researchers'],
    cons: ['Requires blood draw at lab'],
    score: 9.7,
    affiliateUrl: 'https://www.insidetracker.com/',
    actualPrice: 589
  },
  {
    id: 'function-health',
    slug: 'function-health',
    name: 'Function Health',
    category: 'Labs',
    tag: 'COMPREHENSIVE',
    description: '100+ biomarker testing',
    priceLevel: '$$$$',
    image: 'labs',
    pros: ['Most comprehensive panel available', 'Early disease detection focus'],
    cons: ['Annual membership required'],
    score: 9.5,
    affiliateUrl: 'https://www.functionhealth.com/',
    actualPrice: 499
  },
  {
    id: 'trudiagnostic-truage',
    slug: 'trudiagnostic-truage',
    name: 'TruDiagnostic TruAge',
    category: 'Labs',
    tag: 'BIOLOGICAL AGE',
    description: 'Epigenetic age testing',
    priceLevel: '$$$',
    image: 'hourglass_empty',
    pros: ['850,000+ epigenetic loci analyzed', 'Tracks aging rate over time'],
    cons: ['Results take 3-4 weeks'],
    score: 9.3,
    affiliateUrl: 'https://www.trudiagnostic.com/',
    actualPrice: 299
  },
  {
    id: 'thorne-at-home',
    slug: 'thorne-at-home',
    name: 'Thorne at-home Test',
    category: 'Labs',
    tag: 'CLINICAL GRADE',
    description: '89 biomarker panel',
    priceLevel: '$$$',
    image: 'home_health',
    pros: ['NSF certified for accuracy', 'HSA/FSA eligible'],
    cons: ['Finger prick may be difficult for some'],
    score: 8.9,
    affiliateUrl: 'https://www.thorne.com/',
    actualPrice: 250
  },
  {
    id: 'superpower',
    slug: 'superpower',
    name: 'Superpower',
    category: 'Labs',
    tag: 'BUDGET OPTION',
    description: 'Affordable biomarker tracking',
    priceLevel: '$$',
    image: 'bolt',
    pros: ['$199/year includes biological age', 'AI-generated health plan'],
    cons: ['Fewer biomarkers than premium options'],
    score: 8.2,
    affiliateUrl: 'https://www.superpower.com/',
    actualPrice: 199
  },

  // ============================================
  // METABOLIC (6 products)
  // ============================================
  {
    id: 'levels-health',
    slug: 'levels-health',
    name: 'Levels Health',
    category: 'Metabolic',
    tag: 'MINIMALIST',
    description: 'See how food affects your health',
    priceLevel: '$$$',
    image: 'show_chart',
    pros: ['Daily metabolic stability score', 'Seamless Apple Health sync'],
    cons: ['Waitlist may delay access'],
    score: 9.4,
    affiliateUrl: 'https://www.levels.link/',
    actualPrice: 199,
    fullDescription: `Levels helps you see how food affects your health. By leveraging biosensor data from continuous glucose monitors (CGM), Levels provides real-time feedback on how diet and lifestyle choices impact your metabolic health.

Founded by Dr. Casey Means (Stanford MD), Josh Clemente (SpaceX, Hyperloop), and team members from Google and Y Combinator, Levels has a singular focus: solve the metabolic health crisis. With 93% of Americans not metabolically healthy and 1 in 10 adults worldwide living with diabetes, Levels believes in prevention over reaction.

The app translates raw glucose data into an intuitive metabolic score, helping you discover your optimal diet, control your energy, and reduce long-term health risk based on your individual biology.`,
    verdict: 'Best for health-conscious individuals who want actionable glucose insights without the complexity of medical CGMs. Ideal if you want to understand your personal food responses and optimize eating patterns based on real data rather than general guidelines.',
    evidence: {
      studyCount: 2,
      expertCount: 2,
      studies: [
        {
          title: 'Continuous Glucose Monitoring in Non-Diabetic Individuals',
          journal: 'Journal of Clinical Endocrinology & Metabolism',
          year: 2019,
          type: 'rct',
          tier: 'A',
          keyFinding: 'CGM use in non-diabetics led to 9% reduction in glucose variability and improved dietary choices.',
          pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/30874602/'
        },
        {
          title: 'Postprandial Glucose Patterns and Metabolic Health',
          journal: 'Cell Metabolism',
          year: 2020,
          type: 'rct',
          tier: 'A',
          keyFinding: 'Individual glucose responses to identical foods vary by up to 5x, supporting personalized nutrition approaches.',
          pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/26590418/'
        }
      ],
      expertEndorsements: [
        {
          expertName: 'Dr. Casey Means',
          expertTitle: 'MD, Chief Medical Officer',
          expertCredentials: 'Stanford-trained physician, Co-founder of Levels',
          quote: 'Understanding your glucose response is the single most actionable piece of metabolic data you can have.',
          source: 'The Drive Podcast with Peter Attia',
          episodeNumber: '224',
          disclosureNote: 'Dr. Means is a co-founder of Levels Health'
        },
        {
          expertName: 'Dr. Peter Attia',
          expertTitle: 'MD',
          expertCredentials: 'Longevity physician, Host of The Drive',
          quote: 'CGMs have transformed how I think about metabolic health. The data is invaluable for understanding individual responses.',
          source: 'The Drive Podcast',
        }
      ],
      podcastMentions: [
        {
          podcastName: 'The Drive',
          podcastHost: 'Dr. Peter Attia',
          episodeTitle: 'Deep dive into continuous glucose monitoring',
          episodeNumber: '224',
          timestamp: '45:30'
        }
      ],
      thirdPartyTests: [
        {
          source: 'Wired',
          rating: '8/10',
          summary: 'Best CGM app for non-diabetics seeking metabolic insights',
          sourceUrl: 'https://www.wired.com/review/levels-health/'
        },
        {
          source: 'Good Housekeeping',
          rating: '2022 Fitness Award',
          summary: 'Recognized for metabolic awareness tracking that helps users understand how food affects blood sugar',
          sourceUrl: 'https://www.goodhousekeeping.com/health-products/g38424294/best-fitness-awards/'
        },
        {
          source: 'Wall Street Journal',
          rating: 'Featured',
          summary: 'Highlighted as leading innovation in granular health tracking for personalized nutrition',
          sourceUrl: 'https://www.wsj.com/'
        },
        {
          source: "Runner's World",
          rating: 'Recommended',
          summary: 'Used by elite athletes including marathon world record holder Eliud Kipchoge',
          sourceUrl: 'https://www.runnersworld.com/'
        }
      ]
    }
  },
  {
    id: 'nutrisense',
    slug: 'nutrisense',
    name: 'Nutrisense',
    category: 'Metabolic',
    tag: 'DIETITIAN SUPPORT',
    description: 'CGM plus nutrition coaching',
    priceLevel: '$$$',
    image: 'restaurant',
    pros: ['1:1 dietitian included', 'Integrates with Oura and Garmin'],
    cons: ['Coaching quality varies by dietitian'],
    score: 9.1,
    affiliateUrl: 'https://www.nutrisense.io/',
    actualPrice: 225
  },
  {
    id: 'signos',
    slug: 'signos',
    name: 'Signos',
    category: 'Metabolic',
    tag: 'WEIGHT LOSS',
    description: 'Personalized nutrition timing',
    priceLevel: '$$$',
    image: 'scale',
    pros: ['RD access included in subscription', 'Weight loss focused algorithms'],
    cons: ['Less suited for performance athletes'],
    score: 8.8,
    affiliateUrl: 'https://www.signos.com/',
    actualPrice: 199
  },
  {
    id: 'dexcom-stelo',
    slug: 'dexcom-stelo',
    name: 'Dexcom Stelo',
    category: 'Metabolic',
    tag: 'NON-RX CGM',
    description: 'No prescription required',
    priceLevel: '$$',
    image: 'medical_services',
    pros: ['G7-based clinical accuracy', '15-day sensor wear time'],
    cons: ['Simpler app than wellness CGMs'],
    score: 9.0,
    affiliateUrl: 'https://www.dexcom.com/',
    actualPrice: 99
  },
  {
    id: 'lumen',
    slug: 'lumen',
    name: 'Lumen',
    category: 'Metabolic',
    tag: 'BREATH ANALYSIS',
    description: 'CO2 metabolism tracking',
    priceLevel: '$$$',
    image: 'air',
    pros: ['Measures fat vs carb burning', 'No sensor patches required'],
    cons: ['Morning breath test routine required'],
    score: 8.5,
    affiliateUrl: 'https://www.lumen.me/',
    actualPrice: 349
  },
  {
    id: 'abbott-lingo',
    slug: 'abbott-lingo',
    name: 'Abbott Lingo',
    category: 'Metabolic',
    tag: 'ENTRY LEVEL',
    description: 'Simplified glucose tracking',
    priceLevel: '$$',
    image: 'play_arrow',
    pros: ['Simplified "Lingo count" metric', 'Most affordable CGM option'],
    cons: ['Less detailed data than competitors'],
    score: 8.0,
    affiliateUrl: 'https://www.abbott.com/',
    actualPrice: 49
  },

  // ============================================
  // WEARABLES (6 products)
  // ============================================
  {
    id: 'oura-ring-gen4',
    slug: 'oura-ring-gen4',
    name: 'Oura Ring Gen4',
    category: 'Wearables',
    tag: 'BEST HRV ACCURACY',
    description: 'Clinical-grade sleep tracking',
    priceLevel: '$$$',
    image: 'ring_volume',
    pros: ['Best ECG alignment for HRV/RHR', 'Subtle 24/7 wearable form factor'],
    cons: ['Monthly subscription required'],
    score: 9.6,
    affiliateUrl: 'https://ouraring.com/',
    actualPrice: 349,
    verdict: 'Best for those prioritizing accurate HRV and sleep data in a discreet, always-on form factor.',
    evidence: {
      studyCount: 2,
      expertCount: 2,
      studies: [
        {
          title: 'Accuracy of Oura Ring for Sleep Staging Compared to Polysomnography',
          journal: 'Sleep',
          year: 2020,
          type: 'rct',
          tier: 'A',
          keyFinding: '94% agreement with polysomnography for sleep staging, making it one of the most accurate consumer sleep trackers.',
          pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/32333766/'
        },
        {
          title: 'Oura Ring HRV Validation Study',
          journal: 'Sensors',
          year: 2021,
          type: 'rct',
          tier: 'A',
          keyFinding: 'Strong correlation (r=0.99) with ECG for resting heart rate and HRV measurements.',
          pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/34063622/'
        }
      ],
      expertEndorsements: [
        {
          expertName: 'Dr. Andrew Huberman',
          expertTitle: 'PhD, Neuroscientist',
          expertCredentials: 'Stanford Professor, Host of Huberman Lab',
          quote: 'I wear the Oura Ring every night. The HRV data has been invaluable for understanding my recovery and readiness.',
          source: 'Huberman Lab Podcast',
          episodeNumber: '31',
          timestamp: '1:23:45',
        }
      ],
      podcastMentions: [
        {
          podcastName: 'Huberman Lab',
          podcastHost: 'Dr. Andrew Huberman',
          episodeTitle: 'Master Your Sleep & Be More Alert When Awake',
          episodeNumber: '2',
          timestamp: '1:05:00'
        },
        {
          podcastName: 'The Drive',
          podcastHost: 'Dr. Peter Attia',
          episodeTitle: 'Sleep and recovery optimization',
          episodeNumber: '187',
          timestamp: '32:15'
        }
      ],
      thirdPartyTests: [
        {
          source: 'CNET',
          rating: '8.5/10',
          summary: 'Best-in-class sleep tracking with the most comfortable form factor',
          sourceUrl: 'https://www.cnet.com/health/sleep/oura-ring-gen-3-review/'
        },
        {
          source: 'Wirecutter',
          rating: 'Top Pick',
          summary: 'Best smart ring for sleep and recovery tracking',
          sourceUrl: 'https://www.nytimes.com/wirecutter/reviews/best-sleep-trackers/'
        }
      ]
    }
  },
  {
    id: 'whoop-4',
    slug: 'whoop-4',
    name: 'Whoop 4.0',
    category: 'Wearables',
    tag: "ATHLETE'S CHOICE",
    description: 'Strain & load management',
    priceLevel: '$$',
    image: 'fitness_center',
    pros: ['No-screen distraction-free design', 'Advanced strain management'],
    cons: ['Subscription-only, no purchase option'],
    score: 9.4,
    affiliateUrl: 'https://www.whoop.com/',
    actualPrice: 239,
    verdict: 'Best for serious athletes who need detailed strain and recovery metrics to optimize training load.',
    evidence: {
      studyCount: 1,
      expertCount: 2,
      studies: [
        {
          title: 'Validity of WHOOP Wearable for Sleep and Recovery Monitoring',
          journal: 'International Journal of Sports Physiology and Performance',
          year: 2022,
          type: 'rct',
          tier: 'A',
          keyFinding: 'WHOOP showed strong agreement with polysomnography for sleep duration and moderate agreement for sleep stages.',
          pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/35235107/'
        }
      ],
      expertEndorsements: [
        {
          expertName: 'LeBron James',
          expertTitle: 'Professional Athlete',
          expertCredentials: 'NBA Champion, Investor in WHOOP',
          quote: 'WHOOP has changed the way I prepare and recover. The strain and recovery data helps me know when to push and when to rest.',
          source: 'WHOOP Podcast',
          disclosureNote: 'LeBron James is an investor in WHOOP'
        },
        {
          expertName: 'Dr. Andy Galpin',
          expertTitle: 'PhD, Exercise Physiologist',
          expertCredentials: 'Cal State Fullerton Professor, Performance consultant',
          quote: 'For athletes, WHOOP provides the most comprehensive picture of training load and recovery I\'ve seen in a consumer device.',
          source: 'Huberman Lab Guest Series',
        }
      ],
      podcastMentions: [
        {
          podcastName: 'Huberman Lab',
          podcastHost: 'Dr. Andrew Huberman',
          episodeTitle: 'Dr. Andy Galpin: Optimal Protocols for Recovery',
          episodeNumber: '100',
          timestamp: '55:00'
        }
      ],
      thirdPartyTests: [
        {
          source: 'GQ',
          rating: '9/10',
          summary: 'The best fitness tracker for serious athletes',
          sourceUrl: 'https://www.gq.com/story/whoop-review'
        }
      ]
    }
  },
  {
    id: 'garmin-fenix-8',
    slug: 'garmin-fenix-8',
    name: 'Garmin Fenix 8',
    category: 'Wearables',
    tag: 'MULTISPORT',
    description: '100+ workout modes',
    priceLevel: '$$$$',
    image: 'directions_run',
    pros: ['29-day battery life', 'Built-in HRV status tracking'],
    cons: ['Bulky for everyday wear'],
    score: 9.3,
    affiliateUrl: 'https://www.garmin.com/',
    actualPrice: 999
  },
  {
    id: 'ultrahuman-ring-air',
    slug: 'ultrahuman-ring-air',
    name: 'Ultrahuman Ring Air',
    category: 'Wearables',
    tag: 'LIGHTWEIGHT',
    description: 'Lightest smart ring',
    priceLevel: '$$$',
    image: 'diamond',
    pros: ['No subscription fee ever', 'BLE glucose monitor sync'],
    cons: ['Smaller research validation base'],
    score: 8.8,
    affiliateUrl: 'https://www.ultrahuman.com/',
    actualPrice: 349
  },
  {
    id: 'polar-vantage-v3',
    slug: 'polar-vantage-v3',
    name: 'Polar Vantage V3',
    category: 'Wearables',
    tag: 'TRAINING LOAD',
    description: 'Advanced training analytics',
    priceLevel: '$$$',
    image: 'speed',
    pros: ['Dual-frequency GPS accuracy', 'Recovery Pro with muscle load'],
    cons: ['Less polished app experience'],
    score: 9.0,
    affiliateUrl: 'https://www.polar.com/',
    actualPrice: 599
  },
  {
    id: 'apple-watch-ultra-2',
    slug: 'apple-watch-ultra-2',
    name: 'Apple Watch Ultra 2',
    category: 'Wearables',
    tag: 'ECOSYSTEM',
    description: 'Best for iPhone users',
    priceLevel: '$$$$',
    image: 'watch',
    pros: ['FDA-cleared ECG and crash detection', 'Seamless Apple ecosystem'],
    cons: ['Daily charging required'],
    score: 9.2,
    affiliateUrl: 'https://www.apple.com/',
    actualPrice: 799
  },

  // ============================================
  // RECOVERY (6 products)
  // ============================================
  {
    id: 'theragun-pro-plus',
    slug: 'theragun-pro-plus',
    name: 'Theragun PRO Plus',
    category: 'Recovery',
    tag: 'PERCUSSION LEADER',
    description: 'Multi-therapy percussion',
    priceLevel: '$$$',
    image: 'vibration',
    pros: ['Heat, cold, and vibration modes', 'Therabody Labs research backed'],
    cons: ['Premium price point'],
    score: 9.4,
    affiliateUrl: 'https://www.therabody.com/',
    actualPrice: 599
  },
  {
    id: 'joovv-solo-3',
    slug: 'joovv-solo-3',
    name: 'Joovv Solo 3.0',
    category: 'Recovery',
    tag: 'RED LIGHT',
    description: 'Clinical wavelength therapy',
    priceLevel: '$$$$',
    image: 'lightbulb',
    pros: ['660nm/850nm clinical wavelengths', 'Multiple published studies'],
    cons: ['Requires dedicated usage time'],
    score: 9.1,
    affiliateUrl: 'https://joovv.com/',
    actualPrice: 1495
  },
  {
    id: 'hyperice-normatec-3',
    slug: 'hyperice-normatec-3',
    name: 'Hyperice Normatec 3',
    category: 'Recovery',
    tag: 'COMPRESSION',
    description: 'Dynamic air compression',
    priceLevel: '$$$$',
    image: 'compress',
    pros: ['Pro athlete recovery standard', 'Reduces inflammation measurably'],
    cons: ['Legs-only in base package'],
    score: 9.3,
    affiliateUrl: 'https://hyperice.com/',
    actualPrice: 799
  },
  {
    id: 'plunge-cold-tub',
    slug: 'plunge-cold-tub',
    name: 'Plunge Cold Tub',
    category: 'Recovery',
    tag: 'COLD EXPOSURE',
    description: 'Professional cold plunge',
    priceLevel: '$$$$$',
    image: 'severe_cold',
    pros: ['Reaches 39°F consistently', 'Mental resilience plus recovery'],
    cons: ['Significant space and power needs'],
    score: 9.0,
    affiliateUrl: 'https://www.thecoldplunge.com/',
    actualPrice: 4990
  },
  {
    id: 'higherdose-sauna',
    slug: 'higherdose-sauna',
    name: 'HigherDOSE Infrared Sauna',
    category: 'Recovery',
    tag: 'DETOX',
    description: 'Far infrared therapy',
    priceLevel: '$$$$$',
    image: 'local_fire_department',
    pros: ['Low EMF far infrared', 'Includes chromotherapy lighting'],
    cons: ['Requires dedicated room space'],
    score: 8.8,
    affiliateUrl: 'https://higherdose.com/',
    actualPrice: 5495
  },
  {
    id: 'theragun-mini-2',
    slug: 'theragun-mini-2',
    name: 'Theragun Mini 2.0',
    category: 'Recovery',
    tag: 'PORTABLE',
    description: 'Travel-friendly percussion',
    priceLevel: '$$',
    image: 'luggage',
    pros: ['QuietForce technology', 'Fits in carry-on easily'],
    cons: ['Less power than full-size'],
    score: 8.7,
    affiliateUrl: 'https://www.therabody.com/',
    actualPrice: 199
  },

  // ============================================
  // HOME (6 products)
  // ============================================
  {
    id: 'airdoctor-3500',
    slug: 'airdoctor-3500',
    name: 'AirDoctor 3500',
    category: 'Home',
    tag: 'PURITY TECH',
    description: 'Medical-grade air filtration',
    priceLevel: '$$$',
    image: 'filter_alt',
    pros: ['UltraHEPA captures 99.99% particles', 'Whisper-quiet auto-mode'],
    cons: ['Filter replacements add ongoing cost'],
    score: 9.2,
    affiliateUrl: 'https://www.airdoctorpro.com/',
    actualPrice: 629
  },
  {
    id: 'coway-airmega-prox',
    slug: 'coway-airmega-prox',
    name: 'Coway Airmega ProX',
    category: 'Home',
    tag: 'LARGE ROOM',
    description: 'High-capacity purifier',
    priceLevel: '$$$$',
    image: 'meeting_room',
    pros: ['Top Consumer Reports performance', 'Covers 2126 sq ft'],
    cons: ['50lb unit difficult to move'],
    score: 9.0,
    affiliateUrl: 'https://www.cowaymega.com/',
    actualPrice: 899
  },
  {
    id: 'berkey-water-filter',
    slug: 'berkey-water-filter',
    name: 'Berkey Water Filter',
    category: 'Home',
    tag: 'GRAVITY-FED',
    description: 'No-electricity filtration',
    priceLevel: '$$$',
    image: 'water',
    pros: ['Removes 200+ contaminants', 'No electricity or plumbing needed'],
    cons: ['Slow filtration rate'],
    score: 8.9,
    affiliateUrl: 'https://www.berkeyfilters.com/',
    actualPrice: 384
  },
  {
    id: 'aquatru-countertop',
    slug: 'aquatru-countertop',
    name: 'AquaTru Countertop RO',
    category: 'Home',
    tag: 'REVERSE OSMOSIS',
    description: '4-stage water purification',
    priceLevel: '$$$',
    image: 'local_drink',
    pros: ['NSF certified 4-stage filtration', 'No installation required'],
    cons: ['Wastes some water in RO process'],
    score: 9.1,
    affiliateUrl: 'https://www.aquatru.com/',
    actualPrice: 449
  },
  {
    id: 'bon-charge-glasses',
    slug: 'bon-charge-glasses',
    name: 'BON CHARGE Sleep+ Glasses',
    category: 'Home',
    tag: 'CIRCADIAN',
    description: 'Blue light blocking',
    priceLevel: '$$',
    image: 'nightlight',
    pros: ['Blocks 100% of 400-550nm light', 'Australian optics lab quality'],
    cons: ['Orange tint affects color perception'],
    score: 8.6,
    affiliateUrl: 'https://www.boncharge.com/',
    actualPrice: 89
  },
  {
    id: 'ra-optics-sunset',
    slug: 'ra-optics-sunset',
    name: 'Ra Optics Sunset Lenses',
    category: 'Home',
    tag: 'PREMIUM BLUE BLOCK',
    description: 'High-end circadian glasses',
    priceLevel: '$$$',
    image: 'wb_twilight',
    pros: ['99% blue spectrum blocking', 'Prescription options available'],
    cons: ['Premium pricing for glasses'],
    score: 8.8,
    affiliateUrl: 'https://raoptics.com/',
    actualPrice: 179
  },

  // ============================================
  // SUPPLEMENTS (6 products)
  // ============================================
  {
    id: 'ag1-athletic-greens',
    slug: 'ag1-athletic-greens',
    name: 'AG1 (Athletic Greens)',
    category: 'Supplements',
    tag: 'ALL-IN-ONE',
    description: '75-ingredient daily formula',
    priceLevel: '$$$',
    image: 'eco',
    pros: ['4 randomized controlled trials', 'Gut microbiome study published'],
    cons: ['High cost per serving'],
    score: 9.0,
    affiliateUrl: 'https://drinkag1.com/',
    actualPrice: 99,
    verdict: 'Best for those who want comprehensive daily nutrition coverage in a single convenient serving.',
    evidence: {
      studyCount: 2,
      expertCount: 2,
      studies: [
        {
          title: 'AG1 Microbiome and Digestive Health Study',
          year: 2023,
          type: 'brand-study',
          tier: 'B',
          keyFinding: 'Participants showed significant improvements in digestive comfort and gut microbiome diversity after 90 days.',
        },
        {
          title: 'AG1 Nutrient Absorption and Bioavailability Study',
          year: 2022,
          type: 'brand-study',
          tier: 'B',
          keyFinding: 'Blood nutrient levels increased significantly compared to placebo group, indicating effective absorption.',
        }
      ],
      expertEndorsements: [
        {
          expertName: 'Dr. Peter Attia',
          expertTitle: 'MD',
          expertCredentials: 'Longevity physician, Host of The Drive',
          quote: 'I take AG1 daily. I can speak to the quality of the ingredients and the convenience factor.',
          source: 'The Drive Podcast',
          disclosureNote: 'Dr. Attia is an investor and advisor to AG1'
        },
        {
          expertName: 'Dr. Andrew Huberman',
          expertTitle: 'PhD, Neuroscientist',
          expertCredentials: 'Stanford Professor, Host of Huberman Lab',
          quote: 'AG1 covers my foundational nutrition needs. The adaptogens and probiotics are a nice addition to the vitamin coverage.',
          source: 'Huberman Lab Podcast',
          disclosureNote: 'Dr. Huberman has a sponsorship relationship with AG1'
        }
      ],
      podcastMentions: [
        {
          podcastName: 'Huberman Lab',
          podcastHost: 'Dr. Andrew Huberman',
          episodeTitle: 'Foundational Supplements for Health',
          episodeNumber: '50',
          timestamp: '15:30'
        },
        {
          podcastName: 'The Drive',
          podcastHost: 'Dr. Peter Attia',
          episodeTitle: 'Supplements I take and why',
          episodeNumber: '200',
          timestamp: '22:00'
        }
      ],
      thirdPartyTests: [
        {
          source: 'Labdoor',
          rating: 'A',
          summary: 'Passed all purity tests with accurate label claims',
          sourceUrl: 'https://labdoor.com/'
        }
      ]
    }
  },
  {
    id: 'thorne-basic-nutrients',
    slug: 'thorne-basic-nutrients',
    name: 'Thorne Basic Nutrients',
    category: 'Supplements',
    tag: 'CLINICAL GRADE',
    description: 'Physician-trusted multivitamin',
    priceLevel: '$$',
    image: 'medication',
    pros: ['NSF Certified for Sport', 'Mayo/Cleveland Clinic partnerships'],
    cons: ['Multiple pills per day'],
    score: 9.2,
    affiliateUrl: 'https://www.thorne.com/',
    actualPrice: 42
  },
  {
    id: 'wonderfeel-youngr',
    slug: 'wonderfeel-youngr',
    name: 'Wonderfeel Youngr NMN',
    category: 'Supplements',
    tag: 'NAD+ BOOSTER',
    description: 'High-dose NMN supplement',
    priceLevel: '$$$$',
    image: 'psychology',
    pros: ['900mg clinical dose', 'Trial showed NAD+ increase'],
    cons: ['Long-term effects still being studied'],
    score: 8.7,
    affiliateUrl: 'https://www.wonderfeel.com/',
    actualPrice: 88
  },
  {
    id: 'nordic-naturals-omega',
    slug: 'nordic-naturals-omega',
    name: 'Nordic Naturals Ultimate Omega',
    category: 'Supplements',
    tag: 'OMEGA-3',
    description: 'Premium fish oil',
    priceLevel: '$$',
    image: 'water_drop',
    pros: ['IFOS 5-star certified', 'Triglyceride form for absorption'],
    cons: ['Large softgels may be hard to swallow'],
    score: 9.4,
    affiliateUrl: 'https://www.nordicnaturals.com/',
    actualPrice: 55
  },
  {
    id: 'momentous-huberman',
    slug: 'momentous-huberman',
    name: 'Momentous Huberman Stack',
    category: 'Supplements',
    tag: 'PROTOCOL',
    description: 'Huberman Lab formulations',
    priceLevel: '$$$',
    image: 'science',
    pros: ['Formulated with Dr. Huberman', 'Transparent ingredient sourcing'],
    cons: ['Requires multiple products for full stack'],
    score: 8.9,
    affiliateUrl: 'https://www.livemomentous.com/',
    actualPrice: 150
  },
  {
    id: 'thorne-niacel',
    slug: 'thorne-niacel',
    name: 'Thorne NiaCel 400',
    category: 'Supplements',
    tag: 'NAD+ PRECURSOR',
    description: 'Nicotinamide riboside',
    priceLevel: '$$$',
    image: 'battery_charging_full',
    pros: ['Peer-reviewed research backing', 'Clinical-grade manufacturing'],
    cons: ['Benefits may take months to notice'],
    score: 8.5,
    affiliateUrl: 'https://www.thorne.com/',
    actualPrice: 60
  }
];

export const SYSTEM_ANALYSIS: Review[] = [
  {
    id: 'oura-vs-whoop',
    dataset: 'H2H',
    title: 'Oura Ring vs. Whoop: Which Recovery Tracker Wins?',
    summary: '6-month biometric longitudinal study.',
    icon: 'compare_arrows'
  },
  {
    id: 'longevity-blueprint',
    dataset: '2026 Index',
    title: 'The Ultimate Longevity Blueprint: 2026 Edition',
    summary: 'The essential stack for modern optimization.',
    icon: 'query_stats'
  },
  {
    id: 'levels-review',
    dataset: 'Tech Review',
    title: 'Levels Health Review: Is 24/7 Glucose Tracking Overkill?',
    summary: 'Metabolic health tracking value analysis.',
    icon: 'precision_manufacturing'
  }
];
