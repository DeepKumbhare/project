import { create } from 'zustand';
import { ResumeStore } from './types';
import { initialResumeData } from './initialState';

export const useResumeStore = create<ResumeStore>((set) => ({
  resumeData: initialResumeData,
  activeSection: 'contact',

  setSection: (sectionId, content) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        sections: {
          ...state.resumeData.sections,
          [sectionId]: {
            ...state.resumeData.sections[sectionId],
            content,
          },
        },
      },
    })),

  toggleSection: (sectionId) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        sections: {
          ...state.resumeData.sections,
          [sectionId]: {
            ...state.resumeData.sections[sectionId],
            enabled: !state.resumeData.sections[sectionId].enabled,
          },
        },
      },
    })),

  deleteSection: (sectionId) =>
    set((state) => {
      if (!state.resumeData.sections[sectionId]?.isCustom) {
        return state;
      }

      const { [sectionId]: removed, ...remainingSections } = state.resumeData.sections;
      return {
        resumeData: {
          ...state.resumeData,
          sections: remainingSections,
          customSections: state.resumeData.customSections.filter(id => id !== sectionId),
        },
        activeSection: 'contact',
      };
    }),

  addCustomSection: (title, config) =>
    set((state) => {
      const sectionId = `custom-${crypto.randomUUID()}`;
      const maxOrder = Math.max(
        ...Object.values(state.resumeData.sections).map((s) => s.order)
      );

      const newSection = {
        id: sectionId,
        title,
        enabled: true,
        isCustom: true,
        order: maxOrder + 1,
        content: {},
        config,
      };

      return {
        resumeData: {
          ...state.resumeData,
          sections: {
            ...state.resumeData.sections,
            [sectionId]: newSection,
          },
          customSections: [...state.resumeData.customSections, sectionId],
        },
        activeSection: sectionId,
      };
    }),

  setLayout: (layout) =>
    set((state) => ({
      resumeData: { ...state.resumeData, layout },
    })),

  setTheme: (themeId) =>
    set((state) => ({
      resumeData: { ...state.resumeData, theme: themeId },
    })),

  setActiveSection: (sectionId) =>
    set({ activeSection: sectionId }),

  reorderSections: (oldIndex, newIndex) =>
    set((state) => {
      const sections = Object.values(state.resumeData.sections)
        .filter(section => section.enabled)
        .sort((a, b) => a.order - b.order);

      const [movedSection] = sections.splice(oldIndex, 1);
      sections.splice(newIndex, 0, movedSection);

      const updatedSections = { ...state.resumeData.sections };
      sections.forEach((section, index) => {
        updatedSections[section.id] = {
          ...updatedSections[section.id],
          order: index,
        };
      });

      return {
        resumeData: {
          ...state.resumeData,
          sections: updatedSections,
        },
      };
    }),
}));