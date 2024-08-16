import { createContext, useReducer } from "react";
import { DetalleEmisionTypes as DETypes, ContextTypes, SelectStates, InputStates } from "@types";
 
import { dateToStringYYYYMMDD } from "@utils/dates";

const date = new Date();

type DispatchAction = ContextTypes.DispatchAction<DETypes.DispatchEvents, DETypes.DispatchPayloads>
type DetalleEmisionContextType = ContextTypes.ContextWhitReducer<DETypes.ContextState, DispatchAction>

export const DetalleEmisionContext = createContext({} as DetalleEmisionContextType);

const defaultInputState = { value: "", mood: "default" as "default", helperText: ""}

/* FIRST FORM STATE */
const INITIAL_STATE: DETypes.ContextState = {
    step: 1,
    steps: {
        asegurado: {
            datosGeneralesFormStates: {
                apellidoPaterno: defaultInputState,
                apellidoMaterno: defaultInputState, 
                nombres: defaultInputState,
                edad: defaultInputState,
                inicioVigencia: {value: dateToStringYYYYMMDD(date), mood: "filled" as "filled", helperText: ""},
                rfc: defaultInputState,
                curp: defaultInputState, 
                fechaNacimiento: defaultInputState, 
                genero: { value: "Género*", mood: "default" as "default", helperText: ""}, 
                estadoCivil: { value: "Estado Civil*", mood: "default" as "default", helperText: ""},
            },
            direcionFormStates: {
                codigoPostal: defaultInputState, 
                estado: { value: "Estado*", mood: "disabled" as "disabled", helperText: ""}, 
                municipio: { value: "Municipio*", mood: "disabled" as "disabled", helperText: ""}, 
                colonia: { value: "Colonia*", mood: "default" as "default", helperText: ""}, 
                calle: defaultInputState, 
                numExt: defaultInputState, 
                numInt: defaultInputState, 
                telefonoCelular: defaultInputState, 
                telefonoFijo: defaultInputState, 
                correoElectronico: defaultInputState,
            }, 
            datosEmpleoFormStates: {
                profesion: { value: "Profesión/Ocupación*", mood: "default" as "default", helperText: ""},
                nombreLugarTrabajo: defaultInputState, 
                lugarTrabajo: { value: "Lugar de trabajo*", mood: "default" as "default", helperText: ""},
                antiguedad: defaultInputState,
                giroNegocio: { value: "Giro del negocio*", mood: "default" as "default", helperText: ""},
                ingresosMensuales: defaultInputState,
                telefonoContacto: defaultInputState, 
                descripcionLabores: defaultInputState,
            }
        },
        contratante: {
            tipoPersona: "fisica",
            isAsegurado: false,
            datosGeneralesFormStatesFisica: {
                apellidoPaterno: defaultInputState,
                apellidoMaterno: defaultInputState, 
                nombres: defaultInputState,
                edad: defaultInputState,
                inicioVigencia: {value: dateToStringYYYYMMDD(date), mood: "filled" as "filled", helperText: ""},
                rfc: defaultInputState,
                curp: defaultInputState, 
                fechaNacimiento: defaultInputState, 
                genero: { value: "Género*", mood: "default" as "default", helperText: ""}, 
                estadoCivil: { value: "Estado Civil*", mood: "default" as "default", helperText: ""},
            },
            direccionFormStatesFisica: {
                codigoPostal: defaultInputState, 
                estado: { value: "Estado*", mood: "disabled" as "disabled", helperText: ""}, 
                municipio: { value: "Municipio*", mood: "disabled" as "disabled", helperText: ""}, 
                colonia: { value: "Colonia*", mood: "default" as "default", helperText: ""}, 
                calle: defaultInputState, 
                numExt: defaultInputState, 
                numInt: defaultInputState, 
                telefonoCelular: defaultInputState, 
                telefonoFijo: defaultInputState, 
                correoElectronico: defaultInputState,
            }, 
            datosGeneralesFormStatesMoral: {
                razonSocial: defaultInputState,
                fechaConstitucion: defaultInputState, 
                actividad: {value: "Actividad*", mood: "default" as "default", helperText: ""},
                telefonoFijo: defaultInputState,
                telefonoCelular: defaultInputState,
                correoElectronico: defaultInputState,
                rfc: defaultInputState,
                representanteLegal: defaultInputState,
            },
            direccionFormStatesMoral: {
                codigoPostal: defaultInputState, 
                estado: { value: "Estado*", mood: "disabled" as "disabled", helperText: ""}, 
                municipio: { value: "Municipio*", mood: "disabled" as "disabled", helperText: ""}, 
                colonia: { value: "Colonia*", mood: "default" as "default", helperText: ""}, 
                calle: defaultInputState, 
                numExt: defaultInputState, 
                numInt: defaultInputState, 
                referencias: defaultInputState, 
            }
        },
        dependientes: {
            isAgregarDependientes: false,
            numeroDependientes: 0,
        },
        formaPago: {
            tipo: undefined,
            data: {
                referenciaBancaria: defaultInputState, 
                banco: { value: "Banco*", mood: "default" as "default", helperText: ""},
                convenio: defaultInputState,  
                numeroTarjeta: defaultInputState, 
                empresa: { value: "Empresa*", mood: "default" as "default", helperText: ""}, 
                frecuenciaDXN: { value: "Frecuencia DXN*", mood: "default" as "default", helperText: ""},
            }
        }, 
        detallesPlan: {
            form: {
                tipoPlan: { value: "Tipo de plan*", mood: "default", helperText: "" },
                moneda: {value: "Moneda*", mood: "default", helperText: ""},
                dependientesTotales:  {value: "Dependientes totales*", mood: "default", helperText: ""},
                sumaAsegurada: {value: "Suma asegurada*", mood: "default", helperText: ""},
                porcentajeHM: {value: "Nivel hospitalario*", mood: "default", helperText: ""},
                coaseguro: {value: "Coaseguro*", mood: "default", helperText: ""},
                porcentajeHQ: {value: "Nivel de tabulador HQ*", mood: "default", helperText: ""},
                deducible: {value: "Deducible*", mood: "default", helperText: ""},
                formaPago: {value: "Forma de pago*", mood: "default", helperText: ""},
            },
            results: {
                gastosExpedicion: 0, 
                pagoFraccionado: 0, 
                subtotal: 0, 
                total: 0, 
            }
        }
    }
}

