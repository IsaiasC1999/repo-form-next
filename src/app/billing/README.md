# Generador de Facturas PDF

Este módulo proporciona un generador de facturas PDF completamente parametrizable usando `@react-pdf/renderer`, basado en el diseño de facturas argentinas estándar.

## Características

- ✅ **Compatible con SSR**: Renderizado del lado del cliente para evitar conflictos con Next.js
- ✅ **Totalmente parametrizable**: Todos los datos se configuran mediante interfaces TypeScript
- ✅ **Vista previa en tiempo real**: Modal con vista previa del PDF
- ✅ **Descarga directa**: Botón para descargar el PDF generado
- ✅ **Impresión integrada**: Funcionalidad de impresión directa
- ✅ **Formato A4**: PDF generado en formato A4 estándar
- ✅ **Responsive**: Se adapta al tamaño de la ventana
- ✅ **Múltiples items**: Soporte para facturas con múltiples productos/servicios
- ✅ **Hooks personalizados**: Para manejo seguro de PDFs en entorno SSR

## Instalación

El componente requiere las siguientes dependencias (ya instaladas en el proyecto):

```bash
npm install @react-pdf/renderer @mui/material
```

## Estructura de archivos

```
src/app/billing/
├── components/
│   ├── InvoicePDF.tsx          # Componente principal del PDF
│   ├── InvoiceGenerator.tsx    # Generador con controles
│   └── InvoiceExample.tsx      # Ejemplo de uso
├── types/
│   └── invoice.types.ts        # Interfaces TypeScript
├── utils/
│   └── invoiceUtils.ts         # Utilidades y datos de ejemplo
└── index.ts                    # Exportaciones principales
```

## Uso básico

```tsx
import dynamic from 'next/dynamic';
import { InvoiceData } from './billing';

// Importación dinámica recomendada para Next.js
const SimpleInvoiceGenerator = dynamic(
  () => import('./billing').then(mod => mod.SimpleInvoiceGenerator),
  { ssr: false }
);

const invoiceData: InvoiceData = {
  empresa: {
    razonSocial: 'MI EMPRESA SA',
    domicilioComercial: 'Av. Siempre Viva 123',
    telefono: '011 1234-5678',
    condicionIVA: 'Responsable Inscripto',
  },
  comprobante: {
    tipo: 'A',
    numero: '0001-00000001',
    original: true,
    fecha: '01/01/2024',
    cuit: '20-12345678-9',
    ingresosBrutos: 'CONVENIO MULTILATERAL',
    fechaInicioActividades: '01/01/2020',
  },
  receptor: {
    senorSra: 'CLIENTE EJEMPLO SRL',
    direccion: 'Calle Falsa 456',
    cif: '1234',
    cuit: '30-87654321-0',
    condicionVenta: 'CONTADO',
    localidadPartido: 'Buenos Aires',
    provincia: 'Buenos Aires',
    iva: 'Responsable Inscripto',
  },
  items: [
    {
      descripcion: 'Producto de ejemplo',
      remito: '001',
      descuento: '0%',
      cantidad: 2,
      precioUnitario: 1000.00,
      importe: 2000.00,
    },
  ],
  totales: {
    sonPesos: 'DOS MIL CUATROCIENTOS VEINTE CON 00/100',
    cae: '12345678901234',
    vencimientoCae: '10/01/2024',
    subtotal: 2000.00,
    iva: 420.00,
    total: 2420.00,
  },
};

function MyComponent() {
  return (
    <SimpleInvoiceGenerator
      invoiceData={myInvoiceData}
      showViewer={true}          // Opcional: mostrar vista previa
    />
  );
}
```

## Interfaces principales

### InvoiceData

```typescript
interface InvoiceData {
  empresa: {
    razonSocial: string;
    domicilioComercial: string;
    telefono: string;
    condicionIVA: string;
  };
  comprobante: {
    tipo: 'A' | 'B' | 'C';
    numero: string;
    original: boolean;
    fecha: string;
    cuit: string;
    ingresosBrutos: string;
    fechaInicioActividades: string;
  };
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
  items: InvoiceItem[];
  totales: {
    sonPesos: string;
    cae: string;
    vencimientoCae: string;
    subtotal: number;
    iva: number;
    total: number;
  };
  qrData?: string;
}
```

### InvoiceItem

```typescript
interface InvoiceItem {
  descripcion: string;
  remito: string;
  descuento: string;
  cantidad: number;
  precioUnitario: number;
  importe: number;
}
```

## Funcionalidades

### 1. Vista previa
El componente incluye una vista previa en modal que permite revisar el PDF antes de generar o descargar.

### 2. Descarga
Botón integrado para descargar el PDF con nombre personalizable.

### 3. Impresión
Funcionalidad de impresión directa que abre el diálogo de impresión del navegador.

### 4. Personalización
- **Logo**: Añade el logo de tu empresa pasando la URL en `logoUrl`
- **Código QR**: Incluye códigos QR personalizados con `qrCodeUrl`
- **Estilos**: Modifica los estilos en el archivo `InvoicePDF.tsx`

## Ejemplo completo

Para ver un ejemplo completo funcionando, visita `/billing` en tu aplicación Next.js.

## Notas técnicas

- El componente usa `@react-pdf/renderer` v4.3.1
- Compatible con Next.js 15+ y React 19+
- Los PDFs se generan en el cliente (no requiere servidor)
- Formato A4 (210 x 297mm)
- Fuente por defecto: Helvetica
- Encoding UTF-8 para caracteres especiales

## Solución de problemas

### Error "Invalid border style: 2"

Este error ocurre porque `@react-pdf/renderer` requiere que los estilos de border sean especificados de manera diferente a CSS regular:

```tsx
// ❌ Incorrecto
border: 1,
borderColor: '#000',

// ✅ Correcto
borderWidth: 1,
borderColor: '#000',
borderStyle: 'solid',
```

**Componentes disponibles:**
- `InvoicePDF`: Versión original con estilos corregidos
- `SimpleInvoicePDF`: Versión simplificada y más robusta (recomendada)

### Error de SSR con PDFDownloadLink

Para evitar problemas de renderizado del servidor, usa siempre importación dinámica:

```tsx
const SimpleInvoiceGenerator = dynamic(
  () => import('./SimpleInvoiceGenerator'),
  { ssr: false }
);
```

## Extensiones futuras

- [ ] Soporte para múltiples páginas
- [ ] Plantillas personalizables
- [ ] Integración con APIs de AFIP
- [ ] Generación de códigos QR automática
- [ ] Soporte para diferentes monedas
- [ ] Plantillas para diferentes tipos de comprobante (B, C, etc.)