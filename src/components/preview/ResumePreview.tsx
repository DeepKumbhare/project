import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { getResumeLayout } from '../layouts';

export function ResumePreview() {
  const { resumeData } = useResumeStore();
  const Layout = getResumeLayout(resumeData.layout);

  return (
    <div id="resume-preview">
      <Layout data={resumeData} />
    </div>
  );
}