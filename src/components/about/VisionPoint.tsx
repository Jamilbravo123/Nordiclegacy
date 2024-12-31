import React from 'react';

interface VisionPointProps {
  title: string;
  description: string;
}

export function VisionPoint({ title, description }: VisionPointProps) {
  return (
    <div className="border-l-4 border-gray-900 pl-4">
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}