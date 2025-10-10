"use client";
import { useState } from "react";
import { TextField, Button, Box, Typography, Paper, Select, MenuItem, InputLabel, Input, FormHelperText, FormControl, FormControlLabel, Checkbox, Divider } from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PuntoVentaTipoComprobante from "./PuntoVentaTipoComprobante";
import DatosEmisionComprobantes from "./DatosEmisionComprobantes";

import { z } from "zod";
import { red } from "@mui/material/colors";

const schema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
});

export default function Home() {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse({ name });
    if (!result.success) {
      setError(result.error.message);
      setSubmitted(false);
    } else {
      setError(null);
      setSubmitted(true);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 8 }}>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" textAlign={
          "center"
        } gutterBottom>
          Facturacion
        </Typography>

        <Paper
          component={"form"}
          elevation={3}
          sx={{ width: 700, p: 4, ml: "auto", mr: "auto" }}
        >
          {/* formulario de punto de venta y tipo de comprobante */}
          <PuntoVentaTipoComprobante />
        {/* fin formulario de punto de venta y tipo de comprobante */}

          {/* Datos de emision comprobantes */}
          <DatosEmisionComprobantes />
          {/* fin Datos de emision comprobantes */}
        
          {/* Datos formulario receptor */}
          <Paper sx={{ p: 2, mb: 2, fontSize: 1 , textAlign: 'center' }}>
              <Typography variant="h6" textAlign={
              "center"
            } gutterBottom>
              Datos Receptor Comprobante
            </Typography>
             <Box sx={{ p: 2, mb: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <InputLabel id="iva-label" sx={{ minWidth: 180 }}>Condición frente al IVA</InputLabel>
              <Select
                labelId="iva-label"
                id="iva"
                defaultValue=""
                sx={{ minWidth: 220 }}
              >
                <MenuItem value="">Seleccionar...</MenuItem>
                <MenuItem value="responsable_inscripto">Responsable Inscripto</MenuItem>
                <MenuItem value="monotributo">Monotributo</MenuItem>
                <MenuItem value="exento">Exento</MenuItem>
                <MenuItem value="consumidor_final">Consumidor Final</MenuItem>
              </Select>
            </Box>
            
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <InputLabel id="tipo-doc-label" sx={{ minWidth: 180 }}>Tipo y Nro. de Documento</InputLabel>
              <Select
                labelId="tipo-doc-label"
                id="tipo-doc"
                defaultValue=""
                sx={{ minWidth: 140 }}
              >
                <MenuItem value="">Seleccionar...</MenuItem>
                <MenuItem value="dni">DNI</MenuItem>
                <MenuItem value="cuit">CUIT</MenuItem>
                <MenuItem value="pasaporte">Pasaporte</MenuItem>
              </Select>
              <TextField
                id="nro-doc"
                label="Nro."
                variant="outlined"
                sx={{ minWidth: 180 }}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <InputLabel htmlFor="razon-social" sx={{ minWidth: 180 }}>A. y Nombre o Razón Social</InputLabel>
              <TextField
                id="razon-social"
                label="Razón Social"
                variant="outlined"
                sx={{ minWidth: 400 }}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <InputLabel htmlFor="domicilio-comercial" sx={{ minWidth: 180 }}>Domicilio Comercial</InputLabel>
              <TextField
                id="domicilio-comercial"
                label="Domicilio Comercial"
                variant="outlined"
                sx={{ minWidth: 400 }}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <InputLabel htmlFor="email" sx={{ minWidth: 180 }}>Email</InputLabel>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                sx={{ minWidth: 300 }}
              />
            </Box>
            {/* aqui necesito mas codigo que te pasare  */}
            {/* Condiciones de Venta */}
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" sx={{ textAlign: "left", mb: 1 }}>
              Condiciones de Venta
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", ml: 2 }}>
              <FormControlLabel control={<Checkbox />} label="Contado" />
              <FormControlLabel control={<Checkbox />} label="Tarjeta de Débito" />
              <FormControlLabel control={<Checkbox />} label="Tarjeta de Crédito" />
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
          

        </Paper>

        {submitted && (
          <Typography color="success.main" sx={{ mt: 2 }}>
            ¡Formulario enviado correctamente!
          </Typography>
        )}
      </Paper>
      
    </Box>
  );
}
         