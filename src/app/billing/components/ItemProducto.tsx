import { useEffect, useState } from "react";
import { Box, InputLabel, TextField, Select, MenuItem, Button } from "@mui/material";
import { unidadesDeMedida, getCondicionesIVA, getProductosByCodigo } from "../_api/actions";

interface ItemProductoProps {
  itemId: number;
  onEliminar: () => void;
  showEliminar: boolean;
  onSubtotalChange: (itemId: number, subtotal: number) => void;
}

export default function ItemProducto({ itemId, onEliminar, showEliminar, onSubtotalChange }: ItemProductoProps) {
  const [unidadMedidaOptions, setUnidadMedidaOptions] = useState<{ codigo: string, descripcion: string }[]>([]);
  const [unidadMedida, setUnidadMedida] = useState("");
  const [condicionesIVAOptions, setCondicionesIVAOptions] = useState<{ codigo: number, descripcion: string }[]>([]);
  const [iva, setIva] = useState("");
  const [codigo, setCodigo] = useState("");
  const [productoDescripcion, setProductoDescripcion] = useState("");
  const [precioUnitario, setPrecioUnitario] = useState("");
  const [cantidad, setCantidad] = useState("1");
  const [subtotal, setSubtotal] = useState("");

  useEffect(() => {
    unidadesDeMedida().then((data: any) => {
      setUnidadMedidaOptions(data);
    });
    getCondicionesIVA().then((data: any) => {
      setCondicionesIVAOptions(Array.isArray(data) ? data : []);
    });
  }, []);

  useEffect(() => {
    if (codigo.trim() !== "") {
      getProductosByCodigo(codigo).then((data: any) => {
        if (data && Array.isArray(data) && data.length > 0 && "descripcion" in data[0]) {
          setProductoDescripcion(data[0].descripcion);
          setPrecioUnitario(data[0].precioUnitario?.toString() ?? "");
        } else {
          setProductoDescripcion("");
          setPrecioUnitario("");
        }
      });
    } else {
      setProductoDescripcion("");
      setPrecioUnitario("");
    }
  }, [codigo]);

  useEffect(() => {
    const cant = parseFloat(cantidad) || 0;
    const precio = parseFloat(precioUnitario) || 0;
    const result = cant * precio;
    const subtotalValue = result > 0 ? result : 0;
    setSubtotal(subtotalValue > 0 ? subtotalValue.toFixed(2) : "");
    
    // Notificar al componente padre sobre el cambio de subtotal
    onSubtotalChange(itemId, subtotalValue);
  }, [cantidad, precioUnitario, itemId, onSubtotalChange]);

  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "flex-end", gap: 1, mb: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <InputLabel sx={{ minWidth: 60 }}>Código</InputLabel>
        <TextField
          variant="outlined"
          size="small"
          sx={{ width: 80 }}
          value={codigo}
          onChange={e => setCodigo(e.target.value)}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <InputLabel sx={{ minWidth: 120 }}>Producto/Servicio</InputLabel>
        <TextField
          variant="outlined"
          size="small"
          sx={{ width: 180 }}
          multiline
          minRows={2}
          maxRows={4}
          value={productoDescripcion}
          onChange={e => setProductoDescripcion(e.target.value)}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <InputLabel sx={{ minWidth: 40 }}>Cant.</InputLabel>
        <TextField
          variant="outlined"
          size="small"
          sx={{ width: 60 }}
          value={cantidad}
          onChange={e => setCantidad(e.target.value)}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <InputLabel sx={{ minWidth: 80 }}>U. Medida</InputLabel>
        <Select
          value={unidadMedida}
          onChange={e => setUnidadMedida(e.target.value)}
          size="small"
          sx={{ width: 120 }}
          displayEmpty
        >
          <MenuItem value="">Seleccionar...</MenuItem>
          {unidadMedidaOptions.map(opt => (
            <MenuItem key={opt.codigo} value={opt.codigo}>{opt.descripcion}</MenuItem>
          ))}
        </Select>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <InputLabel sx={{ minWidth: 80 }}>Prec. Unitario</InputLabel>
        <TextField
          variant="outlined"
          size="small"
          sx={{ width: 100 }}
          value={precioUnitario}
          onChange={e => setPrecioUnitario(e.target.value)}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <InputLabel sx={{ minWidth: 60 }}>% Bon.</InputLabel>
        <TextField variant="outlined" size="small" sx={{ width: 60 }} defaultValue={0} />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <InputLabel sx={{ minWidth: 80 }}>Importe Bon.</InputLabel>
        <TextField variant="outlined" size="small" sx={{ width: 100 }} />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <InputLabel sx={{ minWidth: 80 }}>Alícuota IVA</InputLabel>
        <Select
          value={iva}
          onChange={e => setIva(e.target.value)}
          size="small"
          sx={{ width: 80 }}
          displayEmpty
        >
          <MenuItem value="">Selec</MenuItem>
          {condicionesIVAOptions.map(opt => (
            <MenuItem key={opt.codigo} value={opt.codigo}>{opt.descripcion}</MenuItem>
          ))}
        </Select>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <InputLabel sx={{ minWidth: 60 }}>Subtotal</InputLabel>
        <TextField
          variant="outlined"
          size="small"
          sx={{ width: 100 }}
          value={subtotal}
          disabled
        />
      </Box>
      {showEliminar && (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-end" }}>
          <Button variant="outlined" color="error" sx={{ minWidth: 40, px: 1, py: 0.5 }} onClick={onEliminar}>
            X
          </Button>
        </Box>
      )}
    </Box>
  );
}
