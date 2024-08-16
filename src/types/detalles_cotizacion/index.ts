import { SelectStates } from "@types"

import { NuevaCotizacionTypes as NCTypes } from "@types";

////////// CONTEXT ///////////
export type ContextState = {
    idCotizacion?: string,
    tipoSeguro?: string, 
    tipoPlan?: string,
    estatus?: "cotizando" | "emision",
    producto?: {
        id: number, 
        descripcion: string,
        selectStates: SelectStates,
    },
    numeroDependientes?: number,
    steps?: {
        registro?: {
            status: "filled" | "available" | "disabled",
            individualFormStates: any,
            colectiveFormStates: any,
        },
        dependientes?: {
            status: "filled" | "available" | "disabled",
            dependientesFormsStates: Array<{
                nombreCompleto: SelectStates, 
                edad: SelectStates, 
                genero: SelectStates, 
                parentesco: SelectStates,
            }>,
        },
        coberturas?: {
            status: "filled" | "available" | "disabled",
            headerCheckbox: boolean,
            results?: {
                subtotal: number, 
                pagoFraccionado: number, 
                gastosExpedicion: number, 
                total: number,
            },          
            picture?: {
                [idCobertura: number] : {
                    //selectValue?: string, //solo en adicionales y no amparadas
                    checkboxState: boolean,
                    coberturaData: {
                        id: number,
                        tipo: "base" | "adicional",
                        descripcion: string,
                        sumaAsegurada: number, 
                        prima: number, 
                        editaSA: boolean, 
                        sumasAseguradasList?: Array<{id: number, descripcion: number}>,
                    }
                }
            },
            iNeedFetching: boolean,
        },
    }
}



////////// SERVICES ////////// 
export type GetQuotesByIdIN = {
    idCotizacion: string
}

export type GetQuotesByIdPayload = {
    idRamo: number, 
    producto:{ id: number, descripcion: string},
    estatus: "cotizando" | "emision",
    tipoSeguro: "individual" | "colectivo",
    registro?: {
        nombres: string, 
        apellidoPaterno: string, 
        fechaNacimiento: string, 
        genero: string, 
        edad: string, 
        tipoPlan: string,
        tipoSeguro: string, 
        moneda: string, 
        dependientes: number, 
        sumaAsegurada: string, 
        multiplo: number, 
        porcentajeHm: string, 
        porcentajeHq: string, 
        coaseguro: string, 
        deducible: string, 
        formaPago: string, 
        ocupacion?: string, 
        lugarTrabajo?: string,
    },
    completoDependientes: boolean, //para saber si completo o no el paso de dependientes 
    dependientes?: Array<{
        nombreCompleto: string, 
        edad: number, 
        genero: string, 
        parentesco: string,
    }>,
    coberturas?: {
        resultados: NCTypes.ResultadosCoberturas,
        primasCalculadas: Array<{
            tipo: string, 
            id: number, 
            prima: number, 
            sumaAsegurada?: number, 
            descripcion: string,
        }>
    }
}