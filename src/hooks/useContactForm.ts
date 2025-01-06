import { useState } from 'react';
import { supabase } from '../lib/supabase';
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
      // First save to database
      const { error: supabaseError, data } = await supabase
        .from('contact_form')
        .insert([{
          name: formData.name,
          email: formData.email,
          message: formData.message
        }])
        .select()
        .single();

      if (supabaseError) {
        console.error('Database error:', supabaseError);
        throw supabaseError;
      }

      // Then call the Edge Function
      const { data: functionData, error: functionError } = await supabase.functions.invoke(
        'contact-notification',
        {
          body: { record: data }
        }
      );

      if (functionError) {
        console.error('Notification error:', functionError);
      }
      
      // Clear form and show thank you message
      setFormData({ name: '', email: '', message: '' });
      setShowThankYou(true);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError({
        message: 'Failed to send message',
        details: 'Please try again later or email us directly at jamil@aprikosventure.com'
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