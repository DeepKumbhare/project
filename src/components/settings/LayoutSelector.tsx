import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { ResumeLayout } from '../../types/resume';
import { Layout } from 'lucide-react';
import { cn } from '../../utils/cn';

const layouts: { id: ResumeLayout; title: string; description: string }[] = [
  {
    id: 'professional',
    title: 'Professional',
    description: 'A modern two-column layout with skills and certifications in the sidebar',
  },
  {
    id: 'classic',
    title: 'Classic',
    description: 'Traditional single-column layout with clear section separation',
  },
  {
    id: 'modern',
    title: 'Modern',
    description: 'Contemporary design with a colored header and two-column body',
  },
];

export function LayoutSelector() {
  const { resumeData, setLayout } = useResumeStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Layout className="w-5 h-5 text-gray-500 flex-shrink-0" />
        <h3 className="text-lg font-medium text-gray-900">Resume Layout</h3>
      </div>
      
      <div className="space-y-3">
        {layouts.map((layout) => (
          <button
            key={layout.id}
            onClick={() => setLayout(layout.id)}
            className={cn(
              "w-full flex items-start p-4 border rounded-lg transition-all",
              resumeData.layout === layout.id
                ? "border-indigo-600 ring-2 ring-indigo-600 bg-indigo-50"
                : "border-gray-200 hover:border-indigo-600"
            )}
          >
            <div className="flex-1 text-left">
              <h4 className="text-sm font-semibold text-gray-900">
                {layout.title}
              </h4>
              <p className="mt-1 text-xs text-gray-500">
                {layout.description}
              </p>
            </div>
            <div className={cn(
              "ml-4 w-4 h-4 rounded-full border-2 flex-shrink-0 mt-1",
              resumeData.layout === layout.id
                ? "border-indigo-600 bg-indigo-600"
                : "border-gray-300"
            )}>
              {resumeData.layout === layout.id && (
                <span className="block w-2 h-2 bg-white rounded-full m-auto" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}