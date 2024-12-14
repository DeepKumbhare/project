import { ResumeLayout } from '../../../types/resume';

export const layouts: Array<{
  id: ResumeLayout;
  title: string;
  description: string;
}> = [
  {
    id: 'professional',
    title: 'Professional',
    description: 'A modern two-column layout with skills and certifications in the sidebar',
  },
  {
    id: 'classic',
    title: 'Classic',
    description: 'Traditional single-column layout with clear section separation',
  },
  {
    id: 'modern',
    title: 'Modern',
    description: 'Contemporary design with a colored header and two-column body',
  },
];