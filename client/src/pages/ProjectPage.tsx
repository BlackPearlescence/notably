import React, { useEffect } from "react";
import styles from "./ProjectPage.module.scss"; 
import { HiPlusCircle } from "react-icons/hi";
import { ProjectCard } from "../components/projects/ProjectCard";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getProjects, getSharedProjects, selectProjects, selectSharedProjects, showCreateProjectModal } from "../store/slices/projectSlice";
import { useNavigate } from "react-router-dom";
import { checkIfLoggedIn, selectIsLoggedIn, selectUserData, selectUserDataStatus } from "../store/slices/authSlice";


export const ProjectPage: React.FC = () => {


    const dispatch = useAppDispatch();
    const projectList = useAppSelector(selectProjects);
    const sharedProjectList = useAppSelector(selectSharedProjects);
    const userDataState = useAppSelector(selectUserData)
    const userDataStatusState = useAppSelector(selectUserDataStatus)
    const isLoggedInState = useAppSelector(selectIsLoggedIn)
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getProjects(userDataState.id))
        dispatch(getSharedProjects(userDataState.id))
    },[dispatch])

    

    if(!projectList) {
        return <div>Loading...</div>
    }

    return (
        <div className={styles.projectWrapper}>
            <div className={styles.createNewProjectBox} onClick={() => dispatch(showCreateProjectModal())}>
                <h3>Create a New Project</h3>
                <HiPlusCircle size={100} color="white"/>
            </div>
            {projectList && projectList.map(project => <ProjectCard key={project.id} project={project} /> )}
        </div>
    )
}