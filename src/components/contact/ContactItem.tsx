import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ContactItemProps {
  icon: LucideIcon;
  text: string;
  href?: string;
}

export function ContactItem({ icon: Icon, text, href }: ContactItemProps) {
  const content = (
    <>
      <Icon className="h-6 w-6 mr-4 flex-shrink-0" />
      <span>{text}</span>
    </>
  );

  if (href) {
    return (
      <a 
        href={href}
        className="flex items-center hover:text-gray-300 transition-colors"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="flex items-center">
      {content}
    </div>
  );
}