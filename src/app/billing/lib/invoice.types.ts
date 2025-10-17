export interface InvoiceData {
  // Datos de la empresa emisora
  empresa: {
    razonSocial: string;
    domicilioComercial: string;
    telefono: string;
    condicionIVA: string;
  };

  // Datos del comprobante
  comprobante: {
    tipo: string;
    numero: string;
    original: boolean;
    fecha: string;
    cuit: string;
    ingresosBrutos: string;
    fechaInicioActividades: string;
  };

  // Datos del receptor/cliente
  receptor: {
    senorSra: string;
    direccion: string;
    cif: string;
    cuit: string;
    condicionVenta: string;
    localidadPartido: string;
    provincia: string;
    iva: string;
  };

  // Items/productos de la factura
  items: InvoiceItem[];

  // Totales y pie de página
  totales: {
    sonPesos: string;
    cae: string;
    vencimientoCae: string;
    subtotal: number;
    iva: number;
    total: number;
  };

  // QR Code data
  qrData?: string;
}

export interface InvoiceItem {
  descripcion: string;
  remito: string;
  descuento: string;
  cantidad: number;
  precioUnitario: number;
  importe: number;
}