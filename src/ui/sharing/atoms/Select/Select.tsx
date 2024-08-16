"use client"
import { useState } from "react";
import * as proptypes from "./Select.proptypes";
import styles from "./Select.styles.module.scss";
import { IconFactory } from "@sharing/atoms";
import { IconsList } from "@types";
import { SelectStates } from "@types"

/* 
    Este select manda a llamar a su dispatch cuando ocurre el evento de seleccionar un item
    El select envia una copia de sus nuevos estados segun el tipo 'SelectStates'.
    El padre es respnsable de actualizar los estados del Select
*/
export default function Select({ dispatch, elements, states, topText, identifier, id } : proptypes.SelectProps){

    const [isToogle, setIsToogle] = useState(false);

    const handleSelectClick = () => {
        if(states.mood === "disabled") return -1
        calculateToogleStatus(!isToogle)
    };

    const handleItemClick = (value: string, idItem: number) => {


        
        const newStates: SelectStates = {
            value: value,
            mood: "filled",
            helperText: "",
        }

        dispatch(newStates, id ? id : idItem , identifier);
    }

    const calculateToogleStatus = (status: boolean) => {
        setIsToogle(status);
    }

    return(
        <div className={styles.container + " " + styles[`${states?.mood}`]} id="select">

            <div className={styles.select_container} onClick={handleSelectClick} onMouseLeave={() => calculateToogleStatus(false)}>
                
                <span className={styles.top_text + " " + styles[`top_text_${states.mood}`]}>{topText}</span>
                
                <span>{states.value}</span>
                
                <div className={styles.icon_container + " " + (isToogle ? styles.icon_container_toggled : "")}>
                    <IconFactory iconType="arrow_up" />
                </div>
                
                {isToogle ? 
                    <div className={styles.toogle_menu} >
                        {elements.length > 0 &&
                        <>
                            {elements.map((element) => {
                                return(
                                    <h5 
                                        key={element.id}
                                        onClick={() => handleItemClick(element.descripcion, element.id)} 
                                        className={styles.toogle_item}
                                    >
                                        {element.descripcion}
                                    </h5>
                                )
                            })}
                        </>
                        }
                    </div>
                :  null }
            </div>

            { states?.helperText ? <span className={styles.helper_text}>{states.helperText}</span> : null}

        </div>

    )
}