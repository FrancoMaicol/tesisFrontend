import { FetchOutput } from "@types";

/* 
    This function is for validate tokenStatus and networks errors, 
    it make the redirect required in each case, and you need
    use this funcion in all fetching of all services.
 */
export function processingResponse<TPayloadOutput>(response: FetchOutput<TPayloadOutput>, originPath: string) : TPayloadOutput | undefined{
    if('error' in response){
        alert(`Network error. detail: ${response.error}`);
        window.location.href = "/";
    } else if(response.data.tokenStatus === false){
        alert("Sesion expirada");
        window.location.href = "/login";
    }else if(response.data.success === false){
        alert(`Error de comunicacion con el servidor. Code: ${response.codeStatus}`);
        console.error(
            "the server respond 'error'\n", 
            `origin: ${originPath}\n`,
            `detail: ${response.data.detail}\n`,
            `code: ${response.codeStatus}\n`
        )
    }else {
        return response.data.payload;
    }
}

export function evaluateResponse<TPayloadOutput>(response: FetchOutput<TPayloadOutput>, originPath: string) : TPayloadOutput | undefined{
    if('error' in response){
        alert(`Network error. detail: ${response.error}`);
        window.location.href = "/";
    } else if(response.data.tokenStatus === false){
        alert("Sesion expirada");
        window.location.href = "/login";
    }else if(response.data.success === false || !response.data.success){
        alert(`El servidor dice: error. Code: ${response.codeStatus}. Origin. ${originPath}`);
        console.error(
            "the server respond 'error'\n", 
            `origin: ${originPath}\n`,
            `detail: ${response.data.detail}\n`,
            `code: ${response.codeStatus}\n`
        )
    }else {
        return response.data.payload;
    }
}

/* export function processingResponseWithCodeStatus<TPayloadOutput>(response: FetchOutput<TPayloadOutput>) : FetchSuccess<TPayloadOutput> | undefined {
    if('error' in response){
        alert(`Network error. detail: ${response.error}`);
        window.location.href = "/";
    } else if(response.data.tokenStatus === false){
        alert("Sesion expirada");
        window.location.href = "/login";
    }else if(!response.data.success){
        return response;
    }
} */