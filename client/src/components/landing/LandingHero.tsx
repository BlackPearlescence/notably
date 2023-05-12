import styles from "./LandingHero.module.scss";

export const LandingHero = () => {

    return(
        <div className={styles.landingContainer}>            
            <div className={styles.landingHeroContainer}>

            </div>
            <div className={styles.landingMask}>
                <p>A simple, collaborative note-taking app designed with YOU in mind.</p>
                <div className={styles.landingCTA}>
                    <button>Try It!</button>
                    <button>Learn More</button>
                </div>
            </div>
        </div>
    )
}