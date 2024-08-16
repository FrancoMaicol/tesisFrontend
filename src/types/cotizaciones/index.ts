///// CONTEXT //////////////
export type CotizacionProduct = {
    id: number, 
    verboseName: string,
}

export type CotizacionTableElement = {
    idSolicitud: string, 
    nombre: string, 
    subproducto: string, 
    plan: string, 
    prima: number,
    estatus: "cotizando" | "emision", 
}


//// Services /////////////

    //getQuotesByPagination
export type GetQuotesByPaginationIN = {
    elementos: number,
    pagina: number, 
    producto: {
        id: number, 
        descripcion: string,
    }
}

export type GetQuotesByPaginationPayload = {
    totalCotizaciones: number,
    cotizaciones:  Array<CotizacionTableElement>
}