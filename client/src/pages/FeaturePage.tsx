import { FeatureCard } from '../components/features/FeatureCard';
import styles from './FeaturePage.module.scss';
import { HiOutlinePencilSquare, HiOutlineFolder, HiOutlineUsers, HiOutlinePencil, HiOutlineChatBubbleLeftEllipsis } from 'react-icons/hi2';
import { HiOutlineDatabase } from 'react-icons/hi';

export const FeaturePage: React.FC = () => {

    return (
        <div>
            <h1>What does Notably have to offer?</h1>
            <h2>Simplicity</h2>
            <div className={styles.cardListContainer}>
                <FeatureCard
                title="Write"
                points={[
                    "Easily create notes",
                    "Set different colors",
                ]}>
                    <HiOutlinePencilSquare size={50} />
                </FeatureCard>
                <FeatureCard
                title="Organize"
                points={[
                    "Create folders to arrange notes",
                    "Sort existing notes",
                ]}>
                    <HiOutlineFolder size={50} />
                </FeatureCard>
                <FeatureCard
                title="Organize"
                points={[
                    "Create folders to arrange notes",
                    "Sort existing notes",
                ]}>
                    <HiOutlineFolder size={50} />
                </FeatureCard>
            </div>
            <h2>Collaboration</h2>
            <div className={styles.cardListContainer}>
            <FeatureCard
                title="Organize"
                points={[
                    "Create folders to arrange notes",
                    "Sort existing notes",
                ]}>
                    <HiOutlineFolder size={50} />
                </FeatureCard>
                <FeatureCard
                title="Organize"
                points={[
                    "Create folders to arrange notes",
                    "Sort existing notes",
                ]}>
                    <HiOutlineFolder size={50} />
                </FeatureCard>
                <FeatureCard
                title="Organize"
                points={[
                    "Create folders to arrange notes",
                    "Sort existing notes",
                ]}>
                    <HiOutlineFolder size={50} />
                </FeatureCard>
            </div>
        </div>
    )
}