import styles from "./NavigationBar.module.scss";
import { BsCash } from 'react-icons/bs';
import { AiFillHome } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";

export const NavigationBar = () => {

    const navigate = useNavigate();

    return(
        <div className={styles.navigationBarContainer}>
            <img onClick={() => navigate("/")} src={require("../../assets/images/logo-no-background.webp")}/>
            <span onClick={() => navigate("/")}>Home</span>
            <span onClick={() => navigate("/features")}>Features</span>
            <span onClick={() => navigate("/about")}>About</span>
            <span onClick={() => navigate("/pricing")}>Pricing</span>
            <button onClick={() => navigate("/login")}>Log In</button>
        </div>
    )
}