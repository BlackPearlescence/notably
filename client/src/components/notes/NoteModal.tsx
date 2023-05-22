import { FC, useState } from "react"
import { Modal } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { hideNoteModal, selectIsEditNoteModalShown, selectIsNoteModalShown } from "../../store/slices/noteSlice"
import ReactQuill from "react-quill";
import styles from "./NoteModal.module.scss"
import { MdOutlineColorLens } from "react-icons/md";
import { AiFillSave } from "react-icons/ai";
import parse from 'html-react-parser';


export const NoteModal: FC = () => {

    const noteModalShownState = useAppSelector(selectIsNoteModalShown)
    const dispatch = useAppDispatch()
    const [noteValue, setNoteValue] = useState<string>("");
    const [noteTitle, setNoteTitle] = useState<string>("");
    const [isEditingMode, setIsEditingMode] = useState<boolean>(true);

    const handleNoteValueChange = (e: string) => {
        console.log(e)
        setNoteValue(e)
    }
    
    const handleNoteTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        setNoteTitle(e.target.value)
    }


    return (
        <Modal show={noteModalShownState} onHide={() => dispatch(hideNoteModal())} centered size="lg">
            <Modal.Body className={styles.customModal}>
            <form className={styles.noteForm}>
                <div className={styles.editHeader}>
                    <input type="text" placeholder="Untitled Note..." maxLength={50} onChange={handleNoteTitleChange} value={noteTitle}/>
                    <div className={styles.editToolbar}>
                        <div>
                            <MdOutlineColorLens />
                        </div>
                        <div>
                            <AiFillSave />
                        </div>
                    </div>
                </div>
                {isEditingMode && <ReactQuill theme="snow" value={noteValue} onChange={handleNoteValueChange} style={{ width: "750px"}} /> }
                {!isEditingMode && (
                    <div className={styles.notePreview}>
                        {parse(noteValue)}
                    </div>
                )}
                <div className={styles.editControls}>
                    <button type="submit" >Save</button>
                    <button>Discard</button>
                </div>
            </form>
            </Modal.Body>
            
        </Modal>
    )
}