/***** CONTEXT ***********/


/* Components */
 ///......

/* Sharing */

export type Cobertura = {
    id: number, 
    descripcion: string, 
    tipo: "Base" | "Adicional",
    sumaAsegurada: number | null, 
    prima: number, 
    editaSA: boolean,
    sumasAseguradas: Array<{id: number, descripcion: number}> | null,
}


export type CoberturaBase = {
    id: number,
    descripcion: string,
    sumaAsegurada: number,
    prima: number,
    editaSA: boolean,
}

export type CoberturaAdicional = {
    id: number,
    descripcion: string,
    sumaAseguradaMaxima: number,
    primaMaxima: number,
    sumasAseguradas: Array<{id: number, descripcion: number}> | null,
    editaSA: boolean, 
}


/* Contexts */
export type CoberturaDataTablePicture = {
    checkboxState: boolean,
    coberturaData: {
        type: "base" | "adicional",
        description: string,
        sumaAsegurada: number, 
        prima: number, 
        editaSA: boolean, 
        sumasAseguradasList?: Array<{id: number, descripcion: number}>,
    }
}


/* Services */
  //sharing 
export type ResultadosCoberturas = {
    subtotal: number, 
    pagoFraccionado: number, 
    gastosExpedicion: number, 
    total: number,
}


  //get coverages by qupte 
export type GetCoberturasPorCotizacionPayload = {
    coberturasBase: Array<Cobertura>,
    coberturasAdicionales: Array<Cobertura>,
    resultados: ResultadosCoberturas,
}


    //get calculate primes 
export type GetCalculatePrimesIN = {
    idCotizacion: string, 
    estatusCoberturas: Array<{
        id: number, 
        descripcion: string,
        sumaAsegurada: number, 
        status: boolean,
    }>
}
export type GetCalculatePrimesPayload = {
    primasCalculadas: Array<{
        id: number,
        descripcion: string, 
        tipo: "Adicional" | "Base",
        prima: number,
    }>, 
    resultados: ResultadosCoberturas,
}

    //update primes quote 
export type UpdatePrimesQuoteIN = {
    idCotizacion: string, 
    accion: "guardar" | "solicitar",
    coberturas: Array<{
        id: number, 
        descripcion: string,
        tipo: "base" | "adicional",
        sumaAsegurada: number, 
        prima: number, 
    }>,
    resultados: ResultadosCoberturas,
}
export type UpdatePrimesQuotePayload = {
    idCotizacion?: string,
    idEmision?: string, 
}