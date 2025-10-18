export interface ProductoItem {
  id: number;
  codigo: string;
  productoDescripcion: string;
  cantidad: string;
  unidadMedida: { codigo: string; descripcion: string };
  precioUnitario: string;
  porcentajeBonificacion: string;
  importeBonificacion: string;
  alicuotaIVA: { codigo: string; descripcion: string };
  subtotal: string;
}


