import { screenSizes } from "../screenSizes";
import { useMediaQuery } from 'react-responsive';
import styles from "./LoginPage.module.scss";
import LoginBox from "../components/authenticationpages/LoginBox";
import { AuthHero } from "../components/authenticationpages/AuthHero";
import { LoginForm } from "../components/authenticationpages/LoginForm";
import { useAppSelector } from "../store/hooks";
import { selectLoginPageType } from "../store/slices/authSlice";

export const LoginPage = () => {
    const isDesktop = useMediaQuery({ minWidth: screenSizes.desktopMinimum });
    const isTablet = useMediaQuery({ minWidth: screenSizes.tabletMinimum, maxWidth: screenSizes.tabletMaximum});
    const isMobile = useMediaQuery({ maxWidth: screenSizes.mobileMaximum });

    const loginPageType = useAppSelector(selectLoginPageType)

    return (
        <div>
            { loginPageType === "login" && <>
                {isDesktop && (
                <div className={styles.loginPageContainer}>
                    <LoginBox />
                    <AuthHero title="Welcome back friend! It’s a notable time to do some note-taking!">
                    </AuthHero>
                </div>
                )}
                {isTablet && (
                    <div>
                        <AuthHero title="Welcome back friend! It’s a notable time to do some note-taking!">
                            <LoginForm />
                        </AuthHero>
                    </div>
                )}
                {isMobile && (
                    <div>
                        <AuthHero title="Welcome back friend! It’s a notable time to do some note-taking!">
                            <LoginForm />
                        </AuthHero>
                    </div>
                )}
            </>}

            { loginPageType === "register" && <>
                {isDesktop && (
                <div className={styles.loginPageContainer}>
                    <AuthHero title="Create an account to use the best note-taking app you’ll ever use! Promise!">
                    </AuthHero>
                    <LoginBox />
                </div>
                )}
                {isTablet && (
                    <div>
                        <AuthHero title="Create an account to use the best note-taking app you’ll ever use! Promise!">
                            <LoginForm />
                        </AuthHero>
                    </div>
                )}
                {isMobile && (
                    <div>
                        <AuthHero title="Create an account to use the best note-taking app you’ll ever use! Promise!">
                            <LoginForm />
                        </AuthHero>
                    </div>
                )}
            </> }
            
        </div>
    )
}