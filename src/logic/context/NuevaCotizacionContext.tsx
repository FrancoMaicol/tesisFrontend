import { Dispatch, ReactNode, createContext, useReducer } from "react";

import { INITIAL_FORM_STATE, INITIAL_FORM_STATE_FILLED } from "../../ui/nuevaCotizacion/molecules/ProductoRegistroForm/ProductoRegistroForm.proptypes";

const ColectivoFormInitalState = {
    razonSocial: { value: "", mood: "default",  helperText: ""}, 
    rfc: { value: "", mood: "default",  helperText: ""}, 
    giroEmpresarial: { value: "Giro empresarial*", mood: "default",  helperText: ""}, 
    incisos: { value: "", mood: "default",  helperText: ""}, 
    subgrupos: { value: "", mood: "default",  helperText: ""}, 
    
    tiposSubgrupos: [],
    asignacionesIncisos: [],
    
    //Gastos medicos mayores
    tipoPlan: { value: "Tipo de plan*", mood: "default",  helperText: ""},  
    moneda: { value: "Moneda*", mood: "default",  helperText: ""}, 
    coaseguro: { value: "Coaseguro*", mood: "default",  helperText: ""}, 
    sumaAsegurada: { value: "Suma asegurada*", mood: "default",  helperText: ""},  
    deducible: { value: "Deducible*", mood: "default",  helperText: ""},  
    porcentajeHQ: { value: "Porcentaje HQ*", mood: "default",  helperText: ""}, 
    porcentajeHM: { value: "Porcentaje HM*", mood: "default",  helperText: ""}, 
    formaPago: { value: "Forma de pago*", mood: "default",  helperText: ""},  
}
type StepsTypes = "productoRegistro" | "dependientes" | "configuracionPlan";
type InsurancesTypes = "colectivo" | "individual";

import { SelectStates } from "@types"


type ActionsType = {
    type: Actions;
    payload?: PayloadsTypes;
}

export type NuevaCotizacionContextType = {
    state: PROPOSAL_STATE;
    dispatch: Dispatch<ActionsType>;
}

type PayloadsTypes = 
    number | 
    InsurancesTypes | 
    StepsTypes |
    {idCotizacion: string, numeroDependientes: number} |
    any;



type PROPOSAL_STATE = {
    idCotizacion: string;
    numeroDependientes: number | undefined;
    insuranceType: InsurancesTypes | undefined;
    currentStep: StepsTypes;
    tipoPlan?: string;
    product: {
        id?: number,
        name: string,
        selectStates: SelectStates,
    },
    productoRegistro: {
        status: "filled" | "available" | "disabled";
        formData: any;
        colectiveFormStates: any;
    },
    dependientes: {
        status: "filled" | "available" | "disabled";
        dependentsList: any;
    },
    configuracionPlan: {
        status: "filled" | "available" | "disabled";
        picture: any;
    }
}

type Actions = 
"setCurrentProduct" 
| "setInsuranceType" 
| "setCurrentStep" 
| "productoRegistroCompleted"
| "dependientesCompleted"
| "setStepsStatus"
| "updateProductoRegistroFormData"
| "changeStepToAvailable"
| "changeStepToFilled"
| "updateDependientesList"
| "onEdit"
| "replaceDependentsList"
| "setTipoPlan" | "setFormData"
| "configurationPlanCompleted"
| "setColectivoForm"
| "setAsignacionesIncisos"
| "setTiposSubgrupos"
| "initSubgruposStates"
;

export const NuevaCotizacionContext = createContext({} as NuevaCotizacionContextType);

/* PARA PRUEBAS 
const INITIAL_STATE: PROPOSAL_STATE = {
    idCotizacion: "0",
    numeroDependientes: 0,
    insuranceType: "individual",
    currentStep: "dependientes",

    product: {
        id: 1,
        name: "",
        selectStates: {
            value: "Gastos Médicos Mayores",
            mood: "filled",
            helperText: ""
        },
    },

    productoRegistro: {
        status: "available",
        formData: INITIAL_FORM_STATE_FILLED,
        colectiveFormStates: ColectivoFormInitalState,
    },
    dependientes: {
        status: "disabled",
        dependentsList: undefined,
    },
    configuracionPlan: {
        status: "disabled",
        picture: undefined,
    },
}
/* */
/* DEFAULT */
const INITIAL_STATE: PROPOSAL_STATE = {
    idCotizacion: "0",
    numeroDependientes: undefined,

    product: {
        name: "",
        selectStates: {
            value: "Selecciona el producto que deseas cotizar:",
            mood: "default",
            helperText: ""
        },
    },

    insuranceType: undefined,
    currentStep: "productoRegistro",

    productoRegistro: {
        status: "available",
        formData: INITIAL_FORM_STATE,
        colectiveFormStates: ColectivoFormInitalState,
    },
    dependientes: {
        status: "disabled",
        dependentsList: undefined,
    },
    configuracionPlan: {
        status: "disabled",
        picture: undefined,
    },
} 
/**/

