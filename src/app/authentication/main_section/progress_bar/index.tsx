import React from 'react';
import { Step } from './step/'
import { StepPhoto } from './step_photo/';
import { StepIdCard } from './step_id_card/';
import { StepSignature } from './step_signature/';
import { AuthenticationContext } from "@context";
import styles from "./progress_bar.style.module.scss"
import styles_main from "../main.styles.module.scss"


export function ProgressBar() {
    
    const {steps, dictStepsComplete}:any = React.useContext(AuthenticationContext);

    return (
        <>
            <section className={styles.container__progressbar}>
                <h2 className={styles_main.title_gray}>Analizando condición del conductor</h2>
            </section>

            <StepPhoto/>
            
        </>
    );
}