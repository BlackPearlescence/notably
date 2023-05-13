
import { useState } from "react";
import styles from "./PricingPage.module.scss";

export const PricingPage = () => {
    const [subscriptionType, setSubscriptionType] = useState<"monthly" | "yearly">("monthly");

    const handleSubscriptionTypeChange = (type: "monthly" | "yearly") => {
        setSubscriptionType(type);
    }
    return (
        <div className={styles.pricingContainer}>
            <h2>Pricing</h2>
            <div className={styles.subOptionsContainer}>
                <div  className={subscriptionType === "monthly" ? styles.pricingChoiceActive : styles.pricingChoice}>
                    <h3 onClick={() => handleSubscriptionTypeChange("monthly")}>Monthly</h3>
                </div>
                <div className={subscriptionType === "yearly" ? styles.pricingChoiceActive : styles.pricingChoice}>
                    <h3 onClick={() => handleSubscriptionTypeChange("yearly")}>Yearly</h3>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}