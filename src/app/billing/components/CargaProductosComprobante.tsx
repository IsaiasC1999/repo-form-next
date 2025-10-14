import { useEffect, useState } from "react";
import { Paper, Typography, Box, InputLabel, TextField, Select, MenuItem, Button } from "@mui/material";
import { unidadesDeMedida, getCondicionesIVA, getProductosByCodigo } from "../_api/actions";
import { Console } from "console";

export default function CargaProductosComprobante() {
  const [unidadMedidaOptions, setUnidadMedidaOptions] = useState<{ codigo: string, descripcion: string }[]>([]);
  const [unidadMedida, setUnidadMedida] = useState("");
  const [condicionesIVAOptions, setCondicionesIVAOptions] = useState<{ codigo: number, descripcion: string }[]>([]);
  const [iva, setIva] = useState("");
  const [codigo, setCodigo] = useState("");
  const [productoDescripcion, setProductoDescripcion] = useState("");
  const [precioUnitario, setPrecioUnitario] = useState("");

  useEffect(() => {
    unidadesDeMedida().then((data: any) => {
      // Si el backend devuelve un array de objetos { codigo, descripcion }
      setUnidadMedidaOptions(data);
    });
    getCondicionesIVA().then((data: any) => {
      // Si el backend devuelve un array de objetos { codigo, descripcion }
      setCondicionesIVAOptions(Array.isArray(data) ? data : []);
    });
  }, []);

  useEffect(() => {
    if (codigo.trim() !== "") {
      getProductosByCodigo(codigo).then((data: any) => {
        console.log(data);
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

  return (
    <Paper sx={{ p: 2, mb: 2, fontSize: 1, width: 1100, ml: "auto", mr: "auto" }}>
      <Typography variant="h6" textAlign="center" gutterBottom>
        Datos de la Operación 
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "flex-end", gap: 1, mb: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <InputLabel sx={{ minWidth: 60 }}>Código</InputLabel>
          <TextField
            id="codigo"
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
            id="producto"
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
          <TextField id="cantidad" variant="outlined" size="small" sx={{ width: 60 }} defaultValue={1} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <InputLabel sx={{ minWidth: 80 }}>U. Medida</InputLabel>
          <Select
            id="unidad-medida"
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
            id="precio-unitario"
            variant="outlined"
            size="small"
            sx={{ width: 100 }}
            value={precioUnitario}
            onChange={e => setPrecioUnitario(e.target.value)}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <InputLabel sx={{ minWidth: 60 }}>% Bon.</InputLabel>
          <TextField id="porc-bon" variant="outlined" size="small" sx={{ width: 60 }} defaultValue={0} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <InputLabel sx={{ minWidth: 80 }}>Importe Bon.</InputLabel>
          <TextField id="importe-bon" variant="outlined" size="small" sx={{ width: 100 }} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <InputLabel sx={{ minWidth: 80 }}>Alícuota IVA</InputLabel>
          <Select
            id="iva"
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
          <TextField id="subtotal" variant="outlined" size="small" sx={{ width: 100 }} disabled />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-end" }}>
          <Button variant="outlined" color="error" sx={{ minWidth: 40, px: 1, py: 0.5 }}>X</Button>
        </Box>
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
