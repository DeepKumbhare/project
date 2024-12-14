import React from 'react';
import { Certificate } from '../../../types/resume';
import { formatDate } from '../../../utils/date';
import { useTheme } from '../../../contexts/ThemeContext';

interface CertificationsProps {
  certificates: Certificate[];
}

export function Certifications({ certificates }: CertificationsProps) {
  const { theme } = useTheme();
  if (!certificates?.length) return null;

  return (
    <section className="space-y-4">
      <h2 
        className="text-xl font-bold border-b-2 pb-1"
        style={{ 
          color: theme.colors.primary,
          borderColor: theme.colors.primary 
        }}
      >
        Certifications
      </h2>

      <div className="space-y-3">
        {certificates.map((cert) => (
          <div key={cert.id} className="grid grid-cols-[1fr_auto] gap-4">
            <div>
              <div className="font-bold text-gray-900">{cert.name}</div>
              <div className="text-sm text-gray-700">{cert.issuer}</div>
              {cert.url && (
                <a 
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-600 hover:underline"
                >
                  {cert.url}
                </a>
              )}
            </div>
            <div className="text-sm text-gray-600 text-right">
              {formatDate(cert.date)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}