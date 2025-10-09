"use client";
import { useState } from "react";
import { TextField, Button, Box, Typography, Paper, Select, MenuItem, InputLabel, Input, FormHelperText, FormControl } from "@mui/material";
import { z } from "zod";

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
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 8 }}>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" textAlign={
          "center"
        } gutterBottom>
          Facturacion
        </Typography>

        <Paper
          component={"form"}
          elevation={3}
          sx={{ width: 420, p: 4 }}
        >

          <Paper sx={{ p: 2, mb: 2, fontSize: 1 }}>

            <Typography variant="h6" textAlign={
              "center"
            } gutterBottom>
              Puntos de Ventas y Tipos de Comprobantes habilitados para impresión
            </Typography>
            <InputLabel id="demo-simple-select-label">Punto de Venta a utilizar</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={"gg"}
              label="Punto de Venta a utilizar"
            // onChange={handleChange}
            >
              <MenuItem value={"gg"}>General</MenuItem>
              <MenuItem value={"fg"}>Factura de Gas</MenuItem>
              <MenuItem value={"fe"}>Factura de Electricidad</MenuItem>
            </Select>
            <InputLabel id="demo-simple-select-label">Tipo de Comprobante</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={"gg"}
              label="Tipo de Comprobante"
            // onChange={handleChange}
            >
              <MenuItem value={"gg"}>General</MenuItem>
              <MenuItem value={"fg"}>Factura de Gas</MenuItem>
              <MenuItem value={"fe"}>Factura de Electricidad</MenuItem>
            </Select>
          </Paper>

           <Paper sx={{ p: 2, mb: 2, fontSize: 1 }}>

            <Typography variant="h6" textAlign={
              "center"
            } gutterBottom>
              Datos de emision
            </Typography>
            <InputLabel id="demo-simple-select-label">Punto de Venta a utilizar</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={"gg"}
              label="Punto de Venta a utilizar"
            // onChange={handleChange}
            >
              <MenuItem value={"gg"}>General</MenuItem>
              <MenuItem value={"fg"}>Factura de Gas</MenuItem>
              <MenuItem value={"fe"}>Factura de Electricidad</MenuItem>
            </Select>
            <InputLabel id="demo-simple-select-label">Tipo de Comprobante</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={"gg"}
              label="Tipo de Comprobante"
            // onChange={handleChange}
            >
              <MenuItem value={"gg"}>General</MenuItem>
              <MenuItem value={"fg"}>Factura de Gas</MenuItem>
              <MenuItem value={"fe"}>Factura de Electricidad</MenuItem>
            </Select>
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
