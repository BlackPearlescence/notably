import { FC, useState } from "react";
import styles from "./NoteCard.module.scss";
import { NoteBottomBar } from "./NoteBottomBar";

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
                <h6>Insanely Long Note Card Title Yeah Whatever Whatever Whatever!</h6>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                    Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
                </p>
            </div>
            {isHovered && <NoteBottomBar isHovered={isHovered}/>}
        </div>
    )
}