import { FormState } from '../lib/types';
import { Category } from '../lib/api';
import Input from './ui/Input';
import CategoryCard from './CategoryCard';

interface StepBasicsProps {
  formData: FormState;
  updateField: <K extends keyof FormState>(field: K, value: FormState[K]) => void;
  missingFields: string[];
}

const CATEGORIES: { value: Category; label: string; description: string; icon: React.ReactNode }[] = [
  {
    value: 'planner',
    label: 'Event Planner',
    description: 'Full event coordination — decor, catering, logistics.',
    icon: <span>📋</span>,
  },
  {
    value: 'performer',
    label: 'Performer',
    description: 'Music, dance, comedy, or other live acts.',
    icon: <span>🎤</span>,
  },
  {
    value: 'crew',
    label: 'Crew',
    description: 'Sound, lighting, security, and support staff.',
    icon: <span>🛠️</span>,
  },
];

export default function StepBasics({ formData, updateField, missingFields }: StepBasicsProps) {
  const has = (key: string) => missingFields.includes(key);

  return (
    <div className="space-y-5">
      <Input label="Event Name" value={formData.eventName} onChange={(v) => updateField('eventName', v)} placeholder="Summer Wedding" error={has('eventName')} />
      <Input label="Event Type" value={formData.eventType} onChange={(v) => updateField('eventType', v)} placeholder="wedding, corporate, concert..." error={has('eventType')} />

      <div className="grid grid-cols-2 gap-4">
        <Input label="Start Date" type="date" value={formData.startDate} onChange={(v) => updateField('startDate', v)} error={has('startDate')} />
        <Input label="End Date (optional)" type="date" value={formData.endDate} onChange={(v) => updateField('endDate', v)} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input label="Location" value={formData.location} onChange={(v) => updateField('location', v)} error={has('location')} />
        <Input label="Venue (optional)" value={formData.venue} onChange={(v) => updateField('venue', v)} />
      </div>

      <div>
        <label className="block text-sm text-[var(--muted)] mb-2">Who are you looking for?</label>
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-lg ${has('category') ? 'ring-1 ring-[var(--error)] p-2 -m-2' : ''}`}>
          {CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.value}
              value={cat.value}
              label={cat.label}
              description={cat.description}
              icon={cat.icon}
              selected={formData.category === cat.value}
              onSelect={() => updateField('category', cat.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}