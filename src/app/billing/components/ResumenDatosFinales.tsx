'use client';

import React from 'react';
import { Paper, Typography, Divider, Box, Button } from "@mui/material";
import { useFormStore } from '../store/useFormStore';
import { pdf } from '@react-pdf/renderer';
import InvoicePDF from './InvoicePDF';
import { InvoiceData } from '../lib/invoice.types';

export default function ResumenDatosFinales() {
  const { tipoComprobante, puntoVenta , fechaComprobante , concepto , tipoDocumento , numeroDocumento , razonSocial , domicilioComercial } = useFormStore();
  
  // Adaptar los datos al formato que espera InvoicePDF
  const invoiceData : InvoiceData = {
    empresa: {
      razonSocial: "EL GARAGE DEL GALLEGO S.A.S.",
      domicilioComercial: "Adan Quiroga 299 - Lastenia, Tucumán",
      telefono: "+54 381 123-4567",
      condicionIVA: "Responsable Inscripto"
    },
    comprobante: {
      tipo: tipoComprobante?.descripcion || "B",
      numero: "00001-00000001",
      original: true,
      fecha: new Date().toLocaleDateString(),
      cuit: "30-12345678-9",
      ingresosBrutos: "123456789",
      fechaInicioActividades: "01/01/2020"
    },
    receptor: {
      senorSra: "ROMANO CESAR ISAIAS",
      direccion: "lomas de tafi",
      cif: "20148730333",
      localidadPartido: "Lastenia",
      provincia: "Tucumán",
      iva: "Consumidor Final",
      cuit: "20148730333",
      condicionVenta: "Contado"
    },
    items: [
      {
        descripcion: "Producto de prueba",
        remito: "001",
        descuento: "0%",
        cantidad: 1,
        precioUnitario: 1000.00,
        importe: 1000.00
      }
    ],
    totales: {
      subtotal: 1000.00,
      iva: 173.55,
      total: 1000.00,
      sonPesos: "UN MIL CON 00/100 PESOS",
      cae: "12345678901234",
      vencimientoCae: new Date().toLocaleDateString()
    }
  };

  const handleConfirmarDatos = async () => {
    try {
      // Generar el PDF usando el componente InvoicePDF
      const blob = await pdf(<InvoicePDF data={invoiceData} />).toBlob();
      
      // Crear un enlace de descarga
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `factura-${invoiceData.comprobante.numero}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      console.log('PDF descargado correctamente');
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  };
    console.log(concepto);
  return (
    <Paper sx={{ p: 3, mt: 4, background: "#f9f9f9" }}>
      <Typography variant="h6" textAlign="center" gutterBottom>
        RESUMEN DE DATOS (PASO 4 DE 4)
      </Typography>
      <Divider sx={{ mb: 2 }} />
       
      <Typography variant="subtitle1" sx={{ mb: 2, textAlign: "center" }}>
        Tipo de Comprobante: {tipoComprobante?.descripcion}
      </Typography> 
      <Divider sx={{ mb: 2 }} />
      <Typography variant="subtitle2" sx={{ mb: 2, textAlign: "center" }}>
        El siguiente es un resumen de todos los datos ingresados.<br />
        De confirmar los mismos se procederá a la generación del comprobante.
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>Datos del Emisor</Typography>
        <Typography variant="body2">Logo Preimpreso: No</Typography>
        <Typography variant="body2">Mostrar Nombre de Fantasía: Sí</Typography>
        <Typography variant="body2">Nombre Fantasía: EL GARAGE DEL GALLEGO</Typography>
        <Typography variant="body2">Razón Social: EL GARAGE DEL GALLEGO S. A. S.</Typography>
        <Typography variant="body2">Punto de Venta: {puntoVenta?.descripcion || "No seleccionado"}</Typography>
        <Typography variant="body2">Domicilio: Adan Quiroga 299 - Lastenia, Tucumán</Typography>
        <Typography variant="body2">Conceptos a Incluir: {concepto?.descripcion}</Typography>

      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>Datos del Receptor</Typography>
        <Typography variant="body2">{tipoDocumento?.descripcion}: {numeroDocumento}</Typography>
        <Typography variant="body2">Razón Social: {razonSocial}</Typography>
        <Typography variant="body2">Domicilio Comercial: {domicilioComercial}</Typography>
        <Typography variant="body2">Condición frente al IVA: Consumidor Final</Typography>
        <Typography variant="body2">Condiciones de Venta: Contado</Typography>
        <Typography variant="body2">Comprobantes Asociados: -</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>Detalle de la Operación</Typography>
        <Box sx={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
            <thead>
              <tr style={{ background: "#e0e0e0" }}>
                <th style={{ border: "1px solid #ccc", padding: "4px" }}>Código</th>
                <th style={{ border: "1px solid #ccc", padding: "4px" }}>Producto/Servicio</th>
                <th style={{ border: "1px solid #ccc", padding: "4px" }}>Cant.</th>
                <th style={{ border: "1px solid #ccc", padding: "4px" }}>U. Medida</th>
                <th style={{ border: "1px solid #ccc", padding: "4px" }}>Prec. Unitario</th>
                <th style={{ border: "1px solid #ccc", padding: "4px" }}>% Bon.</th>
                <th style={{ border: "1px solid #ccc", padding: "4px" }}>Importe Bon.</th>
                <th style={{ border: "1px solid #ccc", padding: "4px" }}>Alícuota IVA</th>
                <th style={{ border: "1px solid #ccc", padding: "4px" }}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: "1px solid #ccc", padding: "4px" }}>0001</td>
                <td style={{ border: "1px solid #ccc", padding: "4px" }}>asdasd</td>
                <td style={{ border: "1px solid #ccc", padding: "4px" }}>1,00</td>
                <td style={{ border: "1px solid #ccc", padding: "4px" }}>otras unidades</td>
                <td style={{ border: "1px solid #ccc", padding: "4px" }}>1.000,00</td>
                <td style={{ border: "1px solid #ccc", padding: "4px" }}>0,00</td>
                <td style={{ border: "1px solid #ccc", padding: "4px" }}>0,00</td>
                <td style={{ border: "1px solid #ccc", padding: "4px" }}>21%</td>
                <td style={{ border: "1px solid #ccc", padding: "4px" }}>1.000,00</td>
              </tr>
            </tbody>
          </table>
        </Box>
        <Typography variant="body2" sx={{ mt: 1 }}>No hay Impuestos</Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", flexDirection: "column", alignItems: "flex-end", mt: 1 }}>
          <Typography variant="body2">Subtotal: $ 1.000,00</Typography>
          <Typography variant="body2">Importe Otros Tributos: $ 0,00</Typography>
          <Typography variant="body2">Importe Total: $ 1.000,00</Typography>
        </Box>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          Régimen de Transparencia Fiscal al Consumidor (Ley 27.743)
        </Typography>
        <Typography variant="body2">IVA Contenido: $ 173,55</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
        
        <Button variant="contained" onClick={handleConfirmarDatos}>
          Confirmar Datos...
        </Button>
        
      </Box>
    </Paper>
  );
}
