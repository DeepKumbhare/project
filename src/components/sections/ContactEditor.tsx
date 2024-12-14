import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { ContactInfo } from '../../types/resume';
import { User, Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

export function ContactEditor() {
  const { resumeData, setSection } = useResumeStore();
  const contact = resumeData.sections.contact.content as ContactInfo;

  const handleChange = (field: keyof ContactInfo, value: string) => {
    setSection('contact', { ...contact, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <User className="w-4 h-4 mr-2" />
            Full Name
          </label>
          <input
            type="text"
            value={contact.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Mail className="w-4 h-4 mr-2" />
            Email
          </label>
          <input
            type="email"
            value={contact.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="john@example.com"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Phone className="w-4 h-4 mr-2" />
            Phone
          </label>
          <input
            type="tel"
            value={contact.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <MapPin className="w-4 h-4 mr-2" />
            Location
          </label>
          <input
            type="text"
            value={contact.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="City, State"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Linkedin className="w-4 h-4 mr-2" />
            LinkedIn (optional)
          </label>
          <input
            type="url"
            value={contact.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Globe className="w-4 h-4 mr-2" />
            Website (optional)
          </label>
          <input
            type="url"
            value={contact.website || ''}
            onChange={(e) => handleChange('website', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="https://johndoe.com"
          />
        </div>
      </div>
    </div>
  );
}