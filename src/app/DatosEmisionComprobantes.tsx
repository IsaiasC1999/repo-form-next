import { Paper, Typography, Box, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, Divider, TextField } from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DatosEmisionComprobantes() {
  return (
    <Paper sx={{ p: 2, mb: 2, fontSize: 1 }}>
      <Typography variant="h6" textAlign="center" gutterBottom>
        Datos emisión comprobantes
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, mb: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2, mb: 2 }}>
          <InputLabel id="fecha-comprobante-label">Fecha del Comprobante</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker label="Basic date picker" />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2, mb: 2 }}>
          <InputLabel id="conceptos-incluir-label">Conceptos a incluir</InputLabel>
          <Select
            labelId="conceptos-incluir-label"
            id="conceptos-incluir"
            value={"gg"}
            label="Tipo de Comprobante"
            sx={{ minWidth: "300px" }}
          >
            <MenuItem value={"gg"}>Producto</MenuItem>
            <MenuItem value={"fg"}>Servicio</MenuItem>
            <MenuItem value={"fe"}>Producto y Servicio</MenuItem>
          </Select>
        </Box>
        <Box sx={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "flex-start", gap: 5, ml: 5 }}>
          <FormControlLabel control={<Checkbox defaultChecked />} label="Moneda Extrajera" />
        </Box>
        <Box sx={{ textAlign: "center", gap: 1, ml: 5 , mt:3}}>
          <Typography variant="subtitle1" textAlign="center" gutterBottom>
            Actividades Asociadas (Obligatorio según régimen específico (vgr. Remito Electrónico Cárnico, etc.)
          </Typography>
          <Divider variant="fullWidth" component="li" />
          <InputLabel id="actividad-label">Actividad</InputLabel>
          <Select
            labelId="actividad-label"
            id="actividad"
            value={"gg"}
            label="Tipo de Comprobante"
            sx={{ minWidth: "300px" }}
          >
            <MenuItem value={"gg"}>Venta de Autos y Camionetas</MenuItem>
            <MenuItem value={"fg"}>Venta de vehículos automotores</MenuItem>
            <MenuItem value={"fe"}>Producto y Servicio</MenuItem>
          </Select>
        </Box>
        <Box sx={{ textAlign: "center", gap: 4, ml: 5, mt: 3, width: '100%' }}>
          <Typography variant="subtitle1" textAlign="center" gutterBottom>
            Referencia Comercial(opcional)
          </Typography>
          <Divider variant="middle" component="li" />
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 , gap:1 }}>
            <InputLabel htmlFor="ReferenciaComercial">Referencia Comercial</InputLabel>
            <TextField id="ReferenciaComercial" label="Referencia Comercial" variant="outlined" sx={{ mt: 1 }} />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
