
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
            {discount && <h6>Save ${discount}</h6>}
            <ul>
                {features.map(feature => <li>{feature}</li>)}
            </ul>
            {trial && <button>7-Day Free Trial</button>}
            {price === 0 ? <button>Go!</button> : <button>Buy "{title}"</button>}
        </div>
    )
}