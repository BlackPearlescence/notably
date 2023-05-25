import { FC, useState } from "react"
import { Modal } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { hideNoteModal, selectIsEditNoteModalShown, selectIsNoteModalShown, showColorModal } from "../../store/slices/noteSlice"
import ReactQuill from "react-quill";
import styles from "./NoteModal.module.scss"
import { MdOutlineColorLens } from "react-icons/md";
import { AiFillSave } from "react-icons/ai";
import parse from 'html-react-parser';
import { HiOutlinePencil } from "react-icons/hi";
import { ColorPickerDropdown } from "./ColorPickerDropdown";


export const NoteModal: FC = () => {

    const noteModalShownState = useAppSelector(selectIsNoteModalShown)
    const dispatch = useAppDispatch()
    const [noteValue, setNoteValue] = useState<string>("");
    const [noteTitle, setNoteTitle] = useState<string>("");
    const [isEditingMode, setIsEditingMode] = useState<boolean>(true);
    const [colorPickerShown, setColorPickerShown] = useState<boolean>(false);

    const handleNoteValueChange = (e: string) => {
        console.log(e)
        setNoteValue(e)
    }
    
    const handleNoteTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        setNoteTitle(e.target.value)
    }

    const handleModeChange = (e: any) => {
        e.preventDefault()
        setIsEditingMode(!isEditingMode)
    }

    const handleNoteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(noteValue)
        console.log(noteTitle)
        dispatch(hideNoteModal())
    }

    const handleShowColorModal = () => {
        dispatch(showColorModal())
    }


    return (
        <Modal show={noteModalShownState} onHide={() => dispatch(hideNoteModal())} centered size="lg">
            <Modal.Body className={styles.customModal}>
            <form className={styles.noteForm} onSubmit={handleNoteSubmit}>
                <div className={styles.editHeader}>
                    {isEditingMode ? 
                    <input type="text" placeholder="Untitled Note..." maxLength={50} onChange={handleNoteTitleChange} value={noteTitle}/> 
                    :
                    <h2>{noteTitle}</h2>
                    }
                    <div className={styles.editToolbar}>
                        {isEditingMode && (
                            <div>
                                <MdOutlineColorLens 
                                onClick={() => setColorPickerShown(!colorPickerShown)}
                                onBlur={() => setColorPickerShown(false)}
                                tabIndex={0}/>
                                {colorPickerShown && (<ColorPickerDropdown />)}
                            </div>
                        )}
                        <div onClick={handleModeChange}>
                            {isEditingMode ? <AiFillSave /> : <HiOutlinePencil />} 
                        </div>
                    </div>          
                </div>
                {isEditingMode && <ReactQuill theme="snow" value={noteValue} onChange={handleNoteValueChange} style={{ width: "750px"}} /> }
                {!isEditingMode && (
                    <div className={styles.notePreview}>
                        {parse(noteValue)}
                    </div>  
                )}
                {isEditingMode ? (
                    <div className={styles.editControls}>
                        <button type="submit" >Save</button>
                        <button onClick={() => dispatch(hideNoteModal())}>Discard</button>
                    </div>
                ) : 
                    <div className={styles.viewControls}>
                        <button onClick={handleModeChange}>Edit</button>
                        <button onClick={() => dispatch(hideNoteModal())}>Close</button>
                    </div>
                }
                
            </form>
            </Modal.Body>
            
        </Modal>
    )
}