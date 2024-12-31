import React from 'react';
import { Button } from '../../ui/Button';
import { useReferralForm } from '../../../hooks/useReferralForm';

export function ReferralForm() {
  const { 
    emails, 
    message,
    isSubmitting,
    handleEmailChange,
    handleMessageChange,
    handleSubmit
  } = useReferralForm();

  return (
    <form onSubmit={handleSubmit} className="bg-white/5 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Invite Friends</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Friend's Email Addresses
          </label>
          <textarea
            value={emails}
            onChange={handleEmailChange}
            placeholder="Enter email addresses (one per line)"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-white text-white"
            rows={4}
          />
          <p className="mt-2 text-sm text-gray-400">
            Separate multiple email addresses with a new line
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Personal Message (Optional)
          </label>
          <textarea
            value={message}
            onChange={handleMessageChange}
            placeholder="Add a personal message to your invitation"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-white text-white"
            rows={4}
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Sending Invites...' : 'Send Invitations'}
        </Button>
      </div>
    </form>
  );
}