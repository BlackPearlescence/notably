import { FC, useState } from "react"
import { Modal } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { hideCreateNoteModal, selectIsCreateNoteModalShown } from "../../store/slices/noteSlice"
import ReactQuill from "react-quill";

export const CreateNoteModal: FC = () => {

    const createNoteModalShowState = useAppSelector(selectIsCreateNoteModalShown)
    const dispatch = useAppDispatch()
    const [noteForm, setNoteForm] = useState({
        title: "",
        content: ""
    })
    const [value, setValue] = useState<string>("");

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
                    <ReactQuill theme="snow" value={value} onChange={setValue} />
                </Modal.Body>
            </form>
        </Modal>
    )
}