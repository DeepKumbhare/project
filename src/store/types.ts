import { ResumeData, Section, ResumeLayout, CustomSectionConfig } from '../types/resume';

export interface ResumeState {
  resumeData: ResumeData;
  activeSection: string;
}

export interface ResumeActions {
  setSection: (sectionId: string, content: any) => void;
  toggleSection: (sectionId: string) => void;
  deleteSection: (sectionId: string) => void;
  addCustomSection: (title: string, config?: CustomSectionConfig) => void;
  setLayout: (layout: ResumeLayout) => void;
  setTheme: (themeId: string) => void;
  setActiveSection: (sectionId: string) => void;
  reorderSections: (oldIndex: number, newIndex: number) => void;
}

export type ResumeStore = ResumeState & ResumeActions;