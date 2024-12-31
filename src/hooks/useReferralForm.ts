import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthContext } from '../components/auth/AuthProvider';

export function useReferralForm() {
  const { user } = useAuthContext();
  const [emails, setEmails] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEmails(e.target.value);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    try {
      const emailList = emails
        .split('\n')
        .map(email => email.trim())
        .filter(email => email);

      const { error } = await supabase
        .from('referrals')
        .insert(emailList.map(email => ({
          referrer_id: user.id,
          email,
          message: message || null
        })));

      if (error) throw error;

      // Clear form after successful submission
      setEmails('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting referrals:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    emails,
    message,
    isSubmitting,
    handleEmailChange,
    handleMessageChange,
    handleSubmit
  };
}