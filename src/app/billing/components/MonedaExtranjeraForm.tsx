import { Box, FormControlLabel, Checkbox, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { monedaExtranjera } from "../_api/actions";

export default function MonedaExtranjeraForm() {
  const [mismaMoneda, setMismaMoneda] = useState(false);
  const [moneda, setMoneda] = useState("");
  const [tipoCambio, setTipoCambio] = useState("");
  const [monedas, setMonedas] = useState<{ codigo: string, descripcion: string }[]>([]);
  

  useEffect(() => {
      monedaExtranjera().then((data: any) => {
      setMonedas(data as { codigo: string, descripcion: string }[]);
       if (data.length > 0) setMoneda("nada");
    });
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={mismaMoneda}
            onChange={e => setMismaMoneda(e.target.checked)}
          />
        }
        label="El pago se realiza en la misma moneda"
      />
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <InputLabel id="moneda-label">Moneda</InputLabel>
        <Select
          labelId="moneda-label"
          id="moneda"
          value={moneda}
          label="Moneda"
          sx={{ minWidth: "200px" }}
          onChange={e => setMoneda(e.target.value)}
        >
          <MenuItem key={"default"} value="" selected>
            <em>Seleccionar...</em>
          </MenuItem>
          {monedas.map(m => (
            <MenuItem key={m.codigo} value={m.codigo}>{m.descripcion}</MenuItem>
          ))}
        </Select>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <InputLabel htmlFor="tipo-cambio">Tipo de Cambio</InputLabel>
        <TextField
          id="tipo-cambio"
          label="Tipo de Cambio"
          variant="outlined"
          value={tipoCambio}
          onChange={e => setTipoCambio(e.target.value)}
          sx={{ minWidth: "120px" }}
        />
      </Box>
    </Box>
  );
}
