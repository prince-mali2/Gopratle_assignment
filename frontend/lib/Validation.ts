import { FormState } from './types';

export interface ValidationResult {
  isValid: boolean;
  missingFields: string[]; // field keys, used to highlight inputs
  message: string; // human-readable summary
}

export function validateBasics(formData: FormState): ValidationResult {
  const requiredMap: { key: keyof FormState; label: string }[] = [
    { key: 'eventName', label: 'Event name' },
    { key: 'eventType', label: 'Event type' },
    { key: 'startDate', label: 'Start date' },
    { key: 'location', label: 'Location' },
    { key: 'category', label: 'Category' },
  ];

  const missing = requiredMap.filter(({ key }) => !formData[key]);

  return {
    isValid: missing.length === 0,
    missingFields: missing.map((m) => m.key),
    message:
      missing.length > 0
        ? `Please fill in: ${missing.map((m) => m.label).join(', ')}`
        : '',
  };
}

const DETAIL_REQUIREMENTS: Record<string, { key: string; label: string; check: (d: Record<string, any>) => boolean }[]> = {
  planner: [
    { key: 'budgetRange', label: 'Budget range', check: (d) => !!d.budgetRange?.min && !!d.budgetRange?.max },
    { key: 'guestCount', label: 'Guest count', check: (d) => !!d.guestCount },
    { key: 'eventScale', label: 'Event scale', check: (d) => !!d.eventScale },
  ],
  performer: [
    { key: 'performanceType', label: 'Performance type', check: (d) => !!d.performanceType },
    { key: 'duration', label: 'Duration', check: (d) => !!d.duration },
    { key: 'audienceSize', label: 'Expected audience size', check: (d) => !!d.audienceSize },
  ],
  crew: [
    { key: 'crewRole', label: 'Crew role', check: (d) => !!d.crewRole?.[0] },
    { key: 'crewCount', label: 'Number of crew needed', check: (d) => !!d.crewCount },
    { key: 'shiftDuration', label: 'Shift duration', check: (d) => !!d.shiftDuration },
    { key: 'experienceLevel', label: 'Experience level', check: (d) => !!d.experienceLevel },
  ],
};

export function validateDetails(formData: FormState): ValidationResult {
  const rules = formData.category ? DETAIL_REQUIREMENTS[formData.category] : [];
  const missing = rules.filter((rule) => !rule.check(formData.details));

  return {
    isValid: missing.length === 0,
    missingFields: missing.map((m) => m.key),
    message:
      missing.length > 0
        ? `Please fill in: ${missing.map((m) => m.label).join(', ')}`
        : '',
  };
}