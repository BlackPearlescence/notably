import { screenSizes } from "../screenSizes";
import { useMediaQuery } from 'react-responsive';
import styles from "./LoginPage.module.scss";
import LoginBox from "../components/authenticationpages/LoginBox";
import { AuthHero } from "../components/authenticationpages/AuthHero";
import { LoginForm } from "../components/authenticationpages/LoginForm";

export const LoginPage = () => {
    const isDesktop = useMediaQuery({ minWidth: screenSizes.desktopMinimum });
    const isTablet = useMediaQuery({ minWidth: screenSizes.tabletMinimum, maxWidth: screenSizes.tabletMaximum});
    const isMobile = useMediaQuery({ maxWidth: screenSizes.mobileMaximum });
    return (
        <div>
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
                    </AuthHero>
                </div>
            )}
        </div>
    )
}