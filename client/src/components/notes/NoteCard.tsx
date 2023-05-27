import { FC, useState } from "react";
import styles from "./NoteCard.module.scss";
import { NoteBottomBar } from "./NoteBottomBar";
import parse from 'html-react-parser';


interface NoteCardProps {
    note: any;
}
export const NoteCard: FC<NoteCardProps> = ({ note }) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    return (
        <div 
        className={styles.noteCardContainer}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
            <div className={styles.noteInfoContainer}>
                <h6>{note.title}</h6>
                <p>{parse(note.content)}</p>
            </div>
            {isHovered && <NoteBottomBar isHovered={isHovered}/>}
        </div>
    )
}