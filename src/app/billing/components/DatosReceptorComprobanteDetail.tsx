import { Box, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import CondicionFrenteIVAReceptorfacB from "./CondicionFrenteIVAReceptor";

// Opciones para consumidor final
const tiposDocConsumidorFinal = [
    { value: "80", label: "CUIT" },
    { value: "86", label: "CUIL" },
    { value: "87", label: "CDI" },
    { value: "89", label: "LE" },
    { value: "90", label: "LC" },
    { value: "91", label: "CI Extranjera" },
    { value: "96", label: "DNI" },
    { value: "94", label: "Pasaporte" },
    { value: "00", label: "CI Policía Federal" },
    { value: "30", label: "Certificado de Migración" }
];

export default function DatosReceptorComprobanteDetail() {
    const [condicionIVA, setCondicionIVA] = useState("");
    const [tipoDoc, setTipoDoc] = useState("");

    // Renderiza el select de tipo de documento según la condición frente al IVA
    function renderTipoDocSelect() {
        if (condicionIVA === "4" || condicionIVA === "7") {
            // IVA Sujeto Exento o Sujeto No Categorizado: solo CUIT
            return (
                <Select
                    labelId="tipo-doc-label"
                    id="tipo-doc"
                    value={tipoDoc}
                    onChange={e => setTipoDoc(e.target.value)}
                    sx={{ minWidth: 140 }}
                >
                    <MenuItem value="80">CUIT</MenuItem>
                </Select>
            );
        }
        if (condicionIVA === "5") {
            // Consumidor Final: todos los tipos
            return (
                <Select
                    labelId="idTipoDocReceptor-label"
                    id="idtipodocreceptor"
                    value={tipoDoc}
                    onChange={e => setTipoDoc(e.target.value)}
                    sx={{ minWidth: 138 }}
                >
                    {tiposDocConsumidorFinal.map(opt => (
                        <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                    ))}
                </Select>
            );
        }
        // Default: DNI, CUIT, Pasaporte
        return (
            <Select
                labelId="tipo-doc-label"
                id="tipo-doc"
                value={tipoDoc}
                onChange={e => setTipoDoc(e.target.value)}
                sx={{ minWidth: 140 }}
            >
                <MenuItem value="">Seleccionar...</MenuItem>
                <MenuItem value="dni">DNI</MenuItem>
                <MenuItem value="cuit">CUIT</MenuItem>
                <MenuItem value="pasaporte">Pasaporte</MenuItem>
            </Select>
        );
    }

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                {/* Pasa el setter al componente para actualizar el estado */}
                <CondicionFrenteIVAReceptorfacB value={condicionIVA} onChange={setCondicionIVA} />
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <InputLabel id="tipo-doc-label" sx={{ minWidth: 180 }}>Tipo y Nro. de Documento</InputLabel>
                    {renderTipoDocSelect()}
                    <TextField
                        id="nro-doc"
                        label="Nro."
                        variant="outlined"
                        sx={{ minWidth: 180 }}
                    />
                </Box>



            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <InputLabel htmlFor="razon-social" sx={{ minWidth: 180 }}>A. y Nombre o Razón Social</InputLabel>
                <TextField
                    id="razon-social"
                    label="Razón Social"
                    variant="outlined"
                    sx={{ minWidth: 400 }}
                />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <InputLabel htmlFor="domicilio-comercial" sx={{ minWidth: 180 }}>Domicilio Comercial</InputLabel>
                <TextField
                    id="domicilio-comercial"
                    label="Domicilio Comercial"
                    variant="outlined"
                    sx={{ minWidth: 400 }}
                />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <InputLabel htmlFor="email" sx={{ minWidth: 180 }}>Email</InputLabel>
                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    sx={{ minWidth: 300 }}
                />
            </Box>
        </>
    );
}
