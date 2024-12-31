import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function useEmailVerification() {
  const [showVerification, setShowVerification] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');

  const sendVerificationEmail = async (email: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      setVerificationEmail(email);
      setShowVerification(true);
    } catch (error) {
      throw error;
    }
  };

  const hideVerification = () => {
    setShowVerification(false);
  };

  return {
    showVerification,
    verificationEmail,
    sendVerificationEmail,
    hideVerification,
  };
}