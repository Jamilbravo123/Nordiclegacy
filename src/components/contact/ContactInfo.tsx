import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { ContactDescription } from './ContactDescription';
import { ContactDetails } from './ContactDetails';
import { animations } from '../../utils/animations';

export function ContactInfo() {
  return (
    <div className={animations.slideInLeft}>
      <SectionHeading className="text-white mb-8">Let's Build Together</SectionHeading>
      <ContactDescription />
      <ContactDetails />
    </div>
  );
}