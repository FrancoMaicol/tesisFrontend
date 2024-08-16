import * as proptypes from "./RadioButton.proptypes";
import styles from "./RadioButton.styles.module.scss";

export default function RadioButton({ dispatch, state, identifier, text } : proptypes.RadioButtonProps){
    return(
        <div className={styles.radio_button_item}>
            <div 
                id="radio-button"
                className={styles.circle + " " + (state && styles.circle_filled) } 
                onClick={() => dispatch(!state, identifier)}    
            />
            {text}
        </div>
    )
}