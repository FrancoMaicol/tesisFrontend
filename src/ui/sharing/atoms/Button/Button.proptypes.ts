import { MouseEventHandler } from "react";
import { ButtonsTypes, IconsList } from "@types";

export type ButtonProps = {
    onClick?: MouseEventHandler<HTMLDivElement>;
    text: string;
    buttonType: ButtonsTypes;
    isDisabled?: boolean;
    iconLeft?: IconsList;
    iconRight?: IconsList;
    iconsFill?: string;
}