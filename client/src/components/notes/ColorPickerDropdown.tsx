import { Modal } from "react-bootstrap";
import styles from "./ColorPickerDropdown.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { GithubPicker, CirclePicker } from "react-color";
import { useState } from "react";

interface ColorPickerDropdown {
    onColorClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}


export const ColorPickerDropdown: React.FC<ColorPickerDropdown> = ({ onColorClick }) => {
    const dispatch = useAppDispatch();
    const colors = ["#ffffff", "#ADD8E6", "#F6D6E6", "#E6E6FA", "#F5FFFA", "#98FB98", "#FFFACD", "#FFDAB9", "#F08080", "#D8BFD8"]
    const [color, setColor] = useState<string>("")

    const handleColorChange = (e: any) => {
        console.log(e)
        setColor(e)
    }

    
    return (
        <div className={styles.colorWrapper}>
            <CirclePicker color={color} colors={colors} onChange={handleColorChange}  />
            {/* <input className={styles.colorCircle} onClick={onColorClick} type="button"/>
            <input className={styles.colorCircle} onClick={onColorClick} type="button"/>
            <input className={styles.colorCircle} onClick={onColorClick} type="button"/>
            <input className={styles.colorCircle} onClick={onColorClick} type="button"/>
            <input className={styles.colorCircle} onClick={onColorClick} type="button"/>
            <input className={styles.colorCircle} onClick={onColorClick} type="button"/>
            <input name="lemonchiffon" className={styles.colorCircle} onClick={onColorClick} type="button"/>
            <input name="peachpuff" className={styles.colorCircle} onClick={onColorClick} type="button"/> */}
        </div>
    )
}