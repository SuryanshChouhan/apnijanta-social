export type UrgencyLevel = 'critical' | 'high' | 'standard';

export type DetectionResult = {
  level: UrgencyLevel;
  reason: string;
};

type CategoryDef = {
  name: string;
  keywords: string[];
};

const CRITICAL_CATEGORIES: CategoryDef[] = [
  {
    name: 'Housing/Eviction',
    keywords: ['eviction', 'evicted', 'homeless', 'homelessness']
  },
  {
    name: 'Personal Safety',
    keywords: ['assault', 'assaulted', 'threat', 'threatened', 'safety', 'unsafe', 'stalking', 'stalker', 'abuse', 'abused']
  },
  {
    name: 'Mental Health Crisis',
    keywords: ['suicide', 'suicidal', 'self-harm', 'hospital', 'hospitalized']
  },
  {
    name: 'Legal/Police',
    keywords: ['police', 'arrested', 'arrest', 'restraining order', 'immediate', 'emergency']
  }
];

const HIGH_CATEGORIES: CategoryDef[] = [
  {
    name: 'Immigration',
    keywords: ['visa', 'immigration', 'deportation', 'deported']
  },
  {
    name: 'Academic Standing',
    keywords: ['suspension', 'suspended', 'disciplinary', 'hearing', 'rusticate', 'rusticated', 'expulsion', 'expelled', 'dismissal', 'fail', 'failing', 'failed', 'exam', 'grading', 'grade dispute', 'academic probation']
  },
  {
    name: 'Financial',
    keywords: ['financial aid', 'scholarship revoked']
  }
];

export function detectUrgency(text: string): DetectionResult {
  if (!text || text.trim().length < 10) {
    return { level: 'standard', reason: 'No urgent keywords detected — Standard Priority' };
  }

  const normalizedText = text.toLowerCase();

  // Check critical first
  for (const cat of CRITICAL_CATEGORIES) {
    if (cat.keywords.some(kw => normalizedText.includes(kw))) {
      return { 
        level: 'critical', 
        reason: `Detected keywords related to ${cat.name} — upgraded to Critical Priority` 
      };
    }
  }

  // Check high second
  for (const cat of HIGH_CATEGORIES) {
    if (cat.keywords.some(kw => normalizedText.includes(kw))) {
      return { 
        level: 'high', 
        reason: `Detected keywords related to ${cat.name} — upgraded to High Priority` 
      };
    }
  }

  return { level: 'standard', reason: 'No urgent keywords detected — Standard Priority' };
}
