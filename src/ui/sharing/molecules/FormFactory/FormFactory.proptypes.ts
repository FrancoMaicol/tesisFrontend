import { FormFactoryTypes, SelectStates, InputStates } from "@types";

export type FormFactoryProps = {
    formConfig: FormFactoryTypes.FormConfig,
    onSelectChange: (states: SelectStates, id: number, identifier: string) => void,
    onInputChange: (states: InputStates, id: number, identifier: string) => void,
}

