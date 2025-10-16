import { Paper, Typography, Box, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchTiposComprobante, fetchPuntosVenta } from "../_api/actions";
import { useFormStore } from "../store/useFormStore";

export default function PuntoVentaTipoComprobante() {
  const [puntosVenta, setPuntosVenta] = useState<{ value: string, label: string }[]>([]);
  const [tiposComprobante, setTiposComprobante] = useState<{ value: string, label: string }[]>([]);
  
  // Zustand store
  const { puntoVenta, tipoComprobante, setPuntoVenta, setTipoComprobante } = useFormStore();
  
  useEffect(() => {
    fetchPuntosVenta().then((data) => {
      setPuntosVenta(data as { value: string, label: string }[]);
      if (data.length > 0 && !puntoVenta) {
        setPuntoVenta(data[0]);
      }
    });
    fetchTiposComprobante().then((data) => {
      setTiposComprobante(data as { value: string, label: string }[]);
      if (data.length > 0 && !tipoComprobante) {
        setTipoComprobante(data[0]);
      }
    });
  }, [puntoVenta, tipoComprobante, setPuntoVenta, setTipoComprobante]);

  const handlePuntoVentaChange = (value: string) => {
    const selected = puntosVenta.find(pv => pv.value === value);
    setPuntoVenta(selected || null);
  };

  const handleTipoComprobanteChange = (value: string) => {
    const selected = tiposComprobante.find(tc => tc.value === value);
    setTipoComprobante(selected || null);
  };
  
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
            value={puntoVenta?.value || ""}
            label="Punto de Venta a utilizar"
            sx={{ minWidth: "300px" }}
            onChange={e => handlePuntoVentaChange(e.target.value)}
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
            value={tipoComprobante?.value || ""}
            label="Tipo de Comprobante"
            sx={{ minWidth: "300px" }}
            onChange={e => handleTipoComprobanteChange(e.target.value)}
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
