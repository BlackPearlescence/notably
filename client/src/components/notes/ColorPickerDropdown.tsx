import { Modal } from "react-bootstrap";
import styles from "./ColorPickerDropdown.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export const ColorPickerDropdown: React.FC = () => {
    const dispatch = useAppDispatch();
    return (
        <div className={styles.colorWrapper}>
            <div className={styles.colorCircle}></div>
            <div className={styles.colorCircle}></div>
            <div className={styles.colorCircle}></div>
            <div className={styles.colorCircle}></div>
            <div className={styles.colorCircle}></div>
            <div className={styles.colorCircle}></div>
            <div className={styles.colorCircle}></div>
            <div className={styles.colorCircle}></div>
        </div>
    )
}