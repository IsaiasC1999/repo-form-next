import { create } from 'zustand';

interface FormState {
  // Datos de Punto de Venta y Tipo de Comprobante
  puntoVenta: { value: string; label: string } | null;
  tipoComprobante: { value: string; label: string } | null;
  
  // Datos de Emisión
  fechaComprobante: string | null;
  concepto: { value: string; label: string } | null;
  
  // Actions
  setPuntoVenta: (puntoVenta: { value: string; label: string } | null) => void;
  setTipoComprobante: (tipoComprobante: { value: string; label: string } | null) => void;
  setFechaComprobante: (fechaComprobante: string) => void;
  setConcepto: (concepto: { value: string; label: string } | null) => void;
}

export const useFormStore = create<FormState>((set) => ({
  // Initial state
  puntoVenta: null,
  tipoComprobante: null,
  fechaComprobante: '',
  concepto: null,
  
  // Actions
  setPuntoVenta: (puntoVenta) => set({ puntoVenta }),
  setTipoComprobante: (tipoComprobante) => set({ tipoComprobante }),
  setFechaComprobante: (fechaComprobante) => set({ fechaComprobante }),
  setConcepto: (concepto) => set({ concepto }),
}));
