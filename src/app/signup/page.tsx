import styles from "@signup/styles/signup.styles.module.scss"
import { FormsContainer } from "@signup/ui/organisms";


export default async function Signup(){

    return(
        <div className={styles.container}>
        
           <FormsContainer></FormsContainer>

        </div>
    )
}