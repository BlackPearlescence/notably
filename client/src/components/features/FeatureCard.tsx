import styles from './FeatureCard.module.scss';

interface featureCardProps {
    title: string;
    points: string[];
    children: React.ReactNode;
}

export const FeatureCard: React.FC<featureCardProps>  = ({title, points, children}) => {

    return (
        <div className={styles.featureCardContainer}>
            {children}
            <h4>{title}</h4>
            <ul>
                {points.map(point => <li>{point}</li>)}
            </ul>
        </div>
    )
}