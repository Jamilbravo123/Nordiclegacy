import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../stores/authStore';

interface PasswordResetModalProps {
  onSubmit: (email: string) => Promise<void>;
  isLoading: boolean;
}

export function PasswordResetModal({ onSubmit, isLoading }: PasswordResetModalProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { resetPasswordModalOpen, closeResetPasswordModal } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    try {
      await onSubmit(email);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  if (!resetPasswordModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/95 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md relative">
        <button
          onClick={closeResetPasswordModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {success ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Check Your Email</h2>
            <p className="text-green-400 mb-6">
              We've sent password reset instructions to {email}. Please check your inbox and follow the link to reset your password.
            </p>
            <Button onClick={closeResetPasswordModal}>Close</Button>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
              <p className="text-gray-400">
                Enter your email address and we'll send you instructions to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="reset-email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  id="reset-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-gray-700 rounded-lg focus:outline-none focus:border-white text-white"
                  required
                />
              </div>

              {error && (
                <div className="text-red-400 text-sm">{error}</div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Reset Instructions'}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
} 