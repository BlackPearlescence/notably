import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";

interface ProjectState {
    isCreateProjectModalShown: boolean,
    isViewProjectModalShown: boolean,
    isEditProjectModalShown: boolean,
    isDeleteProjectModalShown: boolean,
    projectError: string | null,
    projectStatus: "idle" | "loading" | "succeeded" | "failed",
    projects: any[],
}

const initialState: ProjectState = {
    isCreateProjectModalShown: false,
    isViewProjectModalShown: false,
    isEditProjectModalShown: false,
    isDeleteProjectModalShown: false,
    projectError: null,
    projectStatus: "idle",
    projects: [],
}

export const getProjects = createAsyncThunk(
    "project/getProjects",
    async () => {
        const response = await axios.get("/projects");
        const projects = await response.data;
        return projects;
    }
)


const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        showCreateProjectModal: (state) => {
            state.isCreateProjectModalShown = true;
        },
        hideCreateProjectModal: (state) => {
            state.isCreateProjectModalShown = false;
        },
        showViewProjectModal: (state) => {
            state.isViewProjectModalShown = true;
        },
        hideViewProjectModal: (state) => {
            state.isViewProjectModalShown = false;
        },
        showEditProjectModal: (state) => {
            state.isEditProjectModalShown = true;
        },
        hideEditProjectModal: (state) => {
            state.isEditProjectModalShown = false;
        },
        showDeleteProjectModal: (state) => {
            state.isDeleteProjectModalShown = true;
        },
        hideDeleteProjectModal: (state) => {
            state.isDeleteProjectModalShown = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProjects.fulfilled, (state, action) => {
            console.log(action.payload);
            state.projectStatus = "succeeded";
            state.projects = action.payload;
        })
        // builder.addCase(getProjects.rejected, (state, action) => {
        //     console.log(action.payload);
        //     state.projectStatus = "failed";
        //     state.projectError = action.error.message || null;
        // }),
        // builder.addCase(getProjects.pending, (state, action) => {
        //     console.log(action.payload);
        //     state.projectStatus = "loading";
        //     state.projectError = null;
        // })
    }
})

export const { 
    showCreateProjectModal, 
    hideCreateProjectModal, 
    showViewProjectModal, 
    hideViewProjectModal,
    showEditProjectModal,
    hideEditProjectModal,
    showDeleteProjectModal,
    hideDeleteProjectModal,
  } = projectSlice.actions;
export const selectIsCreateProjectModalShown = (state: RootState) => state.project.isCreateProjectModalShown;
export const selectIsViewProjectModalShown = (state: RootState) => state.project.isViewProjectModalShown;
export const selectIsEditProjectModalShown = (state: RootState) => state.project.isEditProjectModalShown;
export const selectIsDeleteProjectModalShown = (state: RootState) => state.project.isDeleteProjectModalShown;
export const selectProjects = (state: RootState) => state.project.projects;

export default projectSlice.reducer;