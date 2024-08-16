import React from "react";

const AuthenticationContext = React.createContext({});


function AuthenticationProvider({ children }: any) {
    
    const [ws, setWs] = React.useState(null);
    const [showCamera, setShowCamera] = React.useState(false);
    const [showCameraIdCard, setShowCameraIdCard] = React.useState(false);
    const [instruction, setInstruction] = React.useState('');
    const [authenticationComplete, setAuthenticationComplete] = React.useState(false);
    const [authenticationSuccess, setAuthenticationSuccess] = React.useState(false);
    const [takePicture, setTakePicture] = React.useState("");
    const [takePictureIdCardFront, setTakePictureIdCardFront] = React.useState(false);
    const [takePictureIdCardBack, setTakePictureIdCardBack] = React.useState(false);
    const [showLoader, setShowLoader] = React.useState(false);
    const dictSteps: any = {
        1: 'Monitoreo',
        2: 'success_photo',
        3: 'Identificación',
        4: 'success_id',
        5: 'Grabar voz',
        6: 'success_voice',
        7: 'Firma electrónica',
        8: 'success_signature',
    };

    const [steps, setSteps] = React.useState(1);
    const [idFile, setIdFile] = React.useState("");
    const dictStepsCompleted: any = {
        1: false,
        2: false,
        3: false,
        4: false,
    };

    const [dictStepsComplete, setDictStepsComplete] = React.useState(dictStepsCompleted);
    const [idCardComplete, setIdCardComplete] = React.useState(0);
    const [stepidCardComplete, setStepIdCardComplete] = React.useState(false);
    const [fileFirst, setFileFirst] = React.useState("");
    const [fileSecond, setFileSecond] = React.useState("");
    const [showErrorMessage, setShowErrorMessage] = React.useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);

    const [picture, setPicture] = React.useState("");
    const webcamRef = React.useRef(null)as any;
    const instructionsDict: any = {
        'up': 'arriba',
        'left': 'la izquierda',
        'right': 'la derecha',
        'down': 'abajo',
    };

    const [stateRecord, setStateRecord] = React.useState(0);
    const [audioFile, setAudioFile] = React.useState(null);

    const [permission, setPermission] = React.useState(false);
    const [stream, setStream] = React.useState(null);

    const [stateSignature, setStateSignature] = React.useState(0);
    const [signatureComplete, setSignatureComplete] = React.useState(false);
    const [signatureFile, setSignatureFile] = React.useState("");

    const [sign, setSign] = React.useState()
    const [url, setUrl] = React.useState()

    return (

        <AuthenticationContext.Provider value={{
            ws, setWs,
            showCamera, setShowCamera,
            instruction, setInstruction,
            authenticationComplete, setAuthenticationComplete,
            authenticationSuccess, setAuthenticationSuccess,
            takePicture, setTakePicture,
            showLoader, setShowLoader,
            dictSteps, steps, setSteps,
            dictStepsComplete, setDictStepsComplete,
            idCardComplete, setIdCardComplete,
            fileFirst, setFileFirst,
            fileSecond, setFileSecond,
            picture, setPicture, webcamRef,
            instructionsDict, stateRecord, setStateRecord,
            audioFile, setAudioFile,
            stateSignature, setStateSignature,
            signatureComplete, setSignatureComplete,
            signatureFile, setSignatureFile,
            idFile, setIdFile,
            stepidCardComplete, setStepIdCardComplete,
            showErrorMessage, setShowErrorMessage,
            showSuccessMessage, setShowSuccessMessage,
            permission, setPermission,
            stream, setStream,
            sign, setSign,
            url, setUrl,
            takePictureIdCardFront, setTakePictureIdCardFront,
            takePictureIdCardBack, setTakePictureIdCardBack,
            showCameraIdCard, setShowCameraIdCard
        }
        }>
            { children }
        </AuthenticationContext.Provider>
    );
}

export { AuthenticationContext, AuthenticationProvider }