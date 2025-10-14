import { unknown } from "zod";

const baseUrl = 'http://localhost:3001/';

// Cliente-side fetch helper
async function clientFetch(url: string, options?: RequestInit): Promise<unknown> {
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('session='))
    ?.split('=')[1];

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}


//metodo para tipo de comprobante
export async function fetchTiposComprobante() {
  return clientFetch(`${baseUrl}tiposComprobante`);
}

//metodo para puntos de venta
export async function fetchPuntosVenta() {
  return clientFetch(`${baseUrl}puntosVenta`);
}

export async function arrayTiposDatosAdicionales() {
  return clientFetch(`${baseUrl}arrayTiposDatosAdicionales`);
}


export async function monedaExtranjera() {
  return clientFetch(`${baseUrl}monedas`);
}

export async function unidadesDeMedida() {
  return clientFetch(`${baseUrl}unidadesDeMedida`);
}


export async function getCondicionesIVA(): Promise<{ codigo: number, descripcion: string }[] | unknown> {
  return clientFetch(`${baseUrl}condicionesIVA`);
}


export async function getProductosByCodigo(codigo: string): Promise<{ codigo: string, descripcion: string , precioUnitario: number } | unknown > {
   return clientFetch(`${baseUrl}productos?codigo=${codigo}`);
}