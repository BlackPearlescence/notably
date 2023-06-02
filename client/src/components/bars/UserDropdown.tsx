import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import styles from "./UserDropdown.module.scss";
import { HiLogout } from "react-icons/hi";
import { HiOutlineCog } from "react-icons/hi";
import { attemptToLogout } from "../../store/slices/authSlice";


export const UserDropdown = () => {

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

    const handleProjectDropdownClickOutside = (e: any) => {
        if(menuRef.current && !menuRef.current.contains(e.target)) {
            setIsOpen(false);
        }
        setIsOpen(false);
    }

    const handleUserDropdownClick = (e: any) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    }

    const handleUserLogout = (e: any) => {
        dispatch(attemptToLogout())
    }

    useEffect(() => {
        document.addEventListener("click", handleProjectDropdownClickOutside);

        return () => {
            document.removeEventListener("click", handleProjectDropdownClickOutside);
        }
    })

    return (
        <div className={styles.userDropdown} ref={menuRef}>
            <img src="https://baconmockup.com/640/360" alt="user profile" onClick={handleUserDropdownClick} />
            {isOpen && (
                <div className={styles.userDropdownContent}>
                    <div>
                        <span>Welcome, User!</span>
                    </div>
                    <div onClick={handleUserLogout}>
                        <HiLogout size={40} color="010C80"/>
                        <span>Logout</span>
                    </div>
                    <div>
                        <HiOutlineCog size={40} color="010C80"/>
                        <span>Settings</span>
                    </div>
                </div>
            )}
        </div>
    )
}