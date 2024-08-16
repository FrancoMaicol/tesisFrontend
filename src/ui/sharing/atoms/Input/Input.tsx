"use client"
import { ChangeEvent, useState } from "react"; 
import * as proptypes from "./Input.proptypes";
import styles from "./Input.styles.module.scss";
import { IconFactory } from "@sharing/atoms";
import { InputStates } from "@types";

export default function Input({ id, placeholder, topText, leftIcon, rightIcon, states, dispatch, identifier, type } : proptypes.InputProps){

    const [isFocus, setIsFocus] = useState(false);

    const id_ = id ? id : 0;

    const handleFocus = () => {
        if(states?.mood === "disabled") return -1;

        setIsFocus(true);
        const newStates: InputStates = {
            value: states?.value as string,
            mood: "active",
            helperText: ""
        }
        dispatch(newStates, id_, identifier);
    }

    const handleDesFocus = () => {
        if(states?.mood === "disabled") return -1;


        states?.value ? setIsFocus(true) : setIsFocus(false);
        const mood = states?.value ? ("filled"): ("default");
        const newStates: InputStates = {
            value: states?.value as string,
            mood: mood,
            helperText: ""
        }
        dispatch(newStates, id_, identifier);
    }

    /* Para cambiar el valor de input */
    const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        if(states?.mood === "disabled") return -1;

        const value = event.target.value;
        const mood = value ? ("filled") : ("active");
        //focus y vacio
        const newStates: InputStates = {
            value: value,
            mood: mood,
            helperText: ""
        }
        dispatch(newStates, id_, identifier);
    }


    return(
        <div className={styles.container + " " + styles[`${states?.mood}`]}>

            <span 
                className={
                    styles.top_text + " " + 
                    styles[`top_text_${states?.mood}`] + " "  + 
                    ((states?.mood == "filled") ? styles.top_text_focus : null) + " " + 
                    (type === "date" ? styles.top_text_focus : null)
                }
            >
                {topText ? topText : `${placeholder}*`}
            </span>

            <div 
                className={styles.input_container} 
                onFocus={handleFocus} 
                onBlur={handleDesFocus}
            >
                {leftIcon ? <IconFactory iconType={leftIcon} /> : null}
                <input 
                    value={states?.value} 
                    type={type ? type : "text"} 
                    placeholder={placeholder} 
                    onChange={handleChangeValue} max={new Date().toISOString().split('T')[0]}
                />
                {rightIcon ? <IconFactory iconType={rightIcon} /> : null}
            </div>
         
            { states?.helperText ? <span className={styles.helper_text}>{states.helperText}</span> : null}
        </div>

    )
}