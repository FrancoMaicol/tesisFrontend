import { SelectElements, SelectStates, InputStates, InputsTypes } from "@types";

export type DefaultFormEntry = {
    identifier: string, 
    states: SelectStates | InputStates,
    id?: number,
}
export type InputFormEntry = DefaultFormEntry & {
    formElement: "input",
    inputType: InputsTypes,
    placeholder: string, 
    topText?: string, 
}

export type SelectFormEntry = DefaultFormEntry & {
    formElement: "select",
    selectValues: SelectElements, 
    topText: string, 
}

export type FormConfig = Array<SelectFormEntry | InputFormEntry>