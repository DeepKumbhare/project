import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { CheckCircle2, AlertCircle, Circle, Eye } from 'lucide-react';
import { cn } from '../../utils/cn';

type ProgressTrackerProps = {
  onPreviewClick: () => void;
};

export function ProgressTracker({ onPreviewClick }: ProgressTrackerProps) {
  const { resumeData } = useResumeStore();
  
  const sections = Object.values(resumeData.sections)
    .filter(section => section.enabled)
    .sort((a, b) => a.order - b.order);

  const getSectionStatus = (section: any) => {
    if (typeof section.content === 'string') {
      return section.content.trim() ? 'complete' : 'empty';
    }
    if (Array.isArray(section.content)) {
      return section.content.length > 0 ? 'complete' : 'empty';
    }
    if (typeof section.content === 'object' && section.content !== null) {
      const values = Object.values(section.content);
      const hasContent = values.some(value => 
        typeof value === 'string' ? value.trim() : value
      );
      return hasContent ? 'complete' : 'empty';
    }
    return 'empty';
  };

  const completedSections = sections.filter(
    section => getSectionStatus(section) === 'complete'
  );
  const progress = (completedSections.length / sections.length) * 100;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Resume Progress</h2>
          <p className="text-sm text-gray-500 mt-1">
            Complete all sections for a comprehensive resume
          </p>
        </div>
        <button
          onClick={onPreviewClick}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
        >
          <Eye className="h-4 w-4 mr-2" />
          Preview Resume
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Overall Completion</span>
            <span className="text-gray-900 font-medium">
              {completedSections.length} of {sections.length} sections
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sections.map((section) => {
            const status = getSectionStatus(section);
            return (
              <div
                key={section.id}
                className={cn(
                  "flex items-center p-3 rounded-lg border",
                  status === 'complete'
                    ? "border-green-200 bg-green-50"
                    : status === 'empty'
                    ? "border-gray-200 bg-gray-50"
                    : "border-amber-200 bg-amber-50"
                )}
              >
                {status === 'complete' ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                ) : status === 'empty' ? (
                  <Circle className="h-5 w-5 text-gray-300 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                )}
                <span className="ml-2 text-sm font-medium text-gray-900 truncate">
                  {section.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}