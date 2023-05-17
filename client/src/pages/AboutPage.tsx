import styles from './AboutPage.module.scss';

export const AboutPage: React.FC = () => {

    return (
        <div className={styles.aboutPageContainer}>
            <h1>Straightforward without the bullshit</h1>
            <div className={styles.contentContainer}>
                <p className={styles.contentText}>
                    This app was made with you in mind. 
                    We know you don’t want to spend hours learning a new software. 
                    We like to keep it simple but classy.
                </p>
                <img src={require("../assets/images/building-blocks-1563961_1920.jpg")} alt="building blocks" />
            </div>
            <div className={styles.contentContainer}>
                <img src={require("../assets/images/notebook-1587525_1920.jpg")} alt="notebook" />
                <p className={styles.contentText}>
                    While it does not provide the complexities and intricacies of other 
                    note-taking applications, we believe that keeping it simple for your 
                    foundation it’s the best.
                </p>
            </div>
            <div className={styles.contentContainer}>
                <p className={styles.contentText}>
                    We know that for any project, collaboration is valued above all else. 
                    Therefore, we focused on incorporating features that would make it easier 
                    for those working in teams.
                </p>
                <img src={require("../assets/images/startup-593341_1920.jpg")} alt="startup" />
            </div>
        </div>
    )
}