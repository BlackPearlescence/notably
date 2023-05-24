import React, { useEffect } from "react";
import styles from "./ProjectPage.module.scss"; 
import { HiPlusCircle } from "react-icons/hi";
import { ProjectCard } from "../components/projects/ProjectCard";
import { useAppDispatch } from "../store/hooks";
import { getProjects, showCreateProjectModal } from "../store/slices/projectSlice";
import { useNavigate } from "react-router-dom";

export const ProjectPage: React.FC = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProjects())
    },[])

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