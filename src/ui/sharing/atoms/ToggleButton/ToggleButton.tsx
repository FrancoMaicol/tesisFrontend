"use client"
import * as proptypes from "./ToggleButton.proptypes";
import styles from "./ToggleButton.styles.module.scss";
import { IconFactory } from "@sharing/atoms";

export default function ToggleButton({state, id, identifier, dispatch}: proptypes.ToggleButtonProps){

    const handleToggleButtonClick = () => {
        id = id ? id : -1;
        identifier = identifier ? identifier : "";
        dispatch(!state, id, identifier);
    }

    return(
        <div className={styles.container} onClick={handleToggleButtonClick}>
            
            { state 
                ? <IconFactory iconType="toggle_on"  fill="#0E2954"/>
                :  <IconFactory iconType="toggle_off" fill="#0E2954" />
            } 

        </div>

    )
}