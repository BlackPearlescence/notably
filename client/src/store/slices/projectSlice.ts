import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ProjectState {
    isCreateProjectModalShown: boolean,
    isViewProjectModalShown: boolean,
    isEditProjectModalShown: boolean,
    isDeleteProjectModalShown: boolean,
}

const initialState: ProjectState = {
    isCreateProjectModalShown: false,
    isViewProjectModalShown: false,
    isEditProjectModalShown: false,
    isDeleteProjectModalShown: false,
}

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

export default projectSlice.reducer;