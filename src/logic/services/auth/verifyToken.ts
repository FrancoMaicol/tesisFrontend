import * as _fetch from "@utils/fetching";
import { getAuthToken } from "@utils/auth-server";
import { _get } from "@utils/fetching";
import { redirect } from "next/navigation";

export async function verifyIsTokenValid() {
    //Esto solo verifica que el token exista, no que sea valido
    const authToken = await getAuthToken();
    const response = await _get(`/login/verify_token`, authToken as string);
    if(response.error) redirect(`/network_error?error_message=${response.error}`)
    if(!response.data?.success) redirect("/invalid_token");
}
