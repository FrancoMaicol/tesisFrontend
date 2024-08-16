import { MouseEventHandler } from "react";
import { ButtonsTypes, IconsList } from "@types";

export type CircleButtonProps = {
    onClick: MouseEventHandler<HTMLDivElement>;
    buttonType: ButtonsTypes;
    icon: IconsList;
    iconFill?: string;
}