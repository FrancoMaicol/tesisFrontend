import { _$post } from "@utils/fetching";
import { getCookieClient } from "@utils/cookies";
import { evaluateResponse } from "@services/utils/index";
import { CotizacionesTypes as types } from "@types"

export async function getQuotesByPage(dataToSend: types.GetQuotesByPaginationIN){
    const path = "/quoter/quoteViewerByProduct";
    const authToken = getCookieClient('auth-token') as string;
    const response = await _$post<types.GetQuotesByPaginationPayload, types.GetQuotesByPaginationIN>(
        path, dataToSend, authToken
    );
    const payload = evaluateResponse<types.GetQuotesByPaginationPayload>(response, path);
    return payload;
}
