import { Modal } from "react-bootstrap";
import React, { FC, useEffect, useState } from "react";
import styles from "./DeleteConfirmProjectModal.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteProject, hideDeleteProjectModal, selectIsDeleteProjectModalShown, selectSelectedProject } from "../../store/slices/projectSlice";

export const DeleteConfirmProjectModal: FC = () => {
    const [doesProjectNameMatch, setDoesProjectNameMatch] = useState(false);
    const [projectName, setProjectName] = useState("");
    const deleteConfirmProjectModalState = useAppSelector(selectIsDeleteProjectModalShown)
    const dispatch = useAppDispatch()
    const selectedProjectState = useAppSelector(selectSelectedProject)

    useEffect(() => {
        if(selectedProjectState !== null && projectName === selectedProjectState.title) {
            setDoesProjectNameMatch(true)
        } else {
            setDoesProjectNameMatch(false)
        }
    },[projectName])

    const handleDeleteProjectHide = () => {
        dispatch(hideDeleteProjectModal())
        setProjectName("")
    }

    const handleDeleteProject = () => {
        dispatch(deleteProject(selectedProjectState.id))
        dispatch(hideDeleteProjectModal())
        setProjectName("")
    }

    return(
        <Modal show={deleteConfirmProjectModalState} onHide={handleDeleteProjectHide} centered>
            <Modal.Header closeButton>
                <h3>Delete Project</h3>
            </Modal.Header>
            <Modal.Body>
                <div className={styles.deleteProjectContainer}>
                    <h5>Type project name to enable delete.</h5>
                    <span>"{selectedProjectState && selectedProjectState.title}"</span>
                    <input
                    className={styles.projectNameInput}
                    type="text" 
                    placeholder="Project Title" 
                    maxLength={50} 
                    onChange={(e) => setProjectName(e.target.value)}
                    value={projectName}/>
                    <button 
                    className={doesProjectNameMatch ? styles.deleteBtn : styles.deleteBtnDisabled} 
                    disabled={doesProjectNameMatch ? false : true}
                    onClick={handleDeleteProject}>Delete</button>
                </div>
            </Modal.Body>
        </Modal>
    )
}