import React from 'react';
import { FooterSection } from './FooterSection';
import { FooterLink } from './FooterLink';

export function FooterContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <FooterSection title="Nordic Legacy">
        <p className="text-gray-400">
          Building a legacy of innovation and excellence through strategic collaboration
        </p>
      </FooterSection>
      
      <FooterSection title="Quick Links">
        <div className="space-y-2">
          <FooterLink href="#team-section">About Us</FooterLink>
          <FooterLink href="#heritage">Heritage</FooterLink>
          <FooterLink href="#portfolio">Portfolio</FooterLink>
          <FooterLink href="#contact">Contact</FooterLink>
        </div>
      </FooterSection>
    </div>
  );
}