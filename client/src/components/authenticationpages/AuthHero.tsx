import React from "react";
import styles from "./AuthHero.module.scss";

interface HeroHeader {
    title: string;
    children?: React.ReactNode;
}

export const AuthHero: React.FC<HeroHeader> = ({ title, children }) => {
    return (
        <div className={styles.authHeroContainer}>
            <div className={styles.authHero}></div>
            <div className={styles.authMask}>
                <h1>{title}</h1>
                {children}
            </div>
        </div>
    )
}