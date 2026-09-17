import { FormState } from '../lib/types';
import Input from './ui/Input';

interface StepPerformerProps {
  formData: FormState;
  updateDetail: (field: string, value: unknown) => void;
  missingFields: string[];
}

export default function StepPerformer({ formData, updateDetail, missingFields }: StepPerformerProps) {
  const d = formData.details;
  const has = (key: string) => missingFields.includes(key);

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl mb-1">Performer details</h2>
      <Input label="Performance Type" value={d.performanceType || ''} onChange={(v) => updateDetail('performanceType', v)} placeholder="music, dance, comedy..." error={has('performanceType')} />
      <Input label="Duration" value={d.duration || ''} onChange={(v) => updateDetail('duration', v)} placeholder="1 hr" error={has('duration')} />
      <Input label="Genre (optional)" value={d.genre || ''} onChange={(v) => updateDetail('genre', v)} />
      <Input label="Expected Audience Size" type="number" value={d.audienceSize || ''} onChange={(v) => updateDetail('audienceSize', Number(v))} error={has('audienceSize')} />
    </div>
  );
}