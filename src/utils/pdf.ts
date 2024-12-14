import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ContactInfo } from '../types/resume';

export async function generatePDF(resumeElement: HTMLElement, contactInfo: ContactInfo): Promise<Blob> {
  try {
    const canvas = await html2canvas(resumeElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: 816, // A4 width in pixels at 96 DPI
      windowHeight: 1056, // A4 height in pixels at 96 DPI
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const aspectRatio = canvas.height / canvas.width;
    const imgWidth = pdfWidth;
    const imgHeight = pdfWidth * aspectRatio;

    pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);

    // If content exceeds one page, add new pages
    if (imgHeight > pdfHeight) {
      const pageCount = Math.ceil(imgHeight / pdfHeight);
      for (let i = 1; i < pageCount; i++) {
        pdf.addPage();
        pdf.addImage(
          imgData,
          'JPEG',
          0,
          -(pdfHeight * i),
          imgWidth,
          imgHeight
        );
      }
    }

    return pdf.output('blob');
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
}

export function getResumeFileName(contactInfo: ContactInfo): string {
  const name = contactInfo.fullName
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_]/g, '')
    || 'Resume';
  
  const date = new Date().toISOString().split('T')[0];
  return `${name}_Resume_${date}.pdf`;
}