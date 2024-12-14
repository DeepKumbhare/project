import React from 'react';
import { ContactInfo } from '../../types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

type ContactPreviewProps = {
  contact?: ContactInfo;
};

export function ContactPreview({ contact }: ContactPreviewProps) {
  if (!contact) return null;

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold text-gray-900">{contact.fullName}</h1>
      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        {contact.email && (
          <div className="flex items-center">
            <Mail className="w-4 h-4 mr-1" />
            <a href={`mailto:${contact.email}`} className="hover:text-indigo-600">
              {contact.email}
            </a>
          </div>
        )}
        {contact.phone && (
          <div className="flex items-center">
            <Phone className="w-4 h-4 mr-1" />
            <a href={`tel:${contact.phone}`} className="hover:text-indigo-600">
              {contact.phone}
            </a>
          </div>
        )}
        {contact.location && (
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {contact.location}
          </div>
        )}
        {contact.linkedin && (
          <div className="flex items-center">
            <Linkedin className="w-4 h-4 mr-1" />
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600"
            >
              LinkedIn
            </a>
          </div>
        )}
        {contact.website && (
          <div className="flex items-center">
            <Globe className="w-4 h-4 mr-1" />
            <a
              href={contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600"
            >
              Portfolio
            </a>
          </div>
        )}
      </div>
    </div>
  );
}