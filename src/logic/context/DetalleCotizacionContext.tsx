import { Dispatch, ReactNode, createContext, useReducer } from "react";
import { DetalleCotizacionTypes as types } from "@types"

type ActionsType = {
    type: Actions;
    payload: any;
}

export type DetalleCotizacionContextType = {
    state: types.ContextState;
    dispatch: Dispatch<ActionsType>;
}

type PayloadsTypes = any

type Actions = 
    "setInitialContextState" |
    "setRegistroIndividualFormStates" | 
    "setDependientesFormsStates" |
    "onStepEdit" | 
    "updateDependentsFormData" |
    "setPictureState" |
    "setCoberturasPicture" |
    "forcePictureDefault" |
    "updateCheckBox" |
    "updateSelectValue" |
    "updateHeaderCheckbox"

export const DetalleCotizacionContext = createContext({} as DetalleCotizacionContextType);

const INITIAL_STATE: types.ContextState = { } 

const DetalleCotizacionReducer = (state: types.ContextState, action: ActionsType) : types.ContextState => {
    //console.warn(action.type);

    switch(action.type){

        /** SHARING **/
        case "forcePictureDefault":
            const iNeedFetching = state.steps?.coberturas?.iNeedFetching as boolean;
            if((state.steps?.registro && state.steps.coberturas && state.steps.dependientes))
            return {
                ...state, 
                steps: {
                    ...state.steps,
                    coberturas:{
                        ...state.steps?.coberturas,
                        //Forzar renderizado y carga de datos por default en tabla de configuracion en cada edit 
                        // en cualesquiera que sean los pasos
                        iNeedFetching: !iNeedFetching, 
                    },
                }
            };
            else return {...state};
        case "setInitialContextState":
            return action.payload
        case "onStepEdit":
            const step = action.payload;
            let array = {
                registro: "available" as any ,
                dependientes: "disabled" as any,
                coberturas: "disabled" as any,
            };
            if(step === "registro")
                array = {...array, registro: "available"}
            if(step === "dependientes")
                array = {...array, registro: "filled", dependientes: "available"}
            if(step === "coberturas")
                array = {
                    ...array,
                    registro: "filled",
                    dependientes: "filled",
                    coberturas: "available",
                }
            if(step === "finished")
                array = {
                    ...array,
                    registro: "filled",
                    dependientes: "filled",
                    coberturas: "filled",
                }
            if((state.steps?.registro && state.steps.coberturas && state.steps.dependientes))
            return {
                ...state, 
                steps: {
                    ...state.steps,
                    registro: {
                        ...state.steps?.registro,
                        status: array.registro,
                    },
                    dependientes: {
                        ...state.steps?.dependientes,
                        status: array.dependientes,
                    },
                    coberturas: {
                        ...state.steps?.coberturas,
                        status: array.coberturas,
                        picture: step === "registro" ? undefined : state.steps.coberturas.picture,
                        results: step === "registro" ? undefined : state.steps.coberturas.results,
                    },
                }
            };
            else return {...state};

        /**  PASO 1 . REGISTRO **/
        case "setRegistroIndividualFormStates":
            return state.steps?.registro 
            ? {
                ...state,
                numeroDependientes: action.payload.dependientes.value,
                tipoPlan: action.payload.tipoPlan.value,
                steps: {
                    ...state.steps,
                    registro: {
                        ...state.steps?.registro,
                        individualFormStates: action.payload,
                    }
                }
            } : state;
        

        /** PASO 2. DEPENDIENTES **/
        case "updateDependentsFormData":
            let newStatesFormsDependientes: any;
            //generamos una copia de los estados de todos los forms actuales
            if(state.steps?.dependientes?.dependientesFormsStates)
                newStatesFormsDependientes = [...state.steps.dependientes.dependientesFormsStates]
            //tomamos solo los estados del dependiente actual y colocamos nuevos estados 
            const statesCurrentForm = {...newStatesFormsDependientes[action.payload.index]};
            statesCurrentForm[action.payload.identifier] = action.payload.states;
            //insertamos los datos seteados en la copia de todos los estados de todos los forms
            newStatesFormsDependientes[action.payload.index] = statesCurrentForm;
            return state.steps?.dependientes ? {
                ...state, 
                steps: {
                    ...state.steps,
                    dependientes: {
                        ...state.steps?.dependientes,
                        dependientesFormsStates: newStatesFormsDependientes,
                    }
                }
            } : state; 
        case "setDependientesFormsStates":
            return state.steps?.dependientes ? {
                ...state, 
                steps: {
                    ...state.steps,
                    dependientes: {
                        ...state.steps?.dependientes,
                        dependientesFormsStates: action.payload,
                    }
                }
            } : state;

        /** PASO 3. COBERTURAS **/
        case "updateHeaderCheckbox":
            // APAGAR O ENCENDER TODOS LOS CHECKBOXES excepetos las coberturas. base. 
            let newPicture =  state.steps?.coberturas?.picture;
            if(newPicture) for(const campo in state.steps?.coberturas?.picture){
                const currentRow = state.steps.coberturas.picture[Number(campo)];
                if(currentRow.coberturaData.tipo !== "base")
                    newPicture[Number(campo)] = {
                        ...state.steps.coberturas.picture[Number(campo)],
                        checkboxState: action.payload,
                    }
            }
            return state.steps?.coberturas && state.steps.coberturas.picture ? {
                ...state, 
                steps: {                    
                    ...state.steps,
                    coberturas: {
                        ...state.steps?.coberturas,
                        headerCheckbox: action.payload,
                        picture: newPicture,
                        iNeedFetching: !state.steps.coberturas.iNeedFetching,
                    }
                }
            } : state;
            
        case "updateSelectValue":
            return state.steps?.coberturas && state.steps.coberturas.picture ? {
                ...state, 
                steps: {                    
                    ...state.steps,
                    coberturas: {
                        ...state.steps?.coberturas,
                        picture: {
                            ...state.steps.coberturas.picture,
                            [action.payload.idCobertura] : {
                                ...state.steps.coberturas.picture[action.payload.idCobertura],
                                coberturaData: {
                                    ...state.steps.coberturas.picture[action.payload.idCobertura].coberturaData,
                                    sumaAsegurada: action.payload.value, 
                                }
                            }
                        },
                        iNeedFetching: !state.steps.coberturas.iNeedFetching,
                    }
                }
            } : state;
        case "updateCheckBox":
            return state.steps?.coberturas && state.steps.coberturas.picture ? {
                ...state, 
                steps: {                    
                    ...state.steps,
                    coberturas: {
                        ...state.steps?.coberturas,
                        picture: {
                            ...state.steps.coberturas.picture,
                            [action.payload.idCobertura] : {
                                ...state.steps.coberturas.picture[action.payload.idCobertura],
                                checkboxState: action.payload.value, 
                            }
                        },
                        iNeedFetching: !state.steps.coberturas.iNeedFetching,
                    }
                }
            } : state;
        case "setPictureState":
            return state.steps?.coberturas ? {
                ...state, 
                steps: {
                    ...state.steps, 
                    coberturas: {
                        ...state.steps?.coberturas,
                        picture: action.payload.picture,
                        results: action.payload.results,
                    }
                }
            } : state;

        
        default:
            return state;
    }

}

export function DetalleCotizacionContextProvider({children} : {children: ReactNode}){
    const [state, dispatch] = useReducer(DetalleCotizacionReducer, INITIAL_STATE);
    return(
        <DetalleCotizacionContext.Provider value={{state, dispatch}}>
            {children}
        </DetalleCotizacionContext.Provider>
    )
}