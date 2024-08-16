"use client"
import * as proptypes from "./CircleButton.proptypes";
import styles from "./CircleButton.styles.module.scss";
import { IconFactory } from "@sharing/atoms";

export default function CircleButton({ icon, buttonType, iconFill, onClick} : proptypes.CircleButtonProps){
    return(
       <div className={styles.container + " " + styles[buttonType]} onClick={onClick}>
            <IconFactory iconType={icon} fill={iconFill} />
       </div>
    )
}