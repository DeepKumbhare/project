import React, { useState } from 'react';
import { Menu, X, ChevronRight, ChevronLeft, Eye } from 'lucide-react';
import { useResumeStore } from '../../store/useResumeStore';
import { Section } from '../../types/resume';
import { SectionProgress } from './SectionProgress';
import { cn } from '../../utils/cn';

type MobileNavProps = {
  onPreviewClick: () => void;
};

export function MobileNav({ onPreviewClick }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { resumeData, setActiveSection, activeSection } = useResumeStore();
  
  const sections = Object.values(resumeData.sections)
    .filter((section) => section.enabled)
    .sort((a, b) => a.order - b.order);

  const currentIndex = sections.findIndex(section => section.id === activeSection);
  const totalSections = sections.length;

  const handleNext = () => {
    if (currentIndex < totalSections - 1) {
      setActiveSection(sections[currentIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1].id);
    }
  };

  return (
    <>
      {/* Mobile Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center space-x-4">
            <button
              className="flex items-center px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
              onClick={onPreviewClick}
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </button>
          </div>
        </div>
        <div className="px-4 py-2">
          <SectionProgress sections={sections} />
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out md:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75" onClick={() => setIsOpen(false)} />
        <div className="relative bg-white w-4/5 max-w-sm h-full shadow-xl">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Sections</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Close navigation menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="px-4 py-6 space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  activeSection === section.id
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={cn(
              "flex items-center px-4 py-2 text-sm font-medium rounded-md",
              currentIndex === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-50"
            )}
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Previous
          </button>
          <span className="text-sm text-gray-500">
            {currentIndex + 1} / {totalSections}
          </span>
          <button
            onClick={handleNext}
            disabled={currentIndex === totalSections - 1}
            className={cn(
              "flex items-center px-4 py-2 text-sm font-medium rounded-md",
              currentIndex === totalSections - 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-50"
            )}
          >
            Next
            <ChevronRight className="h-5 w-5 ml-1" />
          </button>
        </div>
      </div>
    </>
  );
}