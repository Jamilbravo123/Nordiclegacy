import React from 'react';
import { OfferingCard } from './OfferingCard';
import type { Offering } from '../../../../types/offerings';

interface OfferingsListProps {
  offerings: Offering[];
}

export function OfferingsList({ offerings }: OfferingsListProps) {
  if (offerings.length === 0) {
    return (
      <div className="text-center py-12 bg-white/5 rounded-lg">
        <p className="text-gray-400">No offerings available. Create your first offering.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {offerings.map((offering) => (
        <OfferingCard key={offering.id} offering={offering} />
      ))}
    </div>
  );
}