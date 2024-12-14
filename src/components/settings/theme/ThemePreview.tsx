import React from 'react';
import { ResumeTheme } from '../../../types/resume';
import { cn } from '../../../utils/cn';

type ThemePreviewProps = {
  theme: ResumeTheme;
  isSelected: boolean;
  onClick: () => void;
};

export function ThemePreview({ theme, isSelected, onClick }: ThemePreviewProps) {
  const colors = [
    { color: theme.colors.primary, label: 'Primary' },
    { color: theme.colors.secondary, label: 'Secondary' },
    { color: theme.colors.text, label: 'Text' },
    { color: theme.colors.background, label: 'Background' },
    { color: theme.colors.accent, label: 'Accent' },
  ];

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center p-4 rounded-lg border transition-all",
        isSelected 
          ? "border-indigo-600 ring-2 ring-indigo-600 bg-indigo-50"
          : "border-gray-200 hover:border-indigo-600"
      )}
    >
      {/* Theme Info */}
      <div className="flex items-center gap-3 flex-1">
        <div 
          className="w-10 h-10 rounded-full border border-gray-200"
          style={{ backgroundColor: theme.colors.primary }}
        />
        <div className="text-left">
          <h4 className="text-sm font-medium text-gray-900">{theme.name}</h4>
          <div className="flex items-center gap-2 mt-1">
            {colors.map(({ color }, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded border border-gray-200"
                style={{ backgroundColor: color }}
                title={`Sample color ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Selection Indicator */}
      <div className={cn(
        "w-5 h-5 rounded-full border-2 flex items-center justify-center",
        isSelected 
          ? "border-indigo-600 bg-indigo-600" 
          : "border-gray-300"
      )}>
        {isSelected && (
          <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
            <path
              d="M3.5 6L5.5 8L8.5 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </button>
  );
}