import { Modal } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { hideCreateProjectModal, selectIsCreateProjectModalShown } from "../../store/slices/projectSlice"
import styles from "./NewProjectModal.module.scss"

export const NewProjectModal = () => {
    const newProjectModalShowState = useAppSelector(selectIsCreateProjectModalShown)
    const dispatch = useAppDispatch()

    const handleProjectSubmit = () => {

    }
    return (
        <Modal show={newProjectModalShowState} onHide={() => dispatch(hideCreateProjectModal())} centered>
            <Modal.Header closeButton>
                <Modal.Title><h2>New Project</h2></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleProjectSubmit}>
                    <input type="text" placeholder="Project Title" maxLength={70} />
                    <div className={styles.createControls}>
                        <button className={styles.createBtn} type="submit">Create</button>
                        <button className={styles.cancelBtn} onClick={() => dispatch(hideCreateProjectModal())} type="button">Cancel</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}