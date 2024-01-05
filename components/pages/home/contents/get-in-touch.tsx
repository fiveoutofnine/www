import React from 'react';

import { Hand, Mail } from 'lucide-react';

import ContentDisplay from '@/components/templates/new-templates/content-display';
import { Button } from '@/components/ui';

export default function GetInTouch() {
  return (
    <ContentDisplay
      className="col-span-2 w-full min-[960px]:w-64"
      symbol={<Hand />}
      name="Get in touch"
      description=""
      button={
        <Button size="sm" href="mailto:kentmiguel10@gmail.com" rightIcon={<Mail />}>
          Email
        </Button>
      }
    >
      <div className="p-4 text-sm text-gray-11">
        <p className="overflow-auto ">
          I am actively looking for job opportunities. My inbox is open and feel free to ask me
          anything!
        </p>
      </div>
    </ContentDisplay>
  );
}
