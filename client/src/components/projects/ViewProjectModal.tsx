import { Modal } from "react-bootstrap";
import styles from "./ViewProjectModal.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { hideViewProjectModal, selectIsViewProjectModalShown, selectSelectedProject } from "../../store/slices/projectSlice";
import { useEffect } from "react";

export const ViewProjectModal: React.FC = () => {

    const selectViewProjectModalState = useAppSelector(selectIsViewProjectModalShown)
    const selectedProjectState = useAppSelector(selectSelectedProject)
    const dispatch = useAppDispatch()

    if(!selectedProjectState){
        return <div>Loading...</div>
    }
    return(
        <Modal show={selectViewProjectModalState} onHide={() => dispatch(hideViewProjectModal())} centered>
            <Modal.Header closeButton><h4>Blah</h4></Modal.Header>
            <Modal.Body>
                <div className={styles.infoContainer}>
                    <h5>{(selectedProjectState && selectedProjectState.notes) ? selectedProjectState.notes.length : 0} Notes</h5>
                    <h5>Created At: {selectedProjectState.createdAt}</h5>
                    <h5>Updated At: {selectedProjectState.updatedAt}</h5>
                </div>
            </Modal.Body>
        </Modal>
    )
}