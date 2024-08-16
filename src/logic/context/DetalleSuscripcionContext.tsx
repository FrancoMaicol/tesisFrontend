import { createContext, useReducer } from "react";
import { DetalleSuscripcionTypes as DESypes, ContextTypes } from "@types";

type DispatchAction = ContextTypes.DispatchAction<DESypes.DispatchEvents, DESypes.DispatchPayloads>
type DetalleSuscripcionContextType = ContextTypes.ContextWhitReducer<DESypes.ContextState, DispatchAction>

export const DetalleSuscripcionContext = createContext({} as DetalleSuscripcionContextType);

const defaultInputState = { value: "", mood: "default" as "default", helperText: ""}

/* FIRST FORM STATE */
const INITIAL_STATE: DESypes.ContextState = {
    idSuscripcion: "",

    isDecision: false, 
    //maybe step 1 
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
        subtotalExtraprimas: {
        }
    },
    modal:{
        toggleStates: {
            value: "", 
            status: false,
        }
    }
}

const DetalleSuscripcionContextReducer = (state: DESypes.ContextState, action: DispatchAction ) : DESypes.ContextState => {
    //console.warn(action.event)
    switch(action.event){
        case "setIsDecision":
            return {
                ...state, 
                isDecision: action.payload as boolean
            } 
        //Detalle plan maybe step 6
        case "setIDSuscripcion": 
            return {
                ...state,
                idSuscripcion: action.payload as string
            }
        case "setDetallesPlanForm": 
            return {
                ...state,
                form: action.payload as DESypes.DetallesPlanForm
            }
        case "setDetallesPlanPicture": 
            return {
                ...state,
                picture: action.payload as DESypes.DetallePlanPicture
            }
        case "setDetallesPlanResults": 
            return {
                ...state, 
                results: action.payload as DESypes.DetallePlanResults
            }
        case "setModalData":
            return {
                ...state, 
                modal: action.payload as DESypes.ModalData
            }
        default:
            return state;
    }
}

export function DetalleSuscripcionContextProvider({children} : {children: React.ReactNode | React.ReactNode[]}){
    const [state, dispatch] = useReducer(DetalleSuscripcionContextReducer, INITIAL_STATE);
    return(
        <DetalleSuscripcionContext.Provider value={{state, dispatch}}>
            {children}
        </DetalleSuscripcionContext.Provider>
    ) 
}              