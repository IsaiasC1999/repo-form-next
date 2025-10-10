"use client";
import { useState } from "react";
import { TextField, Button, Box, Typography, Paper, Select, MenuItem, InputLabel, Input, FormHelperText, FormControl, FormControlLabel, Checkbox, Divider } from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CargaProductosComprobante from "./billing/components/CargaProductosComprobante";
import ResumenDatosFinales from "./billing/components/ResumenDatosFinales";
import { z } from "zod";
import { red } from "@mui/material/colors";
import DatosEmisionComprobantes from "./billing/components/DatosEmisionComprobantes";
import DatosReceptorComprobante from "./billing/components/DatosReceptorComprobante";
import PuntoVentaTipoComprobante from "./billing/components/PuntoVentaTipoComprobante";

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
         
          <PuntoVentaTipoComprobante />
        

          
          <DatosEmisionComprobantes />
          
        
          {/* Datos formulario receptor */}
          <DatosReceptorComprobante />
          

          
          <CargaProductosComprobante />
          

          {/* aqui necesito una pantala que muesta todo las previsualizacion de los datos cargados */}
          <ResumenDatosFinales />

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