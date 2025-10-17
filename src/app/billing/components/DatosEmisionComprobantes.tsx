import { Paper, Typography, Box, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, Divider, TextField } from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState, useEffect } from "react";
import { arrayTiposDatosAdicionales } from "../_api/actions";
import MonedaExtranjeraForm from "./MonedaExtranjeraForm";
import { useFormStore } from "../store/useFormStore";
import dayjs from 'dayjs';

export default function DatosEmisionComprobantes() {

  const { setFechaComprobante, fechaComprobante , setConceptoStore , setMonedaExtranjeraStore , setActividadesStore , referenciaComercial , setReferenciaComercial } = useFormStore();

  // Estado para el select de conceptos
  const [concepto , setConcepto] = useState("");
  
  // Estado para la fecha del comprobante
  // const [fechaComprobante, setFechaComprobante] = useState(null);

  const [selectedActividad, setSelectedActividad] = useState("");
  const [actividades, setActividades] = useState<{ codigo: string, descripcion: string }[]>([]);
  const [monedaExtranjera, setMonedaExtranjera] = useState(true);

  useEffect(() => {
    arrayTiposDatosAdicionales().then((data: any) => {
      setActividades(data as { codigo: number, descripcion: string }[]);
      if (data.length > 0 && !selectedActividad) {
        setSelectedActividad(data[0].codigo);
      }
    });
  }, []); // Remover dependencias para evitar bucle infinito

  const handleFechaChange = (newValue: any) => {
    // Convertir el objeto dayjs a string para guardar en el store
    const fechaString = newValue ? dayjs(newValue).format('YYYY-MM-DD') : '';
    setFechaComprobante(fechaString);
  };

  // Convertir el string del store a objeto dayjs para el DatePicker
  const fechaValue = fechaComprobante ? dayjs(fechaComprobante) : null;
  
  return (
    <Paper sx={{ p: 2, mb: 2, fontSize: 1 }}>
      <Typography variant="h6" textAlign="center" gutterBottom>
        Datos emisión comprobantes
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, mb: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2, mb: 2 }}>
          <InputLabel id="fecha-comprobante-label">Fecha del Comprobante</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label="Fecha del Comprobante"
                value={fechaValue}
                onChange={handleFechaChange}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2, mb: 2 }}>
          <InputLabel id="conceptos-incluir-label">Conceptos a incluir</InputLabel>
          <Select
            labelId="conceptos-incluir-label"
            id="conceptos-incluir"
            value={concepto}
            label="Conceptos a incluir"
            sx={{ minWidth: "300px" }}
            onChange={e =>{
              setConcepto(e.target.value);
              const selectedText = e.target.value == "1" ? "Producto" : 
                        e.target.value == "2" ? "Servicio" : 
                        e.target.value == "3" ? "Producto y Servicio" : "";
                        console.log(selectedText + " seleccionado");
              setConceptoStore(e.target.value ? { codigo: e.target.value, descripcion: selectedText } : null);
            }}
          >
            <MenuItem defaultChecked value="" >
              <em>Seleccionar...</em>
            </MenuItem>
            <MenuItem value={1}>Producto</MenuItem>
            <MenuItem value={2}>Servicio</MenuItem>
            <MenuItem value={3}>Producto y Servicio</MenuItem>
          </Select>
        </Box>
        <Box sx={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "flex-start", gap: 5, ml: 5 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={monedaExtranjera}
                onChange={e => {
                  setMonedaExtranjera(e.target.checked);
                  setMonedaExtranjeraStore(e.target.checked);
                }}
              />
            }
            label="Moneda Extrajera"
          />
        </Box>
        {monedaExtranjera && (
          <MonedaExtranjeraForm />
        )}
        <Box sx={{ textAlign: "center", gap: 1, ml: 5 , mt:3}}>
          <Typography variant="subtitle1" textAlign="center" gutterBottom>
            Actividades Asociadas (Obligatorio según régimen específico (vgr. Remito Electrónico Cárnico, etc.)
          </Typography>
          <Divider variant="fullWidth" component="li" />
          <InputLabel id="actividad-label">Actividad</InputLabel>
          <Select
            labelId="actividad-label"
            id="actividad"
            value={selectedActividad}
            label="Actividad"
            sx={{ minWidth: "300px" }}
            onChange={e => { setSelectedActividad(e.target.value); setActividadesStore({ codigo: e.target.value, descripcion: actividades.find(op => op.codigo == e.target.value)?.descripcion || '' }); }}
          >
            <MenuItem value="" selected>
              <em>Seleccionar...</em>
            </MenuItem>
            {actividades.map(op => (
              <MenuItem key={op.codigo} value={op.codigo}>{op.descripcion}</MenuItem>
            ))}
          </Select>
        </Box>
        <Box sx={{ textAlign: "center", gap: 4, ml: 5, mt: 3, width: '100%' }}>
          <Typography variant="subtitle1" textAlign="center" gutterBottom>
            Referencia Comercial(opcional)
          </Typography>
          <Divider variant="middle" component="li" />
            const [referenciaComercial, setReferenciaComercial] = useState("");

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 , gap:1 }}>
            <InputLabel htmlFor="ReferenciaComercial">Referencia Comercial</InputLabel>
            <TextField
              id="ReferenciaComercial"
              label="Referencia Comercial"
              variant="outlined"
              sx={{ mt: 1 }}
              value={referenciaComercial}
              onChange={e => setReferenciaComercial(e.target.value)}
            />
            </Box>
        </Box>
      </Box>
    </Paper>
  );
}
