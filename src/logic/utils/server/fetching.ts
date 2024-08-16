import { FetchOutput } from "@types";
import { redirect } from "next/navigation";

export function evaluateResponse<TPayloadOutput>(response: FetchOutput<TPayloadOutput>, originPath: string): TPayloadOutput | undefined{
   

    if('error' in response){
        redirect(`/network_error?error_message=${response.error}`)
    } else if(response.data.tokenStatus === false){
        //Aqui seria mejor ir a una pantalla donde se le indiqu al usuario que su sesión expiró
        redirect(`/login`)
    }else if(response.data.success === false){
        //aqui sería mejor redireccionar a otra pantalla de error de servidor, no de network
        redirect(`/network_error?error_message=${response.data.detail}`)
        /* console.error(
            "the server respond 'error'\n", 
            `origin: ${originPath}\n`,
            `detail: ${response.data.detail}\n`,
            `code: ${response.codeStatus}\n`
        ) */
    }else {
        if(response.data.payload)
            return response.data.payload;
        else
            console.error("algo ocurrió con la solicitud: Llegó sin payload response.data: ", response.data)
    }
}