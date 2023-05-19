import { FC } from "react";
import styles from "./NoteCard.module.scss";

export const NoteCard: FC = () => {
    return (
        <div className={styles.noteCardContainer}>
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
    )
}