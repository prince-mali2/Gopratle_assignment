import { FormState } from '../lib/types';

function formatLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

function formatValue(value: unknown): string {
  if (value === undefined || value === null || value === '') return '—';
  if (Array.isArray(value)) return value.join(', ') || '—';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    if ('min' in obj || 'max' in obj) {
      return `${obj.min ?? '—'} – ${obj.max ?? '—'}`;
    }
    return JSON.stringify(obj);
  }
  return String(value);
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2.5 border-b border-[var(--border)] last:border-0">
      <span className="text-sm text-[var(--muted)]">{label}</span>
      <span className="text-sm text-[var(--text)] text-right max-w-[60%]">{value}</span>
    </div>
  );
}

export default function StepReview({ formData }: { formData: FormState }) {
  const detailEntries = Object.entries(formData.details).filter(([, v]) => v !== undefined && v !== '');

  return (
    <div>
      <h2 className="font-display text-xl mb-4">Review your requirement</h2>

      <div className="mb-5">
        <p className="text-xs text-[var(--gold)] mb-1">Event</p>
        <div className="bg-[var(--surface-raised)] rounded-lg px-4">
          <Row label="Event name" value={formatValue(formData.eventName)} />
          <Row label="Event type" value={formatValue(formData.eventType)} />
          <Row label="Dates" value={`${formatValue(formData.startDate)}${formData.endDate ? ` – ${formData.endDate}` : ''}`} />
          <Row label="Location" value={formatValue(formData.location)} />
          <Row label="Venue" value={formatValue(formData.venue)} />
        </div>
      </div>

      <div>
        <p className="text-xs text-[var(--gold)] mb-1 capitalize">{formData.category} details</p>
        <div className="bg-[var(--surface-raised)] rounded-lg px-4">
          {detailEntries.length === 0 ? (
            <p className="text-sm text-[var(--muted)] py-3">No additional details provided.</p>
          ) : (
            detailEntries.map(([key, value]) => (
              <Row key={key} label={formatLabel(key)} value={formatValue(value)} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}