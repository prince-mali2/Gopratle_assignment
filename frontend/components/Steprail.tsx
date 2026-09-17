interface StepRailProps {
  currentStep: number;
  category: string;
}

const STEPS = [
  { number: 1, label: 'Event basics' },
  { number: 2, label: 'Requirement details' },
  { number: 3, label: 'Review & submit' },
];

export default function StepRail({ currentStep, category }: StepRailProps) {
  return (
    <div className="flex md:flex-col gap-4 md:gap-0">
      {STEPS.map((step, i) => {
        const isActive = step.number === currentStep;
        const isDone = step.number < currentStep;
        const isLast = i === STEPS.length - 1;

        return (
          <div key={step.number} className="flex md:flex-col items-center md:items-start">
            <div className="flex md:flex-row items-center gap-3">
              <div
                className={`flex items-center justify-center w-9 h-9 rounded-full border text-sm font-display transition-colors ${
                  isDone
                    ? 'bg-[var(--gold)] border-[var(--gold)] text-[#15121c]'
                    : isActive
                    ? 'border-[var(--gold)] text-[var(--gold)]'
                    : 'border-[var(--border)] text-[var(--muted)]'
                }`}
              >
                {isDone ? '✓' : step.number}
              </div>
              <div className="hidden md:block">
                <p className={`text-sm ${isActive ? 'text-[var(--text)]' : 'text-[var(--muted)]'}`}>
                  {step.label}
                </p>
                {step.number === 2 && category && (
                  <p className="text-xs text-[var(--gold)] capitalize">{category}</p>
                )}
              </div>
            </div>
            {!isLast && (
              <div
                className={`hidden md:block w-px h-8 ml-[18px] my-1 ${
                  isDone ? 'bg-[var(--gold)]' : 'bg-[var(--border)]'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}