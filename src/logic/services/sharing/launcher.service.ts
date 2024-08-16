import { _$post } from "@utils/fetching";
import { getCookieClient } from "@utils/cookies";
import { evaluateResponse } from "@services/utils/index";
import { LauncherTypes as types } from "@types"

//Para obtener todos los items de la tabla filtrando por producto actual
//Se manda el génerico TTableItem para indicar el tipo de item a introducir en la tabla
// se introduce el table type para saber que endpoint debe el usuario consultar

export async function getTableItemsByProduct<TTableItem>(tableType: types.LauncherTypes, dataToSend: types.GetTableItemsByProductIN){

    let path = "";
    switch(tableType){
        case "cotizaciones":
            path = "/quoter/quoteViewerByProduct";
            break;
        case "emisiones":
            path = "/issuer/issueViewerByProduct";
            break;
        case "suscripciones":
            return;
            break;
        default: break;
    }

    const authToken = getCookieClient('auth-token') as string;
    const response = await _$post<types.GetTableItemsByProductPayload<TTableItem>, types.GetTableItemsByProductIN>(
        path, dataToSend, authToken
    );
    const payload = evaluateResponse<types.GetTableItemsByProductPayload<TTableItem>>(response, path);
    return payload;
}
