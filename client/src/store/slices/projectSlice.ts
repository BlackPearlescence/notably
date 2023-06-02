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
    sharedProjectError: string | null,
    sharedProjectStatus: "idle" | "loading" | "succeeded" | "failed",
    sharedProjects: any[],
    addProjectError: string | null,
    addProjectStatus: "idle" | "loading" | "succeeded" | "failed",
    deleteProjectError: string | null,
    deleteProjectStatus: "idle" | "loading" | "succeeded" | "failed",
    selectedProject: any,
    getProjectStatus: "idle" | "loading" | "succeeded" | "failed",
    getProjectError: string | null,
    updateProjectStatus: "idle" | "loading" | "succeeded" | "failed",
    updateProjectError: string | null,
}



const initialState: ProjectState = {
    isCreateProjectModalShown: false,
    isViewProjectModalShown: false,
    isEditProjectModalShown: false,
    isDeleteProjectModalShown: false,
    projectError: null,
    projectStatus: "idle",
    projects: [],
    sharedProjectError: null,
    sharedProjectStatus: "idle",
    sharedProjects: [],
    addProjectError: null,
    addProjectStatus: "idle",
    deleteProjectError: null,
    deleteProjectStatus: "idle",
    selectedProject: null,
    getProjectStatus: "idle",
    getProjectError: null,
    updateProjectStatus: "idle",
    updateProjectError: null,
}

export const getProjects = createAsyncThunk(
    "project/getProjects",
    async (userId: number) => {
        const resp = await axios.get(`/projects/myprojects/${userId}`);
        const projects = await resp.data;
        return projects;
    }
)

export const getSharedProjects = createAsyncThunk(
    "project/getSharedProjects",
    async (userId: number) => {
        const resp = await axios.get(`/projects/sharedprojects/${userId}`);
        const projects = await resp.data;
        return projects;
    }

)

export const getProject = createAsyncThunk(
    "project/getProject",
    async (id: number) => {
        const resp = await axios.get(`/projects/project/${id}`)
        const projects = await resp.data;
        return projects;
    }
)

export const addProject = createAsyncThunk(
    "project/addProject",
    async (project: any) => {
        const resp = await axios.post("/projects", {
            title: project.title,
            userId: project.userId,
        });
        const newProject = await resp.data;
        return newProject;
    }
)

export const deleteProject = createAsyncThunk(
    "project/deleteProject",
    async (id: number) => {
        const resp = await axios.delete(`/projects/${id}`);
        const project = await resp.data;
        return project;
    }
)

export const updateProject = createAsyncThunk(
    "project/updateProject",
    async (project: any) => {
        const resp = await axios.put(`/projects/${project.id}`, {
            title: project.title,
        });
        const updatedProject = await resp.data;
        return updatedProject;
    }
)

export const projectSlice = createSlice({
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
        builder.addCase(getProjects.rejected, (state, action) => {
            console.log(action.payload);
            state.projectStatus = "failed";
            state.projectError = action.error.message || null;
        }),
        builder.addCase(getProjects.pending, (state, action) => {
            console.log(action.payload);
            state.projectStatus = "loading";
            state.projectError = null;
        }),
        builder.addCase(getSharedProjects.fulfilled, (state, action) => {
            console.log(action.payload);
            state.sharedProjectStatus = "succeeded";
            state.sharedProjects = action.payload;
        }),
        builder.addCase(getSharedProjects.rejected, (state, action) => {
            console.log(action.payload);
            state.sharedProjectStatus = "failed";
            state.sharedProjectError = action.error.message || null;
        }),
        builder.addCase(getSharedProjects.pending, (state, action) => {
            console.log(action.payload);
            state.sharedProjectStatus = "loading";
            state.sharedProjectError = null;
        }),
        builder.addCase(addProject.fulfilled, (state, action) => {
            console.log(action.payload);
            state.addProjectStatus = "succeeded";
            state.projects.push(action.payload);
        }),
        builder.addCase(addProject.rejected, (state, action) => {
            console.log(action.payload);
            state.addProjectStatus = "failed";
            state.addProjectError = action.error.message || null;
        }),
        builder.addCase(addProject.pending, (state, action) => {
            console.log(action.payload);
            state.addProjectStatus = "loading";
            state.addProjectError = null;
        }),
        builder.addCase(deleteProject.fulfilled, (state, action) => {
            console.log(action.payload);
            state.deleteProjectStatus = "succeeded";
            state.projects = state.projects.filter((project) => project.id !== action.payload.id);
        }),
        builder.addCase(deleteProject.rejected, (state, action) => {
            console.log(action.payload);
            state.deleteProjectStatus = "failed";
            state.deleteProjectError = action.error.message || null;
        }),
        builder.addCase(deleteProject.pending, (state, action) => {
            console.log(action.payload);
            state.deleteProjectStatus = "loading";
            state.deleteProjectError = null;
        }),
        builder.addCase(getProject.fulfilled, (state, action) => {
            console.log(action.payload);
            state.getProjectStatus = "succeeded";
            state.selectedProject = action.payload;
        }),
        builder.addCase(getProject.pending, (state, action) => {
            console.log(action.payload);
            state.getProjectStatus = "loading";
        })
        builder.addCase(getProject.rejected, (state, action) => {
            console.log(action.payload);
            state.getProjectStatus = "failed";
            state.getProjectError = action.error.message || null;
        })
        builder.addCase(updateProject.fulfilled, (state, action) => {
            console.log(action.payload);
            state.updateProjectStatus = "succeeded";
            const index = state.projects.findIndex((project) => project.id === action.payload.id);
            state.projects[index] = action.payload;
        }),
        builder.addCase(updateProject.rejected, (state, action) => {
            console.log(action.payload);
            state.updateProjectStatus = "failed";
            state.updateProjectError = action.error.message || null;
        }),
        builder.addCase(updateProject.pending, (state, action) => {
            console.log(action.payload);
            state.updateProjectStatus = "loading";
            state.updateProjectError = null;
        })
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
export const selectSharedProjects = (state: RootState) => state.project.sharedProjects;
export const selectSelectedProject = (state: RootState) => state.project.selectedProject;
export const selectGetProjectStatus = (state: RootState) => state.project.getProjectStatus;

export default projectSlice.reducer;