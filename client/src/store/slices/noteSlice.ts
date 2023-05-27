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
    updateNoteStatus: "idle" | "loading" | "succeeded" | "failed",
    updateNoteError: string | null,
    selectNote: any,
    isEdit: boolean,
    isNewNote: boolean,
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
    selectNote: null,
    isEdit: true,
    isNewNote: true,
    updateNoteStatus: "idle",
    updateNoteError: null,
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
        console.log(note)
        const resp = await axios.post(`/projects/${note.projectId}/notes`, note);
        const newNote = await resp.data;
        return newNote;
    }
)

export const removeNote = createAsyncThunk(
    "note/removeNote",
    async (note: any) => {
        const resp = await axios.delete(`/projects/${note.projectId}/notes/${note.id}`);
        const deletedNote = await resp.data;
        return deletedNote;
    }
)

export const updateNote = createAsyncThunk(
    "note/updateNote",
    async (note: any) => {
        const resp = await axios.put(`/projects/${note.projectId}/notes/${note.id}`,note)
        const updatedNote = await resp.data;
        return updatedNote;
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
        },
        selectNote: (state, action) => {    
            state.selectNote = action.payload;
        },
        toEditMode: (state) => {
            state.isEdit = true;
        },
        toViewMode: (state) => {
            state.isEdit = false;
        },
        makeNewNote: (state) => {
            state.isNewNote = true;
        },
        updateExistingNote: (state) => {
            state.isNewNote = false;
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
        }),
        builder.addCase(removeNote.fulfilled, (state, action) => {
            state.notes = state.notes.filter((note) => note.id !== action.payload.id);
        }),
        builder.addCase(removeNote.pending, (state, action) => {
            state.createNoteStatus = "loading";
        }),
        builder.addCase(removeNote.rejected, (state, action) => {
            state.createNoteStatus = "failed";
        }),
        builder.addCase(updateNote.fulfilled, (state, action) => {
            const index = state.notes.findIndex((note) => note.id === action.payload.id);
            state.notes[index] = action.payload;
        }),
        builder.addCase(updateNote.pending, (state, action) => {
            state.updateNoteStatus = "loading";
        }),
        builder.addCase(updateNote.rejected, (state, action) => {
            state.updateNoteError = "failed";
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
    selectNote,
    toEditMode,
    toViewMode,
    makeNewNote,
    updateExistingNote
} = noteSlice.actions;

export const selectIsCreateNoteModalShown = (state: RootState) => state.note.isCreateNoteModalShown;
export const selectIsViewNoteModalShown = (state: RootState) => state.note.isViewNoteModalShown;
export const selectIsEditNoteModalShown = (state: RootState) => state.note.isEditNoteModalShown;
export const selectIsDeleteNoteModalShown = (state: RootState) => state.note.isDeleteNoteModalShown;
export const selectIsNoteModalShown = (state: RootState) => state.note.isNoteModalShown;
export const selectColorModalShown = (state: RootState) => state.note.isColorModalShown;
export const selectNotes = (state: RootState) => state.note.notes;
export const selectSelectedNote = (state: RootState) => state.note.selectNote;
export const selectIsEdit = (state: RootState) => state.note.isEdit;
export const selectIsNewNote = (state: RootState) => state.note.isNewNote;

export default noteSlice.reducer;