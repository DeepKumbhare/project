import React from 'react';
import { useResumeStore } from '../store/useResumeStore';
import { getSectionEditor } from './sections';
import { SectionControls } from './section-management/SectionControls';

export function Editor() {
  const { resumeData, activeSection } = useResumeStore();
  const sections = Object.values(resumeData.sections)
    .filter((section) => section.enabled)
    .sort((a, b) => a.order - b.order);

  const currentSection = sections.find(section => section.id === activeSection);
  
  if (!currentSection) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No section selected</p>
      </div>
    );
  }

  const SectionEditor = getSectionEditor(currentSection.id);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">{currentSection.title}</h2>
        <p className="text-sm text-gray-500 mt-1">
          Fill in the details for this section of your resume
        </p>
      </div>

      <div className="space-y-6">
        {SectionEditor ? (
          <SectionEditor />
        ) : (
          <div className="text-sm text-gray-500">
            Editor for {currentSection.title} will be implemented soon
          </div>
        )}
      </div>

      <SectionControls />
    </div>
  );
}