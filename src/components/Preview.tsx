import React from 'react';
import { useResumeStore } from '../store/useResumeStore';
import { ContactPreview } from './preview/ContactPreview';
import { SummaryPreview } from './preview/SummaryPreview';
import { ExperiencePreview } from './preview/ExperiencePreview';
import { EducationPreview } from './preview/EducationPreview';
import { SkillsPreview } from './preview/SkillsPreview';
import { LanguagesPreview } from './preview/LanguagesPreview';
import { CertificatesPreview } from './preview/CertificatesPreview';
import { CustomSectionPreview } from './preview/CustomSectionPreview';

const previewComponents: Record<string, React.ComponentType<any>> = {
  contact: ContactPreview,
  summary: SummaryPreview,
  experience: ExperiencePreview,
  education: EducationPreview,
  skills: SkillsPreview,
  languages: LanguagesPreview,
  certificates: CertificatesPreview,
};

export function Preview() {
  const { resumeData } = useResumeStore();
  const sections = Object.values(resumeData.sections)
    .filter((section) => section.enabled)
    .sort((a, b) => a.order - b.order);

  const getPreviewComponent = (sectionId: string) => {
    if (sectionId.startsWith('custom-')) {
      return CustomSectionPreview;
    }
    return previewComponents[sectionId];
  };

  return (
    <div className="print:shadow-none print:p-0" id="resume-preview">
      <div className="space-y-6">
        {sections.map((section) => {
          const PreviewComponent = getPreviewComponent(section.id);
          if (!PreviewComponent) return null;

          return (
            <div key={section.id} className="preview-section">
              {section.id !== 'contact' && (
                <h3 className="text-md font-semibold text-gray-900 mb-3">
                  {section.title}
                </h3>
              )}
              <PreviewComponent content={section.content} />
            </div>
          );
        })}
      </div>
    </div>
  );
}