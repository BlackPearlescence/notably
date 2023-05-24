import { Modal } from "react-bootstrap";
import styles from "./ViewProjectModal.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { hideViewProjectModal, selectIsViewProjectModalShown, selectSelectedProject } from "../../store/slices/projectSlice";

export const ViewProjectModal: React.FC = () => {

    const selectViewProjectModalState = useAppSelector(selectIsViewProjectModalShown)
    const selectedProjectState = useAppSelector(selectSelectedProject)
    const dispatch = useAppDispatch()
    return(
        <Modal show={selectViewProjectModalState} onHide={() => dispatch(hideViewProjectModal())} centered>
            <Modal.Header closeButton><h4>Blah</h4></Modal.Header>
            <Modal.Body>
                <div className={styles.infoContainer}>
                    <h5>{(selectedProjectState && selectedProjectState.notes) ? selectedProjectState.notes.length + "Notes" : 0} </h5>
                    <h5>Created At: 05/18/00</h5>
                    <h5>Updated At: 05/18/00</h5>
                </div>
            </Modal.Body>
        </Modal>
    )
}