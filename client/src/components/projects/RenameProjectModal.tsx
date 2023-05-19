import { Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { hideEditProjectModal, selectIsEditProjectModalShown } from "../../store/slices/projectSlice";
import styles from "./NewEditProjectModal.module.scss";
import React, { FormEvent } from "react";


export const RenameProjectModal: React.FC = () => {

    const projectEditModalShowState = useAppSelector(selectIsEditProjectModalShown)
    const dispatch = useAppDispatch()

    const handleProjectRenameSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
    return (
        <Modal show={projectEditModalShowState} onHide={() => dispatch(hideEditProjectModal())} fluid centered>
            <Modal.Header closeButton>
                <Modal.Title><h2>Rename Project</h2></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleProjectRenameSubmit}>
                    <input type="text" placeholder="Project Title" maxLength={70} />
                    <div className={styles.createControls}>
                        <button className={styles.createBtn} type="submit">Rename</button>
                        <button className={styles.cancelBtn} onClick={() => dispatch(hideEditProjectModal())} type="button">Cancel</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}