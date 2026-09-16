import { FormState } from '../lib/types';
import Input from './ui/Input';

interface StepPerformerProps {
  formData: FormState;
  updateDetail: (field: string, value: unknown) => void;
}

export default function StepPerformer({ formData, updateDetail }: StepPerformerProps) {
  const d = formData.details;
  return (
    <div className="space-y-4">
      <h2 className="font-semibold">Performer Details</h2>
      <Input label="Performance Type" value={d.performanceType || ''} onChange={(v) => updateDetail('performanceType', v)} placeholder="music, dance, comedy..." />
      <Input label="Duration" value={d.duration || ''} onChange={(v) => updateDetail('duration', v)} placeholder="1 hr" />
      <Input label="Genre" value={d.genre || ''} onChange={(v) => updateDetail('genre', v)} />
      <Input label="Expected Audience Size" type="number" value={d.audienceSize || ''} onChange={(v) => updateDetail('audienceSize', Number(v))} />
    </div>
  );
}