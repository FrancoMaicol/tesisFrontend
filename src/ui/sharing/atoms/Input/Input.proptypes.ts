import { IconsList, InputsTypes, InputStates} from "@types";

export type InputProps = {
    id?: number;
    placeholder: string;
    identifier: string;
    topText?: string;
    rightIcon?: IconsList;
    leftIcon?: IconsList;
    type?: InputsTypes;
    states: InputStates;
    dispatch: (states: InputStates, id: number, identifier: string) => void;
}
