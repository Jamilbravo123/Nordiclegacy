export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormError {
  message: string;
  details?: string;
}