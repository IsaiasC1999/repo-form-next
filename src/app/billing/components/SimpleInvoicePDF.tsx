import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import { InvoiceData } from '../lib/invoice.types';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
    fontSize: 9,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    paddingBottom: 10,
  },
  companySection: {
    flex: 3,
    paddingRight: 20,
  },
  companyInfo: {
    fontSize: 8,
    lineHeight: 1.2,
  },
  invoiceTypeBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#000',
    borderStyle: 'solid',
    padding: 5,
    marginHorizontal: 10,
  },
  invoiceType: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  invoiceDetails: {
    flex: 3,
    paddingLeft: 20,
    fontSize: 8,
  },
  clientSection: {
    flexDirection: 'row',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
    padding: 10,
  },
  clientLeft: {
    flex: 1,
    paddingRight: 10,
  },
  clientRight: {
    flex: 1,
    paddingLeft: 10,
  },
  itemsTable: {
    marginBottom: 15,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
    paddingVertical: 5,
    paddingHorizontal: 3,
    fontWeight: 'bold',
    fontSize: 8,
  },
  tableRow: {
    flexDirection: 'row',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
    paddingVertical: 3,
    paddingHorizontal: 3,
    fontSize: 8,
    minHeight: 20,
  },
  col1: { 
    flex: 4, 
    paddingRight: 5,
  },
  col2: { 
    flex: 1, 
    textAlign: 'center',
    paddingHorizontal: 2,
  },
  col3: { 
    flex: 1, 
    textAlign: 'center',
    paddingHorizontal: 2,
  },
  col4: { 
    flex: 1, 
    textAlign: 'center',
    paddingHorizontal: 2,
  },
  col5: { 
    flex: 1.5, 
    textAlign: 'right',
    paddingHorizontal: 2,
  },
  col6: { 
    flex: 1.5, 
    textAlign: 'right',
    paddingLeft: 5,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  footerLeft: {
    flex: 2,
    paddingRight: 20,
  },
  footerRight: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
    padding: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    fontSize: 9,
  },
  finalTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    fontSize: 11,
    fontWeight: 'bold',
    borderTopWidth: 1,
    borderTopColor: '#000',
    borderTopStyle: 'solid',
    paddingTop: 5,
  },
  fieldLabel: {
    fontWeight: 'bold',
    fontSize: 8,
  },
  fieldValue: {
    fontSize: 8,
    marginBottom: 2,
  },
  centeredText: {
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
});

interface SimpleInvoicePDFProps {
  data: InvoiceData;
}

