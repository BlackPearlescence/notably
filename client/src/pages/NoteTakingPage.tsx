import { FolderIcon } from "../components/notes/FolderIcon";
import { NoteCard } from "../components/notes/NoteCard";
import styles from "./NoteTakingPage.module.scss";

export const NoteTakingPage = () => {

    return (
        <div className={styles.notePageWrapper}>
            <div className={styles.foldersContainer}>
                <div className={styles.foldersBar}>
                    <div className={styles.folders}>
                        <FolderIcon />
                        <FolderIcon />
                        <FolderIcon />
                        <FolderIcon />
                        <FolderIcon />
                        <FolderIcon />
                        <FolderIcon />
                        <FolderIcon />
                        <FolderIcon />
                        <FolderIcon />
                        <FolderIcon />
                    </div>
                    <input type="text" placeholder="Search folders..." maxLength={50} />
                </div>
            </div>

            <div className={styles.noteSearchContainer}>
                <input type="text" placeholder="Search notes..." maxLength={50} />
            </div>

            <div className={styles.notesContainer}>
                <NoteCard />
                <NoteCard />
                <NoteCard />
                <NoteCard />
                <NoteCard />
                <NoteCard />
                <NoteCard />
                <NoteCard />
                <NoteCard />
                <NoteCard />
                <NoteCard />
                <NoteCard />
                <NoteCard />
                <NoteCard />
                <NoteCard />
            </div>

            <div className={styles.optionsContainer}>
                <div className={styles.optionSidebar}>

                </div>
                <div className={styles.userSidebar}>
                    
                </div>
            </div>

            {/* <div className={styles.usersContainer}>
                <div className={styles.userSidebar}>
                    <img src="https://baconmockup.com/640/360" alt="user profile" />
                    <img src="https://baconmockup.com/640/360" alt="user profile" />
                    <img src="https://baconmockup.com/640/360" alt="user profile" />
                </div>
            </div> */}

        </div>
    )
}