import { FC, useState } from "react"
import { Modal } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { hideCreateNoteModal, selectIsCreateNoteModalShown } from "../../store/slices/noteSlice"

export const CreateNoteModal: FC = () => {

    const createNoteModalShowState = useAppSelector(selectIsCreateNoteModalShown)
    const dispatch = useAppDispatch()
    const [noteForm, setNoteForm] = useState({
        title: "",
        content: ""
    })

    return (
        <Modal show={createNoteModalShowState} onHide={() => dispatch(hideCreateNoteModal())} centered>
            <form>
                <Modal.Header closeButton>
                    <input 
                    name="title" 
                    type="text" 
                    value={noteForm.title}
                    maxLength={50}
                    onChange={(e) => setNoteForm({...noteForm, [e.target.name]: e.target.value})} />
                </Modal.Header>
                <Modal.Body>
                </Modal.Body>
            </form>
        </Modal>
    )
}