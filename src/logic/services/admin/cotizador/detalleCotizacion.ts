import { _$post } from "@utils/fetching";
import { getCookieServer } from "@utils/server/cookies";
import { evaluateResponse } from "@utils/server/fetching";
import { DetalleCotizacionTypes as types } from "@types"


export async function getQuotesByID(dataToSend: types.GetQuotesByIdIN){
    const path = "/quoter/quoteByID";
    const authToken = await getCookieServer();


    if(authToken){
        const response = await _$post<types.GetQuotesByIdPayload, types.GetQuotesByIdIN>(
            path, dataToSend, authToken
        );

        const payload = evaluateResponse<types.GetQuotesByIdPayload>(response, path);

        return payload;

    }else{

    }
}
