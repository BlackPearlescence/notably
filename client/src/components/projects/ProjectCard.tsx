import { Dropdown } from "react-bootstrap";
import styles from "./ProjectCard.module.scss";
import { HiMenu } from "react-icons/hi";
import { ProjectDropdown } from "./ProjectDropdown";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { selectProject } from "../../store/slices/projectSlice";

interface ProjectCardProps {
    project: any;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const navigate = useNavigate();
    const createdDate = new Date(project.createdAt)
    const updatedDate = new Date(project.updatedAt)
    const created =  createdDate.toLocaleDateString();
    const updated = updatedDate.toLocaleDateString();
    const dispatch = useAppDispatch();

    const handleProjectFocus = () => {
        dispatch(selectProject({
            id: project.id,
            title: project.title,
        }))
    }

    // const handleProjectNoFocus = () => {
    //     dispat
    // }
    return (
        <div 
        className={styles.projectCardContainer} 
        onDoubleClick={() => navigate("/notes")}
        onClick={handleProjectFocus}>
            <div className={styles.titleBar}>
                <h4>{project.title}</h4>
                <div className={styles.menuButton}>
                    <ProjectDropdown />
                </div>
            </div>
            <h5>500 Notes</h5>
            <h5>Created At: {created}</h5>
            <h5>Updated At: {updated}</h5>
        </div>
    )
}