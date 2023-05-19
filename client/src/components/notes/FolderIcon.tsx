import React, { FC } from "react";
import { HiOutlineFolder } from "react-icons/hi";
import styles from "./FolderIcon.module.scss";
interface FolderIconProps {
    folder?: object;
}

export const FolderIcon: FC<FolderIconProps> = ({ folder }) => {

    return (
        <div className={styles.folderIconContainer}>
            <HiOutlineFolder size={35} color="010C80"  />
            <span>Untitled Folder Name</span>
        </div>
    )
}