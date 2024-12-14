import { ResumeData } from '../types/resume';

export const DEFAULT_SECTIONS = {
  contact: {
    id: 'contact',
    title: 'Contact Information',
    enabled: true,
    order: 0,
    content: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: '',
    },
  },
  summary: {
    id: 'summary',
    title: 'Professional Summary',
    enabled: true,
    order: 1,
    content: '',
  },
  experience: {
    id: 'experience',
    title: 'Work Experience',
    enabled: true,
    order: 2,
    content: [],
  },
  education: {
    id: 'education',
    title: 'Education',
    enabled: true,
    order: 3,
    content: [],
  },
  skills: {
    id: 'skills',
    title: 'Skills',
    enabled: true,
    order: 4,
    content: [],
  },
  languages: {
    id: 'languages',
    title: 'Languages',
    enabled: false,
    order: 5,
    content: [],
  },
  certificates: {
    id: 'certificates',
    title: 'Certificates',
    enabled: false,
    order: 6,
    content: [],
  },
};

export const initialResumeData: ResumeData = {
  sections: DEFAULT_SECTIONS,
  customSections: [],
  layout: 'classic',
  theme: 'classic-blue',
  style: {
    font: 'inter',
    spacing: 1.15,
  },
};