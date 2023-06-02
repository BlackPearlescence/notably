import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import api from "../../utils/instance"

interface AuthState {
    isLoginModalShown: boolean,
    loginPageType: "login" | "register",
    isLoggedIn: boolean,
    userData: any,
    userDataStatus: "idle" | "loading" | "succeeded" | "failed",
    userDataError: string | null,
}

const initialState: AuthState = {
    isLoginModalShown: false,
    loginPageType: "login",
    isLoggedIn: false,
    userData: {},
    userDataStatus: "idle",
    userDataError: null,
}

export const attemptToLogin = createAsyncThunk(
    "auth/attemptToLogin",
    async (loginValues: any) => {
        const resp = await api.post("/auth/login", loginValues)
        const message = await resp.data;
        return message
    }
)

export const checkIfLoggedIn = createAsyncThunk(
    "auth/checkIfLoggedIn",
    async () => {
        const resp = await api.get("/auth/check");
        const userData = await resp.data;
        return userData;
    }
)

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
        },
        login: (state) => {
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.isLoggedIn = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(attemptToLogin.fulfilled, (state, action) => {
            console.log(action.payload)
            state.isLoggedIn = true;
        }),
        builder.addCase(attemptToLogin.pending, (state, action) => {
            state.userDataStatus = "loading";
        }),
        builder.addCase(attemptToLogin.rejected, (state, action) => {
            state.userDataError = "failed";
        }),
        builder.addCase(checkIfLoggedIn.fulfilled, (state, action) => {
            console.log(action)
            state.userData = action.payload;
            state.isLoggedIn = true;
            state.userDataStatus = "succeeded";

        }),
        builder.addCase(checkIfLoggedIn.pending, (state, action) => {
            state.userDataStatus = "loading";
        }),
        builder.addCase(checkIfLoggedIn.rejected, (state, action) => {
            state.userDataError = "failed";
        })
    }
})

export const { showLoginModal, hideLoginModal, toggleLoginPageType } = authSlice.actions;
export const selectIsLoginModalShown = (state: RootState) => state.auth.isLoginModalShown;
export const selectLoginPageType = (state: RootState) => state.auth.loginPageType;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectUserDataStatus = (state: RootState) => state.auth.userDataStatus;
export const selectUserData = (state: RootState) => state.auth.userData;

export default authSlice.reducer;
