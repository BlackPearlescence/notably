import { FeatureCard } from '../components/features/FeatureCard';
import styles from './FeaturePage.module.scss';
import { HiOutlinePencilSquare, HiOutlineFolder, HiOutlineUsers, HiOutlinePencil, HiOutlineChatBubbleLeftEllipsis } from 'react-icons/hi2';
import { HiOutlineDatabase } from 'react-icons/hi';

export const FeaturePage: React.FC = () => {

    return (
        <div className={styles.featurePageContainer}>
            <h1>What does Notably have to offer?</h1>
            <h2>Simplicity</h2>
            <div className={styles.cardListContainer}>
                <FeatureCard
                title="Write"
                points={[
                    "Easily create notes",
                    "Set different colors",
                ]}>
                    <HiOutlinePencilSquare size={100}
                    color="010C80" />
                </FeatureCard>
                <FeatureCard
                title="Organize"
                points={[
                    "Create folders to arrange notes",
                    "Sort existing notes",
                ]}>
                    <HiOutlineFolder size={100}
                    color="010C80" />
                </FeatureCard>
                <FeatureCard
                title="Storage"
                points={[
                    "Snapshot history for all notes",
                    "Sort existing notes",
                ]}>
                    <HiOutlineDatabase size={100}
                    color="010C80" />
                </FeatureCard>
            </div>
            <h2>Collaboration</h2>
            <div className={styles.cardListContainer}>
            <FeatureCard
                title="Team-Oriented"
                points={[
                    "Invite people to the same project",
                    "Manage access rights",
                ]}>
                    <HiOutlineUsers size={100}
                    color="010C80" />
                </FeatureCard>
                <FeatureCard
                title="Annotate"
                points={[
                    "Write comments",
                    "Add suggestions to text",
                ]}>
                    <HiOutlinePencil size={100}
                    color="010C80" />
                </FeatureCard>
                <FeatureCard
                title="Communicate"
                points={[
                    "Chat with team members in real-time",
                    "Reference notes in chat",
                ]}>
                    <HiOutlineChatBubbleLeftEllipsis size={100}
                    color="010C80" />
                </FeatureCard>
            </div>
        </div>
    )
}