'use client';

import React, { useState } from 'react';
import { Button, Box, Modal, Typography, Paper } from '@mui/material';
import { InvoiceData } from '../lib/invoice.types';
import { usePDFGeneration } from '../hooks/usePDFGeneration';
import dynamic from 'next/dynamic';

// Importación dinámica para evitar problemas de SSR
const InvoicePDF = dynamic(() => import('./InvoicePDF'), { ssr: false });
const PDFViewer = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
  { ssr: false }
);

interface InvoiceGeneratorV2Props {
  invoiceData: InvoiceData;
  showViewer?: boolean;
}

const InvoiceGeneratorV2: React.FC<InvoiceGeneratorV2Props> = ({
  invoiceData,
  showViewer = false
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
      const { default: InvoicePDFComponent } = await import('./InvoicePDF');
      await downloadPDF(
        <InvoicePDFComponent data={invoiceData} />,
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
      const { default: InvoicePDFComponent } = await import('./InvoicePDF');
      await printPDF(<InvoicePDFComponent data={invoiceData} />);
    } catch (error) {
      console.error('Error imprimiendo PDF:', error);
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
          Generar Factura PDF
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePreview}
          >
            Vista Previa
          </Button>

          <Button
            variant="contained"
            color="secondary"
            disabled={isGenerating}
            onClick={handleDownload}
          >
            {isGenerating ? 'Generando...' : 'Descargar PDF'}
          </Button>

          <Button
            variant="outlined"
            onClick={handlePrint}
          >
            Imprimir
          </Button>
        </Box>

        {showViewer && (
          <Box sx={{ mt: 2, height: 600, border: 1, borderColor: 'grey.300' }}>
            <PDFViewer width="100%" height="100%">
              <InvoicePDF data={invoiceData} />
            </PDFViewer>
          </Box>
        )}
      </Paper>

      {/* Modal para vista previa */}
      <Modal
        open={previewOpen}
        onClose={handleClosePreview}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{
          width: '90%',
          height: '90%',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 2,
          borderRadius: 1,
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Vista Previa de la Factura</Typography>
            <Button onClick={handleClosePreview} color="primary">
              Cerrar
            </Button>
          </Box>
          <Box sx={{ height: 'calc(100% - 60px)' }}>
            <PDFViewer width="100%" height="100%">
              <InvoicePDF data={invoiceData} />
            </PDFViewer>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default InvoiceGeneratorV2;