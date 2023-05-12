import React from "react";
import styles from "./LoginBox.module.scss";
export const LoginBox: React.FC = () => {

    return (
        <div className={styles.loginContainer}>
            <form>
                <input name="email" type="text" placeholder="email" />
                <input name="password" type="password" placeholder="password" />
                <button type="submit">Log In</button>
                <span>New User? Sign up here!</span>
            </form>
        </div>
    )
}

export default LoginBox;