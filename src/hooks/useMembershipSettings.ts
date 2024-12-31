import { create } from 'zustand';

interface MembershipSettingsStore {
  isOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
}

export const useMembershipSettings = create<MembershipSettingsStore>((set) => ({
  isOpen: false,
  openSettings: () => set({ isOpen: true }),
  closeSettings: () => set({ isOpen: false }),
}));