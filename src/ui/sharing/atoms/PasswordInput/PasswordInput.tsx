"use client"
import { ChangeEvent, useState } from "react"; 
import * as proptypes from "./PasswordInput.proptypes";
import styles from "./PasswordInput.styles.module.scss";
import { IconFactory } from "@sharing/atoms";
import { InputStates } from "@types";

export default function PasswordInput({ placeholder, topText,  states, dispatch, identifier, id } : proptypes.PasswordInputProps){

    const id_ = id ? id : -1;
    const [inputType, setInputType] = useState("password" as "text" | "password");

    const handleFocus = () => {
        if(states.mood === "disabled") return;
        const newStates: InputStates = {
            ...states, 
            mood: "active",
            helperText: ""
        }
        dispatch(newStates, id_, identifier);
    }

    const handleDesFocus = () => {
        if(states.mood === "disabled") return;
        const mood = states.value ? "filled" : "default";
        const newStates: InputStates = {
            ...states, 
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
        const newStates: InputStates = {
            value: value,
            mood: mood,
            helperText: ""
        }
        dispatch(newStates, id_,  identifier);
    }

    return(
        <div className={styles.container + " " + styles[`${states?.mood}`]}>

            <span 
                className={
                    styles.top_text + " " + 
                    styles[`top_text_${states?.mood}`] + " "  + 
                    ((states?.mood == "filled") ? styles.top_text_focus : null) 
                }
            >
                {topText ? topText : `${placeholder}*`}
            </span>

            <div 
                className={styles.input_container} 
                onFocus={handleFocus} 
                onBlur={handleDesFocus}
            >
                <input 
                    value={states?.value} 
                    type={inputType} 
                    placeholder={placeholder} 
                    onChange={handleChangeValue} max={new Date().toISOString().split('T')[0]}
                />
                <span 
                    onMouseUp={() => setInputType("password")}
                    onMouseDown={() => setInputType("text")}
                >
                    <IconFactory iconType={inputType === "text" ? "eye_off" : "eye_on" } />
                </span>
                
            </div>
         
            { states?.helperText ? <span className={styles.helper_text}>{states.helperText}</span> : null}
        </div>

    )
}