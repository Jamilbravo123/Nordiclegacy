import { create } from 'zustand';

interface AuthStore {
  signupModalOpen: boolean;
  openSignupModal: () => void;
  closeSignupModal: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  signupModalOpen: false,
  openSignupModal: () => set({ signupModalOpen: true }),
  closeSignupModal: () => set({ signupModalOpen: false }),
}));