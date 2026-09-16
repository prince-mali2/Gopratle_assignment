'use client';

import { useState } from 'react';
import { createRequirement, RequirementPayload } from '../lib/api';
import { FormState, initialFormData, Status } from '../lib/types';
import StepBasics from '../components/Stepbasics';
import StepPlanner from '../components/Stepplanner';
import StepPerformer from '../components/Stepperformer';
import StepCrew from '../components/Stepcrew';
import StepReview from '../components/Stepreview';

export default function PostRequirementPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormState>(initialFormData);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateDetail = (field: string, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      details: { ...prev.details, [field]: value },
    }));
  };

  const goNext = () => setStep((s) => Math.min(s + 1, 3));
  const goBack = () => setStep((s) => Math.max(s - 1, 1));

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
    if (formData.category === 'planner') return <StepPlanner formData={formData} updateDetail={updateDetail} />;
    if (formData.category === 'performer') return <StepPerformer formData={formData} updateDetail={updateDetail} />;
    if (formData.category === 'crew') return <StepCrew formData={formData} updateDetail={updateDetail} />;
    return null;
  };

  return (
    <main className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Post a Requirement</h1>

      {status === 'success' ? (
        <div className="text-green-600">
          Requirement submitted successfully! Check your MongoDB collection to confirm.
        </div>
      ) : (
        <>
          {step === 1 && <StepBasics formData={formData} updateField={updateField} />}
          {step === 2 && renderCategoryStep()}
          {step === 3 && <StepReview formData={formData} />}

          {status === 'error' && <p className="text-red-600 mt-3">{errorMessage}</p>}

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button onClick={goBack} className="px-4 py-2 border rounded">
                Back
              </button>
            )}

            {step < 3 && (
              <button
                onClick={goNext}
                disabled={step === 1 && !formData.category}
                className="px-4 py-2 bg-black text-white rounded ml-auto disabled:opacity-40"
              >
                Next
              </button>
            )}

            {step === 3 && (
              <button
                onClick={handleSubmit}
                disabled={status === 'loading'}
                className="px-4 py-2 bg-black text-white rounded ml-auto"
              >
                {status === 'loading' ? 'Submitting...' : 'Submit'}
              </button>
            )}
          </div>
        </>
      )}
    </main>
  );
}