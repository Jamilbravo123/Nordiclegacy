import React from 'react';
import { Container } from '../ui/Container';
import { HeritageContent } from './HeritageContent';
import { TeamSection } from './TeamSection';
import { AnimatedText } from './AnimatedText';
import { Image } from '../ui/Image';

export default function Heritage() {
  return (
    <div id="heritage" className="bg-gray-900 py-16 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <HeritageContent />
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/5] bg-gray-800">
              <div className="absolute inset-0">
                <Image 
                  src="https://i.ibb.co/48phtW6/u3727122339-Image-of-a-Norwegian-wild-bearded-man-standing-in-t-b36564c8-1c6a-4244-bc3c-26f99f716594.png"
                  alt="Nordic craftsman in winter landscape"
                  className="w-full h-full object-cover rounded-sm shadow-xl"
                />
              </div>
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