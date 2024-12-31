import React from 'react';
import { CheckCircle } from 'lucide-react';

interface VerificationNotificationProps {
  email: string;
  onClose: () => void;
}

export function VerificationNotification({ email, onClose }: VerificationNotificationProps) {
  return (
    <div className="fixed top-4 right-4 max-w-md bg-white rounded-lg shadow-lg p-6 animate-fade-in">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <CheckCircle className="h-6 w-6 text-green-500" />
        </div>
        <div className="ml-3">
          <h3 className="text-gray-900 font-medium">Verify your email</h3>
          <p className="mt-1 text-sm text-gray-500">
            We've sent a verification email to {email}. Please check your inbox and follow the instructions to verify your account.
          </p>
          <div className="mt-4">
            <button
              onClick={onClose}
              className="text-sm font-medium text-gray-600 hover:text-gray-500"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}