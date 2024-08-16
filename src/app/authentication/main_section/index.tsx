import React from 'react';
import { NavAuthentication } from "../nav_authentication/"
import { Camera } from '../main_section/camera/'
import { LoaderWhite } from "@sharing/atoms";
import { ProgressBar } from './progress_bar/';
import { AuthenticationContext } from "@context";
import styles from "./main.styles.module.scss"
import { CameraIdCard } from "./progress_bar/step_id_card/camera_id_card/";


function MainSection() {

    const { ws, setWs, authenticationSuccess, setAuthenticationSuccess, showCamera, setShowCamera, authenticationComplete, showLoader, takePictureIdCardFront, takePictureIdCardBack, showCameraIdCard, setShowLoader, setInstruction, setAuthenticationComplete, setIdFile, idFile}: any = React.useContext(AuthenticationContext);
    

    React.useEffect(() => {
        if (authenticationComplete) {
            setShowLoader(true);
            setTimeout(() => {
                setShowLoader(false);
            }, 900);
            setTimeout(() => {
                setShowCamera(false);
            }, 1000);
        }
    }, [authenticationComplete]);

    return (
        <>
            <NavAuthentication />
            <main className={styles.main_container} id='root'>
                <ProgressBar/>
            </main>
        </>
    );
}


export { MainSection }