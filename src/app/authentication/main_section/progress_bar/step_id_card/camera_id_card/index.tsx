'use client'
import React from "react";
import Webcam from "react-webcam";
import { AuthenticationContext } from "@context";
import styles from "./../../../camera/camera.style.module.scss";
import { Button } from "@sharing/atoms";
import { Refresh} from '@icons';

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

const videoConstraints = {
	width: 1280,
	height: 720,
	facingMode: FACING_MODE_USER,
};

function CameraIdCard({typeIdCard}: any) {
    const { webcamRef, setShowCameraIdCard, setFileFirst, fileFirst, idCardComplete, setIdCardComplete, setShowLoader, setFileSecond, fileSecond,takePictureIdCardFront,
        takePictureIdCardBack, setTakePictureIdCardFront, setTakePictureIdCardBack }: any = React.useContext(AuthenticationContext);
    const [imgSrc, setImgSrc]: any = React.useState(null);
    const [facingMode, setFacingMode] = React.useState(FACING_MODE_USER);


    let imageSrc:any;
    const capture = React.useCallback(() => {
        imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        if (takePictureIdCardFront) {
            setFileFirst(imageSrc)
        }
        if (takePictureIdCardBack) {
            setFileSecond(imageSrc)
        }
    }, [webcamRef, imgSrc]);

    const asignFileToSrc = React.useCallback(() => {
        imageSrc = null;
        let imgId = "";
        fileFirst.length > 0 ? imgId = "1" : null;
        fileSecond.length > 0 ? imgId = "2" : null;
        let img = document.getElementById(imgId) as HTMLImageElement;
        if (img) {
            if (imgId === "1") {
                setIdCardComplete(idCardComplete + 1);
                setTakePictureIdCardFront(false);
            } else if (imgId === "2") {
                setIdCardComplete(idCardComplete + 1);
                setTakePictureIdCardBack(false);
            }
            setShowLoader(true);
            setTimeout(() => {
                setShowLoader(false);
            }, 900);
        }
        setShowCameraIdCard(false);
    }, [fileFirst, fileSecond, idCardComplete]);
    
    const handleClick = React.useCallback(() => {
    setFacingMode(
      prevState =>
        prevState === FACING_MODE_USER
          ? FACING_MODE_ENVIRONMENT
          : FACING_MODE_USER
    );
  }, []);

    return (
        <div className={styles.container_video + " " + styles.container_video__show}>
            <h2 className={styles.container_video__title}>
				{imgSrc === null ? "Realiza tu captura" : "Captura realizada"}
            </h2>
            <div className={styles.container_camera}>
                {imgSrc === null ? (
                    <><Webcam className={styles.container_video__video}
                        audio={false}
                        height={500}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{...videoConstraints, facingMode}}
                        
                    />
                        
                    </>
                ) : (
                        <img className={styles.container_video__img} src={imgSrc} alt="lol" />
                )}
            </div>
            <div className={styles.container_buttons}>
                {imgSrc === null ?
                    (<><Button text="Cámara de conductor" buttonType={'principal'} iconLeft="photo" onClick={capture} />
                        <button className={`${styles.button_switch_cameras}`}
                            onClick={handleClick}
                        >
                            <Refresh fill='#19A7CE'/>
                            cambiar cámara
                        </button>
                    </>)
                    :
                    <>
                        <Button text={'REPETIR FOTOGRAFÍA'} buttonType={'tertiary'} iconLeft="photo" onClick={() => { setImgSrc(null) }} />
                        <Button text={'GUARDAR FOTOGRAFÍA'} buttonType={'principal'} iconLeft="download" onClick={ asignFileToSrc } />
                    </>
                }
            </div>
		</div>
    );
};


export { CameraIdCard }