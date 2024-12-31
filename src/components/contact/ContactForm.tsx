import React from 'react';
import { Button } from '../ui/Button';
import { ThankYouMessage } from './ThankYouMessage';
import { ContactFormInput } from './ContactFormInput';
import { ContactFormError } from './ContactFormError';
import { useContactForm } from '../../hooks/useContactForm';
import { animations } from '../../utils/animations';

export function ContactForm() {
  const {
    formData,
    showThankYou,
    isSubmitting,
    error,
    setShowThankYou,
    handleSubmit,
    handleChange
  } = useContactForm();

  return (
    <>
      <form onSubmit={handleSubmit} className={`space-y-4 sm:space-y-6 ${animations.slideInRight}`}>
        <ContactFormInput
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        
        <ContactFormInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        
        <ContactFormInput
          label="Message"
          name="message"
          type="textarea"
          value={formData.message}
          onChange={handleChange}
          disabled={isSubmitting}
        />

        {error && <ContactFormError error={error} />}

        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>

      <ThankYouMessage 
        isVisible={showThankYou} 
        onClose={() => setShowThankYou(false)} 
      />
    </>
  );
}