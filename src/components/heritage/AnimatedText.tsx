import React from 'react';

interface AnimatedWordProps {
  word: string;
  delay: string;
}

function AnimatedWord({ word, delay }: AnimatedWordProps) {
  return (
    <span className={`inline-block animate-pulse-fade ${delay}`}>
      {word}
    </span>
  );
}

export function AnimatedText() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-white text-5xl sm:text-7xl font-bold tracking-wider uppercase drop-shadow-lg">
        <AnimatedWord word="We" delay="delay-100" />
        <AnimatedWord word="Build" delay="delay-300 ml-4" />
      </div>
    </div>
  );
}