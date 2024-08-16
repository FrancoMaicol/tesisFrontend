"use client"
import * as proptypes from "./Button.proptypes";
import styles from "./Button.styles.module.scss";
import { IconFactory } from "@sharing/atoms";

export default function Button({ text, iconLeft, iconRight, buttonType, onClick, iconsFill="#FFF", isDisabled=false} : proptypes.ButtonProps){
    return(
       <div 
            className={
                styles.container + " " + 
                styles[buttonType] + " " + 
                (isDisabled && styles.is_disabled)
            } 
            onClick={!isDisabled ? onClick : ()=>{}}
        >
            {iconLeft ? <IconFactory iconType={iconLeft} fill={iconsFill}/> : null }
            <span className={styles.button_text}>{text}</span>
            {iconRight ? <IconFactory iconType={iconRight} fill={iconsFill}/> : null }
       </div>
    )
}