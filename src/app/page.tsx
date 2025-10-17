"use client";
import { useState, useEffect } from "react";
import { Button, Box, Typography, Paper} from "@mui/material";
import CargaProductosComprobante from "./billing/components/CargaProductosComprobante";
import ResumenDatosFinales from "./billing/components/ResumenDatosFinales";
import { z } from "zod";
import DatosEmisionComprobantes from "./billing/components/DatosEmisionComprobantes";
import DatosReceptorComprobante from "./billing/components/DatosReceptorFactura/DatosReceptorComprobante";
import PuntoVentaTipoComprobante from "./billing/components/PuntoVentaTipoComprobante";
import BillingPage from "./billing/page";

const schema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
});

export default function Home() {
  
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // o un loading spinner
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse({ name });
    if (!result.success) {
      setError(result.error.message);
      setSubmitted(false);
    } else {
      setError(null);
      setSubmitted(true);
    }
  };

  return (
    <Box sx={{ mx: "auto", mt: 8 }}>
      <Paper sx={{  p: 2, mb: 2 }}>
        <Typography variant="h6" textAlign="center" gutterBottom>
          Facturacion
        </Typography>

        {/* Indicador de pasos */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            {[1,2,3,4].map((s, idx) => (
              <Box
                key={s}
                sx={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  backgroundColor: step === s ? "#1976d2" : "#bdbdbd",
                  border: "2px solid #1976d2"
                }}
              />
            ))}
          </Box>
        </Box>

        {step === 1 && (
          <Paper sx={{ backgroundColor: "#f5faff", p: 3, mb: 3, width: 1200, mx: "auto", borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "bold" }}>
              DATOS DE EMISIÓN (PASO 1 DE 4)
            </Typography>
            <PuntoVentaTipoComprobante />
            <DatosEmisionComprobantes />
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
              <Button variant="outlined" sx={{ px: 4 }} disabled>
                {"< Volver"}
              </Button>
              <Button variant="contained" sx={{ px: 4 }} onClick={() => setStep(2)}>
                Continuar {">"}
              </Button>
            </Box>
          </Paper>
        )}

        {step === 2 && (
          <Paper sx={{ backgroundColor: "#f8f8ff", p: 3, mb: 3, width: 1200, mx: "auto", borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "bold" }}>
              DATOS RECEPTOR (PASO 2 DE 4)
            </Typography>
            <DatosReceptorComprobante />
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
              <Button variant="outlined" sx={{ px: 4 }} onClick={() => setStep(1)}>
                {"< Volver"}
              </Button>
              <Button variant="contained" sx={{ px: 4 }} onClick={() => setStep(3)}>
                Continuar {">"}
              </Button>
            </Box>
          </Paper>
        )}

        {step === 3 && (
          <Paper sx={{ backgroundColor: "#fff8f5", p: 3, mb: 3, width: 1200, mx: "auto", borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "bold" }}>
              CARGA DE PRODUCTOS (PASO 3 DE 4)
            </Typography>
            <CargaProductosComprobante />
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
              <Button variant="outlined" sx={{ px: 4 }} onClick={() => setStep(2)}>
                {"< Volver"}
              </Button>
              <Button variant="contained" sx={{ px: 4 }} onClick={() => setStep(4)}>
                Continuar {">"}
              </Button>
            </Box>
          </Paper>
        )}

        {step === 4 && (
          <Paper sx={{ backgroundColor: "#f5faff", p: 3, mb: 3, width: 1200, mx: "auto", borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "bold" }}>
              RESUMEN Y ENVÍO (PASO 4 DE 4)
            </Typography>
            <ResumenDatosFinales />
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
              <Button variant="outlined" sx={{ px: 4 }} onClick={() => setStep(3)}>
                {"< Volver"}
              </Button>
              <Button variant="contained" sx={{ px: 4 }}>
                Enviar
              </Button>
            </Box>
          </Paper>
        )}

        {submitted && (
          <Typography color="success.main" sx={{ mt: 2 }}>
            ¡Formulario enviado correctamente!
          </Typography>
        )}
      </Paper>
      {/* <BillingPage /> */}
    </Box>
  );
}