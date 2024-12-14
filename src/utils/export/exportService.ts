import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ContactInfo, ResumeLayout } from '../../types/resume';
import toast from 'react-hot-toast';

const LAYOUT_CONFIGS: Record<ResumeLayout, { format: [number, number] }> = {
  professional: { format: [816, 1056] }, // Standard A4 at 96 DPI
  classic: { format: [816, 1056] },
  modern: { format: [816, 1056] },
};

export async function generatePDF(
  resumeElement: HTMLElement, 
  contactInfo: ContactInfo,
  layout: ResumeLayout
): Promise<Blob> {
  const loadingToast = toast.loading('Generating PDF...');

  try {
    const config = LAYOUT_CONFIGS[layout];
    
    // Temporarily remove any print-only styles
    const printStyles = document.querySelectorAll('style[media="print"]');
    printStyles.forEach(style => style.setAttribute('media', 'disabled'));

    const canvas = await html2canvas(resumeElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: config.format[0],
      windowHeight: config.format[1],
      onclone: (document) => {
        // Ensure proper rendering of background colors and gradients
        const element = document.getElementById('resume-preview');
        if (element) {
          element.style.height = '100%';
          element.style.width = '100%';
        }
      },
    });

    // Restore print styles
    printStyles.forEach(style => style.setAttribute('media', 'print'));

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

    // Add additional pages if content exceeds one page
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

    toast.success('PDF generated successfully!', { id: loadingToast });
    return pdf.output('blob');
  } catch (error) {
    console.error('Error generating PDF:', error);
    toast.error('Failed to generate PDF. Please try again.', { id: loadingToast });
    throw new Error('Failed to generate PDF');
  }
}

export function getResumeFileName(contactInfo: ContactInfo, layout: ResumeLayout): string {
  const name = contactInfo.fullName
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_]/g, '')
    || 'Resume';
  
  const date = new Date().toISOString().split('T')[0];
  return `${name}_Resume_${layout}_${date}.pdf`;
}