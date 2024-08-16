"use client"
import { useState, useEffect } from "react";

import * as proptypes from "./ProductSelector.proptypes";
import styles from "./ProductSelector.styles.module.scss";

import { Select, Loader } from "@sharing/atoms";
import { SelectStates } from "@types";
import { getProductsByBranch } from "@services/admin/cotizador/nuevaCotizacion";

export default function ProductSelector({ onProductSelect } : proptypes.ProductSelectorProps) {

    const [isLoader, setIsLoader]= useState(false); 
    const [productsList, setProductsList] = useState([]);
    const [selectStates, setSelectStates] = useState<SelectStates>({
        value: "Producto", 
        mood: "default", 
        helperText: ""
    });
    

    const handleSelectChange = (states: SelectStates, id: number, identifier: string) => {
        setSelectStates(states);
        onProductSelect(states.value, id);
    }  

    useEffect(() =>{
        setIsLoader(true);
        getProductsByBranch()
            .then((response) => {
                if(response.data.payload){
                    setProductsList(response.data.payload);
                    setIsLoader(false);
                }
            })
    }, [])


    return (
        <div className={styles.container}>
            {isLoader && <Loader /> }
            <Select 
                topText="Producto"
                elements={productsList}
                identifier="productSelectorSelect"
                dispatch={handleSelectChange}
                states={selectStates}
            />
        </div>

    )

}
