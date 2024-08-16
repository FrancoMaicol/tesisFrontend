import React, { useState } from "react";
import { BodyUserCircle, Lamp, Cancel, ArrowRight } from '@icons';
import { Button, LoaderWhite } from "@sharing/atoms";
import { AuthenticationContext } from "@context";
import { FacialRecognition } from "../websocket_recognition/index";
import styles from "./step_photo.style.module.scss";
import styles_main from "../../main.styles.module.scss";

function StepPhoto() {
    const { setSteps, steps, dictSteps, setDictStepsComplete, showLoader, takePicture, setShowCamera }: any = React.useContext(AuthenticationContext);
    const [showAudioControls, setShowAudioControls] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState('');

    const messages = [
        'Hora de una pausa. Reduzca la velocidad y busca un área de descanso cercana',
        'Condición de riesgo detectada, en cuanto pueda detenga su unidad y comuniquese al centro de monitoreo para recibir indicaciones',
        'Recuerda, la seguridad es lo primero. Si te sientes cansado, es hora de tomar un descanso.'
    ];

    const sendTextMessage = () => {
        if (selectedMessage) {
            const messageData = { message: selectedMessage };

            fetch('http://192.168.219.252:80007/audioCommunication/receiveText', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageData),
            }).then(response => {
                if (response.ok) {
                    console.log('Text message sent successfully');
                } else {
                    console.error('Error sending text message:', response.statusText);
                }
            }).catch(error => {
                console.error('Fetch error:', error);
            });
        } else {
            console.error('No message selected');
        }
    };


    const toggleAudioControls = () => {
        setShowAudioControls(!showAudioControls);
    };

    return (
        <>
            <h2 className={styles_main.title_blue}>{dictSteps[1]}</h2>
            <section className={styles.container_steps_photo}>
                <article className={styles.info_container_step_photo}>
                    <p className={styles_main.info_container__text}>Consideraciones:</p>
                    <div className={styles_main.card}>
                        <div className={styles_main.card__item}>
                            <BodyUserCircle fill={'#000'} />
                            <p>El análisis se enfoca principalmente en la distancia que existe en diversos puntos del rostro.</p>
                        </div>
                        <div className={styles_main.card__item}>
                            <Lamp fill={'#000'} />
                            <p>La iluminación es un parámetro importante para los resultados.</p>
                        </div>
                        <div className={styles_main.card__item}>
                            <Cancel fill={'#000'} />
                            <p>No interrumpir la concentración del conductor, de no ser necesario.</p>
                        </div>
                    </div>

                    <div className={styles.audioControlsContainer}>
                        <button
                            disabled={false}
                            className={styles.audioControlButton}
                            onClick={toggleAudioControls}
                        >
                            MENSAJES PREVENtiVOS
                        </button>

                        {showAudioControls && (
                            <div className={styles.audioControls}>
                                {messages.map((message, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedMessage(message)}
                                        className={`${styles.messageButton} ${selectedMessage === message ? styles.selected : ''}`}
                                    >
                                        {message}
                                    </button>
                                ))}
                                <button onClick={sendTextMessage} className={styles.buttonSend} disabled={!selectedMessage}>
                                    <div className={styles.svgWrapper}>
                                        <div className="svg-wrapper">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                width="24"
                                                height="24"
                                            >
                                                <path fill="none" d="M0 0h24v24H0z"></path>
                                                <path
                                                    fill="currentColor"
                                                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                                                ></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <span>Enviar</span>
                                </button>
                            </div>
                        )}
                    </div>
                </article>

                <article className={styles.article}>
                    <FacialRecognition />
                </article>
            </section>
            {showLoader && (
                <LoaderWhite />
            )}
        </>
    );
}

export { StepPhoto };
