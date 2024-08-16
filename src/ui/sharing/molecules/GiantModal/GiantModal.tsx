"use client"
import { useState } from "react";
import * as proptypes from "./GiantModal.proptypes";
import styles from "./GiantModal.styles.module.scss";

export default function GiantModal( { onClose, children } : proptypes.GiantModalProps ){
    const [isClose, setIsClose] = useState(false);
    return(
        <>
        {!isClose ? 
            <div className={styles.container}>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        : null}
        </>
    );
}