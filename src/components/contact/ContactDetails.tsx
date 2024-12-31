import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { ContactItem } from './ContactItem';

export function ContactDetails() {
  return (
    <div className="space-y-6">
      <ContactItem 
        icon={Mail} 
        href="mailto:contact@nordiclegacy.com"
        text="contact@nordiclegacy.com"
      />
      <ContactItem 
        icon={Phone} 
        href="tel:+4798691760"
        text="+47 986 917 60"
      />
      <ContactItem 
        icon={MapPin} 
        text="Lørenveien 73a, Oslo, Norway"
      />
    </div>
  );
}