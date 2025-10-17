import { Box, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import CondicionFrenteIVAReceptorFacturaB from "./DatosReceptorFactura/CondicionFrenteIVAReceptorFacturaB";
import { useFormStore } from "../store/useFormStore";
import CondicionFrenteIVAReceptorFacturaA from "./DatosReceptorFactura/CondicionFrenteIVAReceptorFacturaA";
import { set } from "zod";

// Opciones para consumidor final
const tiposDocConsumidorFinal = [
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

    
 

export default function DatosReceptorComprobanteDetail() {
    // const [condicionIVA, setCondicionIVA] = useState("");
    const [tipoDoc, setTipoDoc] = useState("");
    const { tipoComprobante , setTipoDocumento , setNumeroDocumento , numeroDocumento , setRazonSocial , razonSocial , setDomicilioComercial , domicilioComercial , condicionIVA , setCondicionIVA } = useFormStore();

    // Renderiza el select de tipo de documento según la condición frente al IVA
    function renderTipoDocSelect() {
        if (condicionIVA === "4" || condicionIVA === "7" || condicionIVA === "10" || condicionIVA === "15") {
            // IVA Sujeto Exento o Sujeto No Categorizado: solo CUIT
            return (
                <Select
                    labelId="tipo-doc-label"
                    id="tipo-doc"
                    value={tipoDoc}
                    onChange={e => {
                        setTipoDoc(e.target.value);
                        setTipoDocumento({ codigo: e.target.value, descripcion: "CUIT" });
                        
                    }}
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
                    onChange={e =>{
                        setTipoDoc(e.target.value);
                        setTipoDocumento({ codigo: e.target.value,  descripcion: tiposDocConsumidorFinal.find(opt => opt.codigo === e.target.value)?.descripcion || ""});
                    }}
                    sx={{ minWidth: 138 }}
                >
                    {tiposDocConsumidorFinal.map(opt => (
                        <MenuItem key={opt.codigo} value={opt.codigo}>{opt.descripcion}</MenuItem>
                    ))}
                </Select>
            );
           
        }
         if (condicionIVA === "8" || condicionIVA === "9") {
                // Proveedor del Exterior o Cliente del Exterior: solo Pasaporte
                return (
                    <Select
                        labelId="idTipoDocReceptor-label"
                        id="idtipodocreceptor"
                        value={tipoDoc}
                        onChange={e => setTipoDoc(e.target.value)}
                        sx={{ minWidth: 138 }}
                    >
                        <MenuItem value="94">Pasaporte</MenuItem>
                    </Select>
                );}
       // Default: DNI, CUIT, Pasaporte
        return (
            <Select
                labelId="idTipoDocReceptor-label"
                id="idtipodocreceptor"
                value={tipoDoc}
                // onChange={e => setTipoDoc(e.target.value)}
                sx={{ minWidth: 138 }}
            >
                <MenuItem value="dni">---</MenuItem>
                <MenuItem value="cuit">---</MenuItem>
                <MenuItem value="pasaporte">---</MenuItem>
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
                    <InputLabel id="tipo-doc-label" sx={{ minWidth: 180 }}>Tipo y Nro. de Documento</InputLabel>
                    {renderTipoDocSelect()}
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
