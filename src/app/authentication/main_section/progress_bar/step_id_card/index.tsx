import React from "react";
import { ArrowRight } from '@icons';
import { Card } from "./card";
import { LoaderWhite } from "@sharing/atoms";
import { AuthenticationContext } from "@context";
import styles from './step_id_card.style.module.scss'
import styles_main from "../../main.styles.module.scss"


function StepIdCard() {

    const { steps, setSteps, dictSteps, setDictStepsComplete, showLoader, setShowLoader, stepidCardComplete,
        fileFirst, fileSecond, idFile, setFileFirst, setFileSecond, setStepIdCardComplete, setIdCardComplete,
        showErrorMessage, setShowErrorMessage, showSuccessMessage, setShowSuccessMessage, setPermission, setStream }: any = React.useContext(AuthenticationContext);

    React.useEffect(() => {
        if (steps == 3) {
            setShowLoader(true);
            setTimeout(() => {
                setShowLoader(false);
            }, 900);
        }
    }, [steps]);

    const getMicrophonePermission = async () => {
            if ("MediaRecorder" in window) {
                try {
                    const streamData:any = await navigator.mediaDevices.getUserMedia({
                        audio: true,
                        video: false,
                    });
                    setPermission(true);
                    setStream(streamData);
                } catch (err:any) {
                    alert(err.message);
                }
            } else {
                alert("The MediaRecorder API is not supported in your browser.");
            }
        };

    function completeStepIdCard() {
        setSteps(5);
        getMicrophonePermission();
        setDictStepsComplete((prevState: any) => {
            return {
                ...prevState,
                2: true
            }
        });
        
    }

    React.useEffect(() => { 
        if (stepidCardComplete) {
            const formData = new FormData();
            
            let blobFirst = new Blob([fileFirst], { type: 'image/jpeg' });
            let blobSecond = new Blob([fileSecond], { type: 'image/jpeg' });
            formData.append("identification_front", blobFirst);
            formData.append("identification_back", blobSecond);

            setTimeout(() => {
                fetch(`https://192.168.1.164:9001/api/verification/face/?id=${idFile.toString()}`, {
                    method: "POST",
                    body: formData,
                    mode: 'cors',
                    credentials: "include",
                })
                    .then(response => response.json())
                    .then(data => {
                        if (!data['status']) {
                            setFileFirst("");
                            setFileSecond("");
                            setIdCardComplete(0);
                            setStepIdCardComplete(false);
                            window.scrollTo(0, 0);
                            setTimeout(() => {
                                setShowErrorMessage(false);
                            }, 3000);
                            setShowErrorMessage(true);
                        } else {
                            setSteps(4);
                            setTimeout(() => {
                                setShowSuccessMessage(false);
                            }, 3000);
                            setShowSuccessMessage(true);
                            window.scrollTo(0, document.body.scrollHeight);
                        }
                    }).catch(error => {
                        console.log("Solicitud fallida!", error);
                    });
            }, 1200);
        }
    }, [stepidCardComplete]);
    
    return (
        <>
            {showErrorMessage?
                <span className={styles_main.span_error}>La identificacion no coincide con la foto</span> :
                showSuccessMessage ? 
                <span className={styles_main.span_success}>La identificacion coincide con la foto</span> : <></>
            }
            
            <h2 className={styles_main.title_blue}>{dictSteps[3]}</h2>
                <p>{stepidCardComplete}</p>
            <section className='container-steps-id'>
                <Card type={1} textHeader={"Parte frontal de tu INE"}/>
                <Card type={2} textHeader={"Parte inversa de tu INE"}/>
                <button disabled={steps < 4}
                    className={`${styles_main.info_container__button} ${styles.button_step_id_card} ${styles_main.d_lg_flex} ${styles_main.d_xl_flex} ${styles_main.d_flex} ${styles_main.d_md_flex}
                        ${steps == 4 ? styles_main.info_container__button__enabled : styles_main.info_container__button__disabled}`}
                    onClick={() => {
                        completeStepIdCard();
                    }}
                    >
                    Continuar<ArrowRight fill='#fff'/>
                </button>
            </section>
            
            {showLoader && (
                <LoaderWhite />
            )}
        </>       
    )
}


export { StepIdCard }