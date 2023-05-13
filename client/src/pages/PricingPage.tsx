
import styles from "./PricingPage.module.scss";

export const PricingPage = () => {

    return (
        <div className={styles.pricingContainer}>
            <h2>Pricing</h2>
            <div>
                <div className={styles.pricingChoice}>
                    <h3>Monthly</h3>
                </div>
                <div className={styles.pricingChoice}>
                    <h3>Yearly</h3>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}