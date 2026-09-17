import { FormState } from '../lib/types';
import Input from './ui/Input';

interface StepCrewProps {
  formData: FormState;
  updateDetail: (field: string, value: unknown) => void;
  missingFields: string[];
}

export default function StepCrew({ formData, updateDetail, missingFields }: StepCrewProps) {
  const d = formData.details;
  const has = (key: string) => missingFields.includes(key);

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl mb-1">Crew details</h2>
      <Input label="Crew Role" value={d.crewRole?.[0] || ''} onChange={(v) => updateDetail('crewRole', [v])} placeholder="sound engineer, lighting tech..." error={has('crewRole')} />
      <Input label="Number of Crew Needed" type="number" value={d.crewCount || ''} onChange={(v) => updateDetail('crewCount', Number(v))} error={has('crewCount')} />
      <Input label="Shift Duration" value={d.shiftDuration || ''} onChange={(v) => updateDetail('shiftDuration', v)} error={has('shiftDuration')} />
      <Input label="Experience Level" value={d.experienceLevel || ''} onChange={(v) => updateDetail('experienceLevel', v)} placeholder="entry / experienced / expert" error={has('experienceLevel')} />
    </div>
  );
}