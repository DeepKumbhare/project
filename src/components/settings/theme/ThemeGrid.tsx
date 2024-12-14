import React from 'react';
import { ResumeTheme } from '../../../types/resume';
import { ThemePreview } from './ThemePreview';

type ThemeGridProps = {
  themes: ResumeTheme[];
  selectedThemeId: string;
  onThemeSelect: (themeId: string) => void;
};

export function ThemeGrid({ themes, selectedThemeId, onThemeSelect }: ThemeGridProps) {
  return (
    <div className="space-y-3">
      {themes.map((theme) => (
        <ThemePreview
          key={theme.id}
          theme={theme}
          isSelected={selectedThemeId === theme.id}
          onClick={() => onThemeSelect(theme.id)}
        />
      ))}
    </div>
  );
}