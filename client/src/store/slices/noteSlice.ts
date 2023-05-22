import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface NoteState {
    isCreateNoteModalShown: boolean,
    isViewNoteModalShown: boolean,
    isEditNoteModalShown: boolean,
    isDeleteNoteModalShown: boolean,
    isNoteModalShown: boolean,
}

const initialState: NoteState = {
    isCreateNoteModalShown: false,
    isViewNoteModalShown: false,
    isEditNoteModalShown: false,
    isDeleteNoteModalShown: false,
    isNoteModalShown: false,
}

const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {
        showCreateNoteModal: (state) => {
            state.isCreateNoteModalShown = true;
        },
        hideCreateNoteModal: (state) => {
            state.isCreateNoteModalShown = false;
        },
        showViewNoteModal: (state) => {
            state.isViewNoteModalShown = true;
        },
        hideViewNoteModal: (state) => {
            state.isViewNoteModalShown = false;
        },
        showEditNoteModal: (state) => {
            state.isEditNoteModalShown = true;
        },
        hideEditNoteModal: (state) => {
            state.isEditNoteModalShown = false;
        },
        showDeleteNoteModal: (state) => {
            state.isDeleteNoteModalShown = true;
        },
        hideDeleteNoteModal: (state) => {
            state.isDeleteNoteModalShown = false;
        },
        showNoteModal: (state) => {
            state.isNoteModalShown = true;
        },
        hideNoteModal: (state) => {
            state.isNoteModalShown = false;
        }
    }
})

export const {
    showCreateNoteModal,
    hideCreateNoteModal,
    showViewNoteModal,
    hideViewNoteModal,
    showEditNoteModal,
    hideEditNoteModal,
    showDeleteNoteModal,
    hideDeleteNoteModal,
    showNoteModal,
    hideNoteModal
} = noteSlice.actions;

export const selectIsCreateNoteModalShown = (state: RootState) => state.note.isCreateNoteModalShown;
export const selectIsViewNoteModalShown = (state: RootState) => state.note.isViewNoteModalShown;
export const selectIsEditNoteModalShown = (state: RootState) => state.note.isEditNoteModalShown;
export const selectIsDeleteNoteModalShown = (state: RootState) => state.note.isDeleteNoteModalShown;
export const selectIsNoteModalShown = (state: RootState) => state.note.isNoteModalShown;

export default noteSlice.reducer;