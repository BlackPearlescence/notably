import { Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addProject, hideCreateProjectModal, selectIsCreateProjectModalShown } from "../../store/slices/projectSlice";
import styles from "./NewEditProjectModal.module.scss";
import React, { FormEvent, useState } from "react";

export const NewProjectModal = () => {
    const newProjectModalShowState = useAppSelector(selectIsCreateProjectModalShown)
    const dispatch = useAppDispatch()
    const [projectTitle, setProjectTitle] = useState<string>("")

    const handleProjectSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(addProject(projectTitle))
        setProjectTitle("")
        dispatch(hideCreateProjectModal())
    }

    const handleProjectTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProjectTitle(e.target.value)
    }

    return (
        <Modal show={newProjectModalShowState} onHide={() => dispatch(hideCreateProjectModal())} fluid centered>
            <Modal.Header closeButton>
                <Modal.Title><h2>New Project</h2></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleProjectSubmit}>
                    <input 
                    type="text" 
                    placeholder="Project Title" 
                    maxLength={50}
                    onChange={handleProjectTitleChange}
                    value={projectTitle}/>
                    <div className={styles.createControls}>
                        <button className={styles.createBtn} type="submit">Create</button>
                        <button className={styles.cancelBtn} onClick={() => dispatch(hideCreateProjectModal())} type="button">Cancel</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}