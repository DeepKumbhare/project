import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { RichTextEditor } from '../editor/RichTextEditor';

export function SummaryEditor() {
  const { resumeData, setSection } = useResumeStore();
  const summary = resumeData.sections.summary.content as string;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Professional Summary
        </label>
        <RichTextEditor
          content={summary}
          onChange={(content) => setSection('summary', content)}
          placeholder="Write a brief summary of your professional background and key qualifications..."
          maxLength={2000}
        />
        <p className="text-sm text-gray-500">
          Tip: Keep your summary concise and focused on your most relevant skills and experiences.
        </p>
      </div>
    </div>
  );
}