import { HiMenu, HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import styles from "./ProjectDropdown.module.scss";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { showDeleteProjectModal, showEditProjectModal, showViewProjectModal } from "../../store/slices/projectSlice";

export const ProjectDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

    const handleProjectDropdownClickOutside = (e: any) => {
        if(menuRef.current && !menuRef.current.contains(e.target)) {
            setIsOpen(false);
        }
        setIsOpen(false);
    }

    const handleProjectDropdownClick = (e: any) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        document.addEventListener("click", handleProjectDropdownClickOutside);

        return () => {
            document.removeEventListener("click", handleProjectDropdownClickOutside);
        }
    })

    return (
        <div className={styles.projectDropdown} ref={menuRef}>
            <HiMenu onClick={handleProjectDropdownClick} size={40} color="010C80"/>

            {isOpen && (
                <div className={styles.projectDropdownContent}>
                    <div onClick={() => dispatch(showViewProjectModal())}>
                        <HiOutlineEye size={40} color="010C80"/>
                    </div>
                    <div onClick={() => dispatch(showEditProjectModal())}>
                        <HiOutlinePencil size={40} color="010C80"/>
                    </div>
                    <div onClick={() => dispatch(showDeleteProjectModal())}>
                        <HiOutlineTrash size={40} color="010C80"/>
                    </div>
                </div>
            )}
        </div>
    )
}