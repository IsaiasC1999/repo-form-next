import { Box, InputLabel, Select, MenuItem } from "@mui/material";

const condicionesIVA = [
  { codigo: "1", descripcion: "IVA Responsable Inscripto" },
  { codigo: "6", descripcion: "Responsable Monotributo" },
  { codigo: "13", descripcion: "Monotributista Social" },
  { codigo: "16", descripcion: "Monotributista Trabajador Independiente Promovido" }
];

export default function CondicionFrenteIVAReceptorFacturaA({ value, onChange }: { value: { codigo: string, descripcion: string } | null, onChange: (v: { codigo: string, descripcion: string } | null) => void }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <InputLabel id="idivareceptor-label" sx={{ minWidth: 180 }}>Condición frente al IVA</InputLabel>
      <Select
        labelId="idivareceptor-label"
        id="idivareceptor"
        value={value?.codigo || ""}
        onChange={e => {
          const selectedCondicion = condicionesIVA.find(c => c.codigo === e.target.value);
          onChange({codigo: selectedCondicion?.codigo || "", descripcion: selectedCondicion?.descripcion || ""});
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
