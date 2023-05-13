import React from "react";
import styles from "./LoginForm.module.scss";
export const LoginForm: React.FC = () => {

    return(
        <form className={styles.formContainer}>
            <h2>Sign In</h2>
            <input name="email" type="text" placeholder="Email Address" />
            <input name="password" type="password" placeholder="Password" />
            <button type="submit">Log In</button>
            <span>New User? Sign up here!</span>
        </form>
    )
}