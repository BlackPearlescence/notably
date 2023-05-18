import { Dropdown } from "react-bootstrap";
import styles from "./ProjectCard.module.scss";
import { HiMenu } from "react-icons/hi";
import { ProjectDropdown } from "./ProjectDropdown";

interface ProjectCardProps {
    project?: object;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {


    return (
        <div className={styles.projectCardContainer}>
            <div className={styles.titleBar}>
                <h4>Unusually Long Project Titlessssssssssssssssssssssssssss</h4>
                <div className={styles.menuButton}>
                    <ProjectDropdown />
                </div>
            </div>
            <h5>500 Notes</h5>
            <h5>Created At: 05/18/00</h5>
            <h5>Updated At: 05/18/00</h5>
        </div>
    )
}