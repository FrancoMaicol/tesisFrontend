"use client"
import { useState } from "react";
import styles from "./LoginForm.styles.module.scss";
import { Input, Button, PasswordInput } from "@sharing/atoms";
import { validateInputState } from "@utils/validateInputs";
import { sendLogin } from "@services/auth/login";

import { LoginFormProps } from "./LoginForm.proptypes";

import { Loader, CheckBox } from "@sharing/atoms";
import { InputStates } from "@types";

export default function LoginForm({ setCurrentForm } : LoginFormProps) {
    const [formStates, setFormStates] = useState({
        email: { value: "eddaldana95@gmail.com", mood: "filled", helperText: "" } as InputStates,
        password: { value: "secretPassword", mood: "filled", helperText: "" } as InputStates, 
        /* email: { value: "", mood: "default", helperText: "" } as InputStates,
        password: { value: "", mood: "default", helperText: "" } as InputStates, */
    })
    const [isLoader, setIsLoader] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [checkboxValue, setCheckboxValue] = useState(false);

    const handleLogin = () => { 
        if(validateFields()) 
            sendLoginToServer(); 
    }

    const validateFields = () : boolean =>  {
        let newStates = {} as typeof formStates;
        let retorno = true;
        for(const campo in formStates){
            const campo_ = campo as keyof typeof formStates
            if(campo_ === "email") newStates[campo_] = validateInputState(formStates[campo_], "email");
            else newStates[campo_] = validateInputState(formStates[campo_], "text");
            if(newStates[campo_].mood !== "filled") retorno = false;
        }
        setFormStates(newStates);
        return retorno;
    }

    const sendLoginToServer = async () => {
        
        setErrorText("");
        setIsLoader(true);
        sendLogin({
            email_address: formStates.email.value,
            password:formStates.password.value
        })
        .then(response=>{
            setIsLoader(false);
            if('error' in response){
                alert(`Network error. detail: ${response.error}`);
            }else if(response.data.success === false || !response.data.success){
               setErrorText("Correo electrónico o contraseña no válidos. Verifique sus credenciales y vuelva a intentarlo.");
            }else {
                const token= response.data.payload.access_token;
                document.cookie = `auth-token=${token}; path=/`;
                window.location.href = "/authentication"; 
            }
        })
    }

    const handleKeyDown = (event: any /*🔥*/) => {
        if (event.keyCode === 13) {
            handleLogin()
        }
    };

    const onFormChange = (states: InputStates, _: number, identifier: string) => {
        setFormStates({
            ...formStates, 
            [identifier]: states,
        })
    }

    return(
        <div className={styles.container} onKeyDown={handleKeyDown}>

            {isLoader && <Loader /> }
            <div className={styles.form}>
                <h1 className={styles.form_title}>Ingresar</h1>
                <span className={styles.error_span}>{errorText}</span>

                <Input 
                    placeholder="Correo electrónico" 
                    identifier="email"
                    states={formStates.email}
                    dispatch={onFormChange}
                />

                <PasswordInput 
                    placeholder="Contraseña" 
                    identifier="password"
                    states={formStates.password}
                    dispatch={(onFormChange)}
                />
                <span onClick={() => setCurrentForm("recovery")} className={styles.span_forgot_password}>¿Olvidaste tu contraseña?</span>


               
                <div className={styles.remeber_container}>
                    <span className={styles.remeberme_span}>Recuerdame</span>
                    <CheckBox 
                        state={checkboxValue}
                        dispatch={() => {setCheckboxValue(!checkboxValue)}}
                    />
                </div>

                <Button 
                    onClick={handleLogin}
                    text="Ingresar" 
                    iconRight="arrow_right" 
                    buttonType="principal" 
                />

                
                <div className={styles.signup} >
                    <a href="/signup">¿No tienes una cuenta?. Crear una.</a>
                </div>
                
                    
                

            </div>
        </div>
    )
}
