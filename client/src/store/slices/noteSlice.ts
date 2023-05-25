import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface NoteState {
    isCreateNoteModalShown: boolean,
    isViewNoteModalShown: boolean,
    isEditNoteModalShown: boolean,
    isDeleteNoteModalShown: boolean,
    isNoteModalShown: boolean,
    isColorModalShown: boolean,
}

const initialState: NoteState = {
    isCreateNoteModalShown: false,
    isViewNoteModalShown: false,
    isEditNoteModalShown: false,
    isDeleteNoteModalShown: false,
    isNoteModalShown: false,
    isColorModalShown: false,
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
        },
        showColorModal: (state) => {
            state.isColorModalShown = true;
        },
        hideColorModal: (state) => {
            state.isColorModalShown = false;
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
    hideNoteModal,
    showColorModal,
    hideColorModal,
} = noteSlice.actions;

export const selectIsCreateNoteModalShown = (state: RootState) => state.note.isCreateNoteModalShown;
export const selectIsViewNoteModalShown = (state: RootState) => state.note.isViewNoteModalShown;
export const selectIsEditNoteModalShown = (state: RootState) => state.note.isEditNoteModalShown;
export const selectIsDeleteNoteModalShown = (state: RootState) => state.note.isDeleteNoteModalShown;
export const selectIsNoteModalShown = (state: RootState) => state.note.isNoteModalShown;
export const selectColorModalShown = (state: RootState) => state.note.isColorModalShown;

export default noteSlice.reducer;