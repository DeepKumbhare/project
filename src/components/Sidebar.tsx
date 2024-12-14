import React from 'react';
import { useResumeStore } from '../store/useResumeStore';
import { Settings, Plus } from 'lucide-react';

export function Sidebar() {
  const { resumeData, toggleSection, addCustomSection } = useResumeStore();
  const sections = Object.values(resumeData.sections).sort((a, b) => a.order - b.order);
  
  const enabledSections = sections.filter((section) => section.enabled);
  const progress = `${enabledSections.length}/${sections.length}`;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-medium text-gray-700">Progress</h2>
          <span className="text-sm text-gray-500">{progress} sections</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full"
            style={{
              width: `${(enabledSections.length / sections.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <div
            key={section.id}
            className="flex items-center justify-between"
          >
            <span className="text-sm font-medium text-gray-700">
              {section.title}
            </span>
            <button
              onClick={() => toggleSection(section.id)}
              className={`px-2 py-1 rounded text-xs font-medium ${
                section.enabled
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {section.enabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        <button
          onClick={() => addCustomSection('Custom Section')}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Custom Section
        </button>
        <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          <Settings className="h-4 w-4 mr-2" />
          Customize Style
        </button>
      </div>
    </div>
  );
}