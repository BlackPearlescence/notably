import { HiOutlineDocumentAdd, HiOutlineFolderAdd, HiOutlineUserAdd, HiOutlineUserCircle, HiOutlineViewGrid, HiViewList } from "react-icons/hi";
import { FolderIcon } from "../components/notes/FolderIcon";
import { NoteCard } from "../components/notes/NoteCard";
import styles from "./NoteTakingPage.module.scss";
import { useState } from "react";
import { TiSortAlphabeticallyOutline } from "react-icons/ti";

export const NoteTakingPage = () => {
    const [isListView, setIsListView] = useState(false);

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
                    <HiOutlineDocumentAdd size={35} color="010C80"/>
                    <HiOutlineFolderAdd size={35} color="010C80"/>
                    <HiOutlineUserAdd size={35} color="010C80"/>
                    {isListView ? <HiOutlineViewGrid size={35} color="010C80" /> : <HiViewList size={35} color="010C80" />}
                    <HiOutlineUserCircle size={35} color="010C80"/>
                    <TiSortAlphabeticallyOutline size={35} color="010C80"/>
                </div>
                {/* <div className={styles.userSidebar}>
                    <img src="https://baconmockup.com/640/360" alt="user profile" />
                    <img src="https://baconmockup.com/640/360" alt="user profile" />
                    <img src="https://baconmockup.com/640/360" alt="user profile" />
                </div> */}
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