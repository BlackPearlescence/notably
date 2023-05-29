import styles from "./NavigationBar.module.scss";
import { BsCash } from 'react-icons/bs';
import { AiFillHome } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { checkIfLoggedIn, selectIsLoggedIn, selectUserData } from "../../store/slices/authSlice";
import { useEffect } from "react";

export const NavigationBar = () => {

    const navigate = useNavigate();
    const isLoggedInState = useAppSelector(selectIsLoggedIn)
    const userDataState = useAppSelector(selectUserData)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(checkIfLoggedIn())
    },[isLoggedInState])

    return(
        <div className={styles.navigationBarContainer}>
            <img onClick={() => navigate("/")} src={require("../../assets/images/logo-no-background.webp")}/>
            <span onClick={() => navigate("/")}>Home</span>
            <span onClick={() => navigate("/features")}>Features</span>
            <span onClick={() => navigate("/about")}>About</span>
            <span onClick={() => navigate("/pricing")}>Pricing</span>
            {isLoggedInState ? <div>a</div> : <button onClick={() => navigate("/login")}>Log In</button>}
            
        </div>
    )
}