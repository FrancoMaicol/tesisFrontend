import { ButtonsTypes } from "@types";
export type ModalProps = {
    title: string;
    message: string;
    onClose?: () => void;
    buttonsProps?: {
        cancelButton?: {
            type: ButtonsTypes,
            text: string,
            handleClick: () => void,
        },
        acceptButton?: {
            type: ButtonsTypes
            text: string
            handleClick: () => void,
        }
    }
}