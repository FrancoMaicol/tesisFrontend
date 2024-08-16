"use client"
import { useState } from "react";
import * as proptypes from "./Modal.proptypes";
import styles from "./Modal.styles.module.scss";
import { IconFactory } from "@sharing/atoms";
import { Button } from "@sharing/atoms";


///On close es una funcion que se reemplza el cerrar modal desde fuera se controla desde fuera  


export default function Modal({title, message, onClose, buttonsProps } : proptypes.ModalProps){

    const [isClose, setIsClose] = useState(false);

    const closeModal = onClose ? onClose : () => {
        setIsClose(true);
    }

    
    return(
        
        <>
        {!isClose ? 
            <div className={styles.container}>

                <div className={styles.content}>

                    <div className={styles.modal_header}>
                        <p className={styles.title}>{title}</p>
                        <div className={styles.icon} onClick={closeModal}>
                            <IconFactory iconType="close"/>
                        </div>
                    </div>

                    <div className={styles.modal_message}>
                        <p>{message}</p>
                    </div>


                    <div className={styles.modal_footer}>

                        {buttonsProps?.cancelButton && 
                            <div className={styles.button_container}> 
                                <Button 
                                    onClick={buttonsProps.cancelButton.handleClick}
                                    text={buttonsProps.cancelButton.text}
                                    buttonType={buttonsProps.cancelButton.type}
                                />
                            </div>
                        }

                        {buttonsProps?.acceptButton && 
                            <div className={styles.button_container}>
                                <Button 
                                    onClick={buttonsProps.acceptButton.handleClick}
                                    text={buttonsProps.acceptButton.text}
                                    buttonType={buttonsProps.acceptButton.type}
                                />
                            </div>
                        }
                        
                    </div>

                </div>
            </div>

        : null}
        </>
    );
}