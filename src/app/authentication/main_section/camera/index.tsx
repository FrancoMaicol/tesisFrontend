'use client'
import React from "react";
import Webcam from "react-webcam";
import { Button } from "@sharing/atoms";
import { AuthenticationContext } from "@context";
import styles from "./camera.style.module.scss"

const WebcamComponent = () => <Webcam />;

const videoConstraints = {
	// width: 1280,
    // height: 720,
    aspectRatio: 16/9,
	facingMode: "user",
};

const Camera = () => {
    
	const { ws, authenticationSuccess, setAuthenticationSuccess, setAuthenticationComplete, webcamRef, instruction, instructionsDict, picture, setTakePicture, setSteps, authenticationComplete, idFile }: any = React.useContext(AuthenticationContext);
    
    React.useEffect(() => {
        const interval = setInterval(() => {
            if (ws && ws.readyState === WebSocket.OPEN) {
                const imageSrc = webcamRef.current.getScreenshot();
                ws.send(imageSrc);
            }
        }, 100);
        return () => clearInterval(interval);
    }, [ws]);

    React.useEffect(() => {
        if (authenticationComplete) {
            setTakePicture(webcamRef.current.getScreenshot());
            ws.close();
            setSteps(2);
        }
    }, [authenticationComplete]);

    return (
        <div className={authenticationComplete ? styles.container_video: styles.container_video + " " + styles.container_video__show}>
            <h2 className={styles.container_video__title}>
				Analizando
            </h2>
            {authenticationSuccess ? (
                <span className={`${styles.container_video__instruction} ${styles.container_video__instruction__complete}`}>La validacion ha sido exitosa</span>
            ) : (
                <span className={`${styles.container_video__instruction} ${styles.container_video__instruction__}${instruction}`}> {instructionsDict[instruction]}</span>
            )}
            <div className={styles.container_camera}>
            {picture === "" ? (
                <Webcam className={styles.container_video__video}
                    audio={false}
                    // height={500}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                />
            ) : (
                <img src={picture} alt="lol" />
                )}
                </div>
            {authenticationSuccess ?
                (<div className={styles.container_buttons}>
                    <Button text="Desactivar" buttonType={'principal'} iconLeft="photo" onClick={() => setAuthenticationComplete(true)} />
                </div>
                    )
                :
                <></>
            }
		</div>
    );
};


export { Camera }