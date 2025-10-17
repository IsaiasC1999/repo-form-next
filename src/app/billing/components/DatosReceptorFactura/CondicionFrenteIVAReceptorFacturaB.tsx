import { Box, InputLabel, Select, MenuItem } from "@mui/material";

const condicionesIVA = [
  { codigo: "4", descripcion: "IVA Sujeto Exento" },
  { codigo: "5", descripcion: "Consumidor Final" },
  { codigo: "7", descripcion: "Sujeto No Categorizado" },
  { codigo: "8", descripcion: "Proveedor del Exterior" },
  { codigo: "9", descripcion: "Cliente del Exterior" },
  { codigo: "10", descripcion: "IVA Liberado - Ley Nº 19.640" },
  { codigo: "15", descripcion: "IVA No Alcanzado" }
];

export default function CondicionFrenteIVAReceptorFacturaB({ value, onChange }: { value: { codigo: string, descripcion: string } | null, onChange: (v: { codigo: string, descripcion: string } | null) => void }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <InputLabel id="idivareceptor-label" sx={{ minWidth: 180 }}>Condición frente al IVA</InputLabel>
      <Select
        labelId="idivareceptor-label"
        id="idivareceptor"
        value={value?.codigo || ""}
        onChange={e => {
          const selectedCondicion = condicionesIVA.find(c => c.codigo === e.target.value);
          onChange(selectedCondicion || null);
        }}
        sx={{ minWidth: 250 }}
      >
        <MenuItem value="">
          <em>Seleccionar...</em>
        </MenuItem>
        {condicionesIVA.map((condicion) => (
          <MenuItem key={condicion.codigo} value={condicion.codigo}>
            {condicion.descripcion}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
