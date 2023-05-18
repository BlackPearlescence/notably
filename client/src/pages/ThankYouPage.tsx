import { useNavigate } from 'react-router-dom';
import styles from './ThankYouPage.module.scss';

export const ThankYouPage = () => {

    const navigate = useNavigate();

    return (
        <div className={styles.thankYouPageContainer}>
            <div className={styles.background}></div>
            <div className={styles.backgroundMask}>
                <div className={styles.thankYouCTA}>
                    <h1>Thank you for your purchase!</h1>
                    <h2>We know you want to get to note-taking as soon as possible so get to it!</h2>
                    <button onClick={() => navigate("/projects")}>Create a new project right now!</button>
                </div>
            </div>
            
        </div>
    )
}