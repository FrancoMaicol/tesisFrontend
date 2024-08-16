///// CONTEXT //////////////

//--- types relationed with reducer method
export type DispatchPayloads = 
    LauncherProduct | 
    string | 
    Array<LauncherTableElement> | 
    LauncherTypes

export type DispatchEvents = 
    "setProduct" | 
    "setTextToSearch" | 
    "setTableData" |
    "setLauncherType"

//---- types relationed with context state
export type LauncherProduct = {
    id: number, 
    verboseName: string,
}
export type LauncherTypes = "cotizaciones" | "emisiones" | "suscripciones"

export type ItemBase = {
    idSolicitud: string, 
    nombre: string, 
    subproducto: string, 
}
export type CotizactionTableItem = ItemBase & {
    plan: string, 
    prima: number,
    estatus: "cotizando" | "emision",
}
export type EmisionTableItem = ItemBase & {
    ramo: string,
    estatus: "capturando" | "emitida" | "suscripcion",
}
export type SubscripcionTableItem = ItemBase & {

}
export type LauncherTableElement = CotizactionTableItem | EmisionTableItem | SubscripcionTableItem;

///////// SERVICES ///////////

 // --- Service: getTableItemsByProduct
   //Data to send to endpoint
export type GetTableItemsByProductIN = {
    elementos: number,
    pagina: number, 
    producto: {
        id: number, 
        descripcion: string,
    }
}
  // payload to receive from endpoint
export type GetTableItemsByProductPayload<TTableItem>= {
    totalItems: number, //totalItems
    items:  Array<TTableItem> //items
}