import { Paper, Typography, Box, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchTiposComprobante, fetchPuntosVenta } from "../_api/actions";

export default function PuntoVentaTipoComprobante() {
  const [puntosVenta, setPuntosVenta] = useState<{ value: string, label: string }[]>([]);
  const [selectedPuntoVenta, setSelectedPuntoVenta] = useState("");
  const [tiposComprobante, setTiposComprobante] = useState<{ value: string, label: string }[]>([]);
  const [selectedTipoComprobante, setSelectedTipoComprobante] = useState("");
    
  useEffect(() => {
    fetchPuntosVenta().then((data: any) => {
      setPuntosVenta(data as { value: string, label: string }[]);
      if (data.length > 0) setSelectedPuntoVenta(data[0].value);
    });
    fetchTiposComprobante().then((data: any) => {
      setTiposComprobante(data as { value: string, label: string }[]);
      if (data.length > 0) setSelectedTipoComprobante(data[0].value);
    });
  }, []);
  
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
            value={selectedPuntoVenta}
            label="Punto de Venta a utilizar"
            sx={{ minWidth: "300px" }}
            onChange={e => setSelectedPuntoVenta(e.target.value)}
          >
            <MenuItem value="">
              <em>Seleccionar...</em>
            </MenuItem>
            {puntosVenta.map(pv => (
              <MenuItem key={pv.value} value={pv.value}>{pv.label}</MenuItem>
            ))}
          </Select>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2, mb: 2 }}>
          <InputLabel id="tipo-comprobante-label">Tipo de Comprobante</InputLabel>
          <Select
            labelId="tipo-comprobante-label"
            id="tipo-comprobante"
            value={selectedTipoComprobante}
            label="Tipo de Comprobante"
            sx={{ minWidth: "300px" }}
            onChange={e => setSelectedTipoComprobante(e.target.value)}
          >
            <MenuItem value="">
              <em>Seleccionar...</em>
            </MenuItem>
            {tiposComprobante.map(tc => (
              <MenuItem key={tc.value} value={tc.value}>{tc.label}</MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
    </Paper>
  );
}
