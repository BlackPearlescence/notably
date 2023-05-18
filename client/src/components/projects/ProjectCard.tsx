import styles from "./ProjectCard.module.scss";
import { SlOptions } from "react-icons/sl";

interface ProjectCardProps {
    project?: object;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {

    return (
        <div className={styles.projectCardContainer}>
            <div className={styles.titleBar}>
                <h4>Unusually Long Project Title</h4>
                <SlOptions />
            </div>
            <h5>500 Notes</h5>
            <h5>Created At: 05/18/2000</h5>
            <h5>Updated At: 05/18/2000</h5>
        </div>
    )
}