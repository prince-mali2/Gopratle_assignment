import { FormState } from '../lib/types';
import Input from './ui/Input';

interface StepPlannerProps {
  formData: FormState;
  updateDetail: (field: string, value: unknown) => void;
  missingFields: string[];
}

export default function StepPlanner({ formData, updateDetail, missingFields }: StepPlannerProps) {
  const d = formData.details;
  const has = (key: string) => missingFields.includes(key);

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl mb-1">Planner details</h2>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Min Budget" type="number" value={d.budgetRange?.min || ''} onChange={(v) => updateDetail('budgetRange', { ...d.budgetRange, min: Number(v) })} error={has('budgetRange')} />
        <Input label="Max Budget" type="number" value={d.budgetRange?.max || ''} onChange={(v) => updateDetail('budgetRange', { ...d.budgetRange, max: Number(v) })} error={has('budgetRange')} />
      </div>
      <Input label="Guest Count" type="number" value={d.guestCount || ''} onChange={(v) => updateDetail('guestCount', Number(v))} error={has('guestCount')} />
      <Input label="Event Scale" value={d.eventScale || ''} onChange={(v) => updateDetail('eventScale', v)} placeholder="small / medium / large" error={has('eventScale')} />
      <Input label="Special Requirements (optional)" value={d.specialRequirements || ''} onChange={(v) => updateDetail('specialRequirements', v)} />
    </div>
  );
}