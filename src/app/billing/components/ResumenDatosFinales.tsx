'use client';

import React, { useState } from 'react';
import { Paper, Typography, Divider, Box, Button } from "@mui/material";

export default function ResumenDatosFinales() {
  return (
    <Paper sx={{ p: 3, mt: 4, background: "#f9f9f9" }}>
      <Typography variant="h6" textAlign="center" gutterBottom>
        RESUMEN DE DATOS (PASO 4 DE 4)
      </Typography>
      <Divider sx={{ mb: 2 }} />
       
      <Typography variant="subtitle1" sx={{ mb: 2, textAlign: "center" }}>
        Tipo de Comprobante: {tipoComprobante?.label}
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
        <Typography variant="body2">Punto de Venta: {puntoVenta?.label || "No seleccionado"}</Typography>
        <Typography variant="body2">Domicilio: Adan Quiroga 299 - Lastenia, Tucumán</Typography>
        <Typography variant="body2">Conceptos a Incluir: Productos</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>Datos del Receptor</Typography>
        <Typography variant="body2">CUIT: 20148730333</Typography>
        <Typography variant="body2">Razón Social: ROMANO CESAR ISAIAS</Typography>
        <Typography variant="body2">Domicilio Comercial: lomas de tafi</Typography>
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
        <Button variant="outlined">Volver</Button>
        <Button variant="contained">Confirmar Datos...</Button>
        <Button variant="outlined">Menú Principal</Button>
      </Box>
    </Paper>
  );
}
