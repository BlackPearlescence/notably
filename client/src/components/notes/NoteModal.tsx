import { FC, useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { createNote, getNotes, hideNoteModal, selectIsEdit, selectIsEditNoteModalShown, selectIsNewNote, selectIsNoteModalShown, selectSelectedNote, showColorModal, updateNote } from "../../store/slices/noteSlice"
import ReactQuill from "react-quill";
import styles from "./NoteModal.module.scss"
import { MdOutlineColorLens } from "react-icons/md";
import { AiFillSave } from "react-icons/ai";
    import parse from 'html-react-parser';
import { HiOutlinePencil } from "react-icons/hi";
import { ColorPickerDropdown } from "./ColorPickerDropdown";
import { Color } from "../../constants/colors";
import { selectSelectedProject } from "../../store/slices/projectSlice";
import { useParams } from "react-router-dom";



export const NoteModal: FC = () => {

    const { projectId } = useParams<{projectId: string}>()
    const noteModalShownState = useAppSelector(selectIsNoteModalShown)
    const currentProjectState = useAppSelector(selectSelectedProject)
    const currentNoteState = useAppSelector(selectSelectedNote)
    const isEditModeState = useAppSelector(selectIsEdit)
    const isNewNoteState = useAppSelector(selectIsNewNote)
    const dispatch = useAppDispatch()
    const [noteValue, setNoteValue] = useState<string>("");
    const [noteTitle, setNoteTitle] = useState<string>("");
    const [isEditingMode, setIsEditingMode] = useState<boolean>(true);
    const [colorPickerShown, setColorPickerShown] = useState<boolean>(false);
    const [color, setColor] = useState<string>("#ffffff");
    const [colorStyle, setColorStyle] = useState<string>("");
    const [isNewNote, setIsNewNote] = useState<boolean>(true)

    useEffect(() => {
        if(currentNoteState) {
            setNoteValue(currentNoteState.content)
            setNoteTitle(currentNoteState.title)
            setColor(currentNoteState.color)
        }
        setIsEditingMode(isEditModeState)
        setIsNewNote(isNewNoteState)
    },[currentNoteState])
    useEffect(() => {
        console.log(projectId)
        switch(color) {
            case Color.WHITE:
                setColorStyle(styles.customModalWhite)
                break;
            case Color.LIGHTBLUE:
                setColorStyle(styles.customModalLightBlue)
                break;
            case Color.BABYPINK:
                setColorStyle(styles.customModalBabyPink)
                break;
            case Color.LAVENDER:
                setColorStyle(styles.customModalLavender)
                break;
            case Color.MINTGREEN:
                setColorStyle(styles.customModalMintGreen)
                break;
            case Color.PALEGREEN:
                setColorStyle(styles.customModalPaleGreen)
                break;
            case Color.LEMONCHIFFON:
                setColorStyle(styles.customModalLemonChiffon)
                break;
            case Color.PEACHPUFF:
                setColorStyle(styles.customModalPeachPuff)
                break;
            case Color.LIGHTCORAL:
                setColorStyle(styles.customModalLightCoral)
                break;
            case Color.THISTLE:
                setColorStyle(styles.customModalThistle)
                break;
            default:
                setColorStyle(styles.customModalWhite)
                break;
        }
    },[color])

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
        console.log(projectId)
        console.log(currentNoteState)
        if(isNewNote) {
            dispatch(createNote({
                title: noteTitle,
                content: noteValue,
                color: color,
                projectId: currentProjectState.id
            }))
        } else {
            dispatch(updateNote({
                id: currentNoteState.id,
                title: noteTitle,
                content: noteValue,
                color: color,
                projectId: currentProjectState.id
            }))
        }
        
        dispatch(hideNoteModal())
    }

    const handleShowColorModal = () => {
        dispatch(showColorModal())
    }

    const handleColorClick = (e: any) => {
        console.log(e)
        // setColor(e)
    }

    const handleColorClickOutside = (e: React.FocusEvent<HTMLDivElement>) => {
        if(e.currentTarget.contains(e.relatedTarget)) {
            return
        }
        setColorPickerShown(false)
    }


    return (
        <Modal show={noteModalShownState} onHide={() => dispatch(hideNoteModal())} centered size="lg">
            <Modal.Body className={colorStyle}>
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
                                tabIndex={0}/>
                                {colorPickerShown && (<ColorPickerDropdown color={color} setColor={setColor} />)}
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