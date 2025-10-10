import { Paper, Typography, Box, InputLabel, Select, MenuItem, TextField, Divider, FormControlLabel, Checkbox, Button } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DatosReceptorComprobante() {
  return (
    <Paper sx={{ p: 2, mb: 2, fontSize: 1 , textAlign: 'center' }}>
      <Typography variant="h6" textAlign="center" gutterBottom>
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
  );
}
