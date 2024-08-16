"use client"
import * as proptypes from "./FormFactory.proptypes";
import styles from "./FormFactory.styles.module.scss";

import { Select, Input } from "@sharing/atoms";

export default function FormFactory({ formConfig, onInputChange, onSelectChange} : proptypes.FormFactoryProps){

    return(
        <form className={styles.form}>
            {formConfig.map((element) => {
                if(element.formElement === "select"){
                    return <Select 
                        key={element.identifier}
                        topText={element.topText}
                        elements={element.selectValues}
                        identifier={element.identifier}
                        dispatch={onSelectChange}
                        states={element.states}
                    />
                }else {
                    return <Input 
                        key={element.identifier}
                        placeholder={element.placeholder}
                        identifier={element.identifier}
                        states={element.states}
                        dispatch={onInputChange}
                        type={element.inputType as any ?? undefined}
                    />
                }
            })}
        </form >
    )
}