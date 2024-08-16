//:::: SERVICE: getTableData ::::::
//input data (only in post,  services o update, or delete)
export type GetTableLauncherIN = {
    elementos: number,
    pagina: number, 
    producto: {
        id: number, 
        descripcion: string,
    }
}
//payload
export type GetTableLauncherPayload = {
    totalSuscripcion: number,
    suscripciones:  Array<SuscripcionTableElement>
}

export type SuscripcionTableElement = {
    idSolicitud: string, 
    nombre: string, 
    subproducto: string, 
    plan: string, 
    prima: number,
    estatus: "suscripcion", 
}


//:::: SERVICE: getDetallesPlanInitialData ::::::
//input data (only in post,  services o update, or delete)
export type GetDetallesPlanInitialDataIN = {
    idSuscripcion: string, 
}
//payload
export type GetDetallesPlanInitialDataPayload = {
    detallePlan: {
        tipoPlan: string,
        moneda: string,
        dependientes: number,
        sumaAsegurada: string,
        porcentajeHm: string,
        porcentajeHq: string,
        coaseguro: string,
        deducible: string,
        formaPago: string,
    },
    coberturas: Array<{
        id: number,
        tipo: "base" | "adicional",
        prima: number,
        descripcion: string,
        sumaAsegurada: number, 
        estatus: "esm" | "acc" | "dcl",
        epMedica?: number, 
        epOcupacional?: number,
    }>,
    resultados: {
        subtotal: number,
        pagoFraccionado:  number,
        gastosExpedicion: number,
        total:  number,
        subtotalExtraprimas: {
            medica?: number | null,
            ocupacional?: number | null,
            subtotal?: number | null
        }
    }
}


//:::: SERVICE: sendExtPrimasPercents ::::::
//input data (only in post,  services o update, or delete)
export type SendExtPrimasPercentsIN = {
    idSuscripcion: string,
    listaCoberturas: Array<{
      id: number, //idCobertura
      estatus: string,
      decision: string,
      porcentajeEPM: number,
      porcentajeEPO: number
    }>
}
//payload
export type SendExtPrimasPercentsPayload = {
    
}

//:::: SERVICE: dataEvaluateRisks ::::::
//input data (only in post,  services o update, or delete)
export type DataEvaluateRisksIN = {
    idSuscripcion: string,
}
//payload
export type DataEvaluateRisksPayload = Array<{
    decision: "acc" | "dcl" | null,
    descripcion: string,
    estatus: "acc" | "esm" | "dcl",
    id: number,
    porcentajeEPM: number,
    porcentajeEPO: number
}>




