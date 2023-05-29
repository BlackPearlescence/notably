import React, { useState, useEffect, useRef } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import styles from "./LoginForm.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { attemptToLogin, selectLoginPageType, toggleLoginPageType } from "../../store/slices/authSlice";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import axios from "axios";

interface AuthFormValues {
    email: string;
    password: string;
    confirmPassword: string;
}

export const LoginForm: React.FC = () => {

    const loginPageType: "login" | "register" = useAppSelector(selectLoginPageType);
    const [emailFieldStyle, setEmailFieldStyle] = useState<string>("");
    const [passwordFieldStyle, setPasswordFieldStyle] = useState<string>("");
    const [confirmPasswordFieldStyle, setConfirmPasswordFieldStyle] = useState<string>("");
    const [authForm, setAuthForm] = useState<any>({
        email: "",
        password: ""
    });
    const [loginToken, setLoginToken] = useState<string | null>(null)
    const [registerToken, setRegisterToken] = useState<string | null>(null)
    const [loginSiteKey, setLoginSiteKey] = useState<string>("")
    const [registerSiteKey, setRegisterSiteKey] = useState<string>("")
    const loginCaptchaRef = useRef<HCaptcha>(null);
    const registerCaptchaRef = useRef<HCaptcha>(null);

    useEffect(() => {
        const getLoginSiteKey = async () => {
            const resp = await axios.get("/auth/login-sitekey");
            const key = await resp.data;
            console.log(key)
            setLoginSiteKey(key.sitekey)
        }
        getLoginSiteKey()
        const getRegisterSiteKey = async () => {
            const resp = await axios.get("/auth/register-sitekey");
            const key = await resp.data;
            setRegisterSiteKey(key.sitekey);
        }
        getRegisterSiteKey()
    },[])

    useEffect(() => {
        console.log(`hCaptcha Token: ${loginToken}`)
    },[loginToken])

    const onLoginLoad = () => {
        if (loginCaptchaRef.current) {
            loginCaptchaRef.current.execute()
        }
    };

    const onRegisterLoad = () => {
        if(registerCaptchaRef.current) {
            registerCaptchaRef.current.execute()
        }
    }

    

    const dispatch = useAppDispatch();
    const initialValues: AuthFormValues = {
        email: "",
        password: "",
        confirmPassword: ""
    }

    const handleSubmit = (values: AuthFormValues) => {
        // console.log(values);
        if (loginPageType === "login") {
            // dispatch(login(values))
            console.log("blah")
            dispatch(attemptToLogin(values))
        } else {
            // dispatch(register(values))
            const registerProcess = async () => {
                try{
                    const resp = await axios.post("/auth/register", values)
                    const token = await resp.data;
                    console.log(token)
                } catch (err) {
                    console.error(err)
                }
                
            }
            registerProcess();
        }
    }

    const validateAuthForm = (values: AuthFormValues) => {
        const errors = {} as AuthFormValues;
        console.log(values)
        if (!values.email) {
            errors.email = "Email is required";
            setEmailFieldStyle(styles.errorField)
        } else {
            setEmailFieldStyle("")
        }
        if (!values.password) {
            errors.password = "Password is required";
            setPasswordFieldStyle(styles.errorField)
        } else {
            setPasswordFieldStyle("")
        }
        if(loginPageType === "register") {
            if (!values.confirmPassword) {
                errors.confirmPassword = "Password confirmation is required";
                setConfirmPasswordFieldStyle(styles.errorField)
            } else {
                setConfirmPasswordFieldStyle("")
            }
            if (loginPageType === "register" && values.password !== values.confirmPassword) {
                errors.confirmPassword = "Passwords must match";
                setPasswordFieldStyle(styles.errorField)
                setConfirmPasswordFieldStyle(styles.errorField)
            } else {
                setPasswordFieldStyle("")
                setConfirmPasswordFieldStyle("")
            }
        }
        

        return errors;
    }

    const handleAuthFormChange = (e: any) => {
        setAuthForm({
            ...authForm,
            [e.target.name]: e.target.value
        })
        console.log(authForm)
    }
    
    return(
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validateAuthForm}>
            <Form className={styles.formContainer}>
                {loginPageType === "login" && (
                    <>
                        <h2>Sign In</h2>
                        <div>
                            <Field name="email" type="text" placeholder="Email Address" className={emailFieldStyle} />
                            <ErrorMessage name="email" component="div" className={styles.errorMessage}  />
                        </div>
                        <div>
                            <Field name="password" type="password" placeholder="Password" className={passwordFieldStyle} />
                            <ErrorMessage name="password" component="div" className={styles.errorMessage} />
                        </div>
                        <span onClick={() => dispatch(toggleLoginPageType())}>New User? Sign up here!</span>
                        {loginSiteKey && (
                            <HCaptcha sitekey={loginSiteKey} onLoad={onLoginLoad} onVerify={setLoginToken} ref={loginCaptchaRef} />

                        )}
                        <button type="submit">Log In</button>
                    </>
                )}
                {loginPageType === "register" && (
                    <>
                        <h2>Sign Up</h2>
                        <div>
                            <Field 
                            name="email" 
                            type="text" 
                            placeholder="Email Address" 
                            className={emailFieldStyle}/>
                            <ErrorMessage name="email" component="div"  className={styles.errorMessage}/>
                        </div>
                        <div>
                            <Field 
                            name="password" 
                            type="password" 
                            placeholder="Password" 
                            className={passwordFieldStyle}/>
                            <ErrorMessage name="password" component="div"  className={styles.errorMessage}/>
                        </div>
                        <div>
                            <Field name="confirmPassword" type="password" placeholder="Confirm Password" className={confirmPasswordFieldStyle} />
                            <ErrorMessage name="confirmPassword" component="div" className={styles.errorMessage}/>
                        </div>
                        <span onClick={() => dispatch(toggleLoginPageType())}>Returning User? Sign in here!</span>
                        {registerSiteKey && (
                            <HCaptcha sitekey={registerSiteKey} onLoad={onRegisterLoad} onVerify={setRegisterToken} ref={registerCaptchaRef} />

                        )}
                        <button type="submit">Sign Up</button>
                    </>
                )}
            </Form>
        </Formik>
        
    )
}