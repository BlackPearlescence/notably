
import styles from "./SubscriptionCard.module.scss";

interface SubscriptionCardProps {
    title: string;
    price: number;
    subType: "monthly" | "yearly";
    discount?: number
    trial: boolean;
    features: string[];
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ title, price, subType, discount, features, trial }) => {

    return (
        <div className={styles.subscriptionCardContainer}>
            <h3>{title}</h3>
            <h4>${subType === "monthly" ? `${price}/mo` : `${price}/yr`}</h4>
            {discount && <span>Save ${discount}</span>}
            <ul>
                {features.map(feature => <li>{feature}</li>)}
            </ul>
            {trial && <button>7-Day Free Trial</button>}
            <button>Buy "{title}"</button>
        </div>
    )
}