import React from 'react';
import { ArrowRight, CloseX } from '@icons';
import { Button, LoaderWhite } from "@sharing/atoms";
import { AuthenticationContext } from '@context';
import styles from "./step_signature.style.module.scss"
import styles_main from "../../main.styles.module.scss"
import { SignaturePad } from './signature';


function StepSignature() {

    const { steps, dictSteps, showLoader, setShowLoader, signatureComplete, setSignatureComplete, stateSignature, setStateSignature, sign, setUrl }: any = React.useContext(AuthenticationContext);

    React.useEffect(() => {
        if (steps == 7) {
            setShowLoader(true);
            setTimeout(() => {
                setShowLoader(false);
            }, 900);
        }
    }, [steps]);

    const handleClear= () =>{
        setUrl('')
        if (sign) {
            sign.clear()
        }
        setStateSignature(1);
    }
    const handleGenerate= () =>{
        setUrl(sign.getTrimmedCanvas().toDataURL('image/png'))
        setStateSignature(2);
    }

    React.useEffect(() => {
        if (stateSignature === 2) {
            setShowLoader(true);
            setTimeout(() => {
                setShowLoader(false);
            }, 1000);
        }
    }, [stateSignature]);


    return (
        <>
            <h2 className={styles_main.title_blue}>{dictSteps[7]}</h2>
            <section className={styles.container_steps_signature}>
                <p className={`${styles.info_container__text}`}>Por favor utiliza tu cursor y registra tu firma dentro del recuadro siguiente:</p>
                <SignaturePad/>
                        
                {stateSignature == 1 ?
                    <button disabled={steps < 7} className={`${styles.info_container__button} ${steps == 7 ? styles_main.info_container__button__enabled : ""}`}
                        onClick={handleGenerate}
                        >
                        Guardar Firma
                    </button> : null
                }
                {stateSignature == 2 ?
                    <div className={`${styles.container_continue_step} ${steps == 7 ? styles.container_continue_step_show : styles.container_continue_step_hide}`}>
                        <div className={`${styles.container_btn_reset_signature} ${styles_main.info_container__button__enabled}`}>
                            <Button text={'repetir firma'} buttonType={'secondary'} iconLeft="reset" onClick={handleClear} />
                        </div>
                        <button disabled={steps < 2} className={`${styles.info_container__button} ${steps == 7 ? styles_main.info_container__button__enabled : ""}`}
                            onClick={() => {
                                setSignatureComplete(true);
                            }}
                            >
                            Finalizar autenticación<ArrowRight fill='#fff'/>
                        </button>
                    </div> : null
                }
            </section>
            
            {showLoader && (
                <LoaderWhite />
            )}
            {signatureComplete && (
                <div className={styles.container_modal}>
                    <div className={styles.modal}>
                        <div className={styles.modal_header}>
                            <div className={styles.modal_title}>
                                <h2>Autenticación finalizada</h2>
                            </div>
                            <a onClick={() => {
                                setSignatureComplete(false);
                            }}>
                                <CloseX />
                            </a>
                        </div>
                        <div className={styles.modal_body}>
                            <p className={styles.modal_body_text}>Gracias por confiar en nosotros- Ahora tus seres queridos estan protegidos.</p>
                            <p className={styles.modal_body_text_secondary}>El cobro a su tarjeta domiciliada se aplicará en breve.</p>
                        </div>
                        <div className={styles.modal_footer}>
                            <button className={`${styles.info_container__button} ${steps == 7 ? styles_main.info_container__button__enabled : ""}`}
                            onClick={() => {
                                setSignatureComplete(false);
                            }}
                            >
                            Entendido
                        </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}


export { StepSignature }