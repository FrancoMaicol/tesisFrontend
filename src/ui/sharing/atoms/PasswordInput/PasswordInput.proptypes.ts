import { InputStates } from "@types";

export type PasswordInputProps = {
    placeholder: string;
    identifier: string;
    states: InputStates;
    dispatch: (states: InputStates, id: number, identifier: string) => void;
    topText?: string;
    id?: number;
}
