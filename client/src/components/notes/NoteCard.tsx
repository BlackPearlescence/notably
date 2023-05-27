import { FC, useState } from "react";
import styles from "./NoteCard.module.scss";
import { NoteBottomBar } from "./NoteBottomBar";
import parse from 'html-react-parser';
import { useAppDispatch } from "../../store/hooks";
import { selectNote } from "../../store/slices/noteSlice";


interface NoteCardProps {
    note: any;
}
export const NoteCard: FC<NoteCardProps> = ({ note }) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const dispatch = useAppDispatch()

    const handleMouseEnter = () => {
        setIsHovered(true)
        dispatch(selectNote(note))
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }
    return (
        <div 
        className={styles.noteCardContainer}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{backgroundColor: note.color}}
        >
            <div className={styles.noteInfoContainer}>
                <h6>{note.title}</h6>
                <p>{parse(note.content)}</p>
            </div>
            {isHovered && <NoteBottomBar isHovered={isHovered}/>}
        </div>
    )
}