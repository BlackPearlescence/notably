import { HiOutlineEye, HiOutlinePencil, HiTrash } from "react-icons/hi";
import styles from "./NoteBottomBar.module.scss";
import React from "react";

interface NoteBottomBarProps {
    isHovered: boolean;
}
export const NoteBottomBar: React.FC<NoteBottomBarProps> = ({ isHovered }) => {

    return (
        <div className={styles.toolbarContainer}>
            <div className={styles.toolButton}>
                <HiOutlineEye />
            </div>
            <div className={styles.toolButton}>
                <HiOutlinePencil />
            </div>
            <div className={styles.toolButton}>
                <HiTrash />
            </div>
        </div>
    )
}