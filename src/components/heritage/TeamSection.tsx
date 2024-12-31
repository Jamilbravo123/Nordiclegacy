import React from 'react';
import { teamMembers } from '../../data/team';
import { TeamGrid } from './TeamGrid';
import { SectionHeading } from '../ui/SectionHeading';
import { Container } from '../ui/Container';

export function TeamSection() {
  return (
    <div id="team-section" className="pt-16 border-t border-gray-800">
      <Container>
        <SectionHeading className="text-white text-center mb-12">
          Our Leadership Team
        </SectionHeading>
        <TeamGrid members={teamMembers} />
      </Container>
    </div>
  );
}