import React from "react";
import SignatureCanvas from 'react-signature-canvas';
import styles_main from "../../../main.styles.module.scss";
import styles_step_signature from '../step_signature.style.module.scss';
import { Button } from "@sharing/atoms";
import { AuthenticationContext } from "../../../../../../logic/context/AuthenticationContext";


function SignaturePad() {
    
    const { stateSignature, setStateSignature, setSign, url }: any = React.useContext(AuthenticationContext);
    
    return (
        <div className={`${stateSignature == 1 ? styles_step_signature.container_signature__dashed : styles_step_signature.container_signature}`}>
            <div>
                {stateSignature === 1 &&
                    <SignatureCanvas
                        canvasProps={{ width: 500, height: 200 }}
                        ref={data => setSign(data)}
                    />}
                <div className={` ${stateSignature == 0 ? styles_main.image_container__button__show : styles_main.image_container__button__hidden}`}>
                    
                    <Button text={'REGISTRAR FIRMA'} buttonType={'principal'} onClick={() => { setStateSignature(1); }} />
                </div>
            </div>
            <br /><br />
            <img src={url} className={`${styles_step_signature.image_container__taked_image} ${stateSignature == 1 || stateSignature == 2 ? styles_step_signature.image_container__taked_show : styles_step_signature.image_container__taked_hide}`} />
        </div>
    );
}


export { SignaturePad };