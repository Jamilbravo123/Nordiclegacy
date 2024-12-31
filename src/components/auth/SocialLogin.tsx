import React from 'react';
import { useAuthStore } from '../../stores/authStore';

export function SocialLogin() {
  const { openSignupModal } = useAuthStore();

  return (
    <div className="mt-8">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-900 text-gray-400">Not a member yet?</span>
        </div>
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={openSignupModal}
          className="text-gray-300 hover:text-white transition-colors"
        >
          Join NL Privilege
        </button>
      </div>
    </div>
  );
}