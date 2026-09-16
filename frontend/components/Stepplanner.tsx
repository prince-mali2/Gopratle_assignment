import { FormState } from '../lib/types';
import Input from './ui/Input';

interface StepPlannerProps {
  formData: FormState;
  updateDetail: (field: string, value: unknown) => void;
}

export default function StepPlanner({ formData, updateDetail }: StepPlannerProps) {
  const d = formData.details;
  return (
    <div className="space-y-4">
      <h2 className="font-semibold">Planner Details</h2>
      <Input label="Min Budget" type="number" value={d.budgetRange?.min || ''} onChange={(v) => updateDetail('budgetRange', { ...d.budgetRange, min: Number(v) })} />
      <Input label="Max Budget" type="number" value={d.budgetRange?.max || ''} onChange={(v) => updateDetail('budgetRange', { ...d.budgetRange, max: Number(v) })} />
      <Input label="Guest Count" type="number" value={d.guestCount || ''} onChange={(v) => updateDetail('guestCount', Number(v))} />
      <Input label="Event Scale" value={d.eventScale || ''} onChange={(v) => updateDetail('eventScale', v)} placeholder="small / medium / large" />
      <Input label="Special Requirements" value={d.specialRequirements || ''} onChange={(v) => updateDetail('specialRequirements', v)} />
    </div>
  );
}