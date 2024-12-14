import React from 'react';
import { useResumeStore } from '../../../store/useResumeStore';
import { Layout } from 'lucide-react';
import { layouts } from './layouts';
import { LayoutList } from './LayoutList';

export function LayoutSelector() {
  const { resumeData, setLayout } = useResumeStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Layout className="w-5 h-5 text-gray-500 flex-shrink-0" />
        <div>
          <h3 className="text-lg font-medium text-gray-900">Resume Layout</h3>
          <p className="text-sm text-gray-500 mt-1">
            Choose how your resume content is arranged
          </p>
        </div>
      </div>
      
      <LayoutList
        layouts={layouts}
        selectedLayout={resumeData.layout}
        onLayoutSelect={setLayout}
      />
    </div>
  );
}