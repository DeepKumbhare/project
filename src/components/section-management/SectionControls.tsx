import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { cn } from '../../utils/cn';
import toast from 'react-hot-toast';

export function SectionControls() {
  const { resumeData, activeSection, setActiveSection } = useResumeStore();
  
  const sections = Object.values(resumeData.sections)
    .filter(section => section.enabled)
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

  const handleSave = () => {
    // Here you would implement actual save logic
    // For now, we'll just show a success notification
    toast.success('Progress saved successfully!', {
      duration: 3000,
      position: 'bottom-right',
      style: {
        background: '#10B981',
        color: '#FFFFFF',
        padding: '12px 24px',
        borderRadius: '6px',
      },
    });
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 pt-4 mt-8">
      <button
        onClick={handlePrevious}
        disabled={currentIndex === 0}
        className={cn(
          "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
          currentIndex === 0
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-50"
        )}
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        Previous Section
      </button>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-500">
          Section {currentIndex + 1} of {totalSections}
        </span>
        <button
          onClick={handleSave}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Progress
        </button>
      </div>
      <button
        onClick={handleNext}
        disabled={currentIndex === totalSections - 1}
        className={cn(
          "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
          currentIndex === totalSections - 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-50"
        )}
      >
        Next Section
        <ChevronRight className="h-5 w-5 ml-1" />
      </button>
    </div>
  );
}