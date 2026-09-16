import { Category } from './api';

export interface FormState {
  eventName: string;
  eventType: string;
  startDate: string;
  endDate: string;
  location: string;
  venue: string;
  category: Category | '';
  details: Record<string, any>;
}

export const initialFormData: FormState = {
  eventName: '',
  eventType: '',
  startDate: '',
  endDate: '',
  location: '',
  venue: '',
  category: '',
  details: {},
};

export type Status = 'idle' | 'loading' | 'success' | 'error';