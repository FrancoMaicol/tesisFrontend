"use client"
import { useState } from "react";
import styles from "./SignupForm.styles.module.scss";
import Input from "../../../sharing/atoms/Input/Input";
import PasswordInput from "../../../sharing/atoms/PasswordInput/PasswordInput";
import Button from "../../../sharing/atoms/Button/Button"
import { InputStates, SelectStates } from "@types";
import Select from "../../../sharing/atoms/Select/Select";
import IconFactory from "../../../sharing/atoms/IconFactory/IconFactory";
import { sendSignUp } from "@services/auth/login";
import { validateInputState } from "@utils/validateInputs";
import Loader from "../../../sharing/atoms/Loader/Loader";


export default function SignupForm(){

    const [isLoader, setIsLoader] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [formStates, setFormStates] = useState({
     
        name: { value: "", mood: "default", helperText: "" } as InputStates,
        lastname: { value: "", mood: "default", helperText: "" } as InputStates,
        lastnameTwo: { value: "", mood: "default", helperText: "" } as InputStates,
        email: { value: "", mood: "default", helperText: "" } as InputStates,
        password: { value: "", mood: "default", helperText: "" } as InputStates,
        workPosition: {value: "Puesto de trabajo", mood: "default", helperText: "" } as SelectStates,
        phoneNumber: { value: "", mood: "default", helperText: "" } as InputStates,
        area: { value: "Región", mood: "default", helperText: "" } as SelectStates,
        dataCar: { value: "-", mood: "filled", helperText: ""} as InputStates

    })

    const handleSignup = () => { 
        if(validateFields()) 
            sendSignupToServer(); 
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

    const onFormChange = (states: InputStates, _: number, identifier: string) => {
        setFormStates({
            ...formStates, 
            [identifier]: states,
        })
    }

    const sendSignupToServer = async () => {

        setErrorText("");
        setIsLoader(true);
        sendSignUp({

            nombres: formStates.email.value,
            apellidoPaterno:formStates.lastname.value,
            apellidoMaterno:formStates.lastnameTwo.value,
            correo: formStates.email.value,
            password:formStates.password.value,

            posicion: formStates.workPosition.value,
            region:formStates.area.value,
            matriculaVehiculo: formStates.dataCar.value,
            telefono:formStates.phoneNumber.value
        })
        .then(response=>{
            setIsLoader(false);
            if('error' in response){
                alert(`Network error. detail: ${response.error}`);
            }else if(response.data.success === false || !response.data.success){
                alert("Usuario registrado en base de datos. Intente recuperar contraseña");
                window.location.href = "/"; 
            }else {
                window.location.href = "/"; 
            }
        })

    }

    return(
        
        
        <div className={styles.container}>
            
            { isLoader && <Loader/> }
            <div className={styles.SignupForm}>

                <div className={styles.form_title}>

                     <span>Crear una cuenta</span>

                </div>
                
                <div className={styles.form}>


                    <Input 
                        id={0}
                        placeholder="Nombres" 
                        topText="Nombre(s)"
                        identifier="name"
                        type="text"
                        states={formStates.name}
                        dispatch={onFormChange}

                    />

                    <Input 
                        id={1}
                        placeholder="Apellido Paterno" 
                        topText="Apellido Paterno"
                        identifier="lastname"
                        type="text"
                        states={formStates.lastname}
                        dispatch={onFormChange}

                    />


                    <Input 
                        id={2}
                        placeholder="Apellido Materno" 
                        topText="Apellido Materno"
                        identifier="lastnameTwo"
                        type="text"
                        states={formStates.lastnameTwo}
                        dispatch={onFormChange}

                    />



                    <Input 
                        id={3}
                        placeholder="Correo electrónico" 
                        topText="Correo electrónico"
                        identifier="email"
                        type="text"
                        states={formStates.email}
                        dispatch={onFormChange}

                    />
                    

                    <Input 
                        id={4}
                        placeholder="Contraseña" 
                        topText="Contraseña"
                        identifier="password"
                        type="password"
                        states={formStates.password}
                        dispatch={onFormChange}

                    />


                    <Select 

                            id={5}
                            elements={[{id: 1, descripcion: "Monitorista"}, {id: 2, descripcion: "Conductor"}]}
                            states={formStates.workPosition}
                            topText="Puesto de trabajo"                       
                            identifier="workPosition"
                            dispatch={onFormChange}
                    />


                    <Select 

                        id={6}
                        elements={[{id: 1, descripcion: "Norte"}, {id: 2, descripcion: "Sur"}, {id: 3, descripcion: "Este"}, {id: 4, descripcion: "Oeste"} ]}
                        states={formStates.area}
                        topText="Región"                       
                        identifier="area"
                        dispatch={onFormChange}

                    />

        
                    <Input 

                        id={7}
                        placeholder="Matricula Vehiculo" 
                        topText="Matricula Vehiculo"
                        identifier="dataCar"
                        type="text"
                        states={formStates.dataCar}
                        dispatch={onFormChange}

                    />

                    <Input 

                        id={8}
                        placeholder="Teléfono" 
                        topText="Teléfono"
                        identifier="phoneNumber"
                        type="text"
                        states={formStates.phoneNumber}
                        dispatch={onFormChange}

                    />


                </div>


                <div className={styles.buttonContainer}>

                    <Button 
                            onClick={handleSignup}
                            text="Registrar" 
                            iconRight="arrow_right" 
                            buttonType="principal" 
                    />

                </div>
                
        
                

            </div>
        </div>

       

    );
}

function setErrorText(arg0: string) {
    throw new Error("Function not implemented.");
}
function setIsLoader(arg0: boolean) {
    throw new Error("Function not implemented.");
}

