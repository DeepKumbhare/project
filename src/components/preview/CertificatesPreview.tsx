import React from 'react';
import { Certificate } from '../../types/resume';
import { formatDate } from '../../utils/date';

type CertificatesPreviewProps = {
  certificates: Certificate[];
};

export function CertificatesPreview({ certificates }: CertificatesPreviewProps) {
  if (!certificates.length) return null;

  return (
    <div className="space-y-3">
      {certificates.map((certificate) => (
        <div key={certificate.id} className="text-sm">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900">
                {certificate.name}
              </h3>
              <p className="text-gray-700">{certificate.issuer}</p>
            </div>
            <div className="text-gray-600">
              {formatDate(certificate.date)}
            </div>
          </div>
          {certificate.url && (
            <a
              href={certificate.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-700"
            >
              View Certificate
            </a>
          )}
        </div>
      ))}
    </div>
  );
}