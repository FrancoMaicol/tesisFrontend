import { _$get, _$post } from "@utils/fetching";
import { getCookieClient } from "@utils/cookies";
import { evaluateResponse } from "@services/utils/index";
import { DetalleEmisionTypes as types } from "@types"



//////////////// STEP 1 : ASEGURADO ////////////////

// service to get all Selects array in asegurado step in emision detail section
export async function getAllSelectsData(){
    const path = "/catalog/itemsIssue";
    const authToken = getCookieClient('auth-token') as string;
    const response = await _$get<types.GetAllSelectsData>(
        path, authToken
    );
    const payload = evaluateResponse<types.GetAllSelectsData>(response, path);
    return payload;
}


// service to get al data of asegurado in step emision details section 
export async function getAseguradoData(idEmision: string){
    const path = "/issuer/insuredDataByID";
    const authToken = getCookieClient('auth-token') as string;
    const response = await _$post<types.GetAseguradoDataPayload, types.GetAseguradoDataIN>(
        path, {idEmision: idEmision}, authToken
    );
    const payload = evaluateResponse<types.GetAseguradoDataPayload>(response, path);
    return payload;
}

export async function getDataByZipCode(zipCode: string){
    const path = "/catalog/dataByZipCode";
    const authToken = getCookieClient('auth-token') as string;
    const response = await _$post<types.GetDataByZipCodePayload, types.GetDataByZipCodeIN>(
        path, {codigoPostal: zipCode}, authToken
    );
    const payload = evaluateResponse<types.GetDataByZipCodePayload>(response, path);
    return payload;
}


//service to send asegurado
export async function sendAseguradoData(dataToSend: types.SendAseguradoDataIN){
    const path = "/issuer/updateIssue";
    const authToken = getCookieClient('auth-token') as string;
    const response = await _$post<types.SendAseguradoDataPayload, types.SendAseguradoDataIN>(
        path, dataToSend, authToken
    );
    const payload = evaluateResponse<types.SendAseguradoDataPayload>(response, path);
    return payload;
}


//////////////// STEP 3 : Dependientes ////////////////
// service to get dependientes data
export async function getDependientes(dataToSend: types.GetDependientesIN){
    const path = "/issuer/dependentsDataByID";
    const authToken = getCookieClient('auth-token') as string;
    const response = await _$post<types.GetDependientesPayload, types.GetDependientesIN>(
        path, dataToSend, authToken
    );
    const payload = evaluateResponse<types.GetDependientesPayload>(response, path);
    return payload;
}

//service to send dependientes data
export async function sendDependientesData(dataToSend: types.SendDependientesDataIN){
    const path = "/issuer/createDependents";
    const authToken = getCookieClient('auth-token') as string;
    const response = await _$post<types.SendDependientesDataPayload, types.SendDependientesDataIN>(
        path, dataToSend, authToken
    );
    const payload = evaluateResponse<types.SendDependientesDataPayload>(response, path);
    return payload;
}

//service to send dependientes cuestionarios
export async function sendDependientesCuestionarios(dataToSend: types.SendDependientesCuestionariosIN){
    const path = "/issuer/createSurveys";
    const authToken = getCookieClient('auth-token') as string;
    const response = await _$post<types.SendDependientesCuestionariosPayload, types.SendDependientesCuestionariosIN>(
        path, dataToSend, authToken
    );
    const payload = evaluateResponse<types.SendDependientesCuestionariosPayload>(response, path);
    return payload;
}


//////////////// STEP 3-4 : Cuestionarios Dependientes ////////////////
export async function getItemsSurveys(){
    const path = "/catalog/itemsSurveys";
    const authToken = getCookieClient('auth-token') as string;
    const response = await _$get<types.GetItemsSurveysPayload>(
        path, authToken
    );
    const payload = evaluateResponse<types.GetItemsSurveysPayload>(response, path);
    return payload;
}

//////////////// STEP 5: Cuestionarios Dependientes ////////////////
export async function getBancos(){
    const path = "/catalog/itemsPayDetail";
    const authToken = getCookieClient('auth-token') as string;
    const response = await _$get<types.GetBancosPayload>(
        path, authToken
    );
    const payload = evaluateResponse<types.GetBancosPayload>(response, path);
    return payload;
}

//////////////// STEP 6: Detalles plan ////////////////
export async function getCatalogsByProduct(idProducto: number){
    const authToken = getCookieClient('auth-token') as string;
    const idRamo = getCookieClient('id-ramo');
    const path = "/catalog/itemsByBranchAndProduct";
    const response = await _$post<types.GetCatalogsByProductPayload, types.GetCatalogsByProductIN>(
        path, {
            idRamo: Number(idRamo), 
            idProducto: idProducto, 
        }, authToken
    );
    const payload = evaluateResponse<types.GetCatalogsByProductPayload>(response, path);
    return payload;
}

// Para traer el catalogo de coberturas con sus valores de selects
export async function getCatalogCoverages(dataToSend: types.GetCoveragesFromCatalogIN){
    const authToken = getCookieClient('auth-token') as string;
    const idRamo = getCookieClient('id-ramo');
    const path = "/catalog/coveragesByIDPlan";
    const response = await _$post<types.GetCoveragesFromCatalogPayload, types.GetCoveragesFromCatalogIN>(
        path, dataToSend, authToken
    );
    const payload = evaluateResponse<types.GetCoveragesFromCatalogPayload>(response, path);
    return payload;
}

// Para traer los datos del paso 6
export async function getDetallesPlanInitialData(dataToSend: types.GetDetallesPlanInitialDataIN){
    const authToken = getCookieClient('auth-token') as string;
    const path = "/issuer/issueDataByID";
    const response = await _$post<types.GetDetallesPlanInitialDataPayload, types.GetDetallesPlanInitialDataIN>(
        path, dataToSend, authToken
    );
    const payload = evaluateResponse<types.GetDetallesPlanInitialDataPayload>(response, path);
    return payload;
}

//enviar a suscripcion manual 
export async function sendToSuscripcionManual(dataToSend: types.sendToSuscripcionManualIN){
    const authToken = getCookieClient('auth-token') as string;
    const path = "/issuer/validateIssue";
    const response = await _$post<types.sendToSuscripcionManualPayload, types.sendToSuscripcionManualIN>(
        path, dataToSend, authToken
    );
    const payload = evaluateResponse<types.sendToSuscripcionManualPayload>(response, path);
    return payload;
}
