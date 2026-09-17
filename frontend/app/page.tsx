'use client';

import { useState } from 'react';
import { createRequirement, RequirementPayload } from '../lib/api';
import { FormState, initialFormData, Status } from '../lib/types';
import { validateBasics, validateDetails } from '../lib/Validation';
import StepBasics from '../components/Stepbasics';
import StepPlanner from '../components/Stepplanner';
import StepPerformer from '../components/Stepperformer';
import StepCrew from '../components/Stepcrew';
import StepReview from '../components/Stepreview';
import StepRail from '../components/Steprail';

export default function PostRequirementPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormState>(initialFormData);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [validationMessage, setValidationMessage] = useState('');

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // clear the error state for a field as soon as the user edits it
    setMissingFields((prev) => prev.filter((f) => f !== field));
  };

  const updateDetail = (field: string, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      details: { ...prev.details, [field]: value },
    }));
    setMissingFields((prev) => prev.filter((f) => f !== field));
  };

  const goNext = () => {
    const result = step === 1 ? validateBasics(formData) : validateDetails(formData);

    if (!result.isValid) {
      setMissingFields(result.missingFields);
      setValidationMessage(result.message);
      return;
    }

    setMissingFields([]);
    setValidationMessage('');
    setStep((s) => Math.min(s + 1, 3));
  };

  const goBack = () => {
    setMissingFields([]);
    setValidationMessage('');
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = async () => {
    if (!formData.category) return;
    setStatus('loading');
    setErrorMessage('');
    try {
      const payload: RequirementPayload = {
        eventName: formData.eventName,
        eventType: formData.eventType,
        dateRange: {
          startDate: formData.startDate,
          endDate: formData.endDate || undefined,
        },
        location: formData.location,
        venue: formData.venue || undefined,
        category: formData.category,
        details: formData.details,
      };
      await createRequirement(payload);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  const renderCategoryStep = () => {
    if (formData.category === 'planner') return <StepPlanner formData={formData} updateDetail={updateDetail} missingFields={missingFields} />;
    if (formData.category === 'performer') return <StepPerformer formData={formData} updateDetail={updateDetail} missingFields={missingFields} />;
    if (formData.category === 'crew') return <StepCrew formData={formData} updateDetail={updateDetail} missingFields={missingFields} />;
    return null;
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-3xl">
        <div className="mb-10">
          <p className="text-sm text-[var(--gold)] mb-1">GoPratle</p>
          <h1 className="font-display text-3xl">Post a requirement</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-56 shrink-0">
            <StepRail currentStep={step} category={formData.category} />
          </div>

          <div className="flex-1 bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 md:p-8">
            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-[var(--success)] text-[#15121c] flex items-center justify-center mx-auto mb-4 font-display text-xl">
                  ✓
                </div>
                <p className="font-display text-xl mb-1">Requirement posted</p>
                <p className="text-sm text-[var(--muted)]">It's saved and categorized under {formData.category}.</p>
              </div>
            ) : (
              <>
                {step === 1 && <StepBasics formData={formData} updateField={updateField} missingFields={missingFields} />}
                {step === 2 && renderCategoryStep()}
                {step === 3 && <StepReview formData={formData} />}

                {validationMessage && (
                  <div className="mt-4 px-3 py-2 rounded-md bg-[var(--error)]/10 border border-[var(--error)]/30">
                    <p className="text-sm text-[var(--error)]">{validationMessage}</p>
                  </div>
                )}

                {status === 'error' && (
                  <div className="mt-4 px-3 py-2 rounded-md bg-[var(--error)]/10 border border-[var(--error)]/30">
                    <p className="text-sm text-[var(--error)]">{errorMessage}</p>
                  </div>
                )}

                <div className="flex justify-between mt-8 pt-6 border-t border-[var(--border)]">
                  {step > 1 ? (
                    <button
                      onClick={goBack}
                      className="px-4 py-2 rounded-md text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors"
                    >
                      Back
                    </button>
                  ) : (
                    <span />
                  )}

                  {step < 3 && (
                    <button
                      onClick={goNext}
                      className="px-5 py-2.5 rounded-md text-sm font-medium bg-[var(--gold)] text-[#15121c] hover:brightness-110 active:scale-[0.98] transition-all"
                    >
                      Continue
                    </button>
                  )}

                  {step === 3 && (
                    <button
                      onClick={handleSubmit}
                      disabled={status === 'loading'}
                      className="px-5 py-2.5 rounded-md text-sm font-medium bg-[var(--gold)] text-[#15121c] hover:brightness-110 active:scale-[0.98] disabled:opacity-60 transition-all flex items-center gap-2"
                    >
                      {status === 'loading' && (
                        <span className="w-3.5 h-3.5 border-2 border-[#15121c]/30 border-t-[#15121c] rounded-full animate-spin" />
                      )}
                      {status === 'loading' ? 'Posting...' : 'Post requirement'}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}