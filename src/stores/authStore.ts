import { create } from 'zustand';

interface AuthStore {
  signupModalOpen: boolean;
  resetPasswordModalOpen: boolean;
  openSignupModal: () => void;
  closeSignupModal: () => void;
  openResetPasswordModal: () => void;
  closeResetPasswordModal: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  signupModalOpen: false,
  resetPasswordModalOpen: false,
  openSignupModal: () => set({ signupModalOpen: true }),
  closeSignupModal: () => set({ signupModalOpen: false }),
  openResetPasswordModal: () => set({ resetPasswordModalOpen: true }),
  closeResetPasswordModal: () => set({ resetPasswordModalOpen: false }),
}));