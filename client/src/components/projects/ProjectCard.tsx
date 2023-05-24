import { Dropdown } from "react-bootstrap";
import styles from "./ProjectCard.module.scss";
import { HiMenu } from "react-icons/hi";
import { ProjectDropdown } from "./ProjectDropdown";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
    project: any;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.projectCardContainer} onClick={() => navigate("/notes")}>
            <div className={styles.titleBar}>
                <h4>{project.title}</h4>
                <div className={styles.menuButton}>
                    <ProjectDropdown />
                </div>
            </div>
            <h5>500 Notes</h5>
            <h5>Created At: {project.createdAt}</h5>
            <h5>Updated At: {project.updatedAt}</h5>
        </div>
    )
}