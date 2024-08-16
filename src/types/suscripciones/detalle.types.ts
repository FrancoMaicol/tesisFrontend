import { InputStates, SelectStates, SelectMoods, ToggleOptions } from "@types";


export type DispatchPayloads = 
    DetallesPlanForm | 
    string | boolean |
    DetallePlanPicture | 
    DetallePlanResults | 
    ModalData

export type DispatchEvents = 
 "setDetallesPlanForm" |
 "setIDSuscripcion" |
 "setDetallesPlanPicture" |
 "setDetallesPlanResults" |
 "setModalData" |
 "setIsDecision"

export type ContextState = {
    idSuscripcion: string, 
    isDecision: boolean,
    //maybe step 1
    form: DetallesPlanForm,
    results: DetallePlanResults,
    picture?: DetallePlanPicture,
    modal: ModalData
}


//maybe step 1
export type ModalData = {
    toggleStates: ToggleOptions, 
    decisiones?: DecisionesForm,
}
export type DecisionesForm = {
    [idCobertura: number] : {
        epMedica?: InputStates, 
        epOcupacional?: InputStates,
        decision?: SelectStates,
    }
}
export type DetallesPlanForm = {
    tipoPlan: SelectStates,
    moneda: SelectStates,
    dependientesTotales: SelectStates,
    sumaAsegurada: SelectStates,
    porcentajeHM: SelectStates,
    coaseguro: SelectStates,
    porcentajeHQ: SelectStates,
    deducible: SelectStates,
    formaPago: SelectStates,
};
export type DetallePlanResults = {
    gastosExpedicion: number, 
    pagoFraccionado: number, 
    subtotal: number, 
    total: number, 
    subtotalExtraprimas: {
        medica?: number | null,
        ocupacional?: number | null,
        subtotal?: number | null
    }
}
export type DetallePlanPicture = {
    [idCobertura: number] : {
        //selectValue?: string, //solo en adicionales y no amparadas
        type: "base" | "adicional",
        descripcion: string,
        sumaAsegurada: number, 
        prima: number, 
        estatus: "esm" | "acc" | "dcl"
        epMedica?: number, 
        epOcupacional?: number,
    }
}



