import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AuthState {
    isLoginModalShown: boolean,
}

const initialState: AuthState = {
    isLoginModalShown: false,
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
        }
    }
})

export const { showLoginModal, hideLoginModal } = authSlice.actions;
export const selectIsLoginModalShown = (state: RootState) => state.auth.isLoginModalShown;

export default authSlice.reducer;
