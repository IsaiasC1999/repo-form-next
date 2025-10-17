import { Paper, Typography, Box, InputLabel, Select, MenuItem, TextField, Divider, FormControlLabel, Checkbox, Button } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DatosReceptorComprobanteDetail from "../DatosReceptorComprobanteDetail";
import DebitoForm from "../DebitoForm";
import { useState } from "react";
import CreditoForm from "../CreditoForm";
import { useFormStore } from "../../store/useFormStore";

export default function DatosReceptorComprobante() {
  // const [condicionesVenta, setCondicionesVenta] = useState<string[]>([]);
  const {condicionesVenta,setCondicionesVenta} = useFormStore();
  const handleCheckboxChange = (condicion: string, checked: boolean) => {
    const currentArray = Array.isArray(condicionesVenta) ? condicionesVenta : [];
    
    if (checked) {
      // Agregar la condición si no está ya en el array
      const newCondiciones = [...currentArray, condicion];
      console.log("Condiciones de venta seleccionadas:", newCondiciones);
      setCondicionesVenta(newCondiciones);
    } else {
      // Remover la condición del array
      const newCondiciones = currentArray.filter(item => item !== condicion);
      console.log("Condiciones de venta seleccionadas:", newCondiciones);
      setCondicionesVenta(newCondiciones);
    }
  };

  return (
    <Paper sx={{ p: 2, mb: 2, fontSize: 1 , textAlign: 'center' }}>
      <Typography variant="h6" textAlign="center" gutterBottom>
        Datos Receptor Comprobante
      </Typography>
      <Box sx={{ p: 2, mb: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        
        <DatosReceptorComprobanteDetail />
      
        
        
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" sx={{ textAlign: "left", mb: 1 }}>
          Condiciones de Venta
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", ml: 2 }}>
          <FormControlLabel 
            control={
              <Checkbox 
                checked={Array.isArray(condicionesVenta) && condicionesVenta.includes("Contado")}
                onChange={(e) => handleCheckboxChange("Contado", e.target.checked)}
              />
            } 
            label="Contado" 
          />
          <DebitoForm />
          <CreditoForm />
          <FormControlLabel 
            control={
              <Checkbox 
                checked={Array.isArray(condicionesVenta) && condicionesVenta.includes("Cuenta Corriente")}
                onChange={(e) => handleCheckboxChange("Cuenta Corriente", e.target.checked)}
              />
            } 
            label="Cuenta Corriente" 
          />
          <FormControlLabel 
            control={
              <Checkbox 
                checked={Array.isArray(condicionesVenta) && condicionesVenta.includes("Cheque")}
                onChange={(e) => handleCheckboxChange("Cheque", e.target.checked)}
              />
            } 
            label="Cheque" 
          />
          <FormControlLabel 
            control={
              <Checkbox 
                checked={Array.isArray(condicionesVenta) && condicionesVenta.includes("Transferencia Bancaria")}
                onChange={(e) => handleCheckboxChange("Transferencia Bancaria", e.target.checked)}
              />
            } 
            label="Transferencia Bancaria" 
          />
          <FormControlLabel 
            control={
              <Checkbox 
                checked={Array.isArray(condicionesVenta) && condicionesVenta.includes("Otra")}
                onChange={(e) => handleCheckboxChange("Otra", e.target.checked)}
              />
            } 
            label="Otra" 
          />
          <FormControlLabel 
            control={
              <Checkbox 
                checked={Array.isArray(condicionesVenta) && condicionesVenta.includes("Otros medios de pago electrónico")}
                onChange={(e) => handleCheckboxChange("Otros medios de pago electrónico", e.target.checked)}
              />
            } 
            label="Otros medios de pago electrónico" 
          />
        </Box>
        {/* Compradores */}
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" sx={{ textAlign: "left", mb: 1 }}>
          Compradores
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: 2 }}>
          <InputLabel id="multi-comp-label" sx={{ minWidth: 260 }}>
            ¿El comprobante se emite a más de un comprador?
          </InputLabel>
          <Select
            labelId="multi-comp-label"
            id="multi-comp"
            defaultValue="no"
            sx={{ minWidth: 80 }}
          >
            <MenuItem value="no">No</MenuItem>
            <MenuItem value="si">Sí</MenuItem>
          </Select>
        </Box>
        {/* Comprobantes Asociados */}
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" sx={{ textAlign: "left", mb: 1 }}>
          Comprobantes Asociados
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: 2 }}>
          <Select
            id="tipo-comprobante-asoc"
            defaultValue="remito"
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="remito">Remito R</MenuItem>
            <MenuItem value="factura">Factura</MenuItem>
            <MenuItem value="nota">Nota de Crédito</MenuItem>
          </Select>
          <TextField
            id="pto-vta-asoc"
            label="Pto. Vta."
            variant="outlined"
            sx={{ width: 80 }}
          />
          <TextField
            id="comprobante-asoc"
            label="Comprobante"
            variant="outlined"
            sx={{ width: 120 }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha Emisión (Opc.)"
              sx={{ width: 160 }}
              format="DD/MM/YYYY"
            />
          </LocalizationProvider>
          <Button variant="contained" sx={{ minWidth: 40, px: 1, py: 0.5 }}>+</Button>
          <Button variant="outlined" sx={{ minWidth: 40, px: 1, py: 0.5 }}>-</Button>
        </Box>
        {/* aqui termina el codigo que necesitaba */}
      </Box>
    </Paper>
  );
}
