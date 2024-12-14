import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { Certificate } from '../../types/resume';
import { Award, Calendar, Globe, Plus, Trash2 } from 'lucide-react';

export function CertificatesEditor() {
  const { resumeData, setSection } = useResumeStore();
  const certificates = resumeData.sections.certificates.content as Certificate[];

  const addCertificate = () => {
    const newCertificate: Certificate = {
      id: crypto.randomUUID(),
      name: '',
      issuer: '',
      date: '',
      url: '',
    };
    setSection('certificates', [...certificates, newCertificate]);
  };

  const updateCertificate = (index: number, field: keyof Certificate, value: string) => {
    const updatedCertificates = [...certificates];
    updatedCertificates[index] = { ...updatedCertificates[index], [field]: value };
    setSection('certificates', updatedCertificates);
  };

  const removeCertificate = (index: number) => {
    const updatedCertificates = certificates.filter((_, i) => i !== index);
    setSection('certificates', updatedCertificates);
  };

  return (
    <div className="space-y-6">
      {certificates.map((certificate, index) => (
        <div
          key={certificate.id}
          className="space-y-4 p-4 border border-gray-200 rounded-lg"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Award className="w-4 h-4 mr-2" />
                    Certificate Name
                  </label>
                  <input
                    type="text"
                    value={certificate.name}
                    onChange={(e) => updateCertificate(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="AWS Certified Solutions Architect"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Issuing Organization
                  </label>
                  <input
                    type="text"
                    value={certificate.issuer}
                    onChange={(e) => updateCertificate(index, 'issuer', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Amazon Web Services"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Calendar className="w-4 h-4 mr-2" />
                    Issue Date
                  </label>
                  <input
                    type="month"
                    value={certificate.date}
                    onChange={(e) => updateCertificate(index, 'date', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Globe className="w-4 h-4 mr-2" />
                    URL (optional)
                  </label>
                  <input
                    type="url"
                    value={certificate.url || ''}
                    onChange={(e) => updateCertificate(index, 'url', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="https://example.com/certificate"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => removeCertificate(index)}
              className="ml-4 p-1 text-gray-400 hover:text-gray-500"
              title="Remove certificate"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={addCertificate}
        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Certificate
      </button>
    </div>
  );
}