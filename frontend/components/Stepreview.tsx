import { FormState } from '../lib/types';

export default function StepReview({ formData }: { formData: FormState }) {
  return (
    <div>
      <h2 className="font-semibold mb-2">Review</h2>
      <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
        {JSON.stringify(formData, null, 2)}
      </pre>
    </div>
  );
}