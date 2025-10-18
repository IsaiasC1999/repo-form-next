'use client';

import React from 'react';
import { Paper, Typography, Divider, Box, Button } from "@mui/material";
import { useFormStore } from '../store/useFormStore';
import { pdf } from '@react-pdf/renderer';
import InvoicePDF from './InvoicePDF';
import { InvoiceData } from '../lib/invoice.types';
import { ca } from 'zod/locales';

export default function ResumenDatosFinales() {
  const { 
    tipoComprobante, 
    puntoVenta, 
    fechaComprobante, 
    concepto,
    monedaExtranjera,
    actividades,
    referenciaComercial,
    tipoDocumento,
    numeroDocumento,
    razonSocial,
    domicilioComercial,
    condicionIVA,
    condicionesVenta,
    productosData,
    subtotalFactura,
    totalFactura
  } = useFormStore();
  
  // Adaptar los datos del store al formato que espera InvoicePDF
  const invoiceData = {
    empresa: {
      razonSocial: "EL GARAGE DEL GALLEGO S.A.S.",
      domicilioComercial: "Adan Quiroga 299 - Lastenia, Tucumán",
      telefono: "+54 381 123-4567",
      condicionIVA: "Responsable Inscripto"
    },
    comprobante: {
      tipo: tipoComprobante?.descripcion || "B",
      numero: `${puntoVenta?.codigo || "00001"}-00000001`,
      original: true,
      fecha: fechaComprobante || new Date().toLocaleDateString(),
      cuit: "30-12345678-9",
      ingresosBrutos: "123456789",
      fechaInicioActividades: "01/01/2020"
    },
    receptor: {
      senorSra: razonSocial || "CONSUMIDOR FINAL",
      direccion: domicilioComercial || "Sin dirección",
      cif: numeroDocumento || "Sin documento",
      localidadPartido: "Lastenia",
      provincia: "Tucumán",
      iva: condicionIVA?.descripcion || "Consumidor Final",
      cuit: numeroDocumento || "Sin documento",
      condicionVenta: condicionesVenta[0] || "Contado"
    },
    items: productosData, // Usar directamente ProductoItem[] del store
    totales: {
      subtotal: subtotalFactura,
      iva: subtotalFactura * 0.21, // Calcular IVA 21%
      total: totalFactura,
      sonPesos: `${new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(totalFactura).replace('$', '').toUpperCase()} PESOS`,
      cae: "12345678901234",
      vencimientoCae: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString() // 30 días desde hoy
    }
  };

  const handleConfirmarDatos = async () => {
    try {
      // Generar el PDF usando el componente InvoicePDF con datos del store
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
        <Typography variant="body2">Punto de Venta: {puntoVenta?.descripcion || "No seleccionado"}</Typography>
        <Typography variant="body2">Tipo de Comprobante: {tipoComprobante?.descripcion || "No seleccionado"}</Typography>
        <Typography variant="body2">Fecha: {fechaComprobante || "No seleccionada"}</Typography>
        <Typography variant="body2">Conceptos a Incluir: {concepto?.descripcion || "No seleccionado"}</Typography>
        <Typography variant="body2">Moneda Extranjera: {monedaExtranjera ? "Sí" : "No"}</Typography>
        <Typography variant="body2">Actividad: {actividades?.descripcion || "No seleccionada"}</Typography>
        {referenciaComercial && (
          <Typography variant="body2">Referencia Comercial: {referenciaComercial}</Typography>
        )}
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>Datos del Receptor</Typography>
        <Typography variant="body2">{tipoDocumento?.descripcion || "Documento"}: {numeroDocumento || "No ingresado"}</Typography>
        <Typography variant="body2">Razón Social: {razonSocial || "No ingresada"}</Typography>
        <Typography variant="body2">Domicilio Comercial: {domicilioComercial || "No ingresado"}</Typography>
        <Typography variant="body2">Condición frente al IVA: {condicionIVA?.descripcion || "No seleccionado"}</Typography>
        <Typography variant="body2">Condiciones de Venta: {condicionesVenta.join(", ") || "No seleccionadas"}</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>Detalle de la Operación</Typography>
        <Box sx={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
            <thead>
              <tr style={{ background: "#e0e0e0" }}>
                <th style={{ border: "1px solid #ccc", padding: "4px" }}>codigo</th>
                <th style={{ border: "1px solid #ccc", padding: "4px" }}>descripcion</th>
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
              {productosData.map((producto, index) => (
                <tr key={producto.id || index}>
                  <td style={{ border: "1px solid #ccc", padding: "4px" }}>{producto.codigo}</td>
                  <td style={{ border: "1px solid #ccc", padding: "4px" }}>{producto.productoDescripcion}</td>
                  <td style={{ border: "1px solid #ccc", padding: "4px" }}>{producto.cantidad}</td>
                  <td style={{ border: "1px solid #ccc", padding: "4px" }}>{producto.unidadMedida?.descripcion || "-"}</td>
                  <td style={{ border: "1px solid #ccc", padding: "4px" }}>{producto.precioUnitario}</td>
                  <td style={{ border: "1px solid #ccc", padding: "4px" }}>{producto.porcentajeBonificacion || "0,00"}</td>
                  <td style={{ border: "1px solid #ccc", padding: "4px" }}>{producto.importeBonificacion || "0,00"}</td>
                  <td style={{ border: "1px solid #ccc", padding: "4px" }}>{producto.alicuotaIVA?.descripcion || "21%"}</td>
                  <td style={{ border: "1px solid #ccc", padding: "4px" }}>{producto.subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
        <Typography variant="body2" sx={{ mt: 1 }}>No hay Impuestos</Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", flexDirection: "column", alignItems: "flex-end", mt: 1 }}>
          <Typography variant="body2">Subtotal: $ {subtotalFactura.toFixed(2)}</Typography>
          <Typography variant="body2">IVA (21%): $ {(subtotalFactura * 0.21).toFixed(2)}</Typography>
          <Typography variant="body2">Importe Total: $ {totalFactura.toFixed(2)}</Typography>
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
