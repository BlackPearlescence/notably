import { HiOutlineEye, HiOutlinePencil, HiTrash } from "react-icons/hi";
import styles from "./NoteBottomBar.module.scss";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { removeNote, selectSelectedNote, showNoteModal, toEditMode, toViewMode, updateExistingNote } from "../../store/slices/noteSlice";
import { selectSelectedProject } from "../../store/slices/projectSlice";

interface NoteBottomBarProps {
    isHovered: boolean;
}
export const NoteBottomBar: React.FC<NoteBottomBarProps> = ({ isHovered }) => {
    const dispatch = useAppDispatch();
    const currentProjectState = useAppSelector(selectSelectedProject);
    const currentNoteState = useAppSelector(selectSelectedNote);
    const handleNoteDelete = () => {
        dispatch(removeNote({
            projectId: currentProjectState.id,
            id: currentNoteState.id
        }))
    }

    const handleNoteView = () => {
        dispatch(toViewMode())
        dispatch(showNoteModal())
    }

    const handleNoteEdit = () => {
        dispatch(toEditMode())
        dispatch(updateExistingNote())
        dispatch(showNoteModal())
    }

    return (
        <div className={styles.toolbarContainer}>
            <div className={styles.toolButton} onClick={handleNoteView}>
                <HiOutlineEye />
            </div>
            <div className={styles.toolButton} onClick={handleNoteEdit}>
                <HiOutlinePencil />
            </div>
            <div className={styles.toolButton} onClick={handleNoteDelete}>
                <HiTrash />
            </div>
        </div>
    )
}