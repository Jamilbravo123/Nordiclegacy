import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';

export function HeritageContent() {
  return (
    <div className="order-2 lg:order-1">
      <SectionHeading className="text-white mb-6">Nordic Heritage</SectionHeading>
      <p className="text-gray-300 text-lg mb-8">
        Like the enduring Nordic landscape that has shaped generations before us, 
        our foundation is built on strength, resilience, and unwavering commitment. 
        We carry forward centuries of craftsmanship and engineering excellence, 
        adapting ancient wisdom to modern challenges.
      </p>
      <div className="space-y-6 text-gray-300">
        <div className="border-l-4 border-white/20 pl-6">
          <h3 className="text-xl font-semibold mb-2">Enduring Strength</h3>
          <p>
            Just as our ancestors carved their legacy from the Nordic wilderness, 
            we build partnerships that withstand the test of time, rooted in 
            tradition yet embracing innovation.
          </p>
        </div>
        <div className="border-l-4 border-white/20 pl-6">
          <h3 className="text-xl font-semibold mb-2">Sustainable Legacy</h3>
          <p>
            Our commitment to sustainability echoes the ancient Nordic principle 
            of living in harmony with nature—creating lasting value for generations 
            to come.
          </p>
        </div>
      </div>
    </div>
  );
}