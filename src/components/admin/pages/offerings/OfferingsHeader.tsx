import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../../../ui/Button';
import { useOfferingsStore } from '../../../../stores/offeringsStore';

export function OfferingsHeader() {
  const openCreateModal = useOfferingsStore(state => state.openCreateModal);

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white">Offerings Management</h1>
        <p className="text-gray-400 mt-1">
          Create and manage membership offerings and benefits
        </p>
      </div>
      <Button onClick={openCreateModal} className="flex items-center gap-2">
        <Plus className="h-5 w-5" />
        New Offering
      </Button>
    </div>
  );
}