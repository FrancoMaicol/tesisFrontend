import React from "react";
import { BodyUserCircle, Cancel, IdCard, Camera } from '@icons';
import { Step } from "../../step/";
import { Button } from "@sharing/atoms";
import { AuthenticationContext } from "@context";
import styles from './card.style.module.scss'
import styles_main from "../../../main.styles.module.scss"


function Card({ type, textHeader }: any) {
    
    const { idCardComplete, setIdCardComplete, setShowLoader, fileFirst, fileSecond, setFileFirst, setFileSecond, setShowCameraIdCard, stepidCardComplete, setStepIdCardComplete, setTakePictureIdCardFront,
setTakePictureIdCardBack }: any = React.useContext(AuthenticationContext);

    const handleFileUpload = (event: any, imgId: string) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();

            reader.onload = (e: any) => {
                const img = document.getElementById(imgId) as HTMLImageElement;
                if (img) {
                    img.src = e.target.result;
                    if (imgId === "1") {
                        setFileFirst(e.target.result);
                        setIdCardComplete(idCardComplete + 1);
                    }else if (imgId === "2") {
                        setFileSecond(e.target.result);
                        setIdCardComplete(idCardComplete + 1);
                        
                    }
                    setShowLoader(true);
                    setTimeout(() => {
                        setShowLoader(false);
                    }, 900);
                }
            };

            reader.readAsDataURL(selectedFile);
        }
    };

    const takePictureIdCard = (imgId: string) => {
        setShowCameraIdCard(true);
        imgId === "1" ? setTakePictureIdCardFront(true) && setTakePictureIdCardBack(false) : "";
        imgId === "2" ? setTakePictureIdCardBack(true) && setTakePictureIdCardFront(false) : "";
    }
    
    React.useEffect(() => {
        if (!stepidCardComplete) {
            let imgs = document.querySelectorAll('img');
            imgs.forEach(img => {
                img.src = '';
            });
        }
    }, [stepidCardComplete]);

    React.useEffect(() => {
        if (idCardComplete === 2) {
            setStepIdCardComplete(true);
        }
    }, [idCardComplete]);

    return (
        <div className={styles.card}>
            <div className={styles.card_header}>
                <h2 className={styles.card_header__header_title}>{textHeader}</h2>
                {type == 1 ?
                    <Step completed={fileFirst.length > 0} typeStep={2} />
                    :
                    <Step completed={fileSecond.length > 0} typeStep={2} />
                }
            </div>
            <article className={styles.card__card_body}>
                <div className={styles.info_container_left}>
                    <p className={styles_main.info_container__text}>Por favor toma una fotografía a tu INE que cumpla con los siguientes requisitos:</p>
                    <div className={styles.card_container_items}>
                        {type == 1 ?
                            <div className={styles_main.card__item}>
                                <BodyUserCircle fill={'#000'} />
                                <p>La foto debe mostrar claramente su cara.</p>
                            </div> : null
                        }
                        <div className={styles_main.card__item}>
                            <IdCard fill={'#000'} />
                            <p>La información de su INE deberá ser legible.</p>
                        </div>
                        <div className={styles_main.card__item}>
                            <Cancel fill={'#000'} />
                            <p>No se permiten fotos borrosas y/o cortadas.</p>
                        </div>
                    </div>

                </div>
                {type == 1 ?
                    <div className={`${styles_main.image_container} ${fileFirst.length > 0 ? styles_main.image_container_h_auto : null}`}>
                    <img className={`${fileFirst.length > 0 ? styles_main.image_container__taked_image__show : styles_main.image_container__taked_image__hidden } ${styles_main.image_container__taked_image}`} src={fileFirst} alt="" id="1" />
                        <div className={styles.custom_file_upload}>
                        <div className={`${styles.container_button_left_image}
                        ${fileFirst.length > 0 ? styles_main.image_container__button__hidden : styles_main.image_container__button__show}`}>
                            <Button text={'TOMAR FOTOGRAFÍA'} buttonType={'secondary'} iconLeft="camera" onClick={() => { takePictureIdCard("1") }} />
                            </div> 
                            <div className={`${styles.divider} ${styles.divider_horizontal}
                            ${fileFirst.length > 0 ? styles_main.image_container__button__hidden : styles_main.image_container__button__show}`}>
                            </div>
                            <label className={`${styles.container_button_right_image} 
                                ${fileFirst.length > 0 ? styles_main.image_container__button__hidden : styles_main.image_container__button__show}`}>
                                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "1")} className={styles.input_image__d_none} />
                                    <Button text={'SUBIR ARCHIVO'} buttonType={'secondary'} iconLeft="upload_file" />
                            </label>
                        </div>
                    </div>
                    :
                    <div className={`${styles_main.image_container} ${fileSecond.length > 0 ? styles_main.image_container_h_auto : null}`}>
                        <img className={`${fileSecond.length > 0 ? styles_main.image_container__taked_image__show : styles_main.image_container__taked_image__hidden } ${styles_main.image_container__taked_image}`} src={fileSecond} alt="" id="2" />
                        <div className={styles.custom_file_upload}>
                            <div className={`${styles.container_button_left_image}
                                ${fileSecond.length > 0 ? styles_main.image_container__button__hidden : styles_main.image_container__button__show}`}>
                                <Button text={'TOMAR FOTOGRAFÍA'} buttonType={'secondary'} iconLeft="camera" onClick={()=>{ takePictureIdCard("2")}} />
                            </div> 
                            <div className={`${styles.divider} ${styles.divider_horizontal}
                            ${fileSecond.length > 0 ? styles_main.image_container__button__hidden : styles_main.image_container__button__show}`}>
                            </div>
                            <label className={`${styles.container_button_right_image} 
                                ${fileSecond.length > 0 ? styles_main.image_container__button__hidden : styles_main.image_container__button__show}`}>
                                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "2")} className={styles.input_image__d_none} />
                                    <Button text={'SUBIR ARCHIVO'} buttonType={'secondary'} iconLeft="upload_file" />
                            </label>
                        </div>
                    </div>
                }
            </article>
        </div>  
    );
}


export { Card }