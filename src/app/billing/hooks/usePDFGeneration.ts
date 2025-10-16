import { useEffect, useState } from 'react';

/**
 * Hook para detectar si el código se está ejecutando en el cliente
 * Útil para evitar problemas de hidratación con SSR en Next.js
 */
export const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

/**
 * Hook para manejar la generación de PDFs de manera segura
 * Evita errores de renderizado del lado del servidor
 */
export const usePDFGeneration = () => {
  const isClient = useIsClient();

  const generatePDF = async (component: any) => {
    if (!isClient) {
      console.warn('PDF generation is only available on the client side');
      return null;
    }

    try {
      const { pdf } = await import('@react-pdf/renderer');
      return await pdf(component).toBlob();
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  };

  const downloadPDF = async (component: any, filename: string) => {
    const blob = await generatePDF(component);
    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const printPDF = async (component: any) => {
    const blob = await generatePDF(component);
    if (blob) {
      const url = URL.createObjectURL(blob);
      const printWindow = window.open(url);
      if (printWindow) {
        printWindow.onload = () => {
          printWindow.print();
          printWindow.onafterprint = () => {
            URL.revokeObjectURL(url);
            printWindow.close();
          };
        };
      }
    }
  };

  return {
    isClient,
    generatePDF,
    downloadPDF,
    printPDF,
  };
};