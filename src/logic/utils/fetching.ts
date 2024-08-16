import { urlAPI } from "@services/config";
import { FetchOutput } from "@types";

export async function _get(path: string, authToken: string){

    try{
        const response = await fetch(`${urlAPI}${path}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${authToken}`,
            }
        });

        const data  = await response.json();

        return { data, codeStatus: response.status};

    }catch(error){
        let message: string = "";
        if(error instanceof TypeError || error instanceof Error)
            message = error.message;
        return { error: message }
    }
}

export async function _post<T>(path:string, dataToSend: T, authToken: string) {

    try{
        const response = await fetch(`${urlAPI}${path}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`,
            },
            body: JSON.stringify({...dataToSend})
        });
        const data = await response.json();
        return { data, codeStatus: response.status};
    }catch(error){
        let message: string = "";
        if(error instanceof TypeError || error instanceof Error)
            message = error.message;
        return { error: message }
    }
}

export const _put = () => {

}

export const _delete = () => {

}


//      I M P R O V E M E N T S 
/******************************************** */
/******************************************** */
/******************************************** */
/******************************************** */
/******************************************** */
/******************************************** */
/******************************************** */

// ✨ ✨ ✨ ✨ Improved get fetching ✨ ✨ ✨ ✨
export async function _$get<TPayloadOutput>(path: string, authToken: string) : Promise<FetchOutput<TPayloadOutput>> {
    try{
        const response = await fetch(`${urlAPI}${path}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${authToken}`,
            }
        });
        const data  = await response.json();
        return { data, codeStatus: response.status};
    }catch(error){
        let message: string = "";
        if(error instanceof TypeError || error instanceof Error)
            message = error.message;
        return { error: message }
    }
}

// ✨ ✨ ✨ ✨ Improved post fetching ✨ ✨ ✨ ✨
export async function _$post<TPayloadOutput, TInput>(path:string, dataToSend: TInput, authToken: string) : Promise<FetchOutput<TPayloadOutput>> {
    try{
        const response = await fetch(`${urlAPI}${path}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`,
            },
            body: JSON.stringify({...dataToSend})
        });
        const data = await response.json();
        return { data, codeStatus: response.status};
    }catch(error){
        let message: string = "";
        if(error instanceof TypeError || error instanceof Error)
            message = error.message;
        return { error: message }
    }
}