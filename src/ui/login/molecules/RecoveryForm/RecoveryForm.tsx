"use client"
import { useState } from "react";

import styles from "./RecoveryForm.styles.module.scss";
import { Button, Input} from "@sharing/atoms";

import { RecoveryFormProps } from "./RecoveryForm.proptypes";

import { validateInputState } from "@utils/validateInputs";
import { InputStates } from "@types"

export default function RecoveryForm({ setCurrentForm } : RecoveryFormProps) {

    const [mailStates, setMailStates] = useState({value: "", mood: "default", helperText: ""} as InputStates);
  
    const [spanHtml, setSpanHtml] = useState("Las instrucciones para restablecer su cuenta se enviarán el correo registrado durante su alta, en caso de no visualizar el correo de recuperación, por favor verificar la bandeja de correos no deseados o contacte a su administrador.");
    const [isMailSended, setIsEmailSended] = useState(false);

    const handleRecovery = () => {
        if(isMailSended) return;
        const newMailState = validateInputState(mailStates, "email");
        if(newMailState.mood === "filled"){
            setSpanHtml("Hemos enviado un correo electrónico a la dirección asociada a tu cuenta con los detalles para restablecer tu contraseña.<br/><br/>Por favor revisa tu bandeja de entrada y en caso de no encontrarlo, verifica la carpeta de <b>correo no deseado</b> o spam.<br/><br/>En caso de no recibir el correo electrónico en los próximos minutos te recomendamos intentar nuevamente o ponerte en contacto con nuestro equipo de soporte para obtener ayuda adicional.<br>");
            setIsEmailSended(true);
        }
        setMailStates(newMailState);
    }

    const handleKeyDown = (event: any /*🔥*/) => {
        if (event.keyCode === 13) {
            handleRecovery()
        }
    };

    const onFormChange = (states: InputStates, _: number, identifier: string) => {
        if(isMailSended) return;
        setMailStates(states)
    }

   return (
        <div className={styles.container}>
            <h1 className={styles.title}>Recupera tu contraseña</h1>
            <span className={styles.subtitle}>Ingresa el correo registrado en tu cuenta</span>
            <div className={styles.form} onKeyDown={handleKeyDown}>

                <Input 
                    placeholder="Correo electrónico" 
                    identifier="email"
                    states={mailStates}
                    dispatch={onFormChange}
                    rightIcon={isMailSended ? "done" : "none"}
                />

                <span className={styles.instruccions} dangerouslySetInnerHTML={{__html: spanHtml}}></span>
                
                <div className={styles.buttons_container}>

                    <Button 
                        onClick={handleRecovery}
                        text="Recuperar" 
                        buttonType="principal"
                        isDisabled={isMailSended ? true : false}
                    /> 
                    <Button 
                        onClick={() => setCurrentForm("login")}
                        text="Cancelar" 
                        buttonType="secondary" 
                    />

                </div>
            </div>
        </div>
   )

}
