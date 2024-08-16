import { Dispatch, ReactNode, createContext, useReducer } from "react";

import { NuevaCotizacionTypes } from "@types";


type StepsTypes = "productoRegistro" | "dependientes" | "configuracionPlan";
type InsurancesTypes = "colectivo" | "individual";

type ActionsType = {
    type: Actions;
    payload?: any;
}

type PayloadsTypes = {

}

type Actions = 
    "updateCheckBox" | 
    "updateHeaderCheckbox" |
    "updateSelectValue" |
    "setCoberturasAndCheckBoxList" |
    "setDefaultState" |
    "setInitialState" |
    "setResultsAndPrimas";


export type ConfigurationPlanTableContextType = {
    state: State;
    dispatch: Dispatch<ActionsType>;
}

type State = {
    headerCheckbox: boolean,
    results?: {
        subtotal: number, 
        pagoFraccionado: number, 
        gastosExpedicion: number, 
        total: number,
    },
    picture?: {
        [idCobertura: number] : {
            //selectValue?: string, //solo en adicionales y no amparadas
            checkboxState: boolean,
            coberturaData: {
                type: "base" | "adicional",
                descripcion: string,
                sumaAsegurada: number, 
                prima: number, 
                editaSA: boolean, 
                sumasAseguradasList?: Array<{id: number, descripcion: number}>,
            }
        }
    },
    iNeedFetching: boolean,
}


export const ConfigurationPlanTableContext = createContext({} as ConfigurationPlanTableContextType);

const INITIAL_STATE: State = { 
    headerCheckbox: true,
    iNeedFetching: false,
};

const ConfigurationPlanTableReducer = (state: State, action: ActionsType) : State => {
   // console.warn(action.type)
    switch(action.type){
        case "updateHeaderCheckbox":
             // APAGAR O ENCENDER TODOS LOS CHECKBOXES excepetos las coberturas. base. 
            let newPicture =  state.picture;
            if(newPicture) for(const campo in state.picture){
                const currentRow = state.picture[Number(campo)];
                if(currentRow.coberturaData.type !== "base")
                    newPicture[Number(campo)] = {
                        ...state.picture[Number(campo)],
                        checkboxState: action.payload,
                    }
            }
            return {
                ...state,
                iNeedFetching: !state.iNeedFetching,
                headerCheckbox: action.payload,
                picture: newPicture,
            } 
        case "updateCheckBox":
            //1. VERIFICAR EL ESTADO DE LOS CHECKBOXES en filas PARA APAGAR O ENCENDER EL HEADER CHECKBOX
            const currentPicture = state.picture ? {
                ...state.picture,
                [action.payload.idCobertura]: {
                    ...state.picture[action.payload.idCobertura],
                    checkboxState: action.payload.value,
                }
            } : null;

            let isCheckbox = true;
            for(const campo in currentPicture)
                isCheckbox = isCheckbox && currentPicture[Number(campo)].checkboxState;

            return state.picture ? {
                ...state,
                iNeedFetching: !state.iNeedFetching,
                headerCheckbox: isCheckbox,
                picture: {
                    ...state.picture,
                    [action.payload.idCobertura]: {
                        ...state.picture[action.payload.idCobertura],
                        checkboxState: action.payload.value,
                    }
                }
            } : { ...state }

        case "updateSelectValue":
            return state.picture ? 
             {
                ...state,
                iNeedFetching: !state.iNeedFetching,
                picture: {
                    ...state.picture,
                    [action.payload.idCobertura]: {
                        ...state.picture[action.payload.idCobertura],
                        coberturaData: {
                            ...state.picture[action.payload.idCobertura].coberturaData,
                            sumaAsegurada: action.payload.value,
                        }
                    }
                }
            }
            : {
                ...state
            }
          
        case "setResultsAndPrimas":
            //Se copia la fotografía y se reemplazan las primas por los datos en el payload
            let pictureCopy = state.picture;
            const primasCalculadas = action.payload.primasCalculadas;
            if(pictureCopy)
            for(let i=0; i<primasCalculadas.length;i++){
                pictureCopy = {
                    ...pictureCopy,
                    [primasCalculadas[i].id]: {
                        ...pictureCopy[primasCalculadas[i].id],
                        coberturaData: {
                            ...pictureCopy[primasCalculadas[i].id].coberturaData,
                            prima: primasCalculadas[i].prima,
                        }
                    }
                }
            }
            return {
                ...state,
                results: action.payload.resultados,
                picture: pictureCopy,
            } 

        case "setDefaultState":
            return {
                ...state,
                results: action.payload.results,
                picture: action.payload.picture,
            }
        default:
            return state;
    }

}

export function ConfigurationPlanTableContextProvider({children} : {children: ReactNode}){
    const [state, dispatch] = useReducer(ConfigurationPlanTableReducer, INITIAL_STATE);
    return(
        <ConfigurationPlanTableContext.Provider value={{state, dispatch}}>
            {children}
        </ConfigurationPlanTableContext.Provider>
    )
}