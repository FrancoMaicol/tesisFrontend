import { _$get, _$post } from "@utils/fetching";
import { evaluateResponse } from "@services/utils/index";
import { SuscripcionesServices as types } from "@types"

type SendLoginIN = {
    email_address: string, 
    password: string,
}
type SendLoginPayload = {
    access_token: string, 
    token_type: string;
}


type SendSignupIN = {
    
    nombres: string, 
    apellidoPaterno: string,
    apellidoMaterno: string | undefined
    correo: string
    password: string
    posicion: string
    matriculaVehiculo: string
    region: string
    telefono: string

}

type SendSignupPayload = {
    username: string
}

//enviar login 
export async function sendLogin(dataToSend: SendLoginIN) {
    const authToken = "No needed";
    const path = "/auth/login";
    const response = await _$post<SendLoginPayload, SendLoginIN>(
        path, dataToSend, authToken
    );
    return response;
}



export async function sendSignUp(dataToSend: SendSignupIN) {
    
    const authToken = "No needed";
    const path = "/auth/signup";
    const response = await _$post<SendSignupPayload, SendSignupIN>(
        path, dataToSend, authToken
    );
    return response;
}