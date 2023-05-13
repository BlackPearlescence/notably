import React from "react";
import styles from "./LoginBox.module.scss";
import { LoginForm } from "./LoginForm";
export const LoginBox: React.FC = () => {

    return (
        <div className={styles.loginContainer}>
            <LoginForm />
        </div>
    )
}

export default LoginBox;