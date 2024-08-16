"use client"
import { useState } from "react";
import { SignupForm } from "@signup/ui/molecules";
import styles from "./FormsContainer.styles.module.scss";


export default function FormsContainer(){

    return(
        <div className={styles.container}>

            <SignupForm></SignupForm>

        </div>
    )
}