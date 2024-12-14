export type Section = {
  id: string;
  title: string;
  enabled: boolean;
  isCustom?: boolean;
  order: number;
  content: any;
  config?: CustomSectionConfig;
};

export type ResumeLayout = 'professional' | 'classic' | 'modern';

export type ResumeTheme = {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
};

export type ResumeData = {
  sections: Record<string, Section>;
  customSections: string[];
  layout: ResumeLayout;
  theme: string;
  style: {
    font: string;
    spacing: number;
  };
};

export type ContactInfo = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  website?: string;
};

export type Experience = {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string[];
};

export type Education = {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
  gpa?: string;
  achievements?: string[];
};

export type Skill = {
  id: string;
  category: string;
  skills: string[];
};

export type Language = {
  id: string;
  name: string;
  proficiency: string;
};

export type Certificate = {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
};

export type FieldType = 'text' | 'textarea' | 'date' | 'email' | 'url' | 'list';

export interface CustomField {
  name: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
}

export interface CustomSectionConfig {
  title: string;
  fields: CustomField[];
}