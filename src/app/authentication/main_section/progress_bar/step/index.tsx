import React from "react";
import styles from "./step.style.module.scss"
import { Check } from "@icons";


function Step({ numberStep, textStep, isActive, completed, typeStep, indicatorActive }: any) {

    if (typeStep == 1) {
        return (
            <>
                <div className={`${styles.step_container} ${completed ? styles.step_container__completed : isActive ? styles.step_container__active : ""}`}>
                    <div className={`${styles.step_number} ${completed ? styles.step_number__completed : isActive ? styles.step_container__active : ""}`}>
                        {completed ? <Check /> : numberStep}
                    </div>
                    <div className={`${styles.step_text} step-text--${completed ? "completed" : ""}`}>
                        {textStep}
                    </div>
                    <div className={`${styles.indicator_step} ${indicatorActive | isActive ? styles.indicator_step__active : null }`}></div>
                </div>
            </>
        );
    } else if (typeStep == 2) {
        return (
            <>
                <div className={`${styles.step_container} ${completed ? styles.step_container__completed : ""}`}>
                    <div className={`${styles.step_number} ${completed ? styles.step_number__completed:""}`}>
                        {completed ? <Check /> : ""}
                    </div>
                </div>
            </>
        );
    }
    
}


export { Step }