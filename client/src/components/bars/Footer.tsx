import styles from "./Footer.module.scss";
import { SocialIcon } from 'react-social-icons';


export const Footer = () => {
    return(
        <div className={styles.footerContainer}>
            <div className={styles.logoContainer}>
                <img src={require("../../assets/images/logo-no-background.webp")}/>
                <span>Takes notes, notably!</span>
            </div>
            <div className={styles.contactContainer}>
                <span>Contact Us</span>
                <span>Email Address: feakfeafkeapfk2421e@gmail.com</span>
                <span>Phone: 314-213-3654</span>
                <span>Mobile: 314-903-9154</span>
                <span>Address: 4576 State Street, Saint Louis, MO 63141 </span>
            </div>
            <div className={styles.siteLinksContainer}>
                <span>Links</span>
                <a href="#">Home</a>
                <a href="#">Features</a>
                <a href="#">About</a>
                <a href="#">Pricing</a>
                
            </div>
            <div className={styles.socialLinksContainer}>
                <SocialIcon network="medium" />
                <SocialIcon network="linkedin" />
                <SocialIcon network="github" />
            </div>
        </div>
    )
}