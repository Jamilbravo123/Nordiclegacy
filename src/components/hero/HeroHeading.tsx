import React from 'react';
import { fadeInDown } from '../../utils/animations';

export function HeroHeading() {
  return (
    <h1 className={`text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 sm:mb-6 ${fadeInDown}`}>
      Building Nordic Legacy
    </h1>
  );
}