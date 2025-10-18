import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ProductoItem } from '../lib/producto';

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

  // Datos de productos usando el tipo definido
  productosData: ProductoItem[];
  
  // Subtotal de la factura
  subtotalFactura: number;
  totalFactura: number;


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
  
  // Producto actions usando el tipo
  setProductosData: (productosData: ProductoItem[]) => void;
  addProductoItem: (producto: ProductoItem) => void;
  updateProductoItem: (id: number, producto: Partial<ProductoItem>) => void;
  removeProductoItem: (id: number) => void;
  setSubtotalFactura: (subtotal: number) => void;
  setTotalFactura: (total: number) => void;
}

export const useFormStore = create<FormState>()(
  persist(
    (set, get) => ({
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
      // Datos de productos - inicializar correctamente
      productosData: [],
      
      // Subtotal de la factura
      subtotalFactura: 0,
      totalFactura: 0,

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
      setSubtotalFactura: (subtotal) => set({ subtotalFactura: subtotal }),
      setTotalFactura: (total) => set({ totalFactura: total }),


      // Producto setters usando el tipo
      setProductosData: (productosData) => set({ productosData }),
      
      addProductoItem: (producto) => set((state) => {
        const currentProducts = Array.isArray(state.productosData) ? state.productosData : [];
        const newProducts = [...currentProducts, producto];
        
        // Calcular el nuevo subtotal de la factura cuando se agrega un item
        const nuevoSubtotal = newProducts.reduce((sum, item) => {
          return sum + (parseFloat(item.subtotal) || 0);
        }, 0);
        
        return {
          productosData: newProducts,
          subtotalFactura: nuevoSubtotal,
          totalFactura: nuevoSubtotal
        };
      }),
      updateProductoItem: (id, producto) => set((state) => {
        const currentProducts = Array.isArray(state.productosData) ? state.productosData : [];
        const updatedProducts = currentProducts.map(p => 
          p.id === id ? { ...p, ...producto } : p
        );
        
        // Calcular el nuevo subtotal de la factura
        const nuevoSubtotal = updatedProducts.reduce((sum, item) => {
          return sum + (parseFloat(item.subtotal) || 0);
        }, 0);
        
        return {
          productosData: updatedProducts,
          subtotalFactura: nuevoSubtotal,
          totalFactura: nuevoSubtotal
        };
      }),
      removeProductoItem: (id) => set((state) => {
        const currentProducts = Array.isArray(state.productosData) ? state.productosData : [];
        const filteredProducts = currentProducts.filter(p => p.id !== id);
        
        // Calcular el nuevo subtotal de la factura
        const nuevoSubtotal = filteredProducts.reduce((sum, item) => {
          return sum + (parseFloat(item.subtotal) || 0);
        }, 0);
        
        return {
          productosData: filteredProducts,
          subtotalFactura: nuevoSubtotal,
          totalFactura: nuevoSubtotal
        };
      }),
    }),
    {
      name: 'form-storage',
      version: 1, // Incrementa la versión para limpiar datos corruptos
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') {
          return localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      // Migrar datos corruptos
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // Limpiar datos de versiones anteriores
          return {
            ...persistedState,
            productosData: []
          };
        }
        return persistedState;
      }
    }
  )
);
