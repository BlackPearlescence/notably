import { useSelector } from "react-redux";
import styles from "./LoginModal.module.scss";
import { selectIsLoginModalShown } from "../../store/slices/authSlice";
import { useAppSelector } from "../../store/hooks";

export const LoginModal = () => {

    const isLoginShown: boolean = useAppSelector(selectIsLoginModalShown)

    return(
        <div>
            {isLoginShown && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h2>Modal Title</h2>
                        <p>Modal content goes here.</p>
                    </div>
                </div>
            )}
        </div>
    )
}