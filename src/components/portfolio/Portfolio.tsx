import React from 'react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { PortfolioGrid } from './PortfolioGrid';
import { portfolioCompanies } from '../../data/portfolio';

export default function Portfolio() {
  return (
    <div id="portfolio" className="bg-gray-50/50 py-16 sm:py-24">
      <Container>
        <SectionHeading className="text-center mb-12">Our Portfolio</SectionHeading>
        <PortfolioGrid companies={portfolioCompanies} />
      </Container>
    </div>
  );
}