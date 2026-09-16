import { FormState } from '../lib/types';
import { Category } from '../lib/api';
import Input from './ui/Input';

interface StepBasicsProps {
  formData: FormState;
  updateField: <K extends keyof FormState>(field: K, value: FormState[K]) => void;
}

export default function StepBasics({ formData, updateField }: StepBasicsProps) {
  return (
    <div className="space-y-4">
      <Input label="Event Name" value={formData.eventName} onChange={(v) => updateField('eventName', v)} />
      <Input label="Event Type" value={formData.eventType} onChange={(v) => updateField('eventType', v)} placeholder="wedding, corporate, concert..." />
      <Input label="Start Date" type="date" value={formData.startDate} onChange={(v) => updateField('startDate', v)} />
      <Input label="End Date (optional)" type="date" value={formData.endDate} onChange={(v) => updateField('endDate', v)} />
      <Input label="Location" value={formData.location} onChange={(v) => updateField('location', v)} />
      <Input label="Venue (optional)" value={formData.venue} onChange={(v) => updateField('venue', v)} />

      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <div className="flex gap-3">
          {(['planner', 'performer', 'crew'] as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => updateField('category', cat)}
              className={`px-3 py-2 border rounded capitalize ${
                formData.category === cat ? 'bg-black text-white' : ''
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}