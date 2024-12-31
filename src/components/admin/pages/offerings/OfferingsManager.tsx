import React from 'react';
import { OfferingsHeader } from './OfferingsHeader';
import { OfferingsList } from './OfferingsList';
import { useOfferings } from '../../../../hooks/useOfferings';

export function OfferingsManager() {
  const { offerings, loading } = useOfferings();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <OfferingsHeader />
      <OfferingsList offerings={offerings} />
    </div>
  );
}