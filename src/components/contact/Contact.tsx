import React from 'react';
import { Container } from '../ui/Container';
import { ContactInfo } from './ContactInfo';
import { ContactForm } from './ContactForm';

export default function Contact() {
  return (
    <div id="contact" className="bg-gray-900 text-white py-16 sm:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <ContactInfo />
          <ContactForm />
        </div>
      </Container>
    </div>
  );
}