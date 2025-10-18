import { useEffect } from "react";
import { Paper, Typography, Box, InputLabel, TextField, Button } from "@mui/material";
import { unidadesDeMedida, getCondicionesIVA, getProductosByCodigo } from "../_api/actions";
import ItemProducto from "./ItemProducto";
import { useFormStore } from "../store/useFormStore";

export default function CargaProductosComprobante() {
  const { productosData, addProductoItem, removeProductoItem, subtotalFactura, totalFactura } = useFormStore();

  // Asegurar que productosData sea un array
  const productos = Array.isArray(productosData) ? productosData : [];

  // Inicializar con un producto si está vacío
  useEffect(() => {
    if (productos.length === 0) {
      addProductoItem({
        id: 1,
        codigo: "",
        productoDescripcion: "",
        cantidad: "1",
        unidadMedida: { codigo: "00", descripcion: "" },
        precioUnitario: "",
        porcentajeBonificacion: "0",
        importeBonificacion: "0",
        alicuotaIVA: { codigo: "", descripcion: "" },
        subtotal: "0"
      });
    }
  }, [productos.length, addProductoItem]);

  const importeTotal = totalFactura; // Por ahora igual al subtotal, luego se puede agregar otros tributos

  const agregarItem = () => {
    const newId = productos.length > 0 
      ? Math.max(...productos.map(item => item.id)) + 1 
      : 1;
    
    addProductoItem({
      id: newId,
      codigo: "",
      productoDescripcion: "",
      cantidad: "1",
      unidadMedida: { codigo: "00", descripcion: "seleccionar" },
      precioUnitario: "",
      porcentajeBonificacion: "0",
      importeBonificacion: "0",
      alicuotaIVA: { codigo: "seleccionar", descripcion: "" },
      subtotal: "0"
    });
  };

  const eliminarItem = (id: number) => {
    if (productos.length > 1) {
      removeProductoItem(id);
    }
  };

  return (
    <Paper sx={{ p: 2, mb: 2, fontSize: 1, width: 1100, ml: "auto", mr: "auto" }}>
      <Typography variant="h6" textAlign="center" gutterBottom>
        Datos de la Operación 
      </Typography>
      
      {productos.map((item) => (
        <ItemProducto 
          key={item.id} 
          itemId={item.id}
          onEliminar={() => eliminarItem(item.id)}
          showEliminar={productos.length > 1}
          
        />
      ))}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button variant="contained" onClick={agregarItem}>
          Agregar línea descripción
        </Button>
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
            value={subtotalFactura.toFixed(2)}
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
            value={importeTotal.toFixed(2)}
            disabled
          />
        </Box>
      </Box>
    </Paper>
  );
}
