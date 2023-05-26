import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";

interface NoteState {
    isCreateNoteModalShown: boolean,
    isViewNoteModalShown: boolean,
    isEditNoteModalShown: boolean,
    isDeleteNoteModalShown: boolean,
    isNoteModalShown: boolean,
    isColorModalShown: boolean,
    notes: any[],
    notesStatus: "idle" | "loading" | "succeeded" | "failed",
    notesError: string | null,
    createNoteStatus: "idle" | "loading" | "succeeded" | "failed",
    createNoteError: string | null,
}

const initialState: NoteState = {
    isCreateNoteModalShown: false,
    isViewNoteModalShown: false,
    isEditNoteModalShown: false,
    isDeleteNoteModalShown: false,
    isNoteModalShown: false,
    isColorModalShown: false,
    notes: [],
    notesStatus: "idle",
    notesError: null,
    createNoteStatus: "idle",
    createNoteError: null,
}

export const getNotes  = createAsyncThunk(
    "note/getNotes",
    async (id: number) => {
        const resp = await axios.get(`/projects/${id}/notes`);
        const notes = await resp.data;
        return notes;
    }
)

export const createNote = createAsyncThunk(
    "note/createNote",
    async (note: any) => {
        const resp = await axios.post(`/projects/${note.projectId}/notes`, note);
        const newNote = await resp.data;
        return newNote;
    }
)

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
    },
    extraReducers: (builder) => {
        builder.addCase(getNotes.fulfilled, (state, action) => {
            state.notes = action.payload;
        }),
        builder.addCase(getNotes.pending, (state, action) => {
            state.notesStatus = "loading";
        }),
        builder.addCase(getNotes.rejected, (state, action) => {
            state.notesStatus = "failed";
        }),
        builder.addCase(createNote.fulfilled, (state, action) => {
            state.notes.push(action.payload);
        }),
        builder.addCase(createNote.pending, (state, action) => {
            state.createNoteStatus = "loading";
        }),
        builder.addCase(createNote.rejected, (state, action) => {
            state.createNoteStatus = "failed";
        })
    },

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
export const selectNotes = (state: RootState) => state.note.notes;

export default noteSlice.reducer;