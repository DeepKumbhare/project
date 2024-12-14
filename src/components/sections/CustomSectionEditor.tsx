import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';

export function CustomSectionEditor() {
  const { resumeData, activeSection, setSection } = useResumeStore();
  const section = resumeData.sections[activeSection];
  const config = section.config;

  if (!config?.fields) {
    return (
      <div className="text-sm text-gray-500 text-center py-4">
        This section was not configured properly. Please delete and recreate it.
      </div>
    );
  }

  const content = section.content || {};

  const handleFieldChange = (fieldName: string, value: any) => {
    setSection(activeSection, {
      ...content,
      [fieldName]: value
    });
  };

  const renderField = (field: any) => {
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            value={content[field.name] || ''}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            rows={4}
          />
        );

      case 'date':
        return (
          <input
            type="date"
            value={content[field.name] || ''}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            required={field.required}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        );

      case 'email':
        return (
          <input
            type="email"
            value={content[field.name] || ''}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        );

      case 'url':
        return (
          <input
            type="url"
            value={content[field.name] || ''}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        );

      case 'list':
        const items = (content[field.name] || []) as string[];
        return (
          <div className="space-y-2">
            {items.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index] = e.target.value;
                    handleFieldChange(field.name, newItems);
                  }}
                  placeholder={field.placeholder}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newItems = items.filter((_, i) => i !== index);
                    handleFieldChange(field.name, newItems);
                  }}
                  className="px-2 py-1 text-sm text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleFieldChange(field.name, [...items, ''])}
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              Add Item
            </button>
          </div>
        );

      default: // text
        return (
          <input
            type="text"
            value={content[field.name] || ''}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      {config.fields.map((field) => (
        <div key={field.name} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {field.name}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {renderField(field)}
        </div>
      ))}
    </div>
  );
}