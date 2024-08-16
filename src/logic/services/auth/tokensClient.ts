import { getCookieClient } from "@utils/cookies";
import { _get } from "@utils/fetching";

export async function verifyIsTokenValidClient() {
    const authToken = getCookieClient('auth-token');

    let isTokenValid = false;
    
    if(authToken !== null){
        const response =  await _get("/login/verify_token", authToken);

        if(response.error) {
            alert(`Network error: ${response.error}`);
            window.location.href = window.location.href;
        }
     
        isTokenValid = response.data.success ? true : false;
    }

    if(!isTokenValid){
        alert("Sesion expirada");
        window.location.href = "/login";
    }
}