import { ResumeTheme } from '../types/resume';

export const themes: ResumeTheme[] = [
  {
    id: 'classic-blue',
    name: 'Classic Blue',
    colors: {
      primary: '#2B4C7E',
      secondary: '#6B7280',
      background: '#FFFFFF',
      text: '#1F2937',
      accent: '#E5E7EB',
    },
  },
  {
    id: 'modern-teal',
    name: 'Modern Teal',
    colors: {
      primary: '#0F766E',
      secondary: '#6B7280',
      background: '#F8FAFC',
      text: '#1F2937',
      accent: '#E2E8F0',
    },
  },
  {
    id: 'elegant-purple',
    name: 'Elegant Purple',
    colors: {
      primary: '#6D28D9',
      secondary: '#6B7280',
      background: '#FFFFFF',
      text: '#1F2937',
      accent: '#EDE9FE',
    },
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    colors: {
      primary: '#166534',
      secondary: '#6B7280',
      background: '#F9FAFB',
      text: '#1F2937',
      accent: '#ECFDF5',
    },
  },
  {
    id: 'warm-red',
    name: 'Warm Red',
    colors: {
      primary: '#B91C1C',
      secondary: '#6B7280',
      background: '#FFFFFF',
      text: '#1F2937',
      accent: '#FEE2E2',
    },
  },
];

export function getThemeById(themeId: string): ResumeTheme {
  return themes.find((theme) => theme.id === themeId) || themes[0];
}