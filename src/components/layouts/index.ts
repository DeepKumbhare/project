import { ProfessionalLayout } from './ProfessionalLayout';
import { ClassicLayout } from './ClassicLayout';
import { ModernLayout } from './ModernLayout';
import { ResumeLayout } from '../../types/resume';

export const layouts: Record<ResumeLayout, React.ComponentType<any>> = {
  professional: ProfessionalLayout,
  classic: ClassicLayout,
  modern: ModernLayout,
};

export function getResumeLayout(layout: ResumeLayout) {
  return layouts[layout] || ClassicLayout;
}