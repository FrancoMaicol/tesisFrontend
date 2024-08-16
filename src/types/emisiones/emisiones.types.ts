///// CONTEXT //////////////
export type EmisionTableElement = {
    idSolicitud: string, 
    nombre: string, 
    subProducto: string, 
    plan: string, 
    prima: number,
    estatus: "cotizando" | "emision", 
}


//// Services /////////////

    //getQuotesByPagination
/* export type GetQuotesByPaginationIN = {
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
} */