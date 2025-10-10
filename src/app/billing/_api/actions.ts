export async function fetchPuntosVenta(): Promise<{ value: string, label: string }[]> {
  // Cambia la URL por la de tu backend real
  const res = await fetch("https://example.com/api/puntos-venta");
  if (!res.ok) return [];
  return await res.json();
}

export async function fetchTiposComprobante(): Promise<{ value: string, label: string }[]> {
  // Cambia la URL por la de tu backend real
  const res = await fetch("https://example.com/api/tipos-comprobante");
  if (!res.ok) return [];
  return await res.json();
}
