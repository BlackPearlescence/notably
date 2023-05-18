import React from "react";
import styles from "./ProjectPage.module.scss"; 
import { HiPlusCircle } from "react-icons/hi";
import { ProjectCard } from "../components/projects/ProjectCard";
import { useAppDispatch } from "../store/hooks";
import { showCreateProjectModal } from "../store/slices/projectSlice";

export const ProjectPage: React.FC = () => {

    const dispatch = useAppDispatch()

    return (
        <div className={styles.projectWrapper}>
            <div className={styles.createNewProjectBox} onClick={() => dispatch(showCreateProjectModal())}>
                <h3>Create a New Project</h3>
                <HiPlusCircle size={100} color="white"/>
            </div>
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
        </div>
    )
}