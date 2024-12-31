import React from 'react';
import { AlertCircle } from 'lucide-react';
import type { ContactFormError } from '../../types/contact';

interface ContactFormErrorProps {
  error: ContactFormError;
}

export function ContactFormError({ error }: ContactFormErrorProps) {
  return (
    <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-start space-x-3">
      <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-red-500 font-medium">{error.message}</p>
        {error.details && (
          <p className="text-red-400 text-sm mt-1">{error.details}</p>
        )}
      </div>
    </div>
  );
}