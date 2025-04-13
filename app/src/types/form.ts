export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'number';
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  errorMessage?: string;
}

export interface FormErrors {
  [key: string]: string;
}