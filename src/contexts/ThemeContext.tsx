import React, { createContext, useContext } from 'react';
import { useResumeStore } from '../store/useResumeStore';
import { getThemeById } from '../utils/themes';
import type { ResumeTheme } from '../types/resume';

type ThemeContextType = {
  theme: ResumeTheme;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { resumeData } = useResumeStore();
  const theme = getThemeById(resumeData.theme);

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}