const SimpleInvoicePDF: React.FC<SimpleInvoicePDFProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        {/* Company Section */}
        <View style={styles.companySection}>
          <View style={styles.companyInfo}>
            <Text style={styles.boldText}>Razón Social: {data.empresa.razonSocial}</Text>
            <Text>Domicilio Comercial: {data.empresa.domicilioComercial}</Text>
            <Text>Teléfono: {data.empresa.telefono}</Text>
            <Text>Condición de IVA: {data.empresa.condicionIVA}</Text>
          </View>
        </View>

        {/* Invoice Type Box */}
        <View style={styles.invoiceTypeBox}>
          <Text style={styles.invoiceType}>{data.comprobante.tipo}</Text>
          <Text style={[styles.centeredText, { fontSize: 6 }]}>COD. 01</Text>
        </View>

        {/* Invoice Details */}
        <View style={styles.invoiceDetails}>
          <Text style={styles.boldText}>FACTURA</Text>
          <Text>Nº {data.comprobante.numero}</Text>
          <Text>{data.comprobante.original ? 'ORIGINAL' : 'DUPLICADO'}</Text>
          <Text>FECHA: {data.comprobante.fecha}</Text>
          <Text>CUIT: {data.comprobante.cuit}</Text>
          <Text>Ingresos Brutos: {data.comprobante.ingresosBrutos}</Text>
          <Text>Fecha de Inicio de Actividades: {data.comprobante.fechaInicioActividades}</Text>
        </View>
      </View>

      {/* Client Section */}
      <View style={styles.clientSection}>
        <View style={styles.clientLeft}>
          <View style={styles.fieldValue}>
            <Text style={styles.fieldLabel}>Señor/es: </Text>
            <Text>{data.receptor.senorSra}</Text>
          </View>
          <View style={styles.fieldValue}>
            <Text style={styles.fieldLabel}>Dirección: </Text>
            <Text>{data.receptor.direccion}</Text>
          </View>
          <View style={styles.fieldValue}>
            <Text style={styles.fieldLabel}>CIF: </Text>
            <Text>{data.receptor.cif}</Text>
          </View>
          <View style={styles.fieldValue}>
            <Text style={styles.fieldLabel}>Localidad/Partido: </Text>
            <Text>{data.receptor.localidadPartido}</Text>
          </View>
        </View>

        <View style={styles.clientRight}>
          <View style={styles.fieldValue}>
            <Text style={styles.fieldLabel}>Código: </Text>
            <Text>{data.comprobante.cuit}</Text>
          </View>
          <View style={styles.fieldValue}>
            <Text style={styles.fieldLabel}>C.U.I.T.: </Text>
            <Text>{data.receptor.cuit}</Text>
          </View>
          <View style={styles.fieldValue}>
            <Text style={styles.fieldLabel}>Condición de venta: </Text>
            <Text>{data.receptor.condicionVenta}</Text>
          </View>
          <View style={styles.fieldValue}>
            <Text style={styles.fieldLabel}>I.V.A.: </Text>
            <Text>{data.receptor.iva}</Text>
          </View>
        </View>
      </View>

      {/* Items Table */}
      <View style={styles.itemsTable}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.col1}>DESCRIPCIÓN</Text>
          <Text style={styles.col2}>REMITO</Text>
          <Text style={styles.col3}>DESC.</Text>
          <Text style={styles.col4}>CANTIDAD</Text>
          <Text style={styles.col5}>PRECIO UNITARIO</Text>
          <Text style={styles.col6}>IMPORTE</Text>
        </View>

        {/* Table Rows */}
        {data.items.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.col1}>{item.descripcion}</Text>
            <Text style={styles.col2}>{item.remito}</Text>
            <Text style={styles.col3}>{item.descuento}</Text>
            <Text style={styles.col4}>{item.cantidad.toFixed(2)}</Text>
            <Text style={styles.col5}>{item.precioUnitario.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</Text>
            <Text style={styles.col6}>{item.importe.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</Text>
          </View>
        ))}

        {/* Empty rows to fill space */}
        {Array.from({ length: Math.max(0, 8 - data.items.length) }).map((_, index) => (
          <View key={`empty-${index}`} style={styles.tableRow}>
            <Text style={styles.col1}> </Text>
            <Text style={styles.col2}> </Text>
            <Text style={styles.col3}> </Text>
            <Text style={styles.col4}> </Text>
            <Text style={styles.col5}> </Text>
            <Text style={styles.col6}> </Text>
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        {/* Left section */}
        <View style={styles.footerLeft}>
          <Text style={styles.fieldValue}>
            <Text style={styles.fieldLabel}>SON PESOS: </Text>
            {data.totales.sonPesos}
          </Text>
          
          <Text style={styles.fieldValue}>
            <Text style={styles.fieldLabel}>CAE: </Text>
            {data.totales.cae}
          </Text>
          
          <Text style={styles.fieldValue}>
            <Text style={styles.fieldLabel}>Vto. CAE: </Text>
            {data.totales.vencimientoCae}
          </Text>

          <View style={{ marginTop: 20, fontSize: 7 }}>
            <Text>FC-TR-01 RV02</Text>
            <Text>FCRPEASE.rpt</Text>
          </View>
        </View>

        {/* Right section with totals */}
        <View style={styles.footerRight}>
          <View style={styles.totalRow}>
            <Text>Subtotal:</Text>
            <Text>{data.totales.subtotal.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</Text>
          </View>
          
          <View style={styles.totalRow}>
            <Text>IVA 21,00%:</Text>
            <Text>{data.totales.iva.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</Text>
          </View>

          <View style={styles.finalTotal}>
            <Text>TOTAL</Text>
            <Text>{data.totales.total.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default SimpleInvoicePDF;