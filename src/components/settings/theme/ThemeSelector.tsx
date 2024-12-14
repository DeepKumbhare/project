import React from 'react';
import { useResumeStore } from '../../../store/useResumeStore';
import { Palette } from 'lucide-react';
import { themes } from '../../../utils/themes';
import { ThemeGrid } from './ThemeGrid';

export function ThemeSelector() {
  const { resumeData, setTheme } = useResumeStore();

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        <Palette className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-lg font-medium text-gray-900">Color Theme</h3>
          <p className="text-sm text-gray-500 mt-1">
            Choose a color scheme that matches your style
          </p>
        </div>
      </div>
      
      <ThemeGrid
        themes={themes}
        selectedThemeId={resumeData.theme}
        onThemeSelect={setTheme}
      />
    </div>
  );
}