const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export type Category = 'planner' | 'performer' | 'crew';

export interface RequirementPayload {
  eventName: string;
  eventType: string;
  dateRange: {
    startDate: string;
    endDate?: string;
  };
  location: string;
  venue?: string;
  category: Category;
  details: Record<string, unknown>;
}

export interface RequirementResponse {
  message: string;
  data: RequirementPayload & { _id: string; createdAt: string };
}

export async function createRequirement(
  payload: RequirementPayload
): Promise<RequirementResponse> {
  const response = await fetch(`${API_BASE_URL}/api/requirements`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}