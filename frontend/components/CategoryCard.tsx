import { Category } from '../lib/api';

interface CategoryCardProps {
  value: Category;
  label: string;
  description: string;
  icon: React.ReactNode;
  selected: boolean;
  onSelect: () => void;
}

export default function CategoryCard({ label, description, icon, selected, onSelect }: CategoryCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`text-left p-4 rounded-lg border transition-all duration-150 ${
        selected
          ? 'border-[var(--gold)] bg-[var(--surface-raised)] shadow-[0_0_0_1px_var(--gold)]'
          : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--muted)]'
      }`}
    >
      <div
        className={`w-8 h-8 mb-3 flex items-center justify-center rounded-full ${
          selected ? 'bg-[var(--gold)] text-[#15121c]' : 'bg-[var(--surface-raised)] text-[var(--muted)]'
        }`}
      >
        {icon}
      </div>
      <p className="font-display text-base mb-1">{label}</p>
      <p className="text-xs text-[var(--muted)] leading-relaxed">{description}</p>
    </button>
  );
}