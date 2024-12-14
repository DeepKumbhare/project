import React from 'react';
import { Settings } from 'lucide-react';
import { LayoutSelector } from './layout/LayoutSelector';
import { ThemeSelector } from './theme/ThemeSelector';
import { SectionManager } from '../section-management/SectionManager';

export function SettingsPanel() {
  return (
    <div className="space-y-8">
      {/* Resume Appearance Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Settings className="w-5 h-5 text-gray-500 flex-shrink-0" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Resume Settings</h2>
            <p className="text-sm text-gray-500 mt-1">
              Customize the appearance of your resume
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <LayoutSelector />
          <ThemeSelector />
        </div>
      </div>

      {/* Section Management */}
      <SectionManager />
    </div>
  );
}