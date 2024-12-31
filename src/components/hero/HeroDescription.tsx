import React from 'react';
import { fadeIn } from '../../utils/animations';

export function HeroDescription() {
  return (
    <p className={`text-lg sm:text-xl md:text-2xl max-w-4xl text-gray-200 mb-8 sm:mb-12 px-4 leading-relaxed ${fadeIn} animate-delay-200`}>
      We develop and elevate exceptional companies in property development, 
      engineering, and manufacturing, shaping the Nordic landscape with innovation and excellence.
    </p>
  );
}