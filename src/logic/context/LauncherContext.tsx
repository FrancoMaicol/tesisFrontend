import { createContext, useReducer } from "react";
import { LauncherTypes as LTypes, ContextTypes as CTypes } from "@types";

type DispatchAction = CTypes.DispatchAction<LTypes.DispatchEvents, LTypes.DispatchPayloads>
type LauncherContextType = CTypes.ContextWhitReducer<ContextState, DispatchAction>

export const LauncherContext = createContext({} as LauncherContextType);

type ContextState = {
    textToSearch?: string,
    currentProduct?: {
        id: number, 
        verboseName: string,
    },
    tableData?: Array<LTypes.LauncherTableElement>
    launcherType?: LTypes.LauncherTypes,
}

const INITIAL_STATE: ContextState = {
    textToSearch: undefined,
   
}

const LauncherContextReducer = (state: ContextState, action: DispatchAction ) : ContextState => {
    //console.warn("context event", action.event);

    switch(action.event){
        case "setLauncherType":
            return {
                ...state, 
                launcherType: action.payload as LTypes.LauncherTypes,
            }
        case "setProduct":
            return {
                ...state, 
                currentProduct: action.payload as LTypes.LauncherProduct,
            }
        case "setTextToSearch":
            return {
                ...state,
                textToSearch: action.payload as string,
            }
        case "setTableData":
            return {
                ...state, 
                tableData: action.payload as Array<LTypes.LauncherTableElement>,
            }
        default:
            return state;
    }
}

export function LauncherContextProvider({children} : {children: React.ReactNode | React.ReactNode[]}){
    const [state, dispatch] = useReducer(LauncherContextReducer, INITIAL_STATE);
    return(
        <LauncherContext.Provider value={{state, dispatch}}>
            {children}
        </LauncherContext.Provider>
    )
}