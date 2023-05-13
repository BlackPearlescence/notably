
import { useState } from "react";
import styles from "./PricingPage.module.scss";
import { SubscriptionCard } from "../components/pricing/SubscriptionCard";

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
            <div className={styles.subsContainer}>
                <SubscriptionCard 
                title="Free"
                price={0}
                subType={subscriptionType}
                trial={false}
                features={["For personal-use", "Create up to 2 note boards", "Create up to 20 notes per note board"]}
                />
                <SubscriptionCard
                title="Startup"
                price={5}
                subType={subscriptionType}
                trial={true}
                features={["Ideal for small/startup companies", "Unlimited note boards", "Unlimited notes", "Invite up to 8 collaborators"]}
                />
                <SubscriptionCard
                title="Enterprise"
                price={15}
                subType={subscriptionType}
                trial={false}
                features={["Ideal for enterprise-level environments", "Unlimited note boards", "Unlimited notes", "Unlimited collaborators", "Note snapshots"]}
                 />
            </div>
        </div>
    )
}