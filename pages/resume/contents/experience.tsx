import React from 'react';

import { KanbanSquare } from 'lucide-react';

import ContentDisplay from '@/components/templates/new-templates/content-display';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const Experience = () => {
  return (
    <ContentDisplay
      className="col-span-2 w-full min-[560px]:col-span-4"
      symbol={<KanbanSquare />}
      name="Experiences"
      description=""
    >
      <>
        <Accordion
          type="single"
          collapsible
          className="grid w-full grid-flow-row auto-rows-max flex-col overflow-hidden rounded-none border border-gray-6 bg-gray-2"
        >
          <AccordionItem value="item-1" className="text-md">
            <AccordionTrigger className="flex w-full">
              <div className="flex w-full items-center p-3 md:flex-row md:justify-between">
                <div className="text-left font-medium">
                  Full Stack Developer , Smart Contract Security Engineer
                </div>
                <span className="md:text-small mt-0.5 hidden pr-3 text-sm text-gray-11 md:mt-1 md:block">
                  July 2022 - Present
                </span>
              </div>
              <div className="space-x-2 md:hidden">
                <span className="md:text-small mt-0.5 text-sm text-gray-11 md:mt-1">
                  July 2022 - Present
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-3">
              <p className="text-md font-semibold">
                Smart Contract Auditor - Code4Arena , Shelock DeFi
              </p>
              <ul className="list-disc px-4">
                <li>
                  Audited DeFi protocols using Foundry and Hardhat to search and fix vulnerabilities
                  within the system
                </li>
                <li>
                  Refactored code by writing and executing test cases to improve gas optimizations
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="flex w-full">
              <div className="flex w-full items-center p-3 md:flex-row md:justify-between">
                <div className="flex items-baseline">
                  <div className="pr-4 text-left font-medium">Deloitte</div>
                  <span className="md:text-small mt-0.5 text-left text-sm text-gray-11 md:mt-1">
                    Solution Specialist - Full Stack Developer
                  </span>
                </div>

                <span className="md:text-small mt-0.5 hidden pr-3 text-sm text-gray-11 md:mt-1 md:block">
                  November 2020 - July 2022
                </span>
              </div>
              <div className="space-x-2 md:hidden">
                <span className="md:text-small mt-0.5 text-sm text-gray-11 md:mt-1">
                  November 2020 - July 2022
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-3 text-left">
              <ul className="list-disc px-4">
                <li>
                  Developed single page applications using Vue.js with Typescript from a .NET based
                  legacy web application which is utilized by 1000s of users filing for worker’s
                  compensation in the state of Pennyslvania
                </li>
                <li>
                  Built RESTful Web API’s using ASP.NET used to serve data between a Vue.js
                  front-end and SQL back-end which gives clients access to the application from any
                  browsers and mobile devices
                </li>
                <li>
                  Served as the main developer tasked in triaging, investigating and resolving bugs
                  from 5 sprint cycles across 50 applications while utilizing debugging tools like
                  Chrome Developer tools and Vue.js Dev Tools
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="flex w-full">
              <div className="flex w-full items-center p-3 md:flex-row md:justify-between">
                <div className="flex items-baseline">
                  <div className="pr-4 text-left font-medium">
                    Propulsion Technologies Internation
                  </div>
                  <span className="md:text-small mt-0.5 text-left text-sm text-gray-11 md:mt-1">
                    Digital Technology Analyst
                  </span>
                </div>
                <span className="md:text-small mt-0.5 hidden pr-3 text-sm text-gray-11 md:mt-1 md:block">
                  July 2018 - June 2020
                </span>
              </div>
              <div className="space-x-2 md:hidden">
                <span className="md:text-small mt-0.5 text-sm text-gray-11 md:mt-1">
                  July 2018 - June 2020
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-3 text-left">
              <ul className="list-disc px-4">
                <li>
                  Led the company’s digital transformation by innovating digital factory concepts
                  including machine connectivity, data visualization, data analysis, and removing
                  data silos which reduced the time for managers and engineers to access and analyze
                  data from 2 hours to 5 minutes using Power BI
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </>
    </ContentDisplay>
  );
};

export default Experience;
