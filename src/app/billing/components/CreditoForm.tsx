import { useState } from "react";
import { FormControlLabel, Checkbox, Box, Typography, Select, MenuItem, TextField, Button } from "@mui/material";

export default function CreditoForm() {
  const [creditoChecked, setCreditoChecked] = useState(false);
  const [tipoTarjeta, setTipoTarjeta] = useState("");
  const [numeroTarjeta, setNumeroTarjeta] = useState("");

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={creditoChecked}
            onChange={e => setCreditoChecked(e.target.checked)}
          />
        }
        label="Tarjeta de Crédito"
      />
      {creditoChecked && (
        <Box sx={{ background: "rgba(0,0,0,0.03)", p: 2, borderRadius: 2, mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="caption" sx={{ ml: 1 }}>Tipo</Typography>
              <Select
                value={tipoTarjeta}
                onChange={e => setTipoTarjeta(e.target.value)}
                sx={{ minWidth: 180 }}
                displayEmpty
              >
                <MenuItem value="">seleccionar...</MenuItem>
                <MenuItem value="american_express">American Express</MenuItem>
                <MenuItem value="visa">Visa</MenuItem>
                <MenuItem value="mastercard">Mastercard</MenuItem>
                <MenuItem value="credencial">Credencial</MenuItem>
                <MenuItem value="carta_franca">Carta Franca</MenuItem>
                <MenuItem value="cabal">Cabal</MenuItem>
                <MenuItem value="diners">Diners</MenuItem>
                <MenuItem value="tarjeta_shopping">Tarjeta Shopping</MenuItem>
                <MenuItem value="tarjeta_naranja">Tarjeta Naranja</MenuItem>
                <MenuItem value="otra">Otra...</MenuItem>
              </Select>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="caption" sx={{ ml: 1 }}>Número</Typography>
              <TextField
                value={numeroTarjeta}
                onChange={e => setNumeroTarjeta(e.target.value)}
                sx={{ minWidth: 180 }}
                size="small"
              />
            </Box>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => setNumeroTarjeta("")}
              sx={{ minWidth: 32, px: 1 }}
            >
              X
            </Button>
            <Button variant="contained" size="small" sx={{ ml: 1 }}>
              Agregar
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}
