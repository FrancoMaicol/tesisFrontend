import { _$post } from "@utils/fetching";
import { getCookieClient } from "@utils/cookies";
import { evaluateResponse } from "@services/utils/index";
import { SuscripcionesServices as types } from "@types"

//Obtener suscrippciones 
export async function getTableLauncher(dataToSend: types.GetTableLauncherIN){
    const path = "/subscription/subsViewerByProduct";
    const authToken = getCookieClient('auth-token') as string;
    const response = await _$post<types.GetTableLauncherPayload, types.GetTableLauncherIN>(
        path, dataToSend, authToken
    );
    const payload = evaluateResponse<types.GetTableLauncherPayload>(response, path);
    return payload;
}
