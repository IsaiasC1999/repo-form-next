import { Box, InputLabel, Select, MenuItem } from "@mui/material";

export default function CondicionFrenteIVAReceptorFacturaB({ value, onChange }: { value: { codigo: string, descripcion: string } | null, onChange: (v: { codigo: string, descripcion: string } | null) => void }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <InputLabel id="idivareceptor-label" sx={{ minWidth: 180 }}>Condición frente al IVA</InputLabel>
      <Select
        labelId="idivareceptor-label"
        id="idivareceptor"
        value={value}
        onChange={e => onChange({ codigo: e.target.value, descripcion: 
          e.target.value == "4" ? "IVA Sujeto Exento" :
          e.target.value == "5" ? "Consumidor Final" : null ||
          e.target.value == "7" ? "Sujeto No Categorizado" :
          e.target.value == "8" ? "Proveedor del Exterior" : null ||
          e.target.value == "9" ? "Cliente del Exterior" :
          e.target.value == "10" ? "IVA Liberado - Ley Nº 19.640" :
          e.target.value == "15" ? "IVA No Alcanzado" : "" })
        }
        sx={{ minWidth: 250 }}
      >
        <MenuItem value="">
          <em>Seleccionar...</em>
        </MenuItem>
        <MenuItem value="4">IVA Sujeto Exento</MenuItem>
        <MenuItem value="5">Consumidor Final</MenuItem>
        <MenuItem value="7">Sujeto No Categorizado</MenuItem>
        <MenuItem value="8">Proveedor del Exterior</MenuItem>
        <MenuItem value="9">Cliente del Exterior</MenuItem>
        <MenuItem value="10">IVA Liberado - Ley Nº 19.640</MenuItem>
        <MenuItem value="15">IVA No Alcanzado</MenuItem>
      </Select>
    </Box>
  );
}
