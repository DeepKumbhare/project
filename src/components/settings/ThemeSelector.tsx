import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Palette } from 'lucide-react';
import { themes } from '../../utils/themes';
import { cn } from '../../utils/cn';

export function ThemeSelector() {
  const { resumeData, setTheme } = useResumeStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Palette className="w-5 h-5 text-gray-500 flex-shrink-0" />
        <h3 className="text-lg font-medium text-gray-900">Color Theme</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => setTheme(theme.id)}
            className={cn(
              "flex flex-col items-start p-4 border rounded-lg transition-all",
              resumeData.theme === theme.id
                ? "border-indigo-600 ring-2 ring-indigo-600 bg-indigo-50"
                : "border-gray-200 hover:border-indigo-600"
            )}
          >
            <div className="flex items-center space-x-2 mb-3">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: theme.colors.primary }}
              />
              <span className="text-sm font-medium text-gray-900">
                {theme.name}
              </span>
            </div>
            <div className="flex space-x-2">
              {Object.values(theme.colors).map((color, index) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded border border-gray-200"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}