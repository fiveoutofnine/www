import React from 'react';
import type { ReactNode } from 'react';

import {
  CircleDollarSign,
  ExternalLink,
  Github,
  KanbanSquare,
  Landmark,
  Swords,
  Twitter,
  UserCircle2,
  Vote,
} from 'lucide-react';

import ContentDisplay from '@/components/templates/new-templates/content-display';
import { Button } from '@/components/ui';

type ProjectProps = {
  id: number;
  symbol: ReactNode;
  name: string;
  description: string;
  buttonRef: string;
  buttonIcon?: ReactNode;
  buttonTitle?: string;
  body: string;
};

const data: ProjectProps[] = [
  {
    id: 7,
    symbol: <Landmark />,
    name: 'Good Congress',
    description: '',
    buttonRef: 'https://github.com/kmiguel10/good-congress',
    body: 'Watch the current status of elected representatives, voting history, and fundraising activities',
  },
  {
    id: 6,
    symbol: <UserCircle2 />,
    name: 'Personal Website',
    description: '',
    buttonRef: 'https://github.com/kmiguel10/www',
    body: 'My personal website that showcases my profile',
  },
  {
    id: 5,
    symbol: <Twitter />,
    name: 'Blue Bird',
    description: '',
    buttonRef: 'https://github.com/kmiguel10/blue-bird',
    body: 'A twitter clone built with Next.js with Tailwind CSS, and supabase',
  },
  {
    id: 4,
    symbol: <KanbanSquare />,
    name: 'Issue Tracker',
    description: '',
    buttonRef: 'https://github.com/kmiguel10/issue-tracker',
    body: 'A a full-stack App with Next.js, Tailwind, Radix UI, and Prisma',
  },
  {
    id: 3,
    symbol: <Vote />,
    name: 'DApp Voting',
    description: '',
    buttonRef: 'https://github.com/kmiguel10/decentralized-ranked-choice-voting',
    body: 'A Decentralized Ranked-Choice Voting System built with Solidity and Hardhat',
  },
  {
    id: 2,
    symbol: <CircleDollarSign />,
    name: 'DApp Bounty',
    description: '',
    buttonRef: 'https://github.com/kmiguel10/bounty-dapp',
    body: 'Post bounties with definition along with a prize amount and claim bounties',
  },

  {
    id: 1,
    symbol: <Swords />,
    name: 'Buidl Guidl',
    description: '',
    buttonRef: 'https://app.buidlguidl.com/builders/0x4c2B577D992d16973b57b1757e996dC0d0a07F74',
    buttonIcon: <ExternalLink />,
    buttonTitle: 'View',
    body: 'Decentralized Applications built with Scaffold-Eth',
  },
];

export default function Project() {
  return (
    <>
      {data.map((d) => (
        <ContentDisplay
          key={d.id}
          className="col-span-2 w-full min-[960px]:w-64"
          symbol={d.symbol}
          name={d.name}
          description={d.description}
          button={
            <Button
              size="sm"
              href={d.buttonRef}
              rightIcon={d.buttonIcon ? d.buttonIcon : <Github />}
              newTab
            >
              {d.buttonTitle ? d.buttonTitle : 'Repo'}
            </Button>
          }
        >
          <div className="p-4 text-sm text-gray-11">
            <p className="overflow-auto ">{d.body}</p>
          </div>
        </ContentDisplay>
      ))}
    </>
  );
}
