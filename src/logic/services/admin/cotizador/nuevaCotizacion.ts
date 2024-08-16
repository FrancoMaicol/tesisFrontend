import { _post, _get } from "@utils/fetching";
import { getCookieClient } from "@utils/cookies";
import { verifyIsTokenValidClient } from "@services/auth/tokensClient";

import { _$post } from "@utils/fetching";
import { processingResponse } from "@services/utils/index";


type GetProductsByBranch = {
    idRamo: number;
}
/** STEP 1. PRODUCTO REGISTRO */
export async function getProductsByBranch(){

    await verifyIsTokenValidClient(); //Make redirections if is not valid token

    /* Get cookie and verify service */
    const authToken = getCookieClient('auth-token');
    const idRamo = getCookieClient('id-ramo');

    const response = await _post<GetProductsByBranch>("/catalog/products_by_branchid", 
        {idRamo: Number(idRamo)} , authToken as string);

    return response;
}

export async function getCatalogs(){
    await verifyIsTokenValidClient(); //Make redirections if is not valid token
    /* Get cookie and verify service */
    const authToken = getCookieClient('auth-token');

        //"catalog/itemsByBranchAndProduct", //NEW 

    const response = _get("/catalog/all_items_quoter", authToken as string);

    return response;

}

type getCatalogsById = {
    idRamo: number;
    idProducto: number,
}
export async function getCatalogsByProduct(idProducto?: number){
    await verifyIsTokenValidClient(); //Make redirections if is not valid token
    const authToken = getCookieClient('auth-token');
    const idRamo = getCookieClient('id-ramo');
    
    const response = await _post<getCatalogsById>(
        //"/catalog/items_by_productid", //OLD
        "/catalog/itemsByBranchAndProduct", //NEW
        { 
            idRamo: Number(idRamo),
            idProducto: Number(idProducto),
        }, 
        authToken as string
    );

    return response;
}

export async function sendProductoRegistroForm(idProducto?: number, dataToSend?: any){

    /* if(!idProducto){
        return {error: "Producto inválido"}
    } */

    await verifyIsTokenValidClient(); //Make redirections if is not valid token
    const authToken = getCookieClient('auth-token');
    const idRamo = getCookieClient('id-ramo');

    const response = await _post<any>(
        "/quoter/new_quote", 
        { 
            idRamo: Number(idRamo),
            idProducto: Number(idProducto),
            ...dataToSend,
        }, 
        authToken as string
    );
    
    return response;

}


/** STEP 2. DEPENDIENTES */

export async function getRelationshipsCatalog(){
    await verifyIsTokenValidClient(); //Make redirections if is not valid token
    /* Get cookie and verify service */
    const authToken = getCookieClient('auth-token');

    const response = _get("/catalog/all_relationships", authToken as string);
/* 
    if(response.error){
        alert(`Error de red. Detail: ${response.error}`);
    } */
    
    return response;

}


export async function sendDependents(idCotizacion: string, dataToSend?: any){

    await verifyIsTokenValidClient(); //Make redirections if is not valid token
    const authToken = getCookieClient('auth-token');

    const response = await _post<any>(
        "/quoter/create_dependents", 
        { 
            idCotizacion: idCotizacion,
            listaDependientes: dataToSend,
        }, 
        authToken as string
    );
    
    return response;
}


/** STEP 3 CONFIGURACION PLAN */
import { NuevaCotizacionTypes as NCTypes} from "@types";

type GetCoveragesByQuoteIN = { idCotizacion: string; }

export async function getCoveragesByQuote(idCotizacion: string) : Promise<NCTypes.GetCoberturasPorCotizacionPayload | undefined>{
    const authToken = getCookieClient('auth-token') as string;
    const response = await _$post<NCTypes.GetCoberturasPorCotizacionPayload, GetCoveragesByQuoteIN>(
        "/catalog/coveragesByQuote", 
        { idCotizacion: idCotizacion }, 
        authToken,
    );
    const payload = processingResponse<NCTypes.GetCoberturasPorCotizacionPayload>(response, "/catalog/coveragesByQuote");
    return payload;
}

//Para calcular primas y resultados con datos de entrada
export async function getCalculatePrimes(dataToSend: NCTypes.GetCalculatePrimesIN) : Promise<NCTypes.GetCalculatePrimesPayload | undefined>{
    const path = "/quoter/calculatePrimes"
    const authToken = getCookieClient('auth-token') as string;
    const response = await _$post<NCTypes.GetCalculatePrimesPayload, NCTypes.GetCalculatePrimesIN>(
        path, dataToSend, authToken
    );
    const payload = processingResponse<NCTypes.GetCalculatePrimesPayload>(response, path);
    return payload;
}


//Para guardar o actualizar el paso 3 del formulario 
export async function updatePrimesQuote(dataToSend: NCTypes.UpdatePrimesQuoteIN) : Promise<NCTypes.UpdatePrimesQuotePayload | undefined>{
    const path = "/quoter/updatePrimesQuote"
    const authToken = getCookieClient('auth-token') as string;
    const response = await _$post<NCTypes.UpdatePrimesQuotePayload, NCTypes.UpdatePrimesQuoteIN>(
        path, dataToSend, authToken
    );
    const payload = processingResponse<NCTypes.UpdatePrimesQuotePayload>(response, path);
    return payload;
}
