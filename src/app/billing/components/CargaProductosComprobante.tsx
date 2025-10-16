import { useEffect, useState } from "react";
import { Paper, Typography, Box, InputLabel, TextField, Button } from "@mui/material";
import { unidadesDeMedida, getCondicionesIVA, getProductosByCodigo } from "../_api/actions";
import ItemProducto from "./ItemProducto";

export default function CargaProductosComprobante() {
  const [items, setItems] = useState([{ id: 1 }]);
  const [itemSubtotals, setItemSubtotals] = useState<{[key: number]: number}>({});

  useEffect(() => {
    unidadesDeMedida().then((data: any) => {
      // Si el backend devuelve un array de objetos { codigo, descripcion }
      
    });
    getCondicionesIVA().then((data: any) => {
      // Si el backend devuelve un array de objetos { codigo, descripcion }
      
    });
  }, []);

  const handleSubtotalChange = (itemId: number, subtotal: number) => {
    setItemSubtotals(prev => ({
      ...prev,
      [itemId]: subtotal
    }));
  };

  const subtotalFinal = Object.values(itemSubtotals).reduce((sum, subtotal) => sum + subtotal, 0);
  const importeTotal = subtotalFinal; // Por ahora igual al subtotal, luego se puede agregar otros tributos

  const agregarItem = () => {
    const newId = Math.max(...items.map(item => item.id)) + 1;
    setItems([...items, { id: newId }]);
  };

  const eliminarItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
      // Remover el subtotal del item eliminado
      setItemSubtotals(prev => {
        const newSubtotals = { ...prev };
        delete newSubtotals[id];
        return newSubtotals;
      });
    }
  };

  return (
    <Paper sx={{ p: 2, mb: 2, fontSize: 1, width: 1100, ml: "auto", mr: "auto" }}>
      <Typography variant="h6" textAlign="center" gutterBottom>
        Datos de la Operación 
      </Typography>
      
      {items.map((item) => (
        <ItemProducto 
          key={item.id} 
          itemId={item.id}
          onEliminar={() => eliminarItem(item.id)}
          showEliminar={items.length > 1}
          onSubtotalChange={handleSubtotalChange}
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
            value={subtotalFinal.toFixed(2)}
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
