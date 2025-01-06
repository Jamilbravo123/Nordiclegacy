import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { updatePassword } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const setupRecovery = async () => {
      try {
        // Get the current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          console.log('Found session, showing password reset form');
          setShowForm(true);
        } else {
          console.log('No session found, redirecting to login');
          navigate('/privilege', {
            state: { error: 'Please use the reset link from your email to reset your password.' }
          });
        }
      } catch (error) {
        console.error('Recovery setup error:', error);
        navigate('/privilege', {
          state: { error: 'An error occurred during password reset. Please try again.' }
        });
      }
    };

    setupRecovery();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      await updatePassword(newPassword);
      // Redirect to login page after successful password reset
      navigate('/privilege', { 
        state: { message: 'Password has been reset successfully. Please sign in with your new password.' }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while resetting your password');
    } finally {
      setIsLoading(false);
    }
  };

  if (!showForm) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-16 sm:py-24">
      <Container className="max-w-md">
        <div className="bg-white/5 backdrop-blur-lg rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Set New Password</h1>
            <p className="text-gray-400">
              Please enter your new password below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-300 mb-1">
                New Password
              </label>
              <input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-gray-700 rounded-lg focus:outline-none focus:border-white text-white"
                required
              />
              <p className="mt-1 text-xs text-gray-400">
                Must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number
              </p>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-1">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-gray-700 rounded-lg focus:outline-none focus:border-white text-white"
                required
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm">{error}</div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Updating Password...' : 'Update Password'}
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
} 