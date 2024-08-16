import { Dispatch, ReactNode, createContext, useReducer } from "react";

import { CotizacionesTypes  as types } from "@types";

type ActionsType = {
    type: Actions;
    payload?: PayloadsTypes;
}

type PayloadsTypes = types.CotizacionProduct | string | Array<types.CotizacionTableElement>

type Actions = "setProduct" | "setTextToSearch" | "setTableData";


export type CotizacionesContentType = {
    state: State;
    dispatch: Dispatch<ActionsType>;
}

type State = {
    textToSearch?: string,
    /* currentData: Array<any>, */
    currentProduct: {
        id: number, 
        verboseName: string,
    },
    tableData?: Array<types.CotizacionTableElement>
}

export const CotizacionesContext = createContext({} as CotizacionesContentType);

const INITIAL_STATE: State = {
    textToSearch: undefined,
   /*  currentData: [] as any, */
    currentProduct: {
        id: -1,
        verboseName: "",
    },
}

const ConfigurationPlanTableReducer = (state: State, action: ActionsType) : State => {
    switch(action.type){
        case "setProduct":
            return {
                ...state, 
                currentProduct: action.payload as types.CotizacionProduct,
            }
        case "setTextToSearch":
            return {
                ...state,
                textToSearch: action.payload as string,
            }
        case "setTableData":
            return {
                ...state, 
                tableData: action.payload as Array<types.CotizacionTableElement>,
            }
        default:
            return state;
    }
}

export function CotizacionesContextProvider({children} : {children: ReactNode | ReactNode[]}){
    const [state, dispatch] = useReducer(ConfigurationPlanTableReducer, INITIAL_STATE);
    return(
        <CotizacionesContext.Provider value={{state, dispatch}}>
            {children}
        </CotizacionesContext.Provider>
    )
}