import { MouseEventHandler } from "react";
import { ButtonsTypes, IconsList } from "@types";

export type RadioButtonProps = {
    dispatch: (value: boolean, identifier: string) => void;
    text?: string;
    identifier: string, 
    state: boolean,
}