import { Paper, Typography, Box, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchTiposComprobante, fetchPuntosVenta } from "../_api/actions";
import { useFormStore } from "../store/useFormStore";

export default function PuntoVentaTipoComprobante() {
  const [puntosVenta, setPuntosVenta] = useState<{ codigo: string, descripcion: string }[]>([]);
  const [tiposComprobante, setTiposComprobante] = useState<{ codigo: string, descripcion: string }[]>([]);
  
  // Zustand store
  const { puntoVenta, tipoComprobante, setPuntoVenta, setTipoComprobante } = useFormStore();
  
  useEffect(() => {
    fetchPuntosVenta().then((data) => {
      setPuntosVenta(data);
      // Solo establecer valor inicial si no hay uno seleccionado
      if (data.length > 0 && !puntoVenta) {
        setPuntoVenta({ codigo: data[0].codigo, descripcion: data[0].descripcion });
      }
    });
  }, []); // Sin dependencias para evitar bucle infinito

  useEffect(() => {
    fetchTiposComprobante().then((data) => {
      setTiposComprobante(data);
      // Solo establecer valor inicial si no hay uno seleccionado
      if (data.length > 0 && !tipoComprobante) {
        setTipoComprobante({ codigo: data[0].codigo, descripcion: data[0].descripcion });
      }
    });
  }, []); // Sin dependencias para evitar bucle infinito

  const handlePuntoVentaChange = (codigo: string) => {
    const selected = puntosVenta.find(pv => pv.codigo === codigo);
    setPuntoVenta(selected || null);
  };

  const handleTipoComprobanteChange = (codigo: string) => {
    const selected = tiposComprobante.find(tc => tc.codigo === codigo);
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
            value={puntoVenta?.codigo || ""}
            label="Punto de Venta a utilizar"
            sx={{ minWidth: "300px" }}
            onChange={e => handlePuntoVentaChange(e.target.value)}
          >
            <MenuItem value="">
              <em>Seleccionar...</em>
            </MenuItem>
            {puntosVenta.map(pv => (
              <MenuItem key={pv.codigo} value={pv.codigo}>{pv.descripcion}</MenuItem>
            ))}
          </Select>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2, mb: 2 }}>
          <InputLabel id="tipo-comprobante-label">Tipo de Comprobante</InputLabel>
          <Select
            labelId="tipo-comprobante-label"
            id="tipo-comprobante"
            value={tipoComprobante?.codigo || ""}
            label="Tipo de Comprobante"
            sx={{ minWidth: "300px" }}
            onChange={e => handleTipoComprobanteChange(e.target.value)}
          >
            <MenuItem value="">
              <em>Seleccionar...</em>
            </MenuItem>
            {tiposComprobante.map(tc => (
              <MenuItem key={tc.codigo} value={tc.codigo}>{tc.descripcion}</MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
    </Paper>
  );
}
