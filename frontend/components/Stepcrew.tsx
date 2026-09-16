import { FormState } from '../lib/types';
import Input from './ui/Input';

interface StepCrewProps {
  formData: FormState;
  updateDetail: (field: string, value: unknown) => void;
}

export default function StepCrew({ formData, updateDetail }: StepCrewProps) {
  const d = formData.details;
  return (
    <div className="space-y-4">
      <h2 className="font-semibold">Crew Details</h2>
      <Input label="Crew Role" value={d.crewRole?.[0] || ''} onChange={(v) => updateDetail('crewRole', [v])} placeholder="sound engineer, lighting tech..." />
      <Input label="Number of Crew Needed" type="number" value={d.crewCount || ''} onChange={(v) => updateDetail('crewCount', Number(v))} />
      <Input label="Shift Duration" value={d.shiftDuration || ''} onChange={(v) => updateDetail('shiftDuration', v)} />
      <Input label="Experience Level" value={d.experienceLevel || ''} onChange={(v) => updateDetail('experienceLevel', v)} placeholder="entry / experienced / expert" />
    </div>
  );
}