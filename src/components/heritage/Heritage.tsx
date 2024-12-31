import React from 'react';
import { Container } from '../ui/Container';
import { HeritageContent } from './HeritageContent';
import { TeamSection } from './TeamSection';
import { AnimatedText } from './AnimatedText';

export default function Heritage() {
  return (
    <div id="heritage" className="bg-gray-900 py-16 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <HeritageContent />
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/5]">
              <img 
                src="/nordic-winter.jpg.png" 
                alt="Nordic craftsman in winter landscape" 
                className="object-cover w-full h-full rounded-sm shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-gray-900/20 to-transparent"></div>
              <AnimatedText />
            </div>
          </div>
        </div>
        <TeamSection />
      </Container>
    </div>
  );
}