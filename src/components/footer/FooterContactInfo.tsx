import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FooterSection } from './FooterSection';
import { FooterContactItem } from './FooterContactItem';

export function FooterContactInfo() {
  return (
    <FooterSection title="Contact Us">
      <div className="space-y-3">
        <FooterContactItem icon={Mail} href="mailto:contact@nordiclegacy.com">
          contact@nordiclegacy.com
        </FooterContactItem>
        <FooterContactItem icon={Phone} href="tel:+4798691760">
          +47 986 917 60
        </FooterContactItem>
        <FooterContactItem icon={MapPin}>
          Lørenveien 73a, Oslo, Norway
        </FooterContactItem>
      </div>
    </FooterSection>
  );
}