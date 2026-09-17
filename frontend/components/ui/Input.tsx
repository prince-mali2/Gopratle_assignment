interface InputProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  error?: boolean;
}

export default function Input({ label, value, onChange, type = 'text', placeholder = '', error = false }: InputProps) {
  return (
    <div>
      <label className="block text-sm text-[var(--muted)] mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-[var(--surface)] border rounded-md px-3 py-2.5 text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-1 transition-colors ${
          error
            ? 'border-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error)]'
            : 'border-[var(--border)] focus:border-[var(--gold)] focus:ring-[var(--gold)]'
        }`}
      />
    </div>
  );
}