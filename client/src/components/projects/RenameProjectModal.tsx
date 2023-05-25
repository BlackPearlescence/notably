import { Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { hideEditProjectModal, selectIsEditProjectModalShown, selectSelectedProject, updateProject } from "../../store/slices/projectSlice";
import styles from "./NewEditProjectModal.module.scss";
import React, { FormEvent } from "react";


export const RenameProjectModal: React.FC = () => {

    const projectEditModalShowState = useAppSelector(selectIsEditProjectModalShown)
    const projectState = useAppSelector(selectSelectedProject)
    const dispatch = useAppDispatch()
    const [projectTitle, setProjectTitle] = React.useState<string>("")

    const handleProjectTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProjectTitle(e.target.value)
    }

    const handleProjectRenameSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const updatedProject = {
            ...projectState,
            title: projectTitle
        }
        dispatch(updateProject(updatedProject))
    }
    return (
        <Modal show={projectEditModalShowState} onHide={() => dispatch(hideEditProjectModal())} fluid centered>
            <Modal.Header closeButton>
                <Modal.Title><h2>Rename Project</h2></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleProjectRenameSubmit}>
                    <input type="text" placeholder="Project Title" maxLength={50} onChange={handleProjectTitleChange} value={projectTitle} />
                    <div className={styles.createControls}>
                        <button className={styles.createBtn} type="submit">Rename</button>
                        <button className={styles.cancelBtn} onClick={() => dispatch(hideEditProjectModal())} type="button">Cancel</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}