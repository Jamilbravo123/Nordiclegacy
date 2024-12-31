import { create } from 'zustand';
import type { Member } from '../types/members';

interface MemberDetailsState {
  isOpen: boolean;
  selectedMember: Member | null;
  openModal: (member: Member) => void;
  closeModal: () => void;
}

export const useMemberDetailsStore = create<MemberDetailsState>((set) => ({
  isOpen: false,
  selectedMember: null,
  openModal: (member) => set({ isOpen: true, selectedMember: member }),
  closeModal: () => set({ isOpen: false, selectedMember: null }),
}));