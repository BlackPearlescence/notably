import React, { useState } from "react";
import styles from "./LoginForm.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectLoginPageType, toggleLoginPageType } from "../../store/slices/authSlice";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";

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

    const dispatch = useAppDispatch();
    const initialValues: AuthFormValues = {
        email: "",
        password: "",
        confirmPassword: ""
    }

    const handleSubmit = (values: AuthFormValues) => {
        console.log(values);
    }

    const validateAuthForm = (values: AuthFormValues) => {
        const errors = {} as AuthFormValues;
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

        return errors;
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
                        <button type="submit">Log In</button>
                        <span onClick={() => dispatch(toggleLoginPageType())}>New User? Sign up here!</span>
                    </>
                )}
                {loginPageType === "register" && (
                    <>
                        <h2>Sign Up</h2>
                        <div>
                            <Field name="email" type="text" placeholder="Email Address" className={emailFieldStyle}/>
                            <ErrorMessage name="email" component="div"  className={styles.errorMessage}/>
                        </div>
                        <div>
                            <Field name="password" type="password" placeholder="Password" className={passwordFieldStyle}/>
                            <ErrorMessage name="password" component="div"  className={styles.errorMessage}/>
                        </div>
                        <div>
                            <Field name="confirmPassword" type="password" placeholder="Confirm Password" className={confirmPasswordFieldStyle} />
                            <ErrorMessage name="confirmPassword" component="div" className={styles.errorMessage}/>
                        </div>
                        <button type="submit">Sign Up</button>
                        <span onClick={() => dispatch(toggleLoginPageType())}>Returning User? Sign in here!</span>
                    </>
                )}
            </Form>
        </Formik>
        
    )
}