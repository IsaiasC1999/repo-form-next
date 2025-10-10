import { Paper, Typography, Box, InputLabel, TextField, Select, MenuItem, Button } from "@mui/material";

export default function CargaProductosComprobante() {
  return (
    <Paper sx={{ p: 2, mb: 2, fontSize: 1 }}>
      <Typography variant="h6" textAlign="center" gutterBottom>
        Datos de la Operación (Paso 3 de 4)
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1, mb: 2 }}>
        <InputLabel sx={{ minWidth: 60 }}>Código</InputLabel>
        <TextField id="codigo" variant="outlined" size="small" sx={{ width: 80 }} />
        <InputLabel sx={{ minWidth: 120 }}>Producto/Servicio</InputLabel>
        <TextField id="producto" variant="outlined" size="small" sx={{ width: 180 }} />
        <InputLabel sx={{ minWidth: 40 }}>Cant.</InputLabel>
        <TextField id="cantidad" variant="outlined" size="small" sx={{ width: 60 }} defaultValue={1} />
        <InputLabel sx={{ minWidth: 80 }}>U. Medida</InputLabel>
        <Select id="unidad-medida" defaultValue="" size="small" sx={{ width: 120 }}>
          <MenuItem value="">Seleccionar...</MenuItem>
          <MenuItem value="unidad">Unidad</MenuItem>
          <MenuItem value="kg">Kg</MenuItem>
          <MenuItem value="litro">Litro</MenuItem>
          {/* ...otros valores... */}
        </Select>
        <InputLabel sx={{ minWidth: 80 }}>Prec. Unitario</InputLabel>
        <TextField id="precio-unitario" variant="outlined" size="small" sx={{ width: 100 }} />
        <InputLabel sx={{ minWidth: 60 }}>% Bon.</InputLabel>
        <TextField id="porc-bon" variant="outlined" size="small" sx={{ width: 60 }} defaultValue={0} />
        <InputLabel sx={{ minWidth: 80 }}>Importe Bon.</InputLabel>
        <TextField id="importe-bon" variant="outlined" size="small" sx={{ width: 100 }} />
        <InputLabel sx={{ minWidth: 80 }}>Alícuota IVA</InputLabel>
        <Select id="iva" defaultValue="" size="small" sx={{ width: 80 }}>
          <MenuItem value="">Selec</MenuItem>
          <MenuItem value="21">21%</MenuItem>
          <MenuItem value="10.5">10.5%</MenuItem>
          <MenuItem value="27">27%</MenuItem>
          {/* ...otros valores... */}
        </Select>
        <InputLabel sx={{ minWidth: 60 }}>Subtotal</InputLabel>
        <TextField id="subtotal" variant="outlined" size="small" sx={{ width: 100 }} disabled />
        <Button variant="outlined" color="error" sx={{ minWidth: 40, px: 1, py: 0.5 }}>X</Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button variant="contained">Agregar línea descripción</Button>
      </Box>
      {/* Campos de totales a la derecha */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2, mt: 3, pr: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <InputLabel sx={{ minWidth: 110 }}>Subtotal:</InputLabel>
          <InputLabel sx={{ minWidth: 20 }}> $ </InputLabel>
          <TextField
            id="subtotal-final"
            variant="outlined"
            size="small"
            sx={{ width: 100 }}
            value="1000.00"
            disabled
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <InputLabel sx={{ minWidth: 110 }}>Importe Otros Tributos:</InputLabel>
          <InputLabel sx={{ minWidth: 20 }}> $ </InputLabel>
          <TextField
            id="importe-otros-tributos"
            variant="outlined"
            size="small"
            sx={{ width: 100 }}
            value="0.00"
            disabled
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <InputLabel sx={{ minWidth: 110 }}>Importe Total:</InputLabel>
          <InputLabel sx={{ minWidth: 20 }}> $ </InputLabel>
          <TextField
            id="importe-total"
            variant="outlined"
            size="small"
            sx={{ width: 100 }}
            value="1000.00"
            disabled
          />
        </Box>
      </Box>
      //aqui necesito los form para la suma de los subtotales
    </Paper>
  );
}
