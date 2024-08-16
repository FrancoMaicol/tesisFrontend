"use client"
import * as proptypes from "./CheckBox.proptypes";
import styles from "./CheckBox.styles.module.scss";
import { IconFactory } from "@sharing/atoms";

export default function CheckBox({state, id, identifier, dispatch}: proptypes.CheckBoxProps){

    const handleCheckBoxClick = () => {
        id = id ? id : -1;
        identifier = identifier ? identifier : "";
        dispatch(!state, id, identifier);
    }

    return(
        <div className={styles.container} onClick={handleCheckBoxClick}>

            { state 
                ? <IconFactory iconType="checkbox_on"  fill="#0E2954"/>
                :  <IconFactory iconType="checkbox_off" fill="#0E2954" />
            } 

        </div>

    )
}