import React from "react";
import styles from "./LoginForm.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectLoginPageType, toggleLoginPageType } from "../../store/slices/authSlice";

export const LoginForm: React.FC = () => {

    const loginPageType = useAppSelector(selectLoginPageType)
    const dispatch = useAppDispatch();
    return(
        <form className={styles.formContainer}>
            {loginPageType === "login" && (
                <>
                    <h2>Sign In</h2>
                    <input name="email" type="text" placeholder="Email Address" />
                    <input name="password" type="password" placeholder="Password" />
                    <button type="submit">Log In</button>
                    <span onClick={() => dispatch(toggleLoginPageType())}>New User? Sign up here!</span>
                </>
            )}
            {loginPageType === "register" && (
                <>
                    <h2>Sign Up</h2>
                    <input name="email" type="text" placeholder="Email Address" />
                    <input name="password" type="password" placeholder="Password" />
                    <input name="confirmPassword" type="password" placeholder="Confirm Password" />
                    <button type="submit">Sign Up</button>
                    <span onClick={() => dispatch(toggleLoginPageType())}>Returning User? Sign in here!</span>
                </>
            )}

            
        </form>
    )
}