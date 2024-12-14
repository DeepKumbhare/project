import React from 'react';
import { ResumeData } from '../../types/resume';
import { Header } from '../preview/sections/Header';
import { Summary } from '../preview/sections/Summary';
import { Experience } from '../preview/sections/Experience';
import { Education } from '../preview/sections/Education';
import { Skills } from '../preview/sections/Skills';
import { Certifications } from '../preview/sections/Certifications';
import { useTheme } from '../../contexts/ThemeContext';

type ModernLayoutProps = {
  data: ResumeData;
};

export function ModernLayout({ data }: ModernLayoutProps) {
  const { theme } = useTheme();
  const sections = Object.values(data.sections)
    .filter(section => section.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <div 
      className="max-w-[816px] mx-auto p-8 shadow-sm space-y-6"
      style={{ background: theme.colors.background }}
    >
      <div 
        className="-mx-8 -mt-8 px-8 py-12 mb-8"
        style={{ background: theme.colors.primary }}
      >
        <div className="text-white">
          <Header isInverted />
        </div>
      </div>
      
      <div className="grid grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="col-span-4 space-y-6">
          {sections.map((section) => {
            switch (section.id) {
              case 'summary':
                return <Summary key={section.id} content={section.content} />;
              case 'skills':
                return <Skills key={section.id} skills={section.content} />;
              case 'certificates':
                return <Certifications key={section.id} certificates={section.content} />;
              default:
                return null;
            }
          })}
        </div>

        {/* Main Content */}
        <div className="col-span-8 space-y-6">
          {sections.map((section) => {
            switch (section.id) {
              case 'experience':
                return <Experience key={section.id} experiences={section.content} />;
              case 'education':
                return <Education key={section.id} education={section.content} />;
              default:
                if (section.isCustom) {
                  return (
                    <section key={section.id} className="space-y-2">
                      <h2 
                        className="text-xl font-bold border-b-2 pb-1"
                        style={{ 
                          color: theme.colors.primary,
                          borderColor: theme.colors.primary 
                        }}
                      >
                        {section.title}
                      </h2>
                      <div 
                        className="text-sm whitespace-pre-wrap"
                        style={{ color: theme.colors.text }}
                      >
                        {section.content}
                      </div>
                    </section>
                  );
                }
                return null;
            }
          })}
        </div>
      </div>
    </div>
  );
}