import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AuthState {
    isLoginModalShown: boolean,
    loginPageType: "login" | "register",
}

const initialState: AuthState = {
    isLoginModalShown: false,
    loginPageType: "login",
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        showLoginModal: (state) => {
            state.isLoginModalShown = true;
        },
        hideLoginModal: (state) => {
            state.isLoginModalShown = false;
        },
        toggleLoginPageType: (state) => {
            state.loginPageType = state.loginPageType === "login" ? "register" : "login";
        }
    }
})

export const { showLoginModal, hideLoginModal, toggleLoginPageType } = authSlice.actions;
export const selectIsLoginModalShown = (state: RootState) => state.auth.isLoginModalShown;
export const selectLoginPageType = (state: RootState) => state.auth.loginPageType;

export default authSlice.reducer;
