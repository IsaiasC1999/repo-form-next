import { Paper, Typography, Box, InputLabel, Select, MenuItem, TextField, Divider, FormControlLabel, Checkbox, Button } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CondicionFrenteIVAReceptor from "./CondicionFrenteIVAReceptor";
import CondicionFrenteIVAReceptorfacB from "./CondicionFrenteIVAReceptor";
import DatosReceptorComprobanteDetail from "./DatosReceptorComprobanteDetail";
import DebitoForm from "./DebitoForm";
import { useState } from "react";
import CreditoForm from "./CreditoForm";
export default function DatosReceptorComprobante() {

  return (
    <Paper sx={{ p: 2, mb: 2, fontSize: 1 , textAlign: 'center' }}>
      <Typography variant="h6" textAlign="center" gutterBottom>
        Datos Receptor Comprobante
      </Typography>
      <Box sx={{ p: 2, mb: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        
        <DatosReceptorComprobanteDetail />

        
        
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" sx={{ textAlign: "left", mb: 1 }}>
          Condiciones de Venta
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", ml: 2 }}>
          <FormControlLabel control={<Checkbox />} label="Contado" />
          <DebitoForm />
          <CreditoForm />
          <FormControlLabel control={<Checkbox />} label="Cuenta Corriente" />
          <FormControlLabel control={<Checkbox />} label="Cheque" />
          <FormControlLabel control={<Checkbox />} label="Transferencia Bancaria" />
          <FormControlLabel control={<Checkbox />} label="Otra" />
          <FormControlLabel control={<Checkbox />} label="Otros medios de pago electrónico" />
        </Box>
        {/* Compradores */}
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" sx={{ textAlign: "left", mb: 1 }}>
          Compradores
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: 2 }}>
          <InputLabel id="multi-comp-label" sx={{ minWidth: 260 }}>
            ¿El comprobante se emite a más de un comprador?
          </InputLabel>
          <Select
            labelId="multi-comp-label"
            id="multi-comp"
            defaultValue="no"
            sx={{ minWidth: 80 }}
          >
            <MenuItem value="no">No</MenuItem>
            <MenuItem value="si">Sí</MenuItem>
          </Select>
        </Box>
        {/* Comprobantes Asociados */}
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" sx={{ textAlign: "left", mb: 1 }}>
          Comprobantes Asociados
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: 2 }}>
          <Select
            id="tipo-comprobante-asoc"
            defaultValue="remito"
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="remito">Remito R</MenuItem>
            <MenuItem value="factura">Factura</MenuItem>
            <MenuItem value="nota">Nota de Crédito</MenuItem>
          </Select>
          <TextField
            id="pto-vta-asoc"
            label="Pto. Vta."
            variant="outlined"
            sx={{ width: 80 }}
          />
          <TextField
            id="comprobante-asoc"
            label="Comprobante"
            variant="outlined"
            sx={{ width: 120 }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha Emisión (Opc.)"
              sx={{ width: 160 }}
              format="DD/MM/YYYY"
            />
          </LocalizationProvider>
          <Button variant="contained" sx={{ minWidth: 40, px: 1, py: 0.5 }}>+</Button>
          <Button variant="outlined" sx={{ minWidth: 40, px: 1, py: 0.5 }}>-</Button>
        </Box>
        {/* aqui termina el codigo que necesitaba */}
      </Box>
    </Paper>
  );
}
