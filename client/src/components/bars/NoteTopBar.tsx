import React from "react";
import styles from "./NoteTopBar.module.scss"; 
import { HiOutlineUser, HiOutlineHome } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { UserDropdown } from "./UserDropdown";

export const NoteTopBar: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.noteBarContainer}>
            <img onClick={() => navigate("/projects")} src={require("../../assets/images/logo-no-background.webp")} alt="logo" />
            <div className={styles.options}>
                <div onClick={() => navigate("/projects")}>
                    <HiOutlineHome size={30} color="010C80"/>
                </div>
                <div>
                    <UserDropdown />
                </div>
            </div>
        </div>
    )
}