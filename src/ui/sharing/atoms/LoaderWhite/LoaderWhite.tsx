import React from "react";
import styles from './loader_white.style.module.scss'


function LoaderWhite() {

    return (
        <div className={styles.container__loader}>
            <span className={styles.spinloader}></span>
        </div>
    );
}


export { LoaderWhite }