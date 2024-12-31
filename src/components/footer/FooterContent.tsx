import React from 'react';
import { FooterSection } from './FooterSection';
import { FooterContactInfo } from './FooterContactInfo';
import { FooterLink } from './FooterLink';

export function FooterContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <FooterSection title="Nordic Legacy">
        <p className="text-gray-400">
          Building Lasting Value Through Strategic Partnerships and Acquisitions in the Nordic Construction Sector
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

      <FooterContactInfo />
    </div>
  );
}