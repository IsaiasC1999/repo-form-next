import { InvoiceData } from '../lib/invoice.types';

export const sampleInvoiceData: InvoiceData = {
  empresa: {
    razonSocial: 'ADACHI MOTORS SA',
    domicilioComercial: 'ECHEVERRIA 1050',
    telefono: '011 4890 5900',
    condicionIVA: 'Responsable Inscripto',
  },
  comprobante: {
    tipo: 'A',
    numero: '0022-00000499',
    original: true,
    fecha: '28/07/2025',
    cuit: '30-71818609-5',
    ingresosBrutos: 'CONVENIO MULTILATERAL 30-71818609-5',
    fechaInicioActividades: '31/01/2022',
  },
  receptor: {
    senorSra: 'EL GARAGE DEL GALLEGO, S.A.S',
    direccion: 'Alain Quiroga 299',
    cif: '4111',
    cuit: '30-71818609-5',
    condicionVenta: 'CONTADO',
    localidadPartido: 'Tucuman',
    provincia: 'Tucuman',
    iva: 'Responsable Inscripto',
  },
  items: [
    {
      descripcion: 'DIECISIETE MILLONES TRESCIENTOS SETENTA Y NUEVE MIL SEISCIENTOS SESENTA Y TRES CON 92/100',
      remito: '',
      descuento: '',
      cantidad: 1,
      precioUnitario: 14363358.61,
      importe: 14363358.61,
    }
  ],
  totales: {
    sonPesos: 'DIECISIETE MILLONES TRESCIENTOS SETENTA Y NUEVE MIL SEISCIENTOS SESENTA Y TRES CON 92/100',
    cae: '75300616849732',
    vencimientoCae: '07/08/2025',
    subtotal: 14363358.61,
    iva: 3016305.31,
    total: 17379663.92,
  },
  qrData: 'VTREF-FC-A-0022-00000499',
};

export const createInvoiceData = (formData: any): InvoiceData => {
  // Esta función puede ser utilizada para convertir los datos del formulario
  // en el formato requerido por InvoiceData
  return {
    empresa: {
      razonSocial: formData.empresa?.razonSocial || '',
      domicilioComercial: formData.empresa?.domicilio || '',
      telefono: formData.empresa?.telefono || '',
      condicionIVA: formData.empresa?.condicionIVA || '',
    },
    comprobante: {
      tipo: formData.comprobante?.tipo || 'A',
      numero: formData.comprobante?.numero || '',
      original: formData.comprobante?.original ?? true,
      fecha: formData.comprobante?.fecha || new Date().toLocaleDateString('es-AR'),
      cuit: formData.comprobante?.cuit || '',
      ingresosBrutos: formData.comprobante?.ingresosBrutos || '',
      fechaInicioActividades: formData.comprobante?.fechaInicio || '',
    },
    receptor: {
      senorSra: formData.receptor?.nombre || '',
      direccion: formData.receptor?.direccion || '',
      cif: formData.receptor?.cif || '',
      cuit: formData.receptor?.cuit || '',
      condicionVenta: formData.receptor?.condicionVenta || '',
      localidadPartido: formData.receptor?.localidad || '',
      provincia: formData.receptor?.provincia || '',
      iva: formData.receptor?.condicionIVA || '',
    },
    items: formData.items || [],
    totales: {
      sonPesos: formData.totales?.sonPesos || '',
      cae: formData.totales?.cae || '',
      vencimientoCae: formData.totales?.vencimientoCae || '',
      subtotal: formData.totales?.subtotal || 0,
      iva: formData.totales?.iva || 0,
      total: formData.totales?.total || 0,
    },
  };
};
