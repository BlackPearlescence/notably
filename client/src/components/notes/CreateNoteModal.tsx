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
        <Modal show={createNoteModalShowState} onHide={() => dispatch(hideCreateNoteModal())} centered size="lg">
            <form>
                <input type="text" />
                <ReactQuill theme="snow" value={value} onChange={setValue} style={{ width: "750px"}} />
                <button type="submit" >Save</button>
                <button>Close</button>
            </form>
        </Modal>
    )
}