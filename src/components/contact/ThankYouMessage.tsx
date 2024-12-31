import React from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ThankYouMessageProps {
  isVisible: boolean;
  onClose: () => void;
}

export function ThankYouMessage({ isVisible, onClose }: ThankYouMessageProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white rounded-lg p-6 shadow-xl relative z-10 max-w-md w-full animate-fade-in-up">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Thank You!</h3>
            <p className="mt-2 text-gray-600">
              Your message has been sent successfully. We'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}