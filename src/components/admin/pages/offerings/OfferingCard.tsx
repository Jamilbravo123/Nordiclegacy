import React from 'react';
import { Edit2, Trash2, Calendar, Users } from 'lucide-react';
import { Button } from '../../../ui/Button';
import { useOfferingsStore } from '../../../../stores/offeringsStore';
import type { Offering } from '../../../../types/offerings';

interface OfferingCardProps {
  offering: Offering;
}

export function OfferingCard({ offering }: OfferingCardProps) {
  const { openEditModal, openDeleteModal } = useOfferingsStore();

  return (
    <div className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{offering.title}</h3>
          <p className="text-gray-400 text-sm mt-1">{offering.shortDescription}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => openEditModal(offering)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => openDeleteModal(offering)}
            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-gray-400 text-sm">
          <Calendar className="h-4 w-4 mr-2" />
          <span>
            {new Date(offering.startDate).toLocaleDateString()} - 
            {offering.endDate ? new Date(offering.endDate).toLocaleDateString() : 'Ongoing'}
          </span>
        </div>
        <div className="flex items-center text-gray-400 text-sm">
          <Users className="h-4 w-4 mr-2" />
          <span>Available for {offering.tiers.join(', ')} members</span>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-700">
        <Button
          variant="secondary"
          className="w-full bg-transparent hover:bg-white/10"
          onClick={() => openEditModal(offering)}
        >
          Manage Offering
        </Button>
      </div>
    </div>
  );
}