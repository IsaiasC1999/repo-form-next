import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface FormState {
  // Datos de Punto de Venta y Tipo de Comprobante
  puntoVenta: { codigo: string; descripcion: string } | null;
  tipoComprobante: { codigo: string; descripcion: string } | null;

  // Datos de Emisión
  fechaComprobante: string;
  concepto: { codigo: string; descripcion: string } | null;
  monedaExtranjera: boolean;
  actividades: { codigo: string; descripcion: string };
  referenciaComercial: string;


  //Datos receptor/cliente
   tipoDocumento: { codigo: string, descripcion: string } | null;
    numeroDocumento: string;
    razonSocial: string;
    domicilioComercial: string;
    condicionIVA: { codigo: string, descripcion: string } | null;
    condicionesVenta: string[];

   // Datos de productos/línea de venta
    unidadMedidaOptions: { codigo: string; descripcion: string }[];
    unidadMedida: string;
    condicionesIVAOptions: { codigo: number; descripcion: string }[];
    iva: string;
    codigo: string;
    productoDescripcion: string;
    precioUnitario: string;
    cantidad: string;
    subtotal: string;

  // Actions
  setPuntoVenta: (puntoVenta: { codigo: string; descripcion: string } | null) => void;
  setTipoComprobante: (tipoComprobante: { codigo: string; descripcion: string } | null) => void;
  setFechaComprobante: (fechaComprobante: string) => void;
  setConceptoStore: (concepto: { codigo: string; descripcion: string } | null) => void;
  setMonedaExtranjeraStore: (monedaExtranjera: boolean) => void;
  setActividadesStore: (actividades: { codigo: string; descripcion: string }) => void;
  setReferenciaComercial: (referenciaComercial: string) => void;
  setTipoDocumento: (tipoDocumento: { codigo: string; descripcion: string } | null) => void;
  setNumeroDocumento: (numeroDocumento: string) => void;
  setRazonSocial: (razonSocial: string) => void;
  setDomicilioComercial: (domicilioComercial: string) => void;
  setCondicionIVA: (condicionIVA: { codigo: string, descripcion: string } | null) => void;
  setCondicionesVenta: (condicionesVenta: string[]) => void;
  
  // Producto actions
  setUnidadMedidaOptions: (unidadMedidaOptions: { codigo: string; descripcion: string }[]) => void;
  setUnidadMedida: (unidadMedida: string) => void;
  setCondicionesIVAOptions: (condicionesIVAOptions: { codigo: number; descripcion: string }[]) => void;
  setIva: (iva: string) => void;
  setCodigo: (codigo: string) => void;
  setProductoDescripcion: (productoDescripcion: string) => void;
  setPrecioUnitario: (precioUnitario: string) => void;
  setCantidad: (cantidad: string) => void;
  setSubtotal: (subtotal: string) => void;
}

export const useFormStore = create<FormState>()(
  persist(
    (set) => ({
      // Initial state
      puntoVenta: null,
      tipoComprobante: null,
      fechaComprobante: '',
      concepto: null,
      monedaExtranjera: false,
      actividades: { codigo: '', descripcion: '' },
      referenciaComercial: '',
      tipoDocumento: null,
      numeroDocumento: '',
      razonSocial: '',
      domicilioComercial: '',
      condicionIVA: null,
      condicionesVenta: [],
      
      // Datos de productos/línea de venta - valores iniciales
      unidadMedidaOptions: [],
      unidadMedida: '',
      condicionesIVAOptions: [],
      iva: '',
      codigo: '',
      productoDescripcion: '',
      precioUnitario: '',
      cantidad: '1',
      subtotal: '',

      // Actions
      setPuntoVenta: (puntoVenta) => set({ puntoVenta }),
      setTipoComprobante: (tipoComprobante) => set({ tipoComprobante }),
      setFechaComprobante: (fechaComprobante) => set({ fechaComprobante }),
      setConceptoStore: (concepto) => set({ concepto }),
      setMonedaExtranjeraStore: (monedaExtranjera) => set({ monedaExtranjera }),
      setActividadesStore: (actividades) => {
        console.log("Actividades seleccionadas:", actividades);
        set({ actividades });
      },
      setReferenciaComercial: (referenciaComercial) => set({ referenciaComercial }),
      setTipoDocumento: (tipoDocumento) => set({ tipoDocumento }),
      setNumeroDocumento: (numeroDocumento) => set({ numeroDocumento }),
      setRazonSocial: (razonSocial) => set({ razonSocial }),
      setDomicilioComercial: (domicilioComercial) => set({ domicilioComercial }),
      setCondicionIVA: (condicionIVA) => set({ condicionIVA }),
      setCondicionesVenta: (condicionesVenta) => set({ condicionesVenta }),
      
      // Producto setters
      setUnidadMedidaOptions: (unidadMedidaOptions) => set({ unidadMedidaOptions }),
      setUnidadMedida: (unidadMedida) => set({ unidadMedida }),
      setCondicionesIVAOptions: (condicionesIVAOptions) => set({ condicionesIVAOptions }),
      setIva: (iva) => set({ iva }),
      setCodigo: (codigo) => set({ codigo }),
      setProductoDescripcion: (productoDescripcion) => set({ productoDescripcion }),
      setPrecioUnitario: (precioUnitario) => set({ precioUnitario }),
      setCantidad: (cantidad) => set({ cantidad }),
      setSubtotal: (subtotal) => set({ subtotal }),
    }),
    {
      name: 'form-storage',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') {
          return localStorage;
        }
        // Fallback for SSR
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
    }
  )
);
