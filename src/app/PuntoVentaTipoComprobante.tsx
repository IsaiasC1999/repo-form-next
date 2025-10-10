import { Paper, Typography, Box, InputLabel, Select, MenuItem } from "@mui/material";

export default function PuntoVentaTipoComprobante() {
  return (
    <Paper sx={{ p: 2, mb: 2, fontSize: 1 }}>
      <Typography variant="h6" textAlign="center" gutterBottom>
        Puntos de Ventas y Tipos de Comprobantes habilitados para impresión
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, mb: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2, mb: 2 }}>
          <InputLabel id="punto-venta-label">Punto de Venta a utilizar</InputLabel>
          <Select
            labelId="punto-venta-label"
            id="punto-venta"
            value={"gg"}
            label="Punto de Venta a utilizar"
            sx={{ minWidth: "300px" }}
          >
            <MenuItem value={"gg"}>General</MenuItem>
            <MenuItem value={"fg"}>Factura de Gas</MenuItem>
            <MenuItem value={"fe"}>Factura de Electricidad</MenuItem>
          </Select>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2, mb: 2 }}>
          <InputLabel id="tipo-comprobante-label">Tipo de Comprobante</InputLabel>
          <Select
            labelId="tipo-comprobante-label"
            id="tipo-comprobante"
            value={"gg"}
            label="Tipo de Comprobante"
            sx={{ minWidth: "300px" }}
          >
            <MenuItem value={"gg"}>General</MenuItem>
            <MenuItem value={"fg"}>Factura de Gas</MenuItem>
            <MenuItem value={"fe"}>Factura de Electricidad</MenuItem>
          </Select>
        </Box>
      </Box>
    </Paper>
  );
}
