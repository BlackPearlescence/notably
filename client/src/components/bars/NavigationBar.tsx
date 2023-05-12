import styles from "./NavigationBar.module.scss";
import { BsCash } from 'react-icons/bs';
import { AiFillHome } from 'react-icons/ai';
export const NavigationBar = () => {

    return(
        <div className={styles.navigationBarContainer}>
            <a href="#">
                <img src={require("../../assets/images/logo-no-background.webp")}/>
            </a>
            <a href="#">Home</a>
            <a href="#">Features</a>
            <a href="#">About</a>
            <a href="#">Pricing</a>
            <button>Log In</button>
        </div>
    )
}