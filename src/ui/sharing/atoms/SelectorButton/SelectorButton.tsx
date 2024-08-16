"use client"
import * as proptypes from "./SelectorButton.proptypes";
import styles from "./SelectorButton.styles.module.scss";
export default function SelectorButton({ text, isSelected, onClick} : proptypes.SelectorButtonProps){
    return(
       <div className={styles.button + " " + (isSelected && styles.selected_button)} onClick={onClick}>
            {text}
       </div>
    )
}