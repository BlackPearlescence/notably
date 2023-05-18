import React from "react";
import styles from "./ProjectPage.module.scss"; 
import { HiPlusCircle } from "react-icons/hi";
import { ProjectCard } from "../components/projects/ProjectCard";

export const ProjectPage: React.FC = () => {

    return (
        <div className={styles.projectWrapper}>
            <div className={styles.createNewProjectBox}>
                <h3>Create a New Project</h3>
                <HiPlusCircle size={100} color="white"/>
            </div>
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
        </div>
    )
}