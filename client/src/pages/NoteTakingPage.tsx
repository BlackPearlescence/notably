import { HiOutlineDocumentAdd, HiOutlineFolder, HiOutlineFolderAdd, HiOutlineUserAdd, HiOutlineUserCircle, HiOutlineViewGrid, HiViewList } from "react-icons/hi";
import { FolderIcon } from "../components/notes/FolderIcon";
import { NoteCard } from "../components/notes/NoteCard";
import styles from "./NoteTakingPage.module.scss";
import { useEffect, useState } from "react";
import { TiSortAlphabeticallyOutline } from "react-icons/ti";
import { useMediaQuery } from "react-responsive";
import { screenSizes } from "../screenSizes";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getNotes, selectNote, selectNotes, selectSelectedNote, showNoteModal, toEditMode } from "../store/slices/noteSlice";
import { getProject, selectSelectedProject } from "../store/slices/projectSlice";
import { current } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";

export const NoteTakingPage = () => {
    const [isColorView, setIsColorView] = useState<boolean>(false);
    const [iconSize, setIconSize] = useState(35);
    const isDesktop = useMediaQuery({ minWidth: screenSizes.desktopMinimum });
    const isTablet = useMediaQuery({ minWidth: screenSizes.tabletMinimum, maxWidth: screenSizes.tabletMaximum});
    const isMobile = useMediaQuery({ maxWidth: screenSizes.mobileMaximum });
    const dispatch = useAppDispatch();
    const notesState = useAppSelector(selectNotes)
    const currentProjectState = useAppSelector(selectSelectedProject)
    const { projectId } = useParams();
    
    useEffect(() => {
        console.log(projectId)
        if(projectId) {
            dispatch(getProject(parseInt(projectId)))
            dispatch(getNotes(parseInt(projectId)))
        } 
    },[])

    useEffect(() => {
            if(isDesktop) {
                setIconSize(35);
            } else if(isTablet) {
                setIconSize(30);
            } else if(isMobile) {
                setIconSize(25);
            }                
    },[window.innerWidth, window.outerWidth])

    const handleViewChange = () => {
        setIsColorView(!isColorView);
    }

    if(!currentProjectState){
        return <div>Loading...</div>
    }

    const handleAddNote = () => {
        dispatch(toEditMode())
        dispatch(showNoteModal())
        dispatch(selectNote({
            title: "",
            content: "",
            color: "#ffffff"
        }))
    }

    return (
        <div className={styles.notePageWrapper}>
            {/* {isDesktop && (<div className={styles.foldersContainer}>
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
            </div>)} */}

            <div className={styles.noteSearchContainer}>
                <input type="text" placeholder="Search notes..." maxLength={50} />
            </div>

            <div className={styles.notesContainer}>
                {notesState ? notesState.map((note: any) => <NoteCard key={note.id} note={note} />) : <div>No notes</div>}
            </div>

            <div className={styles.optionsContainer}>
                <div className={styles.optionSidebar}>
                    {/* {(isTablet || isMobile) && (
                        <div>
                            <HiOutlineFolder size={iconSize} color="010C80"/>
                        </div>
                    )} */}
                    <div>
                        <HiOutlineDocumentAdd size={iconSize} color="010C80" onClick={handleAddNote}/>
                    </div>
                    {/* <div>
                        <HiOutlineFolderAdd size={iconSize} color="010C80"/>
                    </div> */}
                    <div>
                        <HiOutlineUserAdd size={iconSize} color="010C80"/>
                    </div>
                    <div onClick={handleViewChange}>
                        {isColorView ? <HiOutlineViewGrid size={iconSize} color="010C80" /> : <HiViewList size={iconSize} color="010C80" />}
                    </div>
                    <div>
                        <HiOutlineUserCircle size={iconSize} color="010C80"/>
                    </div>
                    <div>
                        <TiSortAlphabeticallyOutline size={iconSize} color="010C80"/>
                    </div>
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