import React from 'react';

interface PhoneNumberProps {
  number: string;
  formattedNumber: string;
}

export function PhoneNumber({ number, formattedNumber }: PhoneNumberProps) {
  return (
    <a href={`tel:${number}`} className="hover:text-gray-300 transition-colors">
      {formattedNumber}
    </a>
  );
}