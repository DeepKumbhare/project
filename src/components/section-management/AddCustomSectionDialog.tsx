import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useResumeStore } from '../../store/useResumeStore';
import { CustomField, CustomSectionConfig } from '../../types/resume';
import { cn } from '../../utils/cn';

type AddCustomSectionDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AddCustomSectionDialog({ isOpen, onClose }: AddCustomSectionDialogProps) {
  const [sectionTitle, setSectionTitle] = useState('');
  const [fields, setFields] = useState<CustomField[]>([]);
  const [errors, setErrors] = useState<{ title?: string; fields?: Record<string, string> }>({});
  
  const { addCustomSection } = useResumeStore();

  const addField = () => {
    const newField: CustomField = {
      id: crypto.randomUUID(),
      name: '',
      type: 'text',
      required: false,
    };
    setFields([...fields, newField]);
  };

  const updateField = (index: number, updatedField: CustomField) => {
    const updatedFields = [...fields];
    updatedFields[index] = updatedField;
    setFields(updatedFields);
    
    // Clear error for the field if it exists
    if (errors.fields?.[updatedField.id]) {
      setErrors(prev => ({
        ...prev,
        fields: {
          ...prev.fields,
          [updatedField.id]: undefined
        }
      }));
    }
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const validateForm = (): boolean => {
    const newErrors: { title?: string; fields?: Record<string, string> } = {};

    if (!sectionTitle.trim()) {
      newErrors.title = 'Section title is required';
    }

    const fieldErrors: Record<string, string> = {};
    fields.forEach(field => {
      if (!field.name.trim()) {
        fieldErrors[field.id] = 'Field name is required';
      }
    });

    if (Object.keys(fieldErrors).length > 0) {
      newErrors.fields = fieldErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const sectionConfig: CustomSectionConfig = {
      title: sectionTitle.trim(),
      fields: fields.map(({ id, ...field }) => field),
    };

    addCustomSection(sectionTitle.trim(), sectionConfig);
    handleClose();
  };

  const handleClose = () => {
    setSectionTitle('');
    setFields([]);
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={handleClose} />
        
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={handleClose}
            >
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3 className="text-lg font-semibold leading-6 text-gray-900">
                Add Custom Section
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Create a new section with custom fields for your resume.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-4">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="section-title" className="block text-sm font-medium text-gray-700">
                      Section Title
                    </label>
                    <input
                      type="text"
                      id="section-title"
                      value={sectionTitle}
                      onChange={(e) => {
                        setSectionTitle(e.target.value);
                        if (errors.title) {
                          setErrors(prev => ({ ...prev, title: undefined }));
                        }
                      }}
                      className={cn(
                        "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
                        errors.title && "border-red-300"
                      )}
                      placeholder="e.g., Projects, Volunteer Work"
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-700">Fields</h4>
                      <button
                        type="button"
                        onClick={addField}
                        className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Field
                      </button>
                    </div>

                    {fields.map((field, index) => (
                      <div key={field.id} className="space-y-4 p-4 border border-gray-200 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Field Name
                            </label>
                            <input
                              type="text"
                              value={field.name}
                              onChange={(e) => updateField(index, { ...field, name: e.target.value })}
                              className={cn(
                                "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
                                errors.fields?.[field.id] && "border-red-300"
                              )}
                              placeholder="e.g., Project Title"
                            />
                            {errors.fields?.[field.id] && (
                              <p className="mt-1 text-sm text-red-600">
                                {errors.fields[field.id]}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Field Type
                            </label>
                            <select
                              value={field.type}
                              onChange={(e) => updateField(index, { ...field, type: e.target.value as any })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            >
                              <option value="text">Short Text</option>
                              <option value="textarea">Long Text</option>
                              <option value="date">Date</option>
                              <option value="email">Email</option>
                              <option value="url">URL</option>
                              <option value="list">List</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Placeholder Text
                          </label>
                          <input
                            type="text"
                            value={field.placeholder || ''}
                            onChange={(e) => updateField(index, { ...field, placeholder: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Enter a helpful placeholder text..."
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id={`required-${field.id}`}
                              checked={field.required}
                              onChange={(e) => updateField(index, { ...field, required: e.target.checked })}
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label
                              htmlFor={`required-${field.id}`}
                              className="ml-2 block text-sm text-gray-700"
                            >
                              This field is required
                            </label>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeField(index)}
                            className="text-sm text-red-600 hover:text-red-700"
                          >
                            Remove Field
                          </button>
                        </div>
                      </div>
                    ))}

                    {fields.length === 0 && (
                      <p className="text-sm text-gray-500 text-center py-4">
                        Add fields to customize your section
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                  >
                    Add Section
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}