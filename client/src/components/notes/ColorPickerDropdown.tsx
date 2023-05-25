import { Modal } from "react-bootstrap";
import styles from "./ColorPickerDropdown.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

interface ColorPickerDropdown {
    onColorClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}


export const ColorPickerDropdown: React.FC<ColorPickerDropdown> = ({ onColorClick }) => {
    const dispatch = useAppDispatch();

    
    return (
        <div className={styles.colorWrapper}>
            <input className={styles.colorCircle} onClick={onColorClick} type="button"/>
            <input className={styles.colorCircle} onClick={onColorClick} type="button"/>
            <input className={styles.colorCircle} onClick={onColorClick} type="button"/>
            <input className={styles.colorCircle} onClick={onColorClick} type="button"/>
            <input className={styles.colorCircle} onClick={onColorClick} type="button"/>
            <input className={styles.colorCircle} onClick={onColorClick} type="button"/>
            <input name="lemonchiffon" className={styles.colorCircle} onClick={onColorClick} type="button"/>
            <input name="peachpuff" className={styles.colorCircle} onClick={onColorClick} type="button"/>
        </div>
    )
}