"use client"
import { useState } from "react";
import { LoginForm, RecoveryForm } from "@login/ui/molecules";
import styles from "./FormsContainer.styles.module.scss";

export default function FormsContainer(){

    const [currentForm, setCurrentForm] = useState("login" as "login" | "recovery")

    return(
        <div className={styles.container}>

            {currentForm === "login" 
            ? <LoginForm setCurrentForm={setCurrentForm} /> 
            : <RecoveryForm setCurrentForm={setCurrentForm} /> 
            }

        </div>
    )
}