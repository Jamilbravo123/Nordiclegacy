import { create } from 'zustand';
import type { Offering } from '../types/offerings';

interface OfferingsState {
  createModalOpen: boolean;
  editModalOpen: boolean;
  deleteModalOpen: boolean;
  selectedOffering: Offering | null;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  openEditModal: (offering: Offering) => void;
  closeEditModal: () => void;
  openDeleteModal: (offering: Offering) => void;
  closeDeleteModal: () => void;
}

export const useOfferingsStore = create<OfferingsState>((set) => ({
  createModalOpen: false,
  editModalOpen: false,
  deleteModalOpen: false,
  selectedOffering: null,
  openCreateModal: () => set({ createModalOpen: true }),
  closeCreateModal: () => set({ createModalOpen: false }),
  openEditModal: (offering) => set({ editModalOpen: true, selectedOffering: offering }),
  closeEditModal: () => set({ editModalOpen: false, selectedOffering: null }),
  openDeleteModal: (offering) => set({ deleteModalOpen: true, selectedOffering: offering }),
  closeDeleteModal: () => set({ deleteModalOpen: false, selectedOffering: null }),
}));