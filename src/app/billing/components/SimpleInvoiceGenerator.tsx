'use client';

import React, { useState } from 'react';
import { Button, Box, Modal, Typography, Paper } from '@mui/material';
import { InvoiceData } from '../types/invoice.types';
import { usePDFGeneration } from '../hooks/usePDFGeneration';
import dynamic from 'next/dynamic';

// Importación dinámica para evitar problemas de SSR
const SimpleInvoicePDF = dynamic(() => import('./SimpleInvoicePDF'), { ssr: false });
const PDFViewer = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
  { ssr: false }
);

interface SimpleInvoiceGeneratorProps {
  invoiceData: InvoiceData;
  showViewer?: boolean;
  onDataConfirmed?: () => void; // Callback opcional después de confirmar datos
  autoDownload?: boolean; // Si debe descargar automáticamente al confirmar
}

const SimpleInvoiceGenerator: React.FC<SimpleInvoiceGeneratorProps> = ({
  invoiceData,
  showViewer = false,
  onDataConfirmed,
  autoDownload = true
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { isClient, downloadPDF, printPDF } = usePDFGeneration();

  const handlePreview = () => {
    setPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setPreviewOpen(false);
  };

  const handleDownload = async () => {
    if (!isClient) return;

    setIsGenerating(true);
    try {
      const { default: SimpleInvoicePDFComponent } = await import('./SimpleInvoicePDF');
      await downloadPDF(
        <SimpleInvoicePDFComponent data={invoiceData} />,
        `factura-${invoiceData.comprobante.numero}.pdf`
      );
    } catch (error) {
      console.error('Error descargando PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = async () => {
    if (!isClient) return;

    try {
      const { default: SimpleInvoicePDFComponent } = await import('./SimpleInvoicePDF');
      await printPDF(<SimpleInvoicePDFComponent data={invoiceData} />);
    } catch (error) {
      console.error('Error imprimiendo PDF:', error);
    }
  };

  const handleConfirmarDatos = async () => {
    if (!isClient) return;

    setIsGenerating(true);
    try {
      const { default: SimpleInvoicePDFComponent } = await import('./SimpleInvoicePDF');
      
      // Generar y descargar automáticamente el PDF si autoDownload está habilitado
      if (autoDownload) {
        await downloadPDF(
          <SimpleInvoicePDFComponent data={invoiceData} />,
          `factura-${invoiceData.comprobante.numero}.pdf`
        );
      }
      
      // Ejecutar callback personalizado si existe
      if (onDataConfirmed) {
        onDataConfirmed();
      }
      
      // Mostrar mensaje de éxito
      console.log('¡Datos confirmados y factura generada exitosamente!');
      
    } catch (error) {
      console.error('Error confirmando datos y generando PDF:', error);
      alert('Error al generar la factura. Por favor, inténtalo de nuevo.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isClient) {
    return (
      <Box sx={{ p: 2 }}>
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Cargando Generador de Factura PDF...
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Generar Factura PDF (Versión Simplificada)
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            color="primary"
            disabled={isGenerating}
            onClick={handleConfirmarDatos}
            size="large"
          >
            {isGenerating ? 'Generando PDF...' : 'Confirmar Datos'}
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            disabled={isGenerating}
            onClick={handleDownload}
          >
            {isGenerating ? 'Generando...' : 'Descargar PDF'}
          </Button>

          <Button
            variant="outlined"
            onClick={handlePrint}
            disabled={isGenerating}
          >
            Imprimir
          </Button>
        </Box>

        {showViewer && (
          <Box sx={{ mt: 2, height: 600, border: 1, borderColor: 'grey.300' }}>
            <PDFViewer width="100%" height="100%">
              <SimpleInvoicePDF data={invoiceData} />
            </PDFViewer>
          </Box>
        )}
      </Paper>

      
     
    </Box>
  );
};

export default SimpleInvoiceGenerator;