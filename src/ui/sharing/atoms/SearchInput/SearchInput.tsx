"use client"
import { useState } from "react";

import * as proptypes from "./SearchInput.proptypes";
import styles from "./SearchInput.styles.module.scss";

import { Input, Loader } from "@sharing/atoms";
import { InputStates } from "@types";

export default function SearchInput({ onInputChange } : proptypes.SearchInputProps) {

    const [inputStates, setInputStates] = useState({value: "", mood: "default", helperText: ""} as InputStates); 

    const handleInputChange = (states: InputStates, id: number, identifier: string) => {
        setInputStates(states);
        onInputChange(states.value);
    }

    return (
        <div className={styles.container}>
            <Input 
                placeholder="Búsqueda"
                topText="Búsqueda"
                identifier="searchCotizacion"
                states={inputStates}
                dispatch={handleInputChange}
                rightIcon="search"
            /> 
        </div>

    )

}