const DetalleEmisionContextReducer = (state: DETypes.ContextState, action: DispatchAction ) : DETypes.ContextState => {
    switch(action.event){
        case "setDireccionFormStateContratanteMoral":
            return {
                ...state, 
                steps: {
                    ...state.steps, 
                    contratante: {
                        ...state.steps.contratante, 
                        direccionFormStatesMoral: action.payload as DETypes.FormStatesDireccionPersonaMoral,
                    }
                },
            }
        case "setInitialState":
            return action.payload as DETypes.ContextState;
        case "setStep":
            return {
                ...state, 
                step: action.payload as number,
            }
        case "setGeneralDataFormStateFisica":
            return {
                ...state, 
                steps: {
                    ...state.steps, 
                    contratante: {
                        ...state.steps.contratante, 
                        datosGeneralesFormStatesFisica: action.payload as DETypes.GeneralDataFormSates,
                    }
                },
            }
        case "setGeneralDataFormStateMoral":
            return {
                ...state, 
                steps: {
                    ...state.steps, 
                    contratante: {
                        ...state.steps.contratante, 
                        datosGeneralesFormStatesMoral: action.payload as DETypes.FormStatesGeneralDataPersonaMoral,
                    }
                },
            }
        case "setGeneralDataFormState":
            return {
                ...state, 
                steps: {
                    ...state.steps, 
                    asegurado: {
                        ...state.steps.asegurado, 
                        datosGeneralesFormStates: action.payload as DETypes.GeneralDataFormSates,
                    }
                },
            }
        case "setDireccionFormStateContratante":
            return {
                ...state, 
                steps: {
                    ...state.steps, 
                    contratante: {
                        ...state.steps.contratante, 
                        direccionFormStatesFisica: action.payload as DETypes.DireccionFormStates,
                    }
                },
            }
        case "setDireccionFormState":
            return {
                ...state, 
                steps: {
                    ...state.steps, 
                    asegurado: {
                        ...state.steps.asegurado, 
                        direcionFormStates: action.payload as DETypes.DireccionFormStates,
                    }
                },
            }
        case "setEmpleoFormState":
            return {
                ...state, 
                steps: {
                    ...state.steps, 
                    asegurado: {
                        ...state.steps.asegurado, 
                        datosEmpleoFormStates: action.payload as DETypes.EmployDataFormStates,
                    }
                },
            }
        case "setPersonType":
            return {
                ...state, 
                steps: {
                    ...state.steps, 
                    contratante: {
                        ...state.steps.contratante,
                        tipoPersona: action.payload as DETypes.TipoPersona
                    }
                }
            }
        case "setIsAsegurado":
            return {
                ...state, 
                steps: {
                    ...state.steps, 
                    contratante: {
                        ...state.steps.contratante,
                        isAsegurado: action.payload as boolean
                    }
                }
            }

        ///// STEP 3. DEPENDIENTES ////////
        case "setAgregarDependientes":
            return {
                ...state,
                steps: {
                    ...state.steps,
                    dependientes: {
                        ...state.steps.dependientes,
                        isAgregarDependientes: action.payload as boolean,
                    }
                    
                }
            }
        case "setNumeroDependientes":
            return {
                ...state,
                steps: {
                    ...state.steps,
                    dependientes: {
                        ...state.steps.dependientes,
                        numeroDependientes: action.payload as number,
                    }
                    
                }
            }
        case "setDependientesForms":
            const payload = action.payload as DETypes.SetDependientesFormsStates
            return {
                ...state, 
                steps: {
                    ...state.steps,
                    dependientes: {
                        ...state.steps.dependientes,
                        formsStatesDireccion: payload.formsStatesDireccion,
                        formsStatesDatosGenerales: payload.formsStatesDatosGenerales,
                    }
                }
            }
        case "setDependientesFormsAndNumeroDependientes":
            const payload2 = action.payload as DETypes.SetDependientesFormsStatesAndNumeroDependientes
            return {
                ...state, 
                steps: {
                    ...state.steps,
                    dependientes: {
                        ...state.steps.dependientes,
                        formsStatesDireccion: payload2.formsStatesDireccion,
                        formsStatesDatosGenerales: payload2.formsStatesDatosGenerales,
                        numeroDependientes: payload2.numeroDependientes,
                    }
                }
            }
        case "setCuestionariosDependientes":
            return {
                ...state, 
                steps: {
                    ...state.steps,
                    dependientes: {
                        ...state.steps.dependientes,
                        cuestionarios: action.payload as Array<DETypes.CuestionariosType>,
                    }
                }
            }

        ///// STEP 4 CUESTIONARIOS /// 
        case "setCuestionarios": 
            return {
                ...state, 
                steps: {
                    ...state.steps,
                    cuestionarios: action.payload as DETypes.CuestionariosType,
                }
            }
        
        //// STEP 5 FORMA PAGO //// 
        case "setFormaPagoData":
            return {
                ...state, 
                steps: {
                    ...state.steps, 
                    formaPago: action.payload as DETypes.FormaPago
                }
            }

        //// STEP 6 DETALLES PLAN ////
        case "setDetallesPlanForm": 
            return {
                ...state,
                steps: {
                    ...state.steps, 
                    detallesPlan: {
                        ...state.steps.detallesPlan,
                        form: action.payload as DETypes.DetallesPlanForm
                    }
                }
            }
        case "setDetallesPlanPicture": 
            return {
                ...state,
                steps: {
                    ...state.steps, 
                    detallesPlan: {
                        ...state.steps.detallesPlan,
                        picture: action.payload as DETypes.DetallePlanPicture
                    }
                }
            }
        case "setDetallesPlanResults": 
            return {
                ...state,
                steps: {
                    ...state.steps, 
                    detallesPlan: {
                        ...state.steps.detallesPlan,
                        results: action.payload as DETypes.DetallePlanResults
                    }
                }
            }
        default:
            return state;
    }
}

export function DetalleEmisionContextProvider({children} : {children: React.ReactNode | React.ReactNode[]}){
    const [state, dispatch] = useReducer(DetalleEmisionContextReducer, INITIAL_STATE);
    return(
        <DetalleEmisionContext.Provider value={{state, dispatch}}>
            {children}
        </DetalleEmisionContext.Provider>
    ) 
}              