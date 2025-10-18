import { useEffect, useState, useCallback } from "react";
import { Box, InputLabel, TextField, Select, MenuItem, Button } from "@mui/material";
import { unidadesDeMedida, getCondicionesIVA, getProductosByCodigo } from "../_api/actions";
import { useFormStore } from "../store/useFormStore";

interface ItemProductoProps {
  itemId: number;
  onEliminar: () => void;
  showEliminar: boolean;
}

export default function ItemProducto({ itemId, onEliminar, showEliminar }: ItemProductoProps) {
  const { productosData, updateProductoItem } = useFormStore();
  const [unidadMedidaOptions, setUnidadMedidaOptions] = useState<{ codigo: string; descripcion: string }[]>([]);
  const [condicionesIVAOptions, setCondicionesIVAOptions] = useState<{ codigo: string; descripcion: string }[]>([]);

  // Obtener los datos actuales del producto desde el store
  const productoActual = Array.isArray(productosData) ? productosData.find(p => p.id === itemId) : undefined;

  // Estados locales inicializados desde el store
  const [codigo, setCodigo] = useState(productoActual?.codigo || "");
  const [productoDescripcion, setProductoDescripcion] = useState(productoActual?.productoDescripcion || "");
  const [cantidad, setCantidad] = useState(productoActual?.cantidad || "1");
  const [unidadMedida, setUnidadMedida] = useState(productoActual?.unidadMedida?.codigo || "");
  const [precioUnitario, setPrecioUnitario] = useState(productoActual?.precioUnitario || "");
  const [iva, setIva] = useState(productoActual?.alicuotaIVA?.codigo || "");

  // Cargar datos iniciales solo una vez
  useEffect(() => {
    unidadesDeMedida().then((data) => {
      setUnidadMedidaOptions(data);
    });
    getCondicionesIVA().then((data) => {
      setCondicionesIVAOptions(data);
  
    });
  }, []); // Array vacío para ejecutar solo al montar

  // Buscar producto por código
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
  }, [codigo]); // Solo depende del código

  // Función para actualizar el producto con useCallback para evitar recreación
  const actualizarProducto = useCallback(() => {
    const cant = parseFloat(cantidad) || 0;
    const precio = parseFloat(precioUnitario) || 0;
    const result = cant * precio;
    const subtotalValue = result > 0 ? result.toFixed(2) : "0";

    const unidadSeleccionada = unidadMedidaOptions.find(opt => opt.codigo === unidadMedida);
    const ivaSeleccionado = condicionesIVAOptions.find(opt => opt.codigo === iva);

    updateProductoItem(itemId, {
      codigo,
      productoDescripcion,
      cantidad,
      unidadMedida: unidadSeleccionada || { codigo: unidadMedida, descripcion: "" },
      precioUnitario,
      alicuotaIVA: ivaSeleccionado || { codigo: iva, descripcion: "" },
      subtotal: subtotalValue
    });
  }, [itemId, codigo, productoDescripcion, cantidad, unidadMedida, precioUnitario, iva, unidadMedidaOptions, condicionesIVAOptions, updateProductoItem]);

  // Calcular subtotal y actualizar store - solo cuando cambien los valores relevantes
  useEffect(() => {
    if (unidadMedidaOptions.length > 0 && condicionesIVAOptions.length > 0) {
      actualizarProducto();
    }
  }, [cantidad, precioUnitario, actualizarProducto]);

  // Actualizar otros campos sin recalcular subtotal
  const handleCodigoChange = (value: string) => {
    setCodigo(value);
    if (productoActual) {
      updateProductoItem(itemId, { ...productoActual, codigo: value });
    }
  };

  const handleDescripcionChange = (value: string) => {
    setProductoDescripcion(value);
    if (productoActual) {
      updateProductoItem(itemId, { ...productoActual, productoDescripcion: value });
    }
  };

  const handleUnidadMedidaChange = (value: string) => {
    setUnidadMedida(value);
    const unidadDescripcion = unidadMedidaOptions.find(opt => opt.codigo === value)?.descripcion || "";
    if (productoActual) {
      updateProductoItem(itemId, { 
        ...productoActual, 
        unidadMedida: { codigo: value, descripcion: unidadDescripcion } 
      });
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "flex-end", gap: 1, mb: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <InputLabel sx={{ minWidth: 60 }}>Código</InputLabel>
        <TextField
          variant="outlined"
          size="small"
          sx={{ width: 80 }}
          value={codigo}
          onChange={e => handleCodigoChange(e.target.value)}
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
          onChange={e => handleDescripcionChange(e.target.value)}
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
          onChange={e => handleUnidadMedidaChange(e.target.value)}
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
          value={productoActual?.subtotal || "0"}
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
