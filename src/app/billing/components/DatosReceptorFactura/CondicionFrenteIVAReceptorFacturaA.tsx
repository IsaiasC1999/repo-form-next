import { Box, InputLabel, Select, MenuItem } from "@mui/material";

export default function CondicionFrenteIVAReceptorFacturaA({ value, onChange }: { value: string, onChange: (v: string) => void }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <InputLabel id="idivareceptor-label" sx={{ minWidth: 180 }}>Condición frente al IVA</InputLabel>
      <Select
        labelId="idivareceptor-label"
        id="idivareceptor"
        value={value}
        onChange={e => onChange(e.target.value)}
        sx={{ minWidth: 250 }}
      >
        <MenuItem value="">
          <em>Seleccionar...</em>
        </MenuItem>
        <MenuItem value="1">IVA Responsable Inscripto</MenuItem>
        <MenuItem value="6">Responsable Monotributo</MenuItem>
        <MenuItem value="13">Monotributista Social</MenuItem>
        <MenuItem value="16">Monotributista Trabajador Independiente Promovido</MenuItem>
      </Select>
    </Box>
  );
}
