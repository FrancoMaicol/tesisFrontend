import { _$get, _$post } from "@utils/fetching";
import { getCookieClient } from "@utils/cookies";
import { evaluateResponse } from "@services/utils/index";
import { SuscripcionesServices as types } from "@types"

///
export async function getDetallesPlanInitialData(dataToSend: types.GetDetallesPlanInitialDataIN){
    const authToken = getCookieClient('auth-token') as string;
    const path = "/subscription/subscriptionDataByID";
    const response = await _$post<types.GetDetallesPlanInitialDataPayload, types.GetDetallesPlanInitialDataIN>(
        path, dataToSend, authToken
    );
    const payload = evaluateResponse<types.GetDetallesPlanInitialDataPayload>(response, path);
    return payload;
}

//enviar porcentajes extra primas
export async function sendExtPrimasPercents(dataToSend: types.SendExtPrimasPercentsIN){
    const authToken = getCookieClient('auth-token') as string;
    const path = "/subscription/updateExtraPrimes";
    const response = await _$post<types.SendExtPrimasPercentsPayload, types.SendExtPrimasPercentsIN>(
        path, dataToSend, authToken
    );
    const payload = evaluateResponse<types.SendExtPrimasPercentsPayload>(response, path);
    return payload;
}
//Traer datos del modal 
export async function dataEvaluateRisks(dataToSend: types.DataEvaluateRisksIN){
    const authToken = getCookieClient('auth-token') as string;
    const path = "/subscription/dataEvaluateRisks";
    const response = await _$post<types.DataEvaluateRisksPayload, types.DataEvaluateRisksIN>(
        path, dataToSend, authToken
    );
    const payload = evaluateResponse<types.DataEvaluateRisksPayload>(response, path);
    return payload;
}
