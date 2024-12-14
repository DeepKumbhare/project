import React from 'react';
import { Section } from '../../types/resume';

type CustomSectionPreviewProps = {
  content: Record<string, any>;
  section: Section;
};

export function CustomSectionPreview({ content, section }: CustomSectionPreviewProps) {
  if (!section.config?.fields || !content) return null;

  const renderFieldValue = (value: any, type: string) => {
    if (!value) return null;

    switch (type) {
      case 'list':
        if (!Array.isArray(value) || value.length === 0) return null;
        return (
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {value.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        );

      case 'url':
        return (
          <a 
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-indigo-600 hover:text-indigo-700"
          >
            {value}
          </a>
        );

      case 'textarea':
      case 'text':
      case 'email':
      case 'date':
        return (
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {value}
          </p>
        );

      default:
        return String(value);
    }
  };

  return (
    <div className="space-y-4">
      {section.config.fields.map((field) => {
        const value = content[field.name];
        if (!value) return null;

        return (
          <div key={field.name} className="space-y-1">
            <h4 className="text-sm font-medium text-gray-900">
              {field.name}
            </h4>
            {renderFieldValue(value, field.type)}
          </div>
        );
      })}
    </div>
  );
}