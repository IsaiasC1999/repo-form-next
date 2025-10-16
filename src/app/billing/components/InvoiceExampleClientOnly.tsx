'use client';

import React, { useState } from 'react';
import { Box, Typography, Switch, FormControlLabel, Paper } from '@mui/material';
import SimpleInvoiceGenerator from './SimpleInvoiceGenerator';
import { sampleInvoiceData } from '../utils/invoiceUtils';

const InvoiceExampleClientOnly: React.FC = () => {
  const [showViewer, setShowViewer] = useState(false);

  return (
    <Box sx={{ p: 3 }}>
     

      <SimpleInvoiceGenerator
        invoiceData={sampleInvoiceData}
        showViewer={showViewer}
        onDataConfirmed={() => {
          console.log('¡Datos confirmados desde el componente padre!');
          // Aquí puedes agregar lógica adicional como:
          // - Navegar a otra página
          // - Mostrar un mensaje de éxito
          // - Actualizar estado global
          // - Enviar datos a una API
        }}
        autoDownload={true} // Descarga automáticamente al confirmar
      />
    </Box>
  );
};

export default InvoiceExampleClientOnly;