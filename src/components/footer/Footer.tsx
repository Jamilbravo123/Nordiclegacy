import React from 'react';
import { Container } from '../ui/Container';
import { FooterContent } from './FooterContent';
import { FooterCopyright } from './FooterCopyright';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-auto">
      <Container>
        <FooterContent />
        <FooterCopyright />
      </Container>
    </footer>
  );
}