const NuevaCotizacionReducer = (state: PROPOSAL_STATE, action: ActionsType) : PROPOSAL_STATE => {
   // console.warn(action.type);

    switch(action.type){
        case "setTiposSubgrupos":
            const auxTiposSubgrupos_ = [...state.productoRegistro.colectiveFormStates.tiposSubgrupos];
            auxTiposSubgrupos_[action.payload.index] = action.payload.states;
            return {
                ...state, 
                productoRegistro: {
                    ...state.productoRegistro,
                    colectiveFormStates: {
                        ...state.productoRegistro.colectiveFormStates,
                        tiposSubgrupos: auxTiposSubgrupos_,
                    }
                }
            }

        case "setAsignacionesIncisos":
            const auxAsignaciones = [...state.productoRegistro.colectiveFormStates.asignacionesIncisos];
            auxAsignaciones[action.payload.index] = action.payload.states;
            return {
                ...state, 
                productoRegistro: {
                    ...state.productoRegistro,
                    colectiveFormStates: {
                        ...state.productoRegistro.colectiveFormStates,
                        asignacionesIncisos: auxAsignaciones,
                    }
                }
            }
        case "initSubgruposStates":
            const mood = 
                state.productoRegistro.colectiveFormStates.incisos.mood === "filled" 
                ? "default" : "disabled" 

            const auxTiposSubgrupos = [] as any
            const auxAsignacionesIncisos = [] as any 

            for(let i=0; i<action.payload.subgruposQuantity;i ++){
                auxTiposSubgrupos.push({ 
                    value: `Tipo de subgrupo ${i+1}*`, 
                    mood: mood,  
                    helperText: ""
                })
                auxAsignacionesIncisos.push({ value: "", mood: mood,  helperText: ""})
            }
           
            return {
                ...state,
                productoRegistro: {
                    ...state.productoRegistro,
                    colectiveFormStates: {
                        ...state.productoRegistro.colectiveFormStates,
                        subgrupos: action.payload.subgruposFieldStates,
                        tiposSubgrupos: auxTiposSubgrupos,
                        asignacionesIncisos: auxAsignacionesIncisos,
                    }
                }

            }
        case "setColectivoForm":
            return {
                ...state,
                productoRegistro: {
                    ...state.productoRegistro,
                    colectiveFormStates: {
                        ...state.productoRegistro.colectiveFormStates,
                        [action.payload.identifier]: action.payload.states
                    }
                }

            }
        case "setFormData":
            return {
                ...state,
                productoRegistro: {
                    ...state.productoRegistro,
                    formData: action.payload,
                }
            }
        case "setTipoPlan":
            return {
                ...state,
                tipoPlan: action.payload,
            }
        case "setCurrentProduct":
            return {
                ...state, 
                product: {
                    ...state.product,
                    id: action.payload.id,
                    name: action.payload.name,
                    selectStates: action.payload.states,
                }
              /*   currentProduct: action.payload.id as number,
                currentProductVerboseName: action.payload.verboseName as string,  */
            }
        case "setInsuranceType":
            return {...state, insuranceType: action.payload  as InsurancesTypes }
        case "setCurrentStep":
            return {...state, currentStep: action.payload as StepsTypes }
        case "productoRegistroCompleted":
            const payload = action.payload as any ;
            return {
                ...state,
                idCotizacion: payload.idCotizacion,
                numeroDependientes: payload.numeroDependientes,
                currentStep: "dependientes",
                productoRegistro: {
                    ...state.productoRegistro,
                    status: "filled",
                    formData: payload.formData,
                },
                dependientes: {
                    ...state.dependientes,
                    status: "available",
                },
                configuracionPlan: {
                    ...state.configuracionPlan,
                    status: "disabled",
                }
            };
        case "dependientesCompleted":
                return {
                    ...state,
                    currentStep: "configuracionPlan",
                    productoRegistro: {
                        ...state.productoRegistro,
                        status: "filled",
                    },
                    dependientes: {
                        ...state.dependientes,
                        dependentsList: action.payload,
                        status: "filled",
                    },
                    configuracionPlan: {
                        ...state.configuracionPlan,
                        status: "available",
                    }
                }

        case "configurationPlanCompleted":
                return {
                    ...state,
                    productoRegistro: {
                        ...state.productoRegistro,
                        status: "filled",
                    },
                    dependientes: {
                        ...state.dependientes,
                        status: "filled",
                    },
                    configuracionPlan: {
                        ...state.configuracionPlan,
                        status: "available",
                        picture: action.payload,
                    }
                }
     
        case "changeStepToAvailable":
            return {
                ...state,
                [action.payload as StepsTypes]: {
                    ...state[action.payload as StepsTypes],
                    status: "available"
                },
            }
        case "changeStepToFilled":
            return {
                ...state,
                [action.payload as StepsTypes]: {
                    ...state[action.payload as StepsTypes],
                    status: "filled"
                },
            }
        case "updateDependientesList":
            return {
                ...state,
                dependientes: {
                    ...state.dependientes,
                    dependentsList: action.payload,
                }
            }
        case "onEdit":
            switch(action.payload){
                case "productoRegistro":
                    return {
                        ...state,
                        productoRegistro: {
                            ...state.productoRegistro,
                            status: "available",
                        },
                         dependientes: {
                            ...state.dependientes,
                            status: "disabled",
                        },
                        configuracionPlan: {
                            ...state.configuracionPlan,
                            status: "disabled"
                        } 
                    }
                case "dependientes":
                    return {
                        ...state,
                         productoRegistro: {
                            ...state.productoRegistro,
                            status: "filled",
                        }, 
                        dependientes: {
                            ...state.dependientes,
                            status: "available",
                        },
                        configuracionPlan: {
                            ...state.configuracionPlan,
                            status: "disabled"
                        } 
                    }
                case "configuracionPlan":
                    return {
                        ...state,
                         productoRegistro: {
                            ...state.productoRegistro,
                            status: "filled",
                        },
                        dependientes: {
                            ...state.dependientes,
                            status: "filled",
                        }, 
                        configuracionPlan: {
                            ...state.configuracionPlan,
                            status: "available"
                        }
                    }
            }
        default:
            return state;
    }

}

export function NuevaCotizacionContextProvider({children} : {children: ReactNode}){
    const [state, dispatch] = useReducer(NuevaCotizacionReducer, INITIAL_STATE);
    return(
        <NuevaCotizacionContext.Provider value={{state, dispatch}}>
            {children}
        </NuevaCotizacionContext.Provider>
    )
}