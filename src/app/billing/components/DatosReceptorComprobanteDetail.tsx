import { Box, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import CondicionFrenteIVAReceptorFacturaB from "./DatosReceptorFactura/CondicionFrenteIVAReceptorFacturaB";
import { useFormStore } from "../store/useFormStore";
import CondicionFrenteIVAReceptorFacturaA from "./DatosReceptorFactura/CondicionFrenteIVAReceptorFacturaA";
import { set } from "zod";

// Opciones para consumidor final
const tiposDocumentoParaFacturaBConsumidorFinal = [
    { codigo: "80", descripcion: "CUIT" },
    { codigo: "86", descripcion: "CUIL" },
    { codigo: "87", descripcion: "CDI" },
    { codigo: "89", descripcion: "LE" },
    { codigo: "90", descripcion: "LC" },
    { codigo: "91", descripcion: "CI Extranjera" },
    { codigo: "96", descripcion: "DNI" },
    { codigo: "94", descripcion: "Pasaporte" },
    { codigo: "00", descripcion: "CI Policía Federal" },
    { codigo: "30", descripcion: "Certificado de Migración" }
];

// Opciones para casos específicos
const tipoDocumentoCUIT = [
    { codigo: "80", descripcion: "CUIT" }
];

const tipoDocumentoPasaporte = [
    { codigo: "94", descripcion: "Pasaporte" }
];

    
 

export default function DatosReceptorComprobanteDetail() {
    // const [condicionIVA, setCondicionIVA] = useState("");
    // const [tipoDoc, setTipoDoc] = useState("");
    const { tipoComprobante , setTipoDocumento , setNumeroDocumento , numeroDocumento , setRazonSocial , razonSocial , setDomicilioComercial , domicilioComercial , condicionIVA , setCondicionIVA, tipoDocumento} = useFormStore();

    // Renderiza el select de tipo de documento según la condición frente al IVA
    function renderTipoDocSelect(condicionIVAcodigo: string | undefined) {
        // IVA Sujeto Exento, Sujeto No Categorizado, IVA Liberado, IVA No Alcanzado: solo CUIT
        if (condicionIVA?.codigo === "4" || condicionIVA?.codigo === "7" || condicionIVA?.codigo === "10" || condicionIVA?.codigo === "15") {
            return (
                <Select
                    labelId="tipo-doc-label"
                    id="tipo-doc"
                    value={tipoDocumento?.codigo || ""}
                    onChange={e => {
                        const selectedTipo = tipoDocumentoCUIT.find(opt => opt.codigo === e.target.value);
                        setTipoDocumento(selectedTipo || null);
                    }}
                    sx={{ minWidth: 140 }}
                >
                    {tipoDocumentoCUIT.map(opt => (
                        <MenuItem key={opt.codigo} value={opt.codigo}>{opt.descripcion}</MenuItem>
                    ))}
                </Select>
            );
        }
        
        // Consumidor Final: todos los tipos de documento
        if (condicionIVA?.codigo === "5") {
            console.log("Es Consumidor Final");
            return (
                <Select
                    labelId="idTipoDocReceptor-label"
                    id="idtipodocreceptor"
                    value={tipoDocumento?.codigo || ""}
                    onChange={e => {
                        const selectedTipo = tiposDocumentoParaFacturaBConsumidorFinal.find(opt => opt.codigo === e.target.value);
                        setTipoDocumento(selectedTipo || null);
                    }}
                    sx={{ minWidth: 138 }}
                >
                    {tiposDocumentoParaFacturaBConsumidorFinal.map(opt => (
                        <MenuItem key={opt.codigo} value={opt.codigo}>{opt.descripcion}</MenuItem>
                    ))}
                </Select>
            );
        }
        
        // Proveedor del Exterior o Cliente del Exterior: solo Pasaporte
        if (condicionIVA?.codigo === "8" || condicionIVA?.codigo === "9") {
            return (
                <Select
                    labelId="idTipoDocReceptor-label"
                    id="idtipodocreceptor"
                    value={tipoDocumento?.codigo || ""}
                    onChange={e => {
                        const selectedTipo = tipoDocumentoPasaporte.find(opt => opt.codigo === e.target.value);
                        setTipoDocumento(selectedTipo || null);
                    }}
                    sx={{ minWidth: 138 }}
                >
                    {tipoDocumentoPasaporte.map(opt => (
                        <MenuItem key={opt.codigo} value={opt.codigo}>{opt.descripcion}</MenuItem>
                    ))}
                </Select>
            );
        }

        //para Factura A
        if(condicionIVA?.codigo === "1" || condicionIVA?.codigo === "6" || condicionIVA?.codigo === "13" || condicionIVA?.codigo === "16") {
            return (
                 <Select
                    labelId="tipo-doc-label"
                    id="tipo-doc"
                    value={tipoDocumento?.codigo || ""}
                    onChange={e => {
                        const selectedTipo = tipoDocumentoCUIT.find(opt => opt.codigo === e.target.value);
                        setTipoDocumento(selectedTipo || null);
                    }}
                    sx={{ minWidth: 140 }}
                >
                    {tipoDocumentoCUIT.map(opt => (
                        <MenuItem key={opt.codigo} value={opt.codigo}>{opt.descripcion}</MenuItem>
                    ))}
                </Select>
            );
        }
        // Caso por defecto: CUIT
        return (
            <Select
                labelId="tipo-doc-label"
                id="tipo-doc"
                value={tipoDocumento?.codigo || ""}
                onChange={e => {
                    const selectedTipo = tipoDocumentoCUIT.find(opt => opt.codigo === e.target.value);
                    setTipoDocumento(selectedTipo || null);
                }}
                sx={{ minWidth: 140 }}
            >
                {tipoDocumentoCUIT.map(opt => (
                    <MenuItem key={opt.codigo} value={opt.codigo}>{opt.descripcion}</MenuItem>
                ))}
            </Select>
        );
    }

    function selectCondicionIVAReceptor(codigoTipoComprobante: string) {
        console.log("Tipo Comprobante seleccionado: ", codigoTipoComprobante)

        if (codigoTipoComprobante === "01") { // Cambiado de "01" a "1"
            console.log("Es A")
            return (<CondicionFrenteIVAReceptorFacturaA value={condicionIVA} onChange={setCondicionIVA} />)
        }
        if (codigoTipoComprobante === "06") { // Cambiado de "06" a "2" (según tu JSON es Factura B)
            console.log("Es B")
            return <CondicionFrenteIVAReceptorFacturaB value={condicionIVA} onChange={setCondicionIVA} />
        }
        
        // Caso por defecto - esto es lo que faltaba
        return (
            <h3>Condición IVA Receptor no hay</h3>
        );
    }

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                
        
                {selectCondicionIVAReceptor(tipoComprobante?.codigo || "")}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <InputLabel id="tipo-doc-label" sx={{ minWidth: 180 }}>{tipoComprobante?.codigo === "01" ? "CUIT" : "Tipo y Nro. de Documento" }</InputLabel>
                    {renderTipoDocSelect(condicionIVA?.codigo)}
                    <TextField
                        id="nro-doc"
                        label="Nro."
                        variant="outlined"
                        value={numeroDocumento}
                        onChange={e => setNumeroDocumento(e.target.value)}
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
                    value={razonSocial}
                    onChange={e => setRazonSocial(e.target.value)}
                />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <InputLabel htmlFor="domicilio-comercial" sx={{ minWidth: 180 }}>Domicilio Comercial</InputLabel>
                <TextField
                    id="domicilio-comercial"
                    label="Domicilio Comercial"
                    variant="outlined"
                    sx={{ minWidth: 400 }}
                    value={domicilioComercial}                   
                    onChange={e => setDomicilioComercial(e.target.value)}
                />
            </Box>
            {/* <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <InputLabel htmlFor="email" sx={{ minWidth: 180 }}>Email</InputLabel>
                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    sx={{ minWidth: 300 }}
                />
            </Box> */}
        </>
    );
}
