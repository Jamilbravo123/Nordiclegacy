import { useState } from 'react';
import type { ContactFormData, ContactFormError } from '../types/contact';

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<ContactFormError | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real environment, you would send this to your backend
      console.log('Form submitted:', formData);
      
      // Clear form and show thank you message
      setFormData({ name: '', email: '', message: '' });
      setShowThankYou(true);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError({
        message: 'Failed to send message',
        details: 'Please try again later or contact us directly at contact@nordiclegacy.com'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  return {
    formData,
    showThankYou,
    isSubmitting,
    error,
    setShowThankYou,
    handleSubmit,
    handleChange
  };
}