import { ContactEditor } from './ContactEditor';
import { SummaryEditor } from './SummaryEditor';
import { ExperienceEditor } from './ExperienceEditor';
import { EducationEditor } from './EducationEditor';
import { SkillsEditor } from './SkillsEditor';
import { LanguagesEditor } from './LanguagesEditor';
import { CertificatesEditor } from './CertificatesEditor';
import { CustomSectionEditor } from './CustomSectionEditor';

export const sectionEditors: Record<string, React.ComponentType> = {
  contact: ContactEditor,
  summary: SummaryEditor,
  experience: ExperienceEditor,
  education: EducationEditor,
  skills: SkillsEditor,
  languages: LanguagesEditor,
  certificates: CertificatesEditor,
};

export function getSectionEditor(sectionId: string) {
  if (sectionId.startsWith('custom-')) {
    return CustomSectionEditor;
  }
  return sectionEditors[sectionId];
}