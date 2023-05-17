
import { useState } from "react";
import styles from "./PricingPage.module.scss";
import { SubscriptionCard } from "../components/pricing/SubscriptionCard";
import { screenSizes } from "../screenSizes";
import { useMediaQuery } from "react-responsive";

export const PricingPage = () => {
    const [subscriptionType, setSubscriptionType] = useState<"monthly" | "yearly">("monthly");
    const [tierType, setTierType] = useState<"free" | "startup" | "enterprise">("free");

    const isDesktop = useMediaQuery({ minWidth: screenSizes.desktopMinimum });
    const isTablet = useMediaQuery({ minWidth: screenSizes.tabletMinimum, maxWidth: screenSizes.tabletMaximum});
    const isMobile = useMediaQuery({ maxWidth: screenSizes.mobileMaximum });

    const handleSubscriptionTypeChange = (type: "monthly" | "yearly") => {
        setSubscriptionType(type);
    }

    const handleTierTypeChange = (type: "free" | "startup" | "enterprise") => {
        setTierType(type);
    }

    return (
        <div className={styles.pricingContainer}>
            <h2>Pricing</h2>
            <div className={styles.subOptionsContainer}>
                <div className={styles.timeFrameOptions}>
                    <div  className={subscriptionType === "monthly" ? styles.pricingChoiceActive : styles.pricingChoice}>
                        <h3 onClick={() => handleSubscriptionTypeChange("monthly")}>Monthly</h3>
                    </div>
                    <div className={subscriptionType === "yearly" ? styles.pricingChoiceActive : styles.pricingChoice}>
                        <h3 onClick={() => handleSubscriptionTypeChange("yearly")}>Yearly</h3>
                    </div>
                </div>
                
                {isTablet && (
                <> {subscriptionType === "monthly" && (
                    <>
                        <div className={styles.smallPricingOptions}>
                            <div onClick={() => handleTierTypeChange("free")} className={tierType === "free" ? styles.smallPlanContainerActive : styles.smallPlanContainer}>
                                <h6>Free</h6>
                                <span>$0</span>
                            </div>
                            <div onClick={() => handleTierTypeChange("startup")} className={tierType === "startup" ? styles.smallPlanContainerActive : styles.smallPlanContainer}>
                                <h6>Startup</h6>
                                <span>Free Trial</span>
                                <span>$5</span>
                            </div>
                            <div onClick={() => handleTierTypeChange("enterprise")} className={tierType === "enterprise" ? styles.smallPlanContainerActive : styles.smallPlanContainer}>
                                <h6>Enterprise</h6>
                                <span>$15</span>
                            </div>
                        </div>
                    </>
                )}
                {subscriptionType === "yearly" && (
                    <>
                        <div className={styles.smallPricingOptions}>
                            <div onClick={() => handleTierTypeChange("free")} className={tierType === "free" ? styles.smallPlanContainerActive : styles.smallPlanContainer}>
                                <h6>Free</h6>
                                <span>$0</span>
                            </div>
                            <div onClick={() => handleTierTypeChange("startup")} className={tierType === "startup" ? styles.smallPlanContainerActive : styles.smallPlanContainer}>
                                <h6>Startup</h6>
                                <span>Free Trial</span>
                                <span>$50</span>
                            </div>
                            <div onClick={() => handleTierTypeChange("enterprise")} className={tierType === "enterprise" ? styles.smallPlanContainerActive : styles.smallPlanContainer}>
                                <h6>Enterprise</h6>
                                <span>$160</span>
                            </div>
                        </div>
                    </>   
                )}
                </>)}
            </div>
            {isDesktop && (<>{subscriptionType === "monthly" && 
            <>
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
            </>}
            {subscriptionType === "yearly" && 
            <>
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
                    price={50}
                    discount={10}
                    subType={subscriptionType}
                    trial={true}
                    features={["Ideal for small/startup companies", "Unlimited note boards", "Unlimited notes", "Invite up to 8 collaborators"]}
                    />
                    <SubscriptionCard
                    title="Enterprise"
                    price={160}
                    discount={20}
                    subType={subscriptionType}
                    trial={false}
                    features={["Ideal for enterprise-level environments", "Unlimited note boards", "Unlimited notes", "Unlimited collaborators", "Note snapshots"]}
                    />
                </div>
            </>}</>)
            }
            {isTablet && (<>{subscriptionType === "monthly" &&
            <>
                <div className={styles.subsContainer}>
                    {tierType === "free" && <SubscriptionCard 
                    title="Free"
                    price={0}
                    subType={subscriptionType}
                    trial={false}
                    features={["For personal-use", "Create up to 2 note boards", "Create up to 20 notes per note board"]}
                    />}
                    {tierType === "startup" && <SubscriptionCard
                    title="Startup"
                    price={5}
                    subType={subscriptionType}
                    trial={true}
                    features={["Ideal for small/startup companies", "Unlimited note boards", "Unlimited notes", "Invite up to 8 collaborators"]}
                    />}
                    {tierType === "enterprise" && <SubscriptionCard
                    title="Enterprise"
                    price={15}
                    subType={subscriptionType}
                    trial={false}
                    features={["Ideal for enterprise-level environments", "Unlimited note boards", "Unlimited notes", "Unlimited collaborators", "Note snapshots"]}
                    />}
                </div>
            </>
            }
            {subscriptionType === "yearly" &&
            <>
                <div className={styles.subsContainer}>
                    {tierType === "free" && <SubscriptionCard 
                    title="Free"
                    price={0}
                    subType={subscriptionType}
                    trial={false}
                    features={["For personal-use", "Create up to 2 note boards", "Create up to 20 notes per note board"]}
                    />}
                    {tierType === "startup" && <SubscriptionCard
                    title="Startup"
                    price={50}
                    discount={10}
                    subType={subscriptionType}
                    trial={true}
                    features={["Ideal for small/startup companies", "Unlimited note boards", "Unlimited notes", "Invite up to 8 collaborators"]}
                    />}
                    {tierType === "enterprise" && <SubscriptionCard
                    title="Enterprise"
                    price={160}
                    discount={20}
                    subType={subscriptionType}
                    trial={false}
                    features={["Ideal for enterprise-level environments", "Unlimited note boards", "Unlimited notes", "Unlimited collaborators", "Note snapshots"]}
                    />}
                </div>
            </>
            }</>)}
            {isMobile && (<>{subscriptionType === "monthly" &&
            <>
                <div className={styles.subsContainer}>
                </div>
            </>
            }
            {subscriptionType === "yearly" &&
            <>
                <div className={styles.subsContainer}>
                </div>
            </>
            }</>)}
        </div>
    )
}