import React from 'react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { VisionPoint } from './VisionPoint';

export default function About() {
  return (
    <div id="about" className="bg-white py-16 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <SectionHeading className="mb-6">Our Vision</SectionHeading>
            <p className="text-gray-600 text-base sm:text-lg mb-8">
              We are more than investors; we are builders of legacy. Our mission is to identify, 
              acquire, and nurture exceptional construction and engineering firms across the Nordic 
              region, preserving their unique expertise while providing the resources and support 
              needed for sustained growth.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <VisionPoint 
                title="Strategic Growth"
                description="Focused on long-term value creation through strategic acquisitions"
              />
              <VisionPoint 
                title="Nordic Heritage"
                description="Deep understanding of Nordic construction excellence"
              />
            </div>
          </div>
          <div className="relative h-[400px] sm:h-[600px]">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="Modern architecture"
              className="absolute inset-0 w-full h-full object-cover rounded-sm"
            />
            <div className="absolute inset-0 bg-gray-900/10"></div>
          </div>
        </div>
      </Container>
    </div>
  );